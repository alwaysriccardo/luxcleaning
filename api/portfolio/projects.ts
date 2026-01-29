// Vercel API route for portfolio projects (uses Cloudflare R2 for metadata storage)
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const METADATA_KEY = 'projects.json';

function fixImageUrls(projects: any[], accountId: string, bucketName: string): any[] {
  // Fix old URL format (bucket name) to new format (account ID)
  const oldUrlPattern = new RegExp(`https://pub-${bucketName}\\.r2\\.dev/`, 'g');
  const newUrlBase = `https://pub-${accountId}.r2.dev/`;
  
  return projects.map(project => {
    // Fix cover image URL
    if (project.coverImage && project.coverImage.includes(`pub-${bucketName}.r2.dev`)) {
      project.coverImage = project.coverImage.replace(oldUrlPattern, newUrlBase);
    }
    
    // Fix item URLs
    project.items = project.items.map((item: any) => {
      if (item.url && item.url.includes(`pub-${bucketName}.r2.dev`)) {
        item.url = item.url.replace(oldUrlPattern, newUrlBase);
      }
      if (item.thumbnail && item.thumbnail.includes(`pub-${bucketName}.r2.dev`)) {
        item.thumbnail = item.thumbnail.replace(oldUrlPattern, newUrlBase);
      }
      return item;
    });
    
    return project;
  });
}

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
    const projects = bodyString ? JSON.parse(bodyString) : [];
    
    // Fix old URL format to new format
    return fixImageUrls(projects, accountId, bucketName);
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
      
      // Check if any URLs need fixing (old format with bucket name)
      const needsUpdate = projects.some((p: any) => 
        (p.coverImage && p.coverImage.includes(`pub-${bucketName}.r2.dev`)) ||
        p.items.some((i: any) => 
          (i.url && i.url.includes(`pub-${bucketName}.r2.dev`)) || 
          (i.thumbnail && i.thumbnail.includes(`pub-${bucketName}.r2.dev`))
        )
      );
      
      if (needsUpdate) {
        // URLs were fixed by getProjectsFromR2, save them back
        await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);
        console.log('Fixed and saved old URL formats to new format');
      }
      
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
