import { useState } from 'react';
import { Terminal as TerminalIcon, Github, Linkedin, Facebook } from 'lucide-react';
import Terminal from './Terminal';

export default function Footer() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <footer className="py-12 px-6 max-w-5xl mx-auto border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-micro">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p>© {new Date().getFullYear()} Yamkela Macwili. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/yamkela-macwili" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/yamkela-macwili-116442253/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1-.22V4h3.3a4.8 4.8 0 0 0 4.13 2.69z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
        >
          <TerminalIcon size={12} className="group-hover:animate-pulse" />
          <span className="text-micro">System Access</span>
        </button>
      </footer>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  )
}
