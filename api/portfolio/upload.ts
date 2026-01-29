// Vercel API route for uploading files to Cloudflare R2
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import busboy from 'busboy';

const METADATA_KEY = 'projects.json';

async function getProjectsFromR2(accountId: string, accessKeyId: string, secretAccessKey: string, bucketName: string): Promise<any[]> {
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: METADATA_KEY,
    });

    const response = await s3Client.send(command);
    const bodyString = await response.Body?.transformToString();
    return bodyString ? JSON.parse(bodyString) : [];
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
      return [];
    }
    throw error;
  }
}

async function saveProjectsToR2(accountId: string, accessKeyId: string, secretAccessKey: string, bucketName: string, projects: any[]): Promise<void> {
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: METADATA_KEY,
    Body: JSON.stringify(projects),
    ContentType: 'application/json',
  });

  await s3Client.send(command);
}

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

    if (!accountId || !accessKeyId || !secretAccessKey) {
      const missing = [];
      if (!accountId) missing.push('CLOUDFLARE_ACCOUNT_ID');
      if (!accessKeyId) missing.push('CLOUDFLARE_R2_ACCESS_KEY_ID');
      if (!secretAccessKey) missing.push('CLOUDFLARE_R2_SECRET_ACCESS_KEY');
      return res.status(500).json({ 
        success: false, 
        error: `Missing R2 credentials: ${missing.join(', ')}. Please configure them in Vercel.` 
      });
    }

    if (!bucketName) {
      return res.status(500).json({ 
        success: false, 
        error: 'CLOUDFLARE_R2_BUCKET_NAME not configured. Please set it in Vercel environment variables.' 
      });
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
      bb.on('finish', () => {
        console.log('Busboy finished parsing:', { projectId, fileCount: files.length });
        resolve();
      });
      bb.on('error', (err) => {
        console.error('Busboy parsing error:', err);
        reject(err);
      });
      req.pipe(bb);
    });

    if (!projectId) {
      return res.status(400).json({ success: false, error: 'Missing projectId' });
    }

    if (files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files were uploaded. Please select files to upload.' });
    }

    console.log('Parsed upload request:', {
      projectId,
      fileCount: files.length,
      files: files.map(f => ({ name: f.name, size: f.data.length, type: f.type }))
    });

    // Get projects from R2
    const projects = await getProjectsFromR2(accountId, accessKeyId, secretAccessKey, bucketName);

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
      try {
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        console.log('Uploading file to R2:', {
          fileName,
          fileSize: file.data.length,
          fileType: file.type,
          bucketName
        });

        // Upload to R2 using S3 SDK
        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: file.data,
            ContentType: file.type,
          })
        );

        console.log('File uploaded successfully to R2:', fileName);

        // Get public URL - R2 public URLs use the file path directly (no encoding needed for path segments)
        // Format: https://pub-<bucket-name>.r2.dev/<file-path>
        const r2PublicUrl = `https://pub-${bucketName}.r2.dev/${fileName}`;
        
        console.log('Generated public URL:', r2PublicUrl);
        
        const newItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          type: fileType,
          url: r2PublicUrl,
          thumbnail: fileType === 'image' ? r2PublicUrl : '',
          order: project.items.length + uploadedItems.length
        };

        uploadedItems.push(newItem);
      } catch (fileError: any) {
        console.error('Failed to upload file:', file.name, fileError);
        // Continue with other files even if one fails
      }
    }

    if (uploadedItems.length === 0) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to upload any files. Check server logs for details.' 
      });
    }

    // Update project with new items
    project.items = [...project.items, ...uploadedItems];
    
    if (!project.coverImage && uploadedItems.length > 0 && uploadedItems[0].type === 'image') {
      project.coverImage = uploadedItems[0].url;
    }

    // Save updated projects to R2
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;

    await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);

    return res.status(200).json({ success: true, items: uploadedItems });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, error: 'Upload failed: ' + error.message });
  }
}
