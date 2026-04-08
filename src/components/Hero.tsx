import { motion, Variants } from 'motion/react';
import NetworkBackground from './NetworkBackground';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-20 overflow-hidden">
      <NetworkBackground />
      
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.04), transparent 40%)`
        }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="flex justify-center w-full mb-8">
          <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-300">Open to Work</span>
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <span>Location: <span className="text-zinc-300">Cape Town, South Africa</span></span>
          </div>
        </motion.div>

        <div className="mb-6 flex justify-center w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.1] max-w-5xl text-center">
            Yamkela Macwili
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Backend Engineer | AI & Automation
            </span>
          </h1>
        </div>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-4 text-center mx-auto"
        >
          “I design and build scalable backend systems, APIs, and intelligent automation tools that solve real-world problems.”
        </motion.p>

        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-base text-zinc-500 max-w-2xl font-mono leading-relaxed mb-12 text-center mx-auto"
        >
          I specialize in Python-based backend development, building AI-powered and data-driven applications.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <a href="#projects" className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-emerald-400 transition-colors">
            View Projects
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            Download CV
          </a>
        </motion.div>

        {/* Floating Metrics - Decorative */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="space-y-8"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl w-64">
                <div className="h-1 w-12 bg-emerald-500/30 rounded-full mb-4" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
