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
            You are not just a developer; you are an <strong className="text-emerald-400">Aspiring AI Systems Engineer</strong>. 
            You bridge the gap between complex data engineering and practical business operations for small and medium businesses.
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
          <p className="text-lg text-white font-medium">Aspiring AI Systems Engineer | Automating Document-Heavy Workflows for SMBs</p>
        </Card>

        <Card>
          <h4 className="text-sm font-mono text-emerald-400 mb-2">MEDIUM (Conference Bio / About Section)</h4>
          <p className="text-slate-300 leading-relaxed">
            I am an Aspiring AI Systems Engineer with a background in Applied Statistics. I specialize in building intelligent digital systems—from robust backends to AI-powered document retrieval (RAG)—that help small and medium businesses automate their most tedious workflows.
          </p>
        </Card>

        <Card>
          <h4 className="text-sm font-mono text-emerald-400 mb-2">LONG (Website About Page)</h4>
          <p className="text-slate-300 leading-relaxed space-y-4">
            <span>With a BSc in Applied Statistics and deep expertise in Python and Java, I approach software engineering through the lens of data. I don't just build websites; I build intelligent systems.</span>
            <br/><br/>
            <span>My focus is on helping small and medium businesses—like law firms and specialized retail—transform their operations. Whether it's a custom web platform, an automated data pipeline, or a sophisticated AI document retrieval system (RAG), my goal is to turn manual, document-heavy workflows into streamlined, automated processes.</span>
            <br/><br/>
            <span>I believe that enterprise-grade AI shouldn't be restricted to Fortune 500 companies. I bring robust backend engineering and data intelligence to the businesses that form the backbone of our economy.</span>
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#161920] to-slate-900">
          <Zap className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">Web Systems</h4>
          <p className="text-sm text-slate-400">Custom, high-performance web applications that serve as the operational hub for businesses.</p>
        </Card>
        <Card className="bg-gradient-to-br from-[#161920] to-slate-900">
          <Shield className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">Business Automation</h4>
          <p className="text-sm text-slate-400">Data engineering pipelines that connect disparate systems and eliminate manual data entry.</p>
        </Card>
        <Card className="bg-gradient-to-br from-[#161920] to-slate-900">
          <MessageSquare className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold mb-2">AI Document Intel</h4>
          <p className="text-sm text-slate-400">RAG systems and LLM integrations that turn static documents into interactive knowledge bases.</p>
        </Card>
      </div>
    </div>
  );
}
