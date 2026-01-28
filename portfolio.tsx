import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, Video } from 'lucide-react';

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

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/portfolio/projects');
      const data = await response.json();
      if (data.success && data.projects.length > 0) {
        setProjects(data.projects);
        setSelectedProject(data.projects[0]);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedItem(null);
  };

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: 'prev' | 'next') => {
    if (!selectedProject || !selectedItem) return;

    const items = selectedProject.items.sort((a, b) => a.order - b.order);
    const currentIndex = items.findIndex(i => i.id === selectedItem.id);
    
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      setSelectedItem(items[prevIndex]);
    } else {
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      setSelectedItem(items[nextIndex]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#Fdfcf8] flex items-center justify-center">
        <div className="text-stone-400">Loading portfolio...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-[#Fdfcf8] flex items-center justify-center">
        <div className="text-stone-400">No portfolio items yet.</div>
      </div>
    );
  }

  const currentProject = selectedProject || projects[0];
  const sortedItems = currentProject.items.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#Fdfcf8] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Project Switcher */}
        {projects.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => switchProject(project)}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${
                  selectedProject?.id === project.id
                    ? 'bg-yellow-400 text-[#1a1a1a]'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        )}

        {/* Project Title */}
        <h2 className="font-serif-display text-4xl md:text-5xl text-[#1a1a1a] mb-8 text-center">
          {currentProject.title}
        </h2>

        {/* Portfolio Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer group relative"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.thumbnail || item.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <Video size={32} className="text-white/80" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-stone-400">
            No items in this project yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={24} />
          </button>

          {sortedItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateItem('prev');
                }}
                className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateItem('next');
                }}
                className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === 'image' ? (
              <img
                src={selectedItem.url}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                className="max-w-full max-h-full"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('portfolio-root');
if (rootElement) {
  createRoot(rootElement).render(<Portfolio />);
}
