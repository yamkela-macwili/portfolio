import { motion } from 'motion/react';
import { Database, Server, BrainCircuit, LineChart, Code2, Layers, HardDrive, Terminal } from 'lucide-react';
import { FaPython, FaJava, FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiTypescript, SiR, SiFastapi, SiSpringboot, SiLangchain, SiPostgresql, SiMongodb, SiRedis, SiMysql, SiGithubactions } from 'react-icons/si';
import { TbSql, TbVector } from 'react-icons/tb';
import { useSkills } from '../hooks/useContent';

export default function About() {
  const { skills, loading } = useSkills();

  const iconMap: Record<string, any> = {
    python: FaPython,
    java: FaJava,
    react: FaReact,
    nodejs: FaNodeJs,
    docker: FaDocker,
    aws: FaAws,
    git: FaGitAlt,
    linux: FaLinux,
    typescript: SiTypescript,
    r: SiR,
    fastapi: SiFastapi,
    springboot: SiSpringboot,
    langchain: SiLangchain,
    postgresql: SiPostgresql,
    mongodb: SiMongodb,
    redis: SiRedis,
    mysql: SiMysql,
    githubactions: SiGithubactions,
    sql: TbSql,
    vector: TbVector,
  };

  const renderSkillIcon = (skillName: string, iconKey?: string) => {
    const Icon = iconMap[iconKey?.toLowerCase() || skillName.toLowerCase().replace(/\s+/g, '')];
    if (!Icon) return <Terminal size={24} />;
    return <Icon size={24} />;
  };

  const categories = ['Languages', 'Frameworks', 'Databases', 'Tools & Infra'] as const;

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
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-medium mb-8 leading-snug max-w-4xl">
            I build intelligent backend systems that turn raw data into structured, decision-ready insights.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
              As a <strong className="text-white font-normal">Software Developer and AI Systems Engineer</strong> with a foundation in <strong className="text-white font-normal">Applied Statistics</strong>, I focus on designing scalable APIs, data pipelines, and AI-powered applications that solve real-world problems.
            </p>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                My work sits at the intersection of backend engineering, data processing, and AI integration—building systems that automate workflows, generate insights, and scale reliably in production environments.
              </p>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <div className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2 font-mono">Fun Fact</div>
                <p className="text-sm text-zinc-400 font-light italic">
                  When I'm not debugging distributed systems, you'll likely find me analyzing sports statistics or exploring the latest in generative music models.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Core Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-3xl p-8 md:p-12 hover:bg-white/[0.05] transition-colors"
        >
          <div className="text-micro text-zinc-500 mb-8 tracking-widest uppercase">Core Stack</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <Server size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-medium mb-4 text-lg tracking-tight">Backend</h4>
              <div className="flex gap-4">
                <div title="Python" className="text-zinc-400 hover:text-emerald-400 transition-colors"><FaPython size={24} /></div>
                <div title="FastAPI" className="text-zinc-400 hover:text-emerald-400 transition-colors"><SiFastapi size={24} /></div>
                <div title="Java" className="text-zinc-400 hover:text-emerald-400 transition-colors"><FaJava size={24} /></div>
                <div title="Spring Boot" className="text-zinc-400 hover:text-emerald-400 transition-colors"><SiSpringboot size={24} /></div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <Database size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-medium mb-4 text-lg tracking-tight">Data & Infra</h4>
              <div className="flex gap-4">
                <div title="PostgreSQL" className="text-zinc-400 hover:text-emerald-400 transition-colors"><SiPostgresql size={24} /></div>
                <div title="Docker" className="text-zinc-400 hover:text-emerald-400 transition-colors"><FaDocker size={24} /></div>
                <div title="AWS" className="text-zinc-400 hover:text-emerald-400 transition-colors"><FaAws size={24} /></div>
                <div title="Git" className="text-zinc-400 hover:text-emerald-400 transition-colors"><FaGitAlt size={24} /></div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-medium mb-4 text-lg tracking-tight">AI & ML</h4>
              <div className="flex gap-4">
                <div title="LangChain" className="text-zinc-400 hover:text-emerald-400 transition-colors"><SiLangchain size={24} /></div>
                <div title="pgvector" className="text-zinc-400 hover:text-emerald-400 transition-colors"><TbVector size={24} /></div>
                <div title="RAG" className="text-zinc-400 hover:text-emerald-400 transition-colors"><Layers size={24} /></div>
              </div>
            </div>
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
          <div className="text-micro text-zinc-500 mb-8 tracking-widest uppercase">Skills & Tools</div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-4">
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl"></div>
                    <div className="w-12 h-12 bg-white/5 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map(category => {
                const categorySkills = skills.filter(s => s.category === category);
                const CategoryIcon = category === 'Languages' ? Code2 : 
                                   category === 'Frameworks' ? Layers :
                                   category === 'Databases' ? HardDrive : Terminal;

                return (
                  <div key={category}>
                    <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                      <CategoryIcon size={16} className="text-emerald-400" /> {category}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {categorySkills.length > 0 ? (
                        categorySkills.map(skill => (
                          <div 
                            key={skill.id} 
                            className="p-3 bg-white/5 text-zinc-300 rounded-xl border border-white/10 hover:bg-white/10 hover:text-emerald-400 transition-colors" 
                            title={skill.name}
                          >
                            {renderSkillIcon(skill.name, skill.icon)}
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-mono uppercase">No entries</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Philosophy / Approach */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="glass-panel rounded-3xl p-8 hover:bg-white/[0.05] transition-colors">
            <LineChart className="text-emerald-400 mb-4" size={24} />
            <h4 className="text-white font-medium mb-2">Statistical Rigor</h4>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Leveraging my background in Applied Statistics to manage uncertainty, optimize algorithms, and build robust data pipelines.
            </p>
          </div>
          <div className="glass-panel rounded-3xl p-8 hover:bg-white/[0.05] transition-colors">
            <Server className="text-emerald-400 mb-4" size={24} />
            <h4 className="text-white font-medium mb-2">Clean Architecture</h4>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Designing modular, idempotent APIs and maintainable systems that prioritize long-term performance and developer experience.
            </p>
          </div>
          <div className="glass-panel rounded-3xl p-8 hover:bg-white/[0.05] transition-colors">
            <BrainCircuit className="text-emerald-400 mb-4" size={24} />
            <h4 className="text-white font-medium mb-2">Intelligent Automation</h4>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating Large Language Models and vector search to automate complex data extraction and decision-making workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
