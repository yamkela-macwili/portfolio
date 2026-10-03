import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, ShoppingCart } from 'lucide-react';
import { useProject, useProjects } from '../hooks/useContent';
import Markdown from 'react-markdown';
import Mermaid from '../components/Mermaid';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);
  
  const isFeatured = project?.featured;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs text-fg-subtle">
        Loading engineering record...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-fg mb-2">Record Not Found</h1>
          <p className="text-xs text-fg-muted mb-6">The requested engineering specification could not be located.</p>
          <Link 
            to="/projects" 
            className="font-mono text-xs text-accent hover:underline"
          >
            ← Return to Engineering Records
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <div>
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-emerald-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={14} /> Back to engineering records
        </Link>

        {/* Record Header */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {isFeatured && (
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-semibold">
                Featured System
              </span>
            )}
            {project.projectType && (
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                {project.projectType}
              </span>
            )}
            {project.domains && project.domains.length > 0 && (
              <>
                <span className="text-zinc-700">•</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.domains.map(d => (
                    <span 
                      key={d} 
                      className="font-mono text-xs text-zinc-300 px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h1>
          <p className="text-base text-slate-100 leading-relaxed max-w-3xl mb-6">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.link && project.link !== '#' && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-zinc-950 hover:bg-emerald-400 hover:text-zinc-950 transition-colors rounded-md font-mono text-xs font-semibold shadow-sm"
              >
                {project.type === 'premium' ? <ShoppingCart size={14} /> : <ArrowUpRight size={14} />}
                {project.type === 'premium' ? `Purchase ${project.price || ''}` : 'Live Endpoint / Demo'}
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-700 text-white hover:border-emerald-400 hover:text-emerald-400 transition-colors rounded-md font-mono text-xs font-semibold"
              >
                <Github size={14} /> Source Repository
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
            Technologies & Libraries
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span 
                key={t} 
                className="font-mono text-xs px-2.5 py-1 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture / Challenges / Metrics */}
        {(project.architecture || project.challenges || project.performance) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {project.architecture && (
              <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2 font-semibold">
                  System Architecture
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}
            {project.challenges && (
              <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2 font-semibold">
                  Key Challenges
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}
            {project.performance && (
              <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                <div className="font-mono text-xs uppercase tracking-widest text-slate-200 mb-2 font-semibold">
                  Performance Metrics
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  {project.performance}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-zinc-800 my-8"></div>

        {/* Specification Markdown */}
        <article className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:underline prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-code:font-mono prose-code:text-xs mb-16">
          <Markdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-mermaid/.exec(className || '');
                if (!inline && match) {
                  return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {project.content?.replace(/\\n/g, '\n')}
          </Markdown>
        </article>

        {/* Project Navigation */}
        <div className="border-t border-zinc-800 pt-8">
          <ProjectNav slug={slug} />
        </div>
      </div>
    </main>
  );
}

function ProjectNav({ slug }: { slug: string | undefined }) {
  const { projects } = useProjects();
  
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (projects.length <= 1) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        {prevProject ? (
          <Link 
            to={`/projects/${prevProject.slug}`}
            className="block p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
              Previous Record
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
              <ArrowLeft size={14} className="shrink-0" />
              <span className="truncate">{prevProject.title}</span>
            </div>
          </Link>
        ) : (
          <div className="p-4 border border-zinc-800/50 rounded-lg opacity-40">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Beginning of records</span>
          </div>
        )}
      </div>

      <div>
        {nextProject ? (
          <Link 
            to={`/projects/${nextProject.slug}`}
            className="block p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group text-right"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
              Next Record
            </span>
            <div className="flex items-center justify-end gap-2 text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
              <span className="truncate">{nextProject.title}</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </div>
          </Link>
        ) : (
          <div className="p-4 border border-zinc-800/50 rounded-lg opacity-40 text-right">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">End of records</span>
          </div>
        )}
      </div>
    </div>
  );
}
