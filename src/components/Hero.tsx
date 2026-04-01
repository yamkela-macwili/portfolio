import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import NetworkBackground from './NetworkBackground';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fullText = "I specialize in backend architecture, data pipelines, and AI-driven applications built for scale.";
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const type = () => {
      let i = 0;
      setIsTypingComplete(false);
      setDisplayText("");

      interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
          timeout = setTimeout(type, 4000); // Pause for 4 seconds before restarting
        }
      }, 35);
    };

    const startTimeout = setTimeout(type, 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
      clearTimeout(timeout);
    };
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto pt-20 overflow-hidden">
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
              <span className="text-zinc-300">Available for work</span>
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <span>Location: <span className="text-zinc-300">Remote / Hybrid</span></span>
          </div>
        </motion.div>

        <div className="mb-8 flex justify-center w-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white leading-[1.05] max-w-5xl text-center">
            {"I build systems that turn raw data into".split(" ").map((word, i) => (
              <motion.span key={i} variants={itemVariants} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
            <br className="hidden md:block" />
            <motion.span variants={itemVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              intelligent decisions.
            </motion.span>
          </h1>
        </div>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-2xl font-mono leading-relaxed mb-12 text-center mx-auto min-h-[4rem]"
        >
          {displayText}
          <span className={`inline-block w-2 h-5 ml-1 bg-emerald-500 align-middle ${isTypingComplete ? 'animate-pulse' : 'opacity-100'}`} />
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <Link to="/projects" className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-emerald-400 transition-colors">
            See my work
          </Link>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            Download Resume
          </a>
          <a href="#contact" className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-full font-medium text-sm hover:text-white hover:bg-zinc-800 transition-colors">
            Get in touch
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
