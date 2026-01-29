// Vercel API route for portfolio projects (uses Cloudflare R2 for metadata storage)
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const METADATA_KEY = 'projects.json';

function fixImageUrls(projects: any[], accountId: string, bucketName: string, r2PublicId: string): any[] {
  // Fix ALL old URL formats to the correct R2 public URL format
  // The correct format is: https://pub-<r2PublicId>.r2.dev/<file-path>
  const correctUrlBase = `https://pub-${r2PublicId}.r2.dev/`;
  
  // Patterns to fix: bucket name or account ID in URL (both are wrong)
  const fixUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    
    // Already correct format
    if (url.startsWith(correctUrlBase)) {
      return url;
    }
    
    // Extract the file path from any pub-*.r2.dev URL
    const match = url.match(/https:\/\/pub-[a-zA-Z0-9-]+\.r2\.dev\/(.+)/);
    if (match) {
      return `${correctUrlBase}${match[1]}`;
    }
    
    return url;
  };
  
  return projects.map(project => {
    // Fix cover image URL
    project.coverImage = fixUrl(project.coverImage);
    
    // Fix item URLs
    project.items = project.items.map((item: any) => {
      item.url = fixUrl(item.url);
      item.thumbnail = fixUrl(item.thumbnail);
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
    
    // Get R2 public ID from env or use account ID
    // The public URL uses a specific ID (might be same as account ID or different)
    const r2PublicId = process.env.CLOUDFLARE_R2_PUBLIC_ID || accountId;
    
    // Fix old URL format to new format
    return fixImageUrls(projects, accountId, bucketName, r2PublicId);
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
      
      // Get R2 public ID for URL checking
      const r2PublicId = process.env.CLOUDFLARE_R2_PUBLIC_ID || accountId;
      const correctUrlBase = `https://pub-${r2PublicId}.r2.dev/`;
      
      // Check if any URLs need fixing (not starting with correct base)
      const needsUpdate = projects.some((p: any) => {
        const hasWrongCover = p.coverImage && p.coverImage.includes('.r2.dev/') && !p.coverImage.startsWith(correctUrlBase);
        const hasWrongItems = p.items.some((i: any) => 
          (i.url && i.url.includes('.r2.dev/') && !i.url.startsWith(correctUrlBase)) || 
          (i.thumbnail && i.thumbnail.includes('.r2.dev/') && !i.thumbnail.startsWith(correctUrlBase))
        );
        return hasWrongCover || hasWrongItems;
      });
      
      if (needsUpdate) {
        // URLs were fixed by getProjectsFromR2, save them back
        await saveProjectsToR2(accountId, accessKeyId, secretAccessKey, bucketName, projects);
        console.log('Fixed and saved old URL formats to new format. Using R2 public ID:', r2PublicId);
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
