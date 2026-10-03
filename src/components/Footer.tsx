import { useState } from 'react';
import { Terminal as TerminalIcon, Github, Linkedin, Mail } from 'lucide-react';
import Terminal from './Terminal';

export default function Footer() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <footer className="py-10 px-6 max-w-6xl mx-auto border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-fg-subtle">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-fg-secondary">© {new Date().getFullYear()} Yamkela Macwili</p>
          <span className="text-border-hover">•</span>
          <span className="text-accent font-semibold">Full-Stack Software Engineer</span>
          <span className="text-border-hover">•</span>
          <span className="text-fg-subtle">Cape Town, ZA</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/yamkela-macwili" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-lg bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover transition-colors" 
            aria-label="GitHub"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a 
            href="https://www.linkedin.com/in/yamkela-macwili-116442253/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-lg bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover transition-colors" 
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a 
            href="mailto:yamkela22y@gmail.com" 
            className="p-2 rounded-lg bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover transition-colors" 
            aria-label="Email"
            title="Email"
          >
            <Mail size={16} />
          </a>
          <span className="text-border">|</span>
          <button 
            onClick={() => setIsTerminalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-fg-muted hover:text-accent hover:border-accent transition-colors group cursor-pointer font-medium"
            title="Open CLI"
          >
            <TerminalIcon size={14} className="text-accent" />
            <span>cli</span>
          </button>
        </div>
      </footer>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
}
