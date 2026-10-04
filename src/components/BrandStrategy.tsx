import SectionHeader from './SectionHeader';
import Card from './Card';
import { User, Target, Zap, Shield, MessageSquare } from 'lucide-react';

export default function BrandStrategy() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Personal Brand Strategy" 
        description="Positioning you as the bridge between raw data and business efficiency for SMBs."
        icon={User}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Brand Positioning">
          <p className="text-slate-300 leading-relaxed">
            You are a <strong className="text-emerald-400">Software Engineer</strong> focused on Python, SQL, orchestration, and data quality.
            Your Applied Statistics background helps you shape dependable pipelines and analysis-ready datasets.
          </p>
        </Card>
        
        <Card title="Unique Value Proposition (UVP)">
          <p className="text-slate-300 leading-relaxed">
            Combining a rigorous statistical background with modern software engineering to build reliable, data-driven automation systems that save businesses time and money.
          </p>
        </Card>
      </div>

      <Card title="Clear Niche & Differentiation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-mono text-slate-400 mb-2">TARGET AUDIENCE</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300"><Target size={16} className="text-emerald-500"/> Law Firms (Document heavy)</li>
              <li className="flex items-center gap-2 text-slate-300"><Target size={16} className="text-emerald-500"/> Hardware Stores (Inventory heavy)</li>
              <li className="flex items-center gap-2 text-slate-300"><Target size={16} className="text-emerald-500"/> Real Estate (Contract heavy)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-mono text-slate-400 mb-2">DIFFERENTIATION</h4>
            <p className="text-slate-300">
              Unlike typical web agencies that just build "brochure sites," you build <strong className="text-white">intelligent systems</strong>. Your statistics background means your AI implementations are grounded in real data science, not just API wrappers.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Professional Bios</h3>
        
        <Card>
          <h4 className="text-sm font-mono text-emerald-400 mb-2">SHORT (Twitter/LinkedIn Headline)</h4>
          <p className="text-lg text-white font-medium">Software Engineer | Data Engineering · Python · SQL</p>
        </Card>

        <Card>
          <h4 className="text-sm font-mono text-emerald-400 mb-2">MEDIUM (Conference Bio / About Section)</h4>
          <p className="text-slate-300 leading-relaxed">
            I am a Software Engineer with a background in Applied Statistics. I focus on building reliable data pipelines, validating and transforming data, and preparing useful datasets for analytics.
          </p>
        </Card>

        <Card>
          <h4 className="text-sm font-mono text-emerald-400 mb-2">LONG (Website About Page)</h4>
          <p className="text-slate-300 leading-relaxed space-y-4">
            <span>With a BSc in Applied Statistics, I approach data engineering with an emphasis on sound measurement, data quality, and clear analytical outcomes.</span>
            <br/><br/>
            <span>My focus is on building workflows that turn raw source data into dependable, analysis-ready datasets through orchestration, validation, and SQL transformations.</span>
            <br/><br/>
            <span>I also bring backend and application development experience to projects where it supports reliable data collection, delivery, and use.</span>
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border border-zinc-800">
          <Zap className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">Web Systems</h4>
          <p className="text-sm text-slate-400">Custom, high-performance web applications that serve as the operational hub for businesses.</p>
        </Card>
        <Card className="bg-zinc-900 border border-zinc-800">
          <Shield className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">Business Automation</h4>
          <p className="text-sm text-slate-400">Data engineering pipelines that connect disparate systems and eliminate manual data entry.</p>
        </Card>
        <Card className="bg-zinc-900 border border-zinc-800">
          <MessageSquare className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">AI Document Intel</h4>
          <p className="text-sm text-slate-400">RAG systems and LLM integrations that turn static documents into interactive knowledge bases.</p>
        </Card>
      </div>
    </div>
  );
}
