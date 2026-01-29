// API route to update project metadata after direct uploads
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

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
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'luxcleaning-portfolio';

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      return res.status(500).json({ 
        success: false, 
        error: 'R2 credentials not configured' 
      });
    }

    const { projectId, items } = req.body;

    if (!projectId || !items || !Array.isArray(items)) {
      return res.status(400).json({ 
        success: false, 
        error: 'projectId and items array are required' 
      });
    }

    const projects = await getProjectsFromR2(accountId, accessKeyId, secretAccessKey, bucketName);
    const project = projects.find((p: any) => p.id === projectId);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    // Add new items to project
    project.items = [...project.items, ...items];

    // Update cover image if needed
    if (!project.coverImage && items.length > 0) {
      const firstImage = items.find((i: any) => i.type === 'image');
      if (firstImage) {
        project.coverImage = firstImage.url;
      }
    }

    // Save updated projects
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;
    await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Update items error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update items: ' + error.message 
    });
  }
}
