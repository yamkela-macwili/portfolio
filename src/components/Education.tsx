import { motion } from 'motion/react';
import { GraduationCap, Calendar, Terminal, BookOpen, Award, ExternalLink } from 'lucide-react';
import { useEducation, useCertifications } from '../hooks/useContent';

export default function Education() {
  const { education, loading: eduLoading } = useEducation();
  const { certifications, loading: certLoading } = useCertifications();

  const getIcon = (iconName: string | undefined) => {
    switch (iconName?.toLowerCase()) {
      case 'terminal': return Terminal;
      case 'bookopen': return BookOpen;
      default: return GraduationCap;
    }
  };

  if (eduLoading || certLoading) {
    return (
      <section id="education" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-white/5 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-white/5 rounded-3xl"></div>
              <div className="h-40 bg-white/5 rounded-3xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-24 bg-white/5 rounded-2xl"></div>
              <div className="h-24 bg-white/5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-16"
      >
        Education & Certs
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="text-micro text-zinc-500 mb-8 tracking-widest uppercase">Academic Path</div>
          {education.length > 0 ? (
            education.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-panel rounded-3xl p-8 md:p-10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <GraduationCap size={16} />
                            <span className="text-sm font-medium">{item.institution}</span>
                          </div>
                          <h3 className="text-xl font-medium text-white">{item.degree}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider shrink-0">
                          <Calendar size={14} />
                          {item.period}
                        </div>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-12 text-center glass-panel rounded-3xl border-dashed border-white/10">
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No education entries found</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="text-micro text-zinc-500 mb-8 tracking-widest uppercase">Certifications</div>
          <div className="space-y-4">
            {certifications.length > 0 ? (
              certifications.map((cert, i) => (
                <motion.div
                  key={cert.id || i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-panel rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:border-emerald-500/30 transition-colors">
                      <Award size={20} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1 leading-tight">{cert.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <span>{cert.date}</span>
                      </div>
                      {cert.link && cert.link !== '#' && (
                        <a 
                          href={cert.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-emerald-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Verify <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center glass-panel rounded-2xl border-dashed border-white/10">
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">No certifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
