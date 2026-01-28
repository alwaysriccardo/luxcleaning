// Vercel API route for portfolio projects (uses Cloudflare KV via REST API)
export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      // Get projects from Cloudflare KV
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
      const apiToken = process.env.CLOUDFLARE_API_TOKEN;

      if (!accountId || !namespaceId || !apiToken) {
        return res.status(500).json({ success: false, error: 'Cloudflare credentials not configured' });
      }

      // Get value from KV
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/projects`,
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 404) {
        // No projects yet
        return res.status(200).json({ success: true, projects: [] });
      }

      if (!response.ok) {
        throw new Error('Failed to fetch from KV');
      }

      const projectsData = await response.text();
      const projects = projectsData ? JSON.parse(projectsData) : [];

      return res.status(200).json({ success: true, projects });
    } catch (error: any) {
      console.error('KV fetch error:', error);
      return res.status(500).json({ success: false, error: 'Failed to load projects' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }

      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
      const apiToken = process.env.CLOUDFLARE_API_TOKEN;

      if (!accountId || !namespaceId || !apiToken) {
        return res.status(500).json({ success: false, error: 'Cloudflare credentials not configured' });
      }

      // Get existing projects
      const getResponse = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/projects`,
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      let projects = [];
      if (getResponse.ok) {
        const projectsData = await getResponse.text();
        projects = projectsData ? JSON.parse(projectsData) : [];
      }

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

      // Save to KV
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

      return res.status(200).json({ success: true, project: newProject });
    } catch (error: any) {
      console.error('KV save error:', error);
      return res.status(500).json({ success: false, error: 'Failed to create project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
