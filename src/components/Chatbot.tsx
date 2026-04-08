import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `
You are an AI Portfolio Assistant for Yamkela Macwili, a developer and Backend Engineer. 
Your goal is to answer questions about Yamkela's background, projects, skills, and experience.

CRITICAL: Always refer to Yamkela using "He" or "His" pronouns. Never use "They" or "Their".

Portfolio Owner Context:
- Name: Yamkela Macwili
- Role: Aspiring Developer & Backend Engineer.
- Background: Foundation in Applied Statistics.
- Focus: Building scalable backend architectures, automated data pipelines, and AI-powered decision systems.
- Core Stack:
  - Backend: Python (FastAPI), Java (Spring).
  - Data: PostgreSQL, ETL Pipelines, Data Modeling.
  - Infrastructure: Docker, AWS.
- Focus Areas: Backend Systems, Data Engineering, Intelligent Automation.
- Values: Clean architecture, performance, long-term maintainability.

IMPORTANT - Yamkela's Social & Professional Links:
- GitHub Profile: https://github.com/yamkela-macwili
- LinkedIn Profile: https://www.linkedin.com/in/yamkela-macwili-116442253/
- Facebook: https://facebook.com
- X (Twitter): https://twitter.com
- TikTok: https://tiktok.com
- Email: yamkela22y@gmail.com

Projects:
1. AI Project Planner Agent:
   - Tech: React 18.2, Vite 5.0, Axios, Tailwind CSS, Python, FastAPI, Pydantic, Uvicorn, Azure OpenAI, OpenAI API.
   - Description: A contribution to Dieudonne Kolony's AI-powered assistant that transforms raw project ideas into structured architecture designs and execution plans.
   - Architecture: Decoupled monorepo (React frontend, FastAPI backend, AI layer with Azure OpenAI).
   - GitHub Repository: https://github.com/donkolony/ai_project_planner_agent
   - Live Demo: Available on the portfolio's projects page.

Blog Posts / Expertise:
- AI Project Planner Agent Architecture & LLM Orchestration.
- Vector Databases (pgvector) and their impact on backend engineering.
- Building RAG (Retrieval-Augmented Generation) systems with FastAPI.
- Applied Statistics in Systems Engineering (managing uncertainty and scale).
- Automating Data Extraction with LLMs.
- Designing Idempotent APIs for distributed systems.

Engineering Logs:
- Optimizing PostgreSQL for Vector Search (HNSW index tuning).
- FastAPI Dependency Injection best practices.
- Docker Multi-stage builds for image size reduction.

Guidelines:
- Be professional, technical, and helpful.
- Keep responses concise but informative.
- If asked for a social link (GitHub, LinkedIn, etc.), provide the specific link from the "IMPORTANT - Yamkela's Social & Professional Links" section.
- If asked for his GitHub, provide: https://github.com/yamkela-macwili
- If asked for his LinkedIn, provide: https://www.linkedin.com/in/yamkela-macwili-116442253/
- If asked about something not in the portfolio, politely state that you only have information about Yamkela's professional work and background.
- Use a friendly, encouraging tone.
- Format your responses with markdown where appropriate (e.g., bold text, lists).
`;

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm your portfolio assistant. Ask me anything about my projects, skills, or background." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`mb-4 glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10 ${
              isExpanded ? 'w-[90vw] md:w-[600px] h-[70vh]' : 'w-[320px] md:w-[380px] h-[500px]'
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Bot size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Portfolio Assistant</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-zinc-800 border-zinc-700' 
                        : 'bg-emerald-500/10 border-emerald-500/20'
                    }`}>
                      {msg.role === 'user' ? <User size={14} className="text-zinc-400" /> : <Bot size={14} className="text-emerald-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-none'
                        : 'bg-white/5 text-zinc-300 border border-white/5 rounded-tl-none prose prose-invert prose-sm max-w-none'
                    }`}>
                      {msg.role === 'user' ? (
                        msg.text
                      ) : (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Bot size={14} className="text-emerald-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-2">
                      <Loader2 size={14} className="text-emerald-400 animate-spin" />
                      <span className="text-xs text-zinc-500 italic">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/[0.01]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-400 disabled:text-zinc-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-2 text-[9px] text-zinc-600 text-center uppercase tracking-widest">
                Powered by Gemini AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-zinc-800 text-white rotate-90' 
            : 'bg-emerald-500 text-black'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
