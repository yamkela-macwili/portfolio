import { ArrowUpRight } from 'lucide-react';
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
      
      <div className="grid grid-cols-1 gap-12">
        {projects.filter(p => p.featured).map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-panel rounded-3xl p-8 md:p-12 hover:bg-white/[0.04] border border-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                    {p.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 group-hover:text-emerald-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                  {p.desc}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 text-zinc-300 text-xs rounded-full border border-white/10 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {p.link && (
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2"
                    >
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {p.github && (
                    <a 
                      href={p.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      GitHub <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-8 lg:border-l lg:border-white/10 lg:pl-12">
                <div>
                  <h4 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">The Problem</h4>
                  <p className="text-zinc-300 font-light leading-relaxed">{p.problem}</p>
                </div>
                <div>
                  <h4 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">The Solution</h4>
                  <p className="text-zinc-300 font-light leading-relaxed">{p.solution}</p>
                </div>
                <div>
                  <h4 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">The Impact</h4>
                  <p className="text-emerald-400/80 font-light leading-relaxed italic">“{p.impact}”</p>
                </div>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
