// Upload images/videos endpoint
export const onRequestPost: PagesFunction<{
  R2_BUCKET: R2Bucket;
  PORTFOLIO_KV: KVNamespace;
}> = async (context) => {
  try {
    const formData = await context.request.formData();
    const projectId = formData.get('projectId') as string;
    const files = formData.getAll('files') as File[];

    if (!projectId || files.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Missing projectId or files' }), {
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

    const uploadedItems = [];

    // Upload each file
    for (const file of files) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // Upload to R2
      await context.env.R2_BUCKET.put(fileName, file.stream(), {
        httpMetadata: {
          contentType: file.type
        }
      });

      // Get public URL (R2 public access must be enabled)
      // Update R2_BUCKET_NAME in environment variables to match your bucket name
      // Format: https://pub-<bucket-name>.r2.dev
      const bucketName = (context.env.R2_BUCKET_NAME as string) || 'luxcleaning-portfolio';
      const r2Url = `https://pub-${bucketName}.r2.dev/${fileName}`;
      
      const newItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type: fileType,
        url: r2Url,
        thumbnail: fileType === 'image' ? r2Url : '', // For videos, you might want to generate a thumbnail
        order: project.items.length + uploadedItems.length
      };

      uploadedItems.push(newItem);
    }

    // Update project with new items
    project.items = [...project.items, ...uploadedItems];
    
    // Set cover image if project doesn't have one
    if (!project.coverImage && uploadedItems.length > 0 && uploadedItems[0].type === 'image') {
      project.coverImage = uploadedItems[0].url;
    }

    // Save updated projects
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    projects[projectIndex] = project;
    await context.env.PORTFOLIO_KV.put('projects', JSON.stringify(projects));

    return new Response(JSON.stringify({ 
      success: true, 
      items: uploadedItems 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
