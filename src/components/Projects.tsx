import { ArrowUpRight, ArrowRight, ExternalLink, Cpu, Activity, Database, GitBranch, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';

export default function Projects() {
  const { projects } = useProjects();
  const featuredProjects = projects.filter((p) => p.featured);

  // Helper to render clean solid visual previews for each project without mocked results
  const renderProjectVisual = (slug: string) => {
    switch (slug) {
      case 'job-intelligence-platform':
        return (
          <div className="w-full h-44 sm:h-48 bg-base rounded-xl border border-border p-5 flex flex-col justify-between group-hover:border-border-hover transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
                FastAPI · React · Azure OpenAI
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                Full-Stack Architecture
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2.5">
                  <Cpu size={16} className="text-accent" />
                  <div>
                    <div className="text-xs font-semibold text-fg">Semantic CV Match Engine</div>
                    <div className="text-[10px] font-mono text-fg-subtle">NLP Extraction &amp; Alignment Scoring</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-base border border-border text-[10px] font-mono text-accent">
                    Active Pipeline
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-surface border border-border text-[10px] font-mono text-fg-muted">
                  Roadmap Generator
                </span>
                <span className="px-2 py-1 rounded bg-surface border border-border text-[10px] font-mono text-fg-muted">
                  Skill Gap Extraction
                </span>
              </div>
            </div>
          </div>
        );

      case 'olist-customer-behavior-pipeline':
        return (
          <div className="w-full h-44 sm:h-48 bg-base rounded-xl border border-border p-5 flex flex-col justify-between group-hover:border-border-hover transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
                Airflow 3 · PostgreSQL · Metabase
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                Data Pipeline
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-surface border border-border">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-fg-secondary flex items-center gap-1.5">
                    <Activity size={13} className="text-accent" />
                    DAG: olist_rfm_pipeline
                  </span>
                  <span className="text-accent text-[10px] font-mono">Airflow Orchestrated</span>
                </div>
                <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-fg-subtle">
                  <span className="px-1.5 py-0.5 rounded bg-base border border-border text-fg-muted">Ingest</span>
                  <span>→</span>
                  <span className="px-1.5 py-0.5 rounded bg-base border border-accent/40 text-accent">Quality Gate</span>
                  <span>→</span>
                  <span className="px-1.5 py-0.5 rounded bg-base border border-border text-fg-muted">Transform</span>
                  <span>→</span>
                  <span className="px-1.5 py-0.5 rounded bg-base border border-border text-fg-muted">RFM Mart</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-project-planner-agent':
        return (
          <div className="w-full h-44 sm:h-48 bg-base rounded-xl border border-border p-5 flex flex-col justify-between group-hover:border-border-hover transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
                LangChain · FastAPI · OpenAI
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                AI Automation
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-fg">Autonomous Technical Scoping</span>
                <span className="text-[10px] font-mono text-accent">Agent Workflow</span>
              </div>
              <p className="text-[11px] text-fg-secondary line-clamp-2">
                Transforms unstructured concepts into system architecture blueprints, tech stacks, and step-by-step phases.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-44 sm:h-48 bg-base rounded-xl border border-border p-5 flex flex-col justify-between group-hover:border-border-hover transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
                Systems Architecture
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                Production
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-xs font-semibold text-fg mb-1">
                <span>Distributed Pipeline &amp; Cache</span>
                <span className="text-accent font-mono text-[10px]">Indexed Storage</span>
              </div>
              <p className="text-[11px] text-fg-secondary">
                High-throughput data ingestion with Redis key-value caching and PostgreSQL relational indexing.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-border gap-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
            Selected Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
            Engineering Projects &amp; Systems
          </h2>
          <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
            Production-grade full-stack web applications, automated data pipelines, and intelligent AI architectures.
          </p>
        </div>

        <Link
          to="/projects"
          className="px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-fg-muted hover:text-fg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          All Projects Catalog ({projects.length}) <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Solid Theme Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((p, i) => {
          const indexNum = String(i + 1).padStart(2, '0');

          return (
            <article
              key={p.slug}
              className="rounded-2xl bg-surface border border-border hover:border-border-hover p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                {/* Visual Preview Banner */}
                <div className="mb-6">
                  {renderProjectVisual(p.slug)}
                </div>

                {/* Metadata Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-fg-subtle font-bold">{indexNum}</span>
                    <span className="text-border">/</span>
                    <span className="text-accent font-semibold tracking-wider uppercase">
                      {p.category}
                    </span>
                  </div>
                  {p.projectType && (
                    <span className="font-mono text-xs text-fg-subtle">
                      {p.projectType}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-fg mb-2.5 group-hover:text-accent transition-colors">
                  <Link to={`/projects/${p.slug}`} className="inline-flex items-center gap-2">
                    {p.title}
                  </Link>
                </h3>

                <p className="text-sm text-fg-secondary leading-relaxed mb-5">
                  {p.desc}
                </p>

                {/* Architectural Highlights */}
                {p.architecture && (
                  <div className="mb-5 p-3.5 rounded-xl bg-base border border-border text-xs">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">
                      Architecture &amp; Pattern
                    </div>
                    <div className="text-fg-secondary leading-snug line-clamp-2">
                      {p.architecture}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Tech Stack Tags & Action Links */}
              <div className="pt-4 border-t border-border mt-2">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-base border border-border text-fg-muted text-xs font-mono rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 5 && (
                    <span className="px-2 py-1 text-xs font-mono text-fg-subtle">
                      +{p.tech.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 font-mono text-xs">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-fg hover:text-accent font-semibold transition-colors"
                  >
                    View Details <ArrowRight size={13} />
                  </Link>

                  <div className="flex items-center gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-subtle hover:text-fg transition-colors inline-flex items-center gap-1"
                        title="View Source on GitHub"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 font-semibold"
                        title="Open Live Application"
                      >
                        Live Demo <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
