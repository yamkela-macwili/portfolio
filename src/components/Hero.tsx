import { ArrowRight, ArrowDownRight, ExternalLink, Terminal, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const primaryStack = [
    { name: 'Python', role: 'Backend & Data' },
    { name: 'FastAPI', role: 'REST APIs' },
    { name: 'Java', role: 'Systems' },
    { name: 'React', role: 'Frontend' },
    { name: 'TypeScript', role: 'Type Safety' },
    { name: 'PostgreSQL', role: 'Relational DB' },
    { name: 'Apache Airflow 3', role: 'Orchestration' },
    { name: 'Metabase', role: 'BI & Analytics' },
    { name: 'Docker', role: 'Containers' },
    { name: 'Azure OpenAI', role: 'LLM Systems' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Core Positioning & Headings */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtitle / Role Tagline */}
          <div className="font-mono text-xs uppercase tracking-widest text-accent-light font-semibold mb-3">
            Full-Stack Software Engineer &amp; Data Architect · Cape Town, ZA
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-bold tracking-tight text-fg leading-[1.08] mb-6">
            Yamkela Macwili
          </h1>

          {/* Subheading / Narrative */}
          <p className="text-base sm:text-lg text-fg-secondary font-normal max-w-2xl leading-relaxed mb-8">
            I engineer resilient web applications, distributed backend services, and automated data pipelines. Backed by academic training in <span className="text-fg font-medium">Applied Statistics</span> with rigorous production focus on data integrity, determinism, and high-performance user interfaces.
          </p>

          {/* Dual Action CTA Buttons & Quick Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3.5 bg-fg text-dark hover:bg-accent hover:text-on-accent transition-colors duration-200 rounded-xl text-xs font-mono font-bold inline-flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              Explore Projects <ArrowDownRight size={16} />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-5 py-3.5 bg-surface border border-border text-fg hover:border-accent hover:text-accent transition-colors duration-200 rounded-xl text-xs font-mono font-semibold inline-flex items-center justify-center gap-2 active:scale-95"
            >
              Get in Touch <ArrowRight size={15} />
            </a>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <a
                href="https://github.com/yamkela-macwili"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover rounded-xl text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                title="GitHub Profile"
              >
                GitHub <ExternalLink size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/yamkela-macwili-116442253/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover rounded-xl text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                title="LinkedIn Profile"
              >
                LinkedIn <ExternalLink size={12} />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover rounded-xl text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                title="Resume PDF"
              >
                Resume <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Tech Showcase Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-surface border border-border p-6 shadow-xl">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-border-hover inline-block" />
                <span className="w-3 h-3 rounded-full bg-border-hover inline-block" />
                <span className="w-3 h-3 rounded-full bg-border-hover inline-block" />
              </div>
              <div className="font-mono text-[11px] text-fg-subtle flex items-center gap-1.5">
                <Terminal size={12} className="text-accent" />
                yamkela.dev ~ arch_spec
              </div>
              <div className="w-8" />
            </div>

            {/* Profile Identity Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-raised border border-border mb-5">
              <div className="w-12 h-12 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-fg font-mono font-bold text-lg shrink-0">
                YM
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-fg">
                  Yamkela Macwili
                </div>
                <div className="text-xs text-fg-secondary truncate">
                  Full-Stack &amp; Backend Systems Engineer
                </div>
                <div className="text-[11px] font-mono text-fg-subtle">
                  BSc in Applied Statistics (2019 - 2022)
                </div>
              </div>
            </div>

            {/* Solid Code Preview Block */}
            <div className="rounded-xl bg-base border border-border p-4 font-mono text-xs text-fg-secondary leading-relaxed mb-5 overflow-x-auto">
              <div className="text-fg-subtle mb-2"># System Architecture Spec</div>
              <div><span className="text-accent font-semibold">class</span> <span className="text-fg font-semibold">Engineer</span>:</div>
              <div className="pl-4 text-fg-muted">
                name = <span className="text-fg">"Yamkela Macwili"</span><br />
                location = <span className="text-fg">"Cape Town, ZA"</span><br />
                domains = [<span className="text-accent">"Full-Stack"</span>, <span className="text-accent">"ETL Pipelines"</span>, <span className="text-accent">"AI"</span>]<br />
                stack = [<span className="text-accent">"Python"</span>, <span className="text-accent">"FastAPI"</span>, <span className="text-accent">"React"</span>, <span className="text-accent">"PostgreSQL"</span>]<br />
                status = <span className="text-accent font-semibold">"Ready for impact"</span>
              </div>
            </div>

            {/* Core Competencies Quick Grid */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle font-semibold mb-2">
                Key Engineering Highlights
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-fg-secondary truncate">RESTful APIs</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-fg-secondary truncate">Airflow 3 DAGs</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-fg-secondary truncate">SQL Transformations</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-fg-secondary truncate">Azure OpenAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Tech Stack Showcase Strip */}
      <div className="mt-16 sm:mt-20 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-fg-subtle font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Core Technologies &amp; Production Stack
          </div>
          <span className="text-xs font-mono text-fg-subtle">
            Full-Stack · Data Engineering · Distributed Backends
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {primaryStack.map((tech) => (
            <div
              key={tech.name}
              className="px-3.5 py-1.5 bg-surface border border-border hover:border-accent rounded-lg transition-colors group flex items-center gap-2"
            >
              <span className="font-mono text-xs font-medium text-fg group-hover:text-accent transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-fg-subtle uppercase">
                / {tech.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
