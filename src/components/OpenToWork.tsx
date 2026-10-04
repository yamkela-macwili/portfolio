import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OpenToWork() {
  return (
    <section className="py-12 sm:py-16 px-6 max-w-6xl mx-auto">
      <div className="rounded-2xl bg-surface border border-border p-8 sm:p-12 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
              Availability Status
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fg tracking-tight mb-3">
              Open to Software Engineering Roles
            </h2>

            <p className="text-sm sm:text-base text-fg-secondary leading-relaxed mb-4">
              Seeking software engineering opportunities focused on data pipelines, automated quality checks, SQL modeling, and analytics-ready datasets. Available for remote and hybrid positions worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-fg-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-accent" /> Remote or Hybrid
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-accent" /> Full-time / Contract
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-accent" /> Cape Town, ZA (UTC+2)
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <a
              href="#contact"
              className="w-full lg:w-auto px-7 py-4 bg-fg text-dark hover:bg-accent hover:text-on-accent transition-colors rounded-xl font-mono text-xs font-bold inline-flex items-center justify-center gap-2 active:scale-95"
            >
              Initiate Contact <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
