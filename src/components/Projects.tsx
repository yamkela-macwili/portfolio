import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';

export default function Projects() {
  const { projects } = useProjects();
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aIsDataEngineering = a.category.toLowerCase().includes('data engineering');
      const bIsDataEngineering = b.category.toLowerCase().includes('data engineering');
      return Number(bIsDataEngineering) - Number(aIsDataEngineering);
    });

  return (
    <section id="projects" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-border gap-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
            Selected Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
            Data Engineering &amp; Software Projects
          </h2>
          <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
            Data pipelines and supporting software built for reliable ingestion, transformation, and analysis.
          </p>
        </div>

        <Link
          to="/projects"
          className="px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-fg-muted hover:text-fg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          All Projects Catalog ({projects.length}) <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Featured project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((p, i) => {
          const indexNum = String(i + 1).padStart(2, '0');
          const hasGithub = Boolean(p.github && p.github !== '#');
          const hasDemo = Boolean(p.link && p.link !== '#');

          return (
            <article
              key={p.slug}
              className="rounded-2xl bg-surface border border-border hover:border-border-hover p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                {/* Minimal editorial project banner */}
                <div className="mb-5 h-24 sm:h-28 rounded-xl border border-border bg-base p-4 flex items-end justify-between group-hover:border-border-hover transition-colors">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-accent/70">{indexNum}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">{p.category}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-fg mb-2.5 group-hover:text-accent transition-colors">
                  <Link to={`/projects/${p.slug}`} className="inline-flex items-center gap-2">
                    {p.title}
                  </Link>
                </h3>

                <p className="text-sm text-fg-secondary leading-relaxed mb-5 line-clamp-2 min-h-[2.75rem]">
                  {p.desc}
                </p>
              </div>

              {/* Footer: Tech Stack Tags & Action Links */}
              <div className="pt-4 border-t border-border mt-2">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-base border border-border text-fg-muted text-xs font-mono rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {(hasGithub || hasDemo) && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    {hasGithub && (
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
                    {hasDemo && (
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
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
