// Portfolio projects CRUD endpoints
export const onRequestGet: PagesFunction<{
  PORTFOLIO_KV: KVNamespace;
}> = async (context) => {
  try {
    const projectsData = await context.env.PORTFOLIO_KV.get('projects');
    const projects = projectsData ? JSON.parse(projectsData) : [];
    
    return new Response(JSON.stringify({ success: true, projects }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to load projects' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPost: PagesFunction<{
  PORTFOLIO_KV: KVNamespace;
}> = async (context) => {
  try {
    const { title } = await context.request.json();
    
    if (!title || !title.trim()) {
      return new Response(JSON.stringify({ success: false, error: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const projectsData = await context.env.PORTFOLIO_KV.get('projects');
    const projects = projectsData ? JSON.parse(projectsData) : [];
    
    const newProject = {
      id: `project-${Date.now()}`,
      title: title.trim(),
      description: '',
      coverImage: '',
      items: [],
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);
    await context.env.PORTFOLIO_KV.put('projects', JSON.stringify(projects));

    return new Response(JSON.stringify({ success: true, project: newProject }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to create project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
