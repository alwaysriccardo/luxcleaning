// Vercel API route for deleting projects (uses Cloudflare R2 for metadata and file storage)
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
    const projectId = req.query.id;

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

    // Delete all items from R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    for (const item of project.items) {
      try {
        // Extract key from URL
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
        console.error('Failed to delete item from R2:', err);
      }
    }

    // Remove project from list
    const updatedProjects = projects.filter((p: any) => p.id !== projectId);
    
    // Save to R2
    await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, updatedProjects);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return res.status(500).json({ success: false, error: 'Delete failed: ' + error.message });
  }
}
