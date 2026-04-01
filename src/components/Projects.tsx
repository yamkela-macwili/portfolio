import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';

export default function Projects() {
  const { projects } = useProjects();
  
  return (
    <section id="projects" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-zinc-500 font-light max-w-md">
            A collection of systems and applications focused on data architecture and AI integration.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Link 
            to="/projects" 
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 group"
          >
            View all projects <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.filter(p => p.featured).map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link 
              to={`/projects/${p.slug}`}
              className="group block glass-panel rounded-3xl p-8 hover:bg-white/[0.04] border border-white/5 hover:border-white/20 transition-all duration-500 h-full flex flex-col relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  {p.featured ? (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{p.projectType || 'Application'}</span>
                  )}
                  <span className="text-zinc-800">•</span>
                  <div className="flex flex-wrap gap-2">
                    {p.domains?.slice(0, 1).map(d => (
                      <span key={d} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-medium rounded border border-emerald-500/20 uppercase tracking-wider">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 group-hover:text-emerald-400 transition-colors relative z-10">{p.title}</h3>
              <p className="text-zinc-400 text-base font-light leading-relaxed mb-8 flex-grow relative z-10">{p.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 text-zinc-300 text-[10px] rounded-full border border-white/10">{t}</span>
                  ))}
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black transition-all duration-500 shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Subtle background glow for featured items */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
