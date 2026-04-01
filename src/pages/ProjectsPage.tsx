import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShoppingCart, Filter, X, Star, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';

export default function ProjectsPage() {
  const { projects, loading } = useProjects();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  
  // Extract unique tags
  const allTypes = useMemo(() => Array.from(new Set(projects.map(p => p.projectType).filter(Boolean))), [projects]);
  const allDomains = useMemo(() => Array.from(new Set(projects.flatMap(p => p.domains || []))), [projects]);
  const allTech = useMemo(() => Array.from(new Set(projects.flatMap(p => p.tech || []))), [projects]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchType = selectedType ? p.projectType === selectedType : true;
      const matchDomain = selectedDomains.length > 0 ? selectedDomains.every(d => p.domains?.includes(d)) : true;
      const matchTech = selectedTech.length > 0 ? selectedTech.every(t => p.tech?.includes(t)) : true;
      return matchType && matchDomain && matchTech;
    });
  }, [projects, selectedType, selectedDomains, selectedTech]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedDomains([]);
    setSelectedTech([]);
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6">Projects & Code</h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
          A collection of my work, ranging from client architectures and open-source contributions to premium boilerplates.
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 space-y-8 glass-panel rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-light text-white flex items-center gap-2"><Filter size={20} /> Classification</h2>
          {(selectedType || selectedDomains.length > 0 || selectedTech.length > 0) && (
            <button onClick={clearFilters} className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
              <X size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Project Type */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">1. Project Type</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${!selectedType ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'}`}
            >
              All
            </button>
            {allTypes.map(type => (
              <button 
                key={type}
                onClick={() => setSelectedType(type as string)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedType === type ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">2. Domain / Focus Area</h3>
          <div className="flex flex-wrap gap-2">
            {allDomains.map(domain => (
              <button 
                key={domain}
                onClick={() => toggleDomain(domain as string)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedDomains.includes(domain as string) ? 'bg-emerald-500 text-white border border-emerald-500' : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'}`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">3. Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {allTech.map(tech => (
              <button 
                key={tech}
                onClick={() => toggleTech(tech as string)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${selectedTech.includes(tech as string) ? 'bg-zinc-200 text-black border border-zinc-200' : 'bg-transparent text-zinc-500 hover:text-zinc-300 border border-white/10 hover:border-white/20'}`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel rounded-3xl p-8 h-[400px] animate-pulse flex flex-col">
                <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
                <div className="h-8 w-3/4 bg-white/10 rounded mb-4"></div>
                <div className="space-y-3 mb-8 flex-1">
                  <div className="h-4 w-full bg-white/10 rounded"></div>
                  <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                  <div className="h-4 w-4/6 bg-white/10 rounded"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-white/10 rounded"></div>
                  <div className="h-6 w-20 bg-white/10 rounded"></div>
                </div>
                <div className="flex gap-2 mb-8">
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                  <div className="h-6 w-24 bg-white/10 rounded-full"></div>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between mt-auto">
                  <div className="h-5 w-32 bg-white/10 rounded"></div>
                  <div className="h-5 w-16 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
            <motion.div 
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="group glass-panel rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
              >
                {/* Stretched Link for the entire card */}
                <Link 
                  to={`/projects/${p.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View details for ${p.title}`}
                />

                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  <div className="flex items-center justify-between mb-4">
                    {p.featured ? (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                        <Star size={10} fill="currentColor" /> Featured
                      </span>
                    ) : (
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                        {p.projectType || 'System'}
                      </div>
                    )}
                    
                    {p.type === 'premium' && (
                      <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full pointer-events-auto">
                        {p.price}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4 pr-12 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-emerald-400">{p.title}</h3>
                  <p className="text-base text-zinc-400 font-light leading-relaxed mb-8 flex-1">{p.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.domains?.map(d => (
                      <span key={d} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-wider rounded border border-emerald-500/20">{d}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 text-zinc-300 text-xs rounded-full border border-white/10">{t}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 pointer-events-auto">
                      {p.type === 'premium' ? (
                        <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                          <ShoppingCart size={16} /> Purchase Access
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-zinc-300 transition-colors">
                          View Details <ArrowUpRight size={16} />
                        </span>
                      )}
                      
                      {p.link && p.link !== '#' && (
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors relative z-20"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                    {p.stars && (
                      <span className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                        ★ {p.stars}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
      </div>
      
      {!loading && filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full py-20 text-center text-zinc-500 font-light"
        >
          No projects match your selected filters. Try clearing some tags.
        </motion.div>
      )}
    </main>
  )
}
