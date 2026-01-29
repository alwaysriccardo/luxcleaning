// Vercel API route for deleting items (uses Cloudflare R2 for metadata and file storage)
import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

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
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const itemId = req.query.id;
    
    // Parse request body for DELETE requests
    let projectId = '';
    
    // Read request body
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    
    if (chunks.length > 0) {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        projectId = body.projectId;
      } catch (e) {
        // If body is already parsed by Vercel
        if (req.body && typeof req.body === 'object') {
          projectId = req.body.projectId;
        }
      }
    } else if (req.body) {
      // Fallback if body is already parsed
      if (typeof req.body === 'string') {
        projectId = JSON.parse(req.body).projectId;
      } else if (typeof req.body === 'object') {
        projectId = req.body.projectId;
      }
    }

    if (!projectId) {
      return res.status(400).json({ success: false, error: 'projectId is required in request body' });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'luxcleaning-portfolio';

    if (!accountId || !accessKeyId || !secretAccessKey) {
      return res.status(500).json({ success: false, error: 'Cloudflare R2 credentials not configured' });
    }

    // Get projects from R2
    const projects = await getProjectsFromR2(accountId, accessKeyId, secretAccessKey, bucketName);
    
    const project = projects.find((p: any) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const item = project.items.find((i: any) => i.id === itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Delete from R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    try {
      const urlParts = item.url.split('/');
      const key = urlParts[urlParts.length - 1];
      const fullKey = `${projectId}/${key}`;

      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: fullKey,
        })
      );
    } catch (err) {
      console.error('Failed to delete from R2:', err);
    }

    // Remove item from project
    project.items = project.items.filter((i: any) => i.id !== itemId);
    
    if (project.coverImage === item.url) {
      const firstImage = project.items.find((i: any) => i.type === 'image');
      project.coverImage = firstImage ? firstImage.url : '';
    }

    // Save updated projects to R2
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;

    await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return res.status(500).json({ success: false, error: 'Delete failed: ' + error.message });
  }
}
