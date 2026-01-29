import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  X, 
  Upload, 
  Trash2, 
  ArrowLeft, 
  Plus, 
  Image as ImageIcon,
  Video,
  Loader2
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  items: PortfolioItem[];
  createdAt: string;
}

const AdminEditor = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    checkAuth();
    loadProjects();
  }, []);

  const checkAuth = () => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth !== 'true') {
      window.location.href = '/admin-login.html';
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/portfolio/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProjectTitle.trim()) {
      setError('Please enter a project title');
      return;
    }

    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newProjectTitle })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setProjects([...projects, data.project]);
        setNewProjectTitle('');
        setShowNewProject(false);
        setSelectedProject(data.project);
        setError('');
      } else {
        setError(data.error || 'Failed to create project');
      }
    } catch (err: any) {
      console.error('Failed to create project:', err);
      setError(err.message || 'Failed to create project. Please check your environment variables.');
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? All items will be deleted.')) return;

    try {
      const response = await fetch(`/api/portfolio/projects/${projectId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        setProjects(projects.filter(p => p.id !== projectId));
        if (selectedProject?.id === projectId) {
          setSelectedProject(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleFileSelect = async (files: FileList) => {
    if (!selectedProject || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    formData.append('projectId', selectedProject.id);

    try {
      const response = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        // Reload projects to get updated items
        await loadProjects();
        // Update selected project with fresh data
        const allProjectsResponse = await fetch('/api/portfolio/projects');
        const allProjects = await allProjectsResponse.json();
        if (allProjects.success) {
          const updated = allProjects.projects.find((p: Project) => p.id === selectedProject.id);
          if (updated) {
            console.log('Updated project with items:', updated.items);
            setSelectedProject(updated);
          }
        }
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!selectedProject) return;
    if (!confirm('Delete this item?')) return;

    try {
      const response = await fetch(`/api/portfolio/items/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProject.id })
      });

      const data = await response.json();
      if (data.success) {
        await loadProjects();
        const updated = projects.find(p => p.id === selectedProject.id);
        if (updated) {
          setSelectedProject(updated);
        }
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = '/admin-login.html';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject.id) || selectedProject;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Project Title */}
          <h1 className="font-serif-display text-4xl md:text-5xl mb-8">{project.title}</h1>

          {/* Upload Area */}
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-8 border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-yellow-400 bg-yellow-400/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              className="hidden"
            />
            <Upload size={48} className="mx-auto mb-4 text-white/60" />
            <p className="text-white/80 mb-2">
              Drag and drop images/videos here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                browse
              </button>
            </p>
            <p className="text-white/40 text-sm">Supports images and videos</p>
            {uploading && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                <span className="text-white/60">Uploading...</span>
              </div>
            )}
          </div>

          {/* Items Grid */}
          {project.items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.items
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-white/5">
                      {item.type === 'image' ? (
                        <img
                          src={item.thumbnail || item.url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', e.currentTarget.src);
                            // Fallback to url if thumbnail fails
                            if (e.currentTarget.src !== item.url) {
                              e.currentTarget.src = item.url;
                            }
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', item.url);
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      {item.type === 'image' ? (
                        <ImageIcon size={16} className="text-white/80" />
                      ) : (
                        <Video size={16} className="text-white/80" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40">
              No items yet. Upload some images or videos!
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif-display text-4xl md:text-5xl">Portfolio Admin</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>

        {/* New Project */}
        {showNewProject ? (
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => {
                setNewProjectTitle(e.target.value);
                setError('');
              }}
              placeholder="Project title..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && !creating && createProject()}
              autoFocus
              disabled={creating}
            />
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={createProject}
                disabled={creating}
                className="px-6 py-2 bg-yellow-400 text-[#1a1a1a] rounded-xl font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                onClick={() => {
                  setShowNewProject(false);
                  setNewProjectTitle('');
                  setError('');
                }}
                disabled={creating}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewProject(true)}
            className="mb-8 flex items-center gap-2 px-6 py-3 bg-yellow-400 text-[#1a1a1a] rounded-xl font-bold hover:bg-yellow-500 transition-colors"
          >
            <Plus size={20} />
            New Project
          </button>
        )}

        {/* Projects List */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-white/5 mb-4">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={32} className="text-white/20" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif-display text-xl mb-2">{project.title}</h3>
                <p className="text-white/60 text-sm mb-4">
                  {project.items.length} {project.items.length === 1 ? 'item' : 'items'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="flex-1 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 rounded-xl text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/40">
            No projects yet. Create your first project!
          </div>
        )}
      </div>
    </div>
  );
};

const rootElement = document.getElementById('admin-editor-root');
if (rootElement) {
  createRoot(rootElement).render(<AdminEditor />);
}
