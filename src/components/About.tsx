import { motion } from 'motion/react';
import { Server, BrainCircuit, Layers, HardDrive, Terminal, Code2, Workflow, Sparkles } from 'lucide-react';

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
              I’m a Full-Stack Software Engineer based in Cape Town, building complete web applications with robust backend architectures, automated data pipelines, and intelligent AI solutions.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-6">
              With a background in Applied Statistics from the University of Cape Town, I design and build systems across the entire application lifecycle: from responsive user interfaces and REST APIs to automated data pipelines and AI agent workflows.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
              My engineering approach prioritizes clean architecture, data integrity, and end-to-end reliability across frontend, backend, data, and AI layers.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Code2 size={16} className="text-emerald-400" /> Languages
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-emerald-400" /> Frontend
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Server size={16} className="text-emerald-400" /> Backend
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['FastAPI', 'Flask', 'REST APIs', 'Microservices Architecture'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Workflow size={16} className="text-emerald-400" /> Data Engineering
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['Apache Airflow 3', 'Metabase', 'pgAdmin 4', 'Great Expectations', 'ETL Pipelines', 'Data Quality'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit size={16} className="text-emerald-400" /> AI Engineering
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['Azure OpenAI', 'OpenAI API', 'LangChain', 'RAG Systems', 'Intelligent Automation', 'Prompt Engineering'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <HardDrive size={16} className="text-emerald-400" /> Databases
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['PostgreSQL', 'MySQL', 'SQLite'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400" /> DevOps & Tools
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['Git', 'Docker', 'Vercel', 'Linux'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/5 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5">
            <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-400" /> Core Concepts & Architecture
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                'Full-Stack Architecture',
                'System Design',
                'REST APIs',
                'ETL & Data Pipelines',
                'RFM Feature Engineering',
                'Data Quality Checks',
                'Caching & Performance',
                'Agile Development',
                'Intelligent Automation'
              ].map(concept => (
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
