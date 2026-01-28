// Delete project endpoint
export const onRequestDelete: PagesFunction<{
  PORTFOLIO_KV: KVNamespace;
  R2_BUCKET: R2Bucket;
}> = async (context) => {
  try {
    const projectId = context.params.id as string;
    
    const projectsData = await context.env.PORTFOLIO_KV.get('projects');
    const projects = projectsData ? JSON.parse(projectsData) : [];
    
    const project = projects.find((p: any) => p.id === projectId);
    if (!project) {
      return new Response(JSON.stringify({ success: false, error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete all items from R2
    for (const item of project.items) {
      try {
        // Extract key from URL (format: https://r2-url/bucket-name/key)
        const urlParts = item.url.split('/');
        const key = urlParts.slice(-2).join('/'); // Get last two parts (bucket/key)
        await context.env.R2_BUCKET.delete(key);
        
        if (item.thumbnail) {
          const thumbParts = item.thumbnail.split('/');
          const thumbKey = thumbParts.slice(-2).join('/');
          await context.env.R2_BUCKET.delete(thumbKey);
        }
      } catch (err) {
        console.error('Failed to delete item from R2:', err);
      }
    }

    // Remove project from list
    const updatedProjects = projects.filter((p: any) => p.id !== projectId);
    await context.env.PORTFOLIO_KV.put('projects', JSON.stringify(updatedProjects));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to delete project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
