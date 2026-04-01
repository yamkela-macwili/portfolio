import SectionHeader from './SectionHeader';
import Card from './Card';
import { Target, CheckCircle2 } from 'lucide-react';

export default function ExecutionPlan() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Execution Plan" 
        description="Realistic, actionable steps optimized for someone working or studying full-time."
        icon={Target}
      />

      <div className="space-y-6">
        <Card className="border-l-4 border-l-blue-500">
          <h3 className="text-xl font-bold text-white mb-4">First 30 Days: The Foundation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-mono text-slate-400 mb-3">WEEK 1-2: BRAND & WEB</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Buy domain (e.g., yournamesystems.com).</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Build V1 of portfolio using React/Tailwind.</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Update LinkedIn headline to "AI Systems Engineer".</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono text-slate-400 mb-3">WEEK 3-4: FIRST PROJECT</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Build Project #1 (Invoice Extractor).</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Document the process on GitHub.</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Add project to portfolio with a mini case study.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <h3 className="text-xl font-bold text-white mb-4">First 90 Days: Authority & Outreach</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-mono text-slate-400 mb-3">MONTH 2: BACKEND MASTERY</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Deep dive into FastAPI and PostgreSQL.</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Build Project #3 (SMB Booking API).</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Write 2 blog posts on portfolio about data automation.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono text-slate-400 mb-3">MONTH 3: OUTREACH</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Identify 50 local SMBs (Law firms, Hardware stores).</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Send cold emails offering a "Free Systems Audit".</li>
                <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Goal: Land 1 small web or automation project.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <h3 className="text-xl font-bold text-white mb-4">First 6 Months: The AI Transition</h3>
          <div className="space-y-4">
            <p className="text-slate-300">By month 6, you should have 1-2 freelance clients under your belt and a solid grasp of backend engineering. Now, pivot hard into AI.</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Learn Vector Databases (pgvector) and Embeddings.</li>
              <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Build Project #5 (Legal Contract Summarizer).</li>
              <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Start pitching AI solutions to your existing web/automation clients.</li>
              <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Begin architecture planning for the Capstone RAG system.</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
