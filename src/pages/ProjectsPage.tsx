import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Filter, X, ArrowRight } from 'lucide-react';
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
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="pb-8 mb-8 border-b border-zinc-800/80">
        <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
          Index / Architecture Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Engineering Records & Systems
        </h1>
        <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed">
          A registry of distributed backends, RESTful APIs, automated data pipelines, and intelligent agent workflows.
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 p-5 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h2 className="font-mono text-xs uppercase tracking-wider text-white flex items-center gap-2 font-semibold">
            <Filter size={14} className="text-emerald-400" /> System Taxonomy Filter
          </h2>
          {(selectedType || selectedDomains.length > 0 || selectedTech.length > 0) && (
            <button 
              onClick={clearFilters} 
              className="font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Reset Filters
            </button>
          )}
        </div>

        {/* Project Type */}
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">
            Architecture Type
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button 
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                !selectedType 
                  ? 'bg-white text-zinc-950 font-semibold' 
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            {allTypes.map(type => (
              <button 
                key={type}
                onClick={() => setSelectedType(type as string)}
                className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                  selectedType === type 
                    ? 'bg-white text-zinc-950 font-semibold' 
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        {allDomains.length > 0 && (
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">
              Domain Specialization
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allDomains.map(domain => (
                <button 
                  key={domain}
                  onClick={() => toggleDomain(domain as string)}
                  className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                    selectedDomains.includes(domain as string) 
                      ? 'bg-emerald-400 text-zinc-950 font-semibold' 
                      : 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-400 hover:text-white'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {allTech.length > 0 && (
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">
              Core Component / Technology
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allTech.map(tech => (
                <button 
                  key={tech}
                  onClick={() => toggleTech(tech as string)}
                  className={`px-2.5 py-1 rounded font-mono text-xs transition-colors ${
                    selectedTech.includes(tech as string) 
                      ? 'bg-white text-zinc-950 font-semibold' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-500'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-lg animate-pulse h-64">
                <div className="h-4 w-24 bg-zinc-800 rounded mb-3"></div>
                <div className="h-6 w-3/4 bg-zinc-800 rounded mb-3"></div>
                <div className="h-16 w-full bg-zinc-800 rounded mb-4"></div>
              </div>
            ))}
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <div 
                key={p.slug}
                className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                        {p.projectType || 'Backend System'}
                      </span>
                      {p.featured && (
                        <span className="font-mono text-xs text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    {p.stars && (
                      <span className="font-mono text-xs text-zinc-400">
                        ★ {p.stars}
                      </span>
                    )}
                  </div>

                  <Link to={`/projects/${p.slug}`} className="block">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-100 leading-relaxed mb-4 line-clamp-3">
                    {p.desc}
                  </p>

                  {/* Domain badges */}
                  {p.domains && p.domains.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.domains.map(d => (
                        <span 
                          key={d} 
                          className="font-mono text-xs text-emerald-400 px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tech.map(t => (
                      <span 
                        key={t} 
                        className="font-mono text-xs text-zinc-200 px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <Link 
                    to={`/projects/${p.slug}`}
                    className="font-mono text-xs text-white group-hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-semibold"
                  >
                    Inspect Specification <ArrowRight size={12} />
                  </Link>
                  
                  {p.link && p.link !== '#' && (
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      Endpoint <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {!loading && filteredProjects.length === 0 && (
        <div className="w-full py-16 text-center font-mono text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-lg">
          No engineering records match the selected filter combination.
        </div>
      )}
    </main>
  )
}
