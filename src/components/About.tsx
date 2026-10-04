import { Code2, Database, Cpu, Server, ShieldCheck, Zap, Layers, BarChart2 } from 'lucide-react';

export default function About() {
  const skillCategories = [
    {
      label: 'Full-Stack & Frontend',
      icon: Code2,
      skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    },
    {
      label: 'Backend & APIs',
      icon: Server,
      skills: ['Python', 'FastAPI', 'Flask', 'Java', 'REST APIs', 'System Design'],
    },
    {
      label: 'Data Engineering',
      icon: Layers,
      skills: [
        'Apache Airflow 3',
        'Metabase',
        'pgAdmin 4',
        'Great Expectations',
        'ETL Pipelines',
        'Data Quality Gates',
        'SQL',
      ],
    },
    {
      label: 'Databases & Storage',
      icon: Database,
      skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'],
    },
    {
      label: 'AI & Machine Learning',
      icon: Cpu,
      skills: [
        'Azure OpenAI',
        'OpenAI API',
        'LangChain',
        'RAG Systems',
        'Prompt Engineering',
      ],
    },
    {
      label: 'DevOps & Infrastructure',
      icon: Zap,
      skills: ['Docker', 'Linux', 'Git', 'Vercel', 'CI/CD Pipelines', 'Async I/O'],
    },
  ];

  const architecturalPrinciples = [
    {
      title: 'Data Integrity by Design',
      desc: 'Enforcing deterministic validations, automated schema checks, and referential integrity to prevent silent data anomalies.',
      icon: ShieldCheck,
    },
    {
      title: 'Strict Type Safety & Contracts',
      desc: 'Building tight contracts between FastAPI REST endpoints and TypeScript React interfaces with comprehensive schema models.',
      icon: Code2,
    },
    {
      title: 'Idempotent Orchestration',
      desc: 'Designing DAGs and batch workers with safe retry patterns, atomic transactions, and zero duplicate states.',
      icon: Layers,
    },
    {
      title: 'Low Latency & Caching',
      desc: 'Optimizing database queries, using Redis for key-value deduplication, and sub-2s response times on AI workloads.',
      icon: BarChart2,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="pb-8 mb-12 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          Engineering Profile
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
          Background &amp; Technical Core
        </h2>
        <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
          Bridging mathematical rigor, statistical foundations, and real-world software engineering.
        </p>
      </div>

      <div className="space-y-10">
        {/* Bento Top Row: Summary & Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Summary Card */}
          <div className="lg:col-span-7 rounded-2xl bg-surface border border-border p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                Engineering Philosophy
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-fg mb-4 leading-snug">
                Building reliable software where backend resilience meets clean user experiences.
              </h3>
              <p className="text-sm sm:text-base text-fg-secondary leading-relaxed mb-4">
                I am a Full-Stack Software Engineer based in Cape Town, specializing in reliable server-side systems, RESTful API development, relational database modeling, automated data engineering pipelines, and modern web applications.
              </p>
              <p className="text-sm sm:text-base text-fg-secondary leading-relaxed">
                With academic grounding in Applied Statistics, I build end-to-end software systems with a disciplined focus on data integrity, deterministic processing, and clean architectural boundaries. I bridge complex backend logic and data workflows with intuitive, type-safe user interfaces, prioritizing code maintainability and defensive error handling over trendy abstractions.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs font-mono text-fg-subtle">
              <div>
                <span className="text-fg-subtle">Location:</span> <span className="text-fg font-medium">Cape Town, ZA</span>
              </div>
              <div>
                <span className="text-fg-subtle">Academic:</span> <span className="text-accent font-medium">BSc in Applied Statistics</span>
              </div>
              <div>
                <span className="text-fg-subtle">Focus:</span> <span className="text-fg font-medium">Full-Stack &amp; Data</span>
              </div>
            </div>
          </div>

          {/* Core Principles 2x2 Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {architecturalPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-surface border border-border p-5 flex flex-col justify-between hover:border-border-hover transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-accent mb-3 shadow-sm">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-fg mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-fg-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categorized Technical Arsenal Grid */}
        <div className="rounded-2xl bg-surface border border-border p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border gap-2">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                Technical Capabilities
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-fg">
                Stack &amp; Technologies by Domain
              </h3>
            </div>
            <div className="text-xs font-mono text-fg-subtle">
              Production Tested &amp; Actively Maintained
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.label}
                  className="p-5 rounded-xl bg-surface-raised border border-border space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                      <Icon size={14} />
                    </div>
                    <span className="font-mono text-xs text-fg font-bold tracking-wider">
                      {cat.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-surface border border-border text-fg-muted text-xs font-mono rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
