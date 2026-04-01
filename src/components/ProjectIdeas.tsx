import SectionHeader from './SectionHeader';
import Card from './Card';
import { Lightbulb } from 'lucide-react';

export default function ProjectIdeas() {
  const projects = [
    {
      title: "1. Automated Invoice Extractor",
      tech: "Python, Regex, Pandas",
      desc: "A script that monitors an email inbox, downloads PDF invoices, extracts key data (Date, Amount, Vendor), and exports to CSV.",
      level: "Beginner"
    },
    {
      title: "2. Hardware Store Inventory Scraper",
      tech: "Python, BeautifulSoup, SQLite",
      desc: "Scrape supplier websites daily to check for price changes or out-of-stock items, alerting the store owner via email.",
      level: "Beginner"
    },
    {
      title: "3. SMB Booking API",
      tech: "FastAPI, PostgreSQL",
      desc: "A robust REST API for a service business to manage appointments, staff schedules, and customer records.",
      level: "Intermediate"
    },
    {
      title: "4. Data Pipeline for Sales Analytics",
      tech: "Python, Airflow/Cron, SQL",
      desc: "ETL pipeline that pulls data from Shopify/Stripe APIs, cleans it, and loads it into a database for a dashboard.",
      level: "Intermediate"
    },
    {
      title: "5. Legal Contract Summarizer",
      tech: "FastAPI, OpenAI API, React",
      desc: "Upload a long PDF contract, extract text, send to LLM with a specific prompt to highlight risks and obligations.",
      level: "Intermediate"
    },
    {
      title: "6. Internal KB Search Engine",
      tech: "Python, pgvector, SentenceTransformers",
      desc: "A semantic search engine for company wiki pages. Uses local embeddings to find relevant documents based on meaning, not just keywords.",
      level: "Advanced"
    },
    {
      title: "7. Automated Email Triage System",
      tech: "Java/Spring Boot, LLM API",
      desc: "Enterprise backend that reads incoming support emails, categorizes them using an LLM, and routes them to the correct department.",
      level: "Advanced"
    },
    {
      title: "8. Document Comparison Tool",
      tech: "React, FastAPI, Diff Algorithms",
      desc: "Upload two versions of a legal document. The system highlights semantic changes (not just formatting) using AI.",
      level: "Advanced"
    },
    {
      title: "9. Multi-tenant Client Portal",
      tech: "React, FastAPI, JWT, Docker",
      desc: "A secure portal where different businesses can log in, see only their data, and run automated reports. Focus on RBAC and security.",
      level: "Expert"
    },
    {
      title: "10. Full Law Firm RAG System (Capstone)",
      tech: "Full Stack + Vector DB + LLM + AWS",
      desc: "The ultimate portfolio piece. Secure PDF upload, chunking, vector storage, conversational UI with citations, deployed on cloud infrastructure.",
      level: "Expert"
    }
  ];

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="10 Authority-Building Projects" 
        description="Escalating in complexity, combining backend engineering, data, and AI."
        icon={Lightbulb}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <Card key={i} className="flex flex-col h-full hover:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-white text-lg">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                project.level === 'Beginner' ? 'bg-blue-500/20 text-blue-400' :
                project.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                project.level === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {project.level}
              </span>
            </div>
            <p className="text-xs font-mono text-emerald-400 mb-3">{project.tech}</p>
            <p className="text-sm text-slate-400 flex-1">{project.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
