// Delete item endpoint
export const onRequestDelete: PagesFunction<{
  R2_BUCKET: R2Bucket;
  PORTFOLIO_KV: KVNamespace;
}> = async (context) => {
  try {
    const itemId = context.params.id as string;
    const { projectId } = await context.request.json();

    if (!projectId) {
      return new Response(JSON.stringify({ success: false, error: 'projectId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Load projects
    const projectsData = await context.env.PORTFOLIO_KV.get('projects');
    const projects = projectsData ? JSON.parse(projectsData) : [];
    const project = projects.find((p: any) => p.id === projectId);

    if (!project) {
      return new Response(JSON.stringify({ success: false, error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const item = project.items.find((i: any) => i.id === itemId);
    if (!item) {
      return new Response(JSON.stringify({ success: false, error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete from R2
    try {
      const urlParts = item.url.split('/');
      const key = urlParts.slice(-2).join('/');
      await context.env.R2_BUCKET.delete(key);
      
      if (item.thumbnail && item.thumbnail !== item.url) {
        const thumbParts = item.thumbnail.split('/');
        const thumbKey = thumbParts.slice(-2).join('/');
        await context.env.R2_BUCKET.delete(thumbKey);
      }
    } catch (err) {
      console.error('Failed to delete from R2:', err);
    }

    // Remove item from project
    project.items = project.items.filter((i: any) => i.id !== itemId);
    
    // Update cover image if it was deleted
    if (project.coverImage === item.url) {
      const firstImage = project.items.find((i: any) => i.type === 'image');
      project.coverImage = firstImage ? firstImage.url : '';
    }

    // Save updated projects
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;
    await context.env.PORTFOLIO_KV.put('projects', JSON.stringify(projects));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Delete failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
