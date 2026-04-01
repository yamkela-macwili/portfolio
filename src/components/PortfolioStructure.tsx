import SectionHeader from './SectionHeader';
import Card from './Card';
import { Layout, Globe, MousePointerClick, Smartphone } from 'lucide-react';

export default function PortfolioStructure() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Portfolio Website Structure" 
        description="A modern, high-conversion architecture designed to build trust and capture leads."
        icon={Layout}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Page Architecture">
            <div className="space-y-4">
              {[
                { name: 'Hero Section', desc: 'Clear headline, subheadline, and primary CTA ("Book a Systems Audit"). Dynamic tech background.' },
                { name: 'Social Proof', desc: 'Logos of industries served or placeholder metrics ("100+ hours saved per week").' },
                { name: 'Services (The "How")', desc: 'Three pillars: Web Systems, Automation, AI Integration. Focus on business outcomes.' },
                { name: 'Projects / Case Studies', desc: 'Problem -> Solution -> Architecture -> Results format. Show system diagrams.' },
                { name: 'About (The "Who")', desc: 'Your stats background, tech stack, and mission.' },
                { name: 'Tech Stack', desc: 'Visual grid of Python, Java, FastAPI, React, PostgreSQL, Docker, AWS.' },
                { name: 'Blog / Insights', desc: 'Thought leadership on AI in SMBs. E.g., "Why Law Firms Need RAG".' },
                { name: 'Final CTA', desc: 'Contact form with specific qualifying questions (Industry, Current Bottleneck).' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-mono text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="UX Principles">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Smartphone className="text-emerald-400 shrink-0" size={20} />
                <span className="text-sm text-slate-300"><strong>Mobile-First:</strong> Business owners browse on phones.</span>
              </li>
              <li className="flex gap-3">
                <MousePointerClick className="text-emerald-400 shrink-0" size={20} />
                <span className="text-sm text-slate-300"><strong>Outcome-Focused:</strong> Sell the hole, not the drill. Talk about "Time Saved" not "Python Scripts".</span>
              </li>
              <li className="flex gap-3">
                <Layout className="text-emerald-400 shrink-0" size={20} />
                <span className="text-sm text-slate-300"><strong>Dark/Tech Aesthetic:</strong> Use deep blues/blacks with neon accents to signal "advanced technology".</span>
              </li>
            </ul>
          </Card>

          <Card title="Suggested Domains">
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 font-mono text-sm text-white flex justify-between items-center">
                [name]systems.com <Globe size={14} className="text-slate-500"/>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 font-mono text-sm text-white flex justify-between items-center">
                [name]ai.dev <Globe size={14} className="text-slate-500"/>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 font-mono text-sm text-white flex justify-between items-center">
                [name]data.io <Globe size={14} className="text-slate-500"/>
              </div>
            </div>
          </Card>
          
          <Card title="Case Study Template">
            <div className="text-sm space-y-2 text-slate-300">
              <p><strong className="text-emerald-400">1. The Client:</strong> Mid-sized Law Firm</p>
              <p><strong className="text-emerald-400">2. The Problem:</strong> Spending 20 hrs/wk searching old case files.</p>
              <p><strong className="text-emerald-400">3. The Solution:</strong> Custom RAG system.</p>
              <p><strong className="text-emerald-400">4. Architecture:</strong> FastAPI + pgvector + React.</p>
              <p><strong className="text-emerald-400">5. The Result:</strong> Search time reduced to seconds.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
