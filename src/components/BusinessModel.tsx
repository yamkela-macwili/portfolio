import SectionHeader from './SectionHeader';
import Card from './Card';
import { Briefcase, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function BusinessModel() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Business Model Strategy" 
        description="Scaling from freelance projects to recurring SaaS revenue."
        icon={Briefcase}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg"><DollarSign className="text-blue-400" size={20}/></div>
            <h3 className="font-bold text-white">Tier 1: Web Dev</h3>
          </div>
          <p className="text-2xl font-mono text-white mb-2">R50k - R150k <span className="text-sm text-slate-500 font-sans">/ project</span></p>
          <p className="text-sm text-slate-400 mb-4">Custom websites with basic integrations (booking, CMS) for local businesses.</p>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Fast turnaround (2-4 weeks)</li>
            <li>• Builds initial trust</li>
            <li>• Foot-in-the-door strategy</li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg"><TrendingUp className="text-purple-400" size={20}/></div>
            <h3 className="font-bold text-white">Tier 2: Automation</h3>
          </div>
          <p className="text-2xl font-mono text-white mb-2">R20k - R50k <span className="text-sm text-slate-500 font-sans">/ month</span></p>
          <p className="text-sm text-slate-400 mb-4">Retainer for maintaining data pipelines, scraping, and workflow automations.</p>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Recurring revenue</li>
            <li>• High margin once built</li>
            <li>• Deepens client dependency</li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-emerald-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Users className="text-emerald-400" size={20}/></div>
            <h3 className="font-bold text-white">Tier 3: AI SaaS</h3>
          </div>
          <p className="text-2xl font-mono text-white mb-2">R10k - R40k <span className="text-sm text-slate-500 font-sans">/ mo / client</span></p>
          <p className="text-sm text-slate-400 mb-4">White-labeled or multi-tenant RAG systems for document intelligence.</p>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Highly scalable</li>
            <li>• Productized service</li>
            <li>• High barrier to entry</li>
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Client Acquisition Strategy">
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-1">1. The "Audit" Hook</h4>
              <p className="text-sm text-slate-300">Offer a free "Workflow & Data Audit" instead of a "Free Consultation". Deliver a 2-page PDF showing exactly how many hours they lose to manual data entry.</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-1">2. Strategic Partnerships</h4>
              <p className="text-sm text-slate-300">Partner with local IT Managed Service Providers (MSPs). They handle hardware/networking; you handle software/AI. Give them a 15% referral fee.</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-1">3. Cold Email (Niche Specific)</h4>
              <p className="text-sm text-slate-300">Targeting Law Firms: "Hi [Name], I build AI systems that search 10,000 pages of case files in 3 seconds. Are you open to a 10-min demo?"</p>
            </div>
          </div>
        </Card>

        <Card title="Scaling Path (Freelance to SaaS)">
          <div className="relative pl-6 border-l-2 border-slate-700 space-y-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-700 border-2 border-[#161920]"></div>
              <h4 className="text-white font-medium">Stage 1: Custom Agency</h4>
              <p className="text-sm text-slate-400">Build bespoke solutions for first 3-5 clients. Learn their exact pain points. Charge high project fees.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#161920]"></div>
              <h4 className="text-white font-medium">Stage 2: Productized Service</h4>
              <p className="text-sm text-slate-400">Standardize the tech stack (FastAPI + React + pgvector). Sell the exact same architecture to multiple clients with slight UI tweaks.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-700 border-2 border-[#161920]"></div>
              <h4 className="text-white font-medium">Stage 3: True SaaS</h4>
              <p className="text-sm text-slate-400">Build a multi-tenant platform where clients can sign up, upload their own documents, and use the AI without your manual intervention.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
