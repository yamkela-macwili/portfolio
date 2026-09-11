import SectionHeader from './SectionHeader';
import Card from './Card';
import { Server, Database, FileText, Cpu, Lock, Cloud } from 'lucide-react';

export default function TechArchitecture() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Law Firm RAG Architecture" 
        description="Production-ready architecture for secure, scalable document intelligence."
        icon={Server}
      />

      <Card className="overflow-x-auto">
        <div className="min-w-[800px] p-6 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center gap-6">
          {/* Diagram representation */}
          <div className="flex w-full justify-between items-center gap-4">
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-xl flex items-center justify-center text-blue-400"><FileText /></div>
              <span className="text-xs font-mono text-center">1. PDF Upload<br/>(React UI)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-xl flex items-center justify-center text-emerald-400"><Server /></div>
              <span className="text-xs font-mono text-center">2. API Gateway<br/>(FastAPI/Spring)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500 rounded-xl flex items-center justify-center text-purple-400"><Cpu /></div>
              <span className="text-xs font-mono text-center">3. Processing<br/>(Chunk & Embed)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-orange-500/20 border border-orange-500 rounded-xl flex items-center justify-center text-orange-400"><Database /></div>
              <span className="text-xs font-mono text-center">4. Vector Store<br/>(pgvector)</span>
            </div>
          </div>
          
          <div className="w-full h-[2px] bg-slate-800 my-4 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-4 text-xs font-mono text-slate-500">RETRIEVAL FLOW</div>
          </div>

          <div className="flex w-full justify-between items-center gap-4">
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-xl flex items-center justify-center text-blue-400"><FileText /></div>
              <span className="text-xs font-mono text-center">User Query<br/>(React UI)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-orange-500/20 border border-orange-500 rounded-xl flex items-center justify-center text-orange-400"><Database /></div>
              <span className="text-xs font-mono text-center">Similarity Search<br/>(pgvector)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500 rounded-xl flex items-center justify-center text-yellow-400"><Cpu /></div>
              <span className="text-xs font-mono text-center">LLM Generation<br/>(GPT-4o/Claude)</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div></div>
            
            <div className="flex flex-col items-center gap-2 w-40">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-xl flex items-center justify-center text-emerald-400"><FileText /></div>
              <span className="text-xs font-mono text-center">Answer + Citations<br/>(JSON Response)</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Tech Stack Recommendations">
          <ul className="space-y-4">
            <li>
              <strong className="text-white block mb-1">Backend: FastAPI (Python)</strong>
              <span className="text-sm text-slate-400">Best for AI/Data integration. Asynchronous, fast, and native to ML libraries. (Use Java/Spring Boot for enterprise core services if needed).</span>
            </li>
            <li>
              <strong className="text-white block mb-1">Database: PostgreSQL + pgvector</strong>
              <span className="text-sm text-slate-400">Keeps relational data (users, document metadata) and vector embeddings in one robust database.</span>
            </li>
            <li>
              <strong className="text-white block mb-1">Embeddings & LLM</strong>
              <span className="text-sm text-slate-400">OpenAI `text-embedding-3-small` for embeddings. GPT-4o or Claude 3.5 Sonnet for generation.</span>
            </li>
            <li>
              <strong className="text-white block mb-1">Frontend</strong>
              <span className="text-sm text-slate-400">React (Vite) or Next.js with Tailwind CSS.</span>
            </li>
          </ul>
        </Card>

        <div className="space-y-6">
          <Card title="Deployment & Cloud">
            <div className="flex items-start gap-4 mb-4">
              <Cloud className="text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white block">AWS (Recommended)</strong>
                <p className="text-sm text-slate-400">Deploy backend via ECS (Fargate) using Docker. Host PostgreSQL on RDS. Store raw PDFs in S3.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Database className="text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white block">Docker</strong>
                <p className="text-sm text-slate-400">Containerize everything. `docker-compose` for local dev, separate images for frontend, backend, and workers.</p>
              </div>
            </div>
          </Card>

          <Card title="Security & Privacy (Legal)">
            <div className="flex items-start gap-4">
              <Lock className="text-red-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-sm text-slate-300"><strong className="text-white">Zero Data Retention:</strong> Ensure LLM provider APIs are set to NOT train on user data (OpenAI API defaults to this).</p>
                <p className="text-sm text-slate-300"><strong className="text-white">Tenant Isolation:</strong> Row-level security (RLS) in Postgres to ensure Firm A cannot query Firm B's vectors.</p>
                <p className="text-sm text-slate-300"><strong className="text-white">Encryption:</strong> TLS for transit, AES-256 for S3 at rest.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
