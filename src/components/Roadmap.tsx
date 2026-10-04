import SectionHeader from './SectionHeader';
import Card from './Card';
import { Map } from 'lucide-react';

export default function Roadmap() {
  const phases = [
    {
      title: "Phase 1: Foundations (Months 1-6)",
      focus: "Data Engineering Foundations",
      skills: ["Python", "SQL", "Data Modeling", "Pipeline Design", "Data Quality"],
      projects: ["Olist Customer Behavior Pipeline", "Data Quality Workflow"],
      tools: ["Apache Airflow", "PostgreSQL", "Great Expectations"],
      milestone: "Build and document dependable, analytics-ready data workflows."
    },
    {
      title: "Phase 2: Data & Automation (Months 7-12)",
      focus: "Orchestration & Infrastructure",
      skills: ["Workflow Orchestration", "Data Quality", "SQL Modeling", "Pipeline Monitoring"],
      projects: ["Automated Ingestion Pipeline", "Analytics Data Mart"],
      tools: ["Apache Airflow", "Docker", "GitHub Actions"],
      milestone: "Extend pipeline projects with monitoring, documentation, and safe reruns."
    },
    {
      title: "Phase 3: AI Systems & RAG (Months 13-18)",
      focus: "Intelligent Document Processing",
      skills: ["LLM Integration", "Vector Math", "Prompt Engineering"],
      projects: ["Legal Contract Summarizer", "Internal KB Search Engine"],
      tools: ["OpenAI API", "pgvector", "LangChain / LlamaIndex"],
      milestone: "Deploy first production RAG system for a client."
    },
    {
      title: "Phase 4: SaaS Productization (Months 19-24)",
      focus: "Scale & Multi-tenancy",
      skills: ["Cloud Architecture", "Auth/Security", "Payment Integration"],
      projects: ["Multi-tenant Client Portal", "Full Law Firm RAG SaaS"],
      tools: ["AWS (ECS/RDS)", "Stripe", "Auth0 / JWT"],
      milestone: "Reach R100k/mo in recurring SaaS/Retainer revenue."
    }
  ];

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="24-Month Technical Roadmap" 
        description="A structured path from foundational engineering to SaaS productization."
        icon={Map}
      />

      <div className="space-y-6">
        {phases.map((phase, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                <p className="text-emerald-400 font-mono text-sm mt-1 mb-4">{phase.focus}</p>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Revenue Milestone</p>
                  <p className="text-sm text-white font-medium">{phase.milestone}</p>
                </div>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-800 pb-1">Skills</h4>
                  <ul className="space-y-1">
                    {phase.skills.map((skill, i) => (
                      <li key={i} className="text-sm text-slate-400">• {skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-800 pb-1">Tools</h4>
                  <ul className="space-y-1">
                    {phase.tools.map((tool, i) => (
                      <li key={i} className="text-sm text-slate-400">• {tool}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-800 pb-1">Projects</h4>
                  <ul className="space-y-1">
                    {phase.projects.map((proj, i) => (
                      <li key={i} className="text-sm text-slate-400">• {proj}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
