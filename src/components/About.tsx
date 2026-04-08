import { motion } from 'motion/react';
import { Server, BrainCircuit, Layers, HardDrive, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-16"
      >
        About
      </motion.h2>
      
      <div className="flex flex-col gap-4">
        {/* Main Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12 hover:bg-white/[0.05] transition-colors relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <div className="text-micro text-zinc-500">REF: SYS_BIO_01</div>
          </div>
          <div className="max-w-4xl">
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-6">
              I’m a backend-focused developer based in Cape Town, passionate about building systems that process real-world data and deliver meaningful insights.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-6">
              I enjoy designing APIs, optimizing backend performance, and integrating AI into practical applications. My work focuses on clean architecture, scalability, and efficient data handling.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
              I’m continuously learning and aiming to grow as a backend engineer working on impactful systems.
            </p>
          </div>
        </motion.div>
        
        {/* Skills & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-3xl p-8 md:p-12 hover:bg-white/[0.05] transition-colors"
        >
          <div className="text-micro text-zinc-500 mb-8 tracking-widest uppercase">Technical Arsenal</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Server size={16} className="text-emerald-400" /> Backend
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Python', 'FastAPI', 'Flask'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-emerald-400" /> Frontend
              </h4>
              <div className="flex flex-wrap gap-3">
                {['React', 'JavaScript', 'HTML', 'CSS'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <HardDrive size={16} className="text-emerald-400" /> Database
              </h4>
              <div className="flex flex-wrap gap-3">
                {['PostgreSQL', 'SQLite'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400" /> Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Git', 'Docker', 'Vercel'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5">
            <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <BrainCircuit size={16} className="text-emerald-400" /> Concepts
            </h4>
            <div className="flex flex-wrap gap-3">
              {['REST APIs', 'System Design', 'Caching', 'Agile Development', 'Intelligent Automation'].map(concept => (
                <span key={concept} className="px-4 py-2 bg-emerald-500/5 text-emerald-400 rounded-xl border border-emerald-500/10 text-sm font-mono">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
