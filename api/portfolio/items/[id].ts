// Vercel API route for deleting items (uses Cloudflare KV and R2)
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
    const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'luxcleaning-portfolio';

    if (!accountId || !namespaceId || !apiToken) {
      return res.status(500).json({ success: false, error: 'Cloudflare credentials not configured' });
    }

    // Get projects from KV
    const getResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/projects`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!getResponse.ok && getResponse.status !== 404) {
      throw new Error('Failed to fetch from KV');
    }

    const projectsData = getResponse.ok ? await getResponse.text() : null;
    const projects = projectsData ? JSON.parse(projectsData) : [];
    
    const project = projects.find((p: any) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const item = project.items.find((i: any) => i.id === itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Delete from R2
    try {
      const urlParts = item.url.split('/');
      const key = urlParts[urlParts.length - 1];
      const fullKey = `${projectId}/${key}`;

      // Delete from R2 using S3-compatible API
      const { S3Client, DeleteObjectCommand } = await import('@aws-sdk/client-s3');
      const s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
      });

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

    // Save updated projects
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;

    const putResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/projects`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(projects)
      }
    );

    if (!putResponse.ok) {
      throw new Error('Failed to save to KV');
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return res.status(500).json({ success: false, error: 'Delete failed' });
  }
}
