// Vercel API route for uploading files to Cloudflare R2
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import busboy from 'busboy';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get R2 credentials from environment
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'luxcleaning-portfolio';
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const kvNamespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

    if (!accountId || !accessKeyId || !secretAccessKey || !apiToken || !kvNamespaceId) {
      return res.status(500).json({ success: false, error: 'Cloudflare credentials not configured' });
    }

    // Parse multipart form data using busboy
    let projectId = '';
    const files: { name: string; data: Buffer; type: string }[] = [];

    const bb = busboy({ headers: req.headers });
    
    bb.on('field', (fieldname, val) => {
      if (fieldname === 'projectId') {
        projectId = val;
      }
    });

    bb.on('file', (fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      const chunks: Buffer[] = [];
      
      file.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        files.push({
          name: filename || 'unknown',
          data: Buffer.concat(chunks),
          type: mimeType || 'application/octet-stream'
        });
      });
    });

    // Wait for busboy to finish parsing
    await new Promise<void>((resolve, reject) => {
      bb.on('finish', resolve);
      bb.on('error', reject);
      req.pipe(bb);
    });

    if (!projectId || files.length === 0) {
      return res.status(400).json({ success: false, error: 'Missing projectId or files' });
    }

    // Get projects from KV
    const kvResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${kvNamespaceId}/values/projects`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let projects = [];
    if (kvResponse.ok) {
      const projectsData = await kvResponse.text();
      projects = projectsData ? JSON.parse(projectsData) : [];
    }

    const project = projects.find((p: any) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Initialize S3 client for R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const uploadedItems = [];

    // Upload each file to R2
    for (const file of files) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to R2 using S3 SDK
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: file.data,
          ContentType: file.type,
        })
      );

      // Get public URL
      const r2PublicUrl = `https://pub-${bucketName}.r2.dev/${fileName}`;
      
      const newItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type: fileType,
        url: r2PublicUrl,
        thumbnail: fileType === 'image' ? r2PublicUrl : '',
        order: project.items.length + uploadedItems.length
      };

      uploadedItems.push(newItem);
    }

    // Update project with new items
    project.items = [...project.items, ...uploadedItems];
    
    if (!project.coverImage && uploadedItems.length > 0 && uploadedItems[0].type === 'image') {
      project.coverImage = uploadedItems[0].url;
    }

    // Save updated projects to KV
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;

    const kvPutResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${kvNamespaceId}/values/projects`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(projects)
      }
    );

    if (!kvPutResponse.ok) {
      throw new Error('Failed to save to KV');
    }

    return res.status(200).json({ success: true, items: uploadedItems });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, error: 'Upload failed: ' + error.message });
  }
}
