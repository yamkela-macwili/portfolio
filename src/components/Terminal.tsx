import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';

export default function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: 'Welcome to Yamkela Macwili\'s Portfolio CLI v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, content: cmd }];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({ 
          type: 'output', 
          content: `Available commands:
  whoami    - Display user profile
  stack     - List technical skills
  contact   - Show contact info
  clear     - Clear terminal
  exit      - Close terminal` 
        });
        break;
      case 'whoami':
        newHistory.push({ 
          type: 'output', 
          content: 'Yamkela Macwili\nBackend Engineer\nSpecializing in Backend Systems, Data Engineering, and AI.' 
        });
        break;
      case 'stack':
        newHistory.push({ 
          type: 'output', 
          content: `CORE STACK:
  Backend:        Python (FastAPI), Java (Spring)
  Data:           PostgreSQL, ETL Pipelines
  Infrastructure: Docker, AWS, Kubernetes
  Frontend:       React, TypeScript` 
        });
        break;
      case 'contact':
        newHistory.push({ 
          type: 'output', 
          content: 'Email: yamkela22y@gmail.com\nGitHub: github.com/yamkela-macwili\nLinkedIn: linkedin.com/in/yamkela-macwili-116442253' 
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        onClose();
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed z-50 bg-[#0c0c0c] border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col font-mono text-sm ${
            isMaximized 
              ? 'inset-4' 
              : 'bottom-4 right-4 w-[90vw] md:w-[600px] h-[400px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-2 text-zinc-400">
              <TerminalIcon size={14} />
              <span className="text-xs">yamkela@portfolio:~</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMaximized(!isMaximized)} 
                className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors"
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button 
                onClick={onClose} 
                className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div 
            className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className={`mb-2 ${entry.type === 'input' ? 'text-zinc-400' : 'text-emerald-400 whitespace-pre-wrap'}`}>
                {entry.type === 'input' ? (
                  <div className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>{entry.content}</span>
                  </div>
                ) : (
                  <div>{entry.content}</div>
                )}
              </div>
            ))}
            <div className="flex gap-2 text-zinc-100">
              <span className="text-emerald-500">➜</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0"
                autoFocus
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
