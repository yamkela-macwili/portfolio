import { Code2, Database, Cpu, Server, Zap, Layers } from 'lucide-react';

export default function About() {
  const skillCategories = [
    {
      label: 'Data Engineering',
      icon: Layers,
      skills: ['Apache Airflow 3', 'Python', 'SQL', 'ETL Pipelines', 'Great Expectations', 'Data Quality', 'Metabase'],
    },
    {
      label: 'Databases & Storage',
      icon: Database,
      skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'],
    },
    {
      label: 'Backend & APIs',
      icon: Server,
      skills: ['FastAPI', 'Flask', 'Java', 'REST APIs', 'System Design'],
    },
    {
      label: 'Supporting Software',
      icon: Code2,
      skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
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
          Applying statistical foundations to build dependable data pipelines and useful analytical datasets.
        </p>
      </div>

      <div className="space-y-10">
        <div className="rounded-2xl bg-surface border border-border p-8">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            Profile
          </div>
          <p className="text-sm sm:text-base text-fg-secondary leading-relaxed mb-4">
            I am a Software Engineer based in Cape Town, focused on data engineering: Python and SQL pipelines, orchestration, data quality, and analytics-ready modeling. My Applied Statistics background helps me connect sound data processing with the questions teams need to answer.
          </p>
          <p className="text-sm sm:text-base text-fg-secondary leading-relaxed">
            I work across ingestion, validation, transformation, and reporting, with attention to reliable reruns, clear data models, and traceable quality checks. I also use backend and application development to support data products where they are needed.
          </p>

          <div className="pt-6 mt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs font-mono text-fg-subtle">
            <div>
              <span className="text-fg-subtle">Location:</span> <span className="text-fg font-medium">Cape Town, South Africa</span>
            </div>
            <div>
              <span className="text-fg-subtle">Academic:</span> <span className="text-accent font-medium">BSc in Applied Statistics</span>
            </div>
            <div>
              <span className="text-fg-subtle">Focus:</span> <span className="text-fg font-medium">Data Engineering</span>
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
