// Vercel API route for portfolio projects (uses Cloudflare R2 for metadata storage)
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
    // If file doesn't exist (404), return empty array
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
  if (req.method === 'GET') {
    try {
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
          error: `Missing environment variables: ${missing.join(', ')}. Please configure them in Vercel.` 
        });
      }

      const projects = await getProjectsFromR2(accountId, accessKeyId, secretAccessKey, bucketName);
      return res.status(200).json({ success: true, projects });
    } catch (error: any) {
      console.error('R2 fetch error:', error);
      return res.status(500).json({ success: false, error: 'Failed to load projects: ' + error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      // Parse request body
      let body = req.body;
      if (typeof req.body === 'string') {
        try {
          body = JSON.parse(req.body);
        } catch (e) {
          return res.status(400).json({ success: false, error: 'Invalid request body' });
        }
      }

      const { title } = body;

      if (!title || !title.trim()) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }

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
          error: `Missing environment variables: ${missing.join(', ')}. Please configure them in Vercel.` 
        });
      }

      // Get existing projects
      const projects = await getProjectsFromR2(accountId, accessKeyId, secretAccessKey, bucketName);

      // Create new project
      const newProject = {
        id: `project-${Date.now()}`,
        title: title.trim(),
        description: '',
        coverImage: '',
        items: [],
        createdAt: new Date().toISOString()
      };

      projects.push(newProject);

      // Save to R2
      await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);

      return res.status(200).json({ success: true, project: newProject });
    } catch (error: any) {
      console.error('R2 save error:', error);
      const errorMessage = error.message || 'Failed to create project';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
