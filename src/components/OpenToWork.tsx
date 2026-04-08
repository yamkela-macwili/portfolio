import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

export default function OpenToWork() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-emerald-500/5 border border-emerald-500/10"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Briefcase size={40} className="text-emerald-400" />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              I’m currently looking for a Junior Backend Developer role.
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl">
              I’m eager to contribute to scalable systems, collaborate with experienced teams, and continue growing my skills in backend engineering and AI integration.
            </p>
          </div>
          
          <div className="shrink-0">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-emerald-500 text-black rounded-full font-medium text-sm hover:bg-emerald-400 transition-colors inline-block"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />
      </motion.div>
    </section>
  );
}
