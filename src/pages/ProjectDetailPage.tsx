import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, ShoppingCart, GitBranch, Star } from 'lucide-react';
import { useProject, useProjects } from '../hooks/useContent';
import Markdown from 'react-markdown';
import Mermaid from '../components/Mermaid';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);
  
  // Special case for AI Project Planner Agent if not already in DB with correct flags
  const isFeatured = project?.featured;

  console.log('ProjectDetailPage rendering. Project:', project?.title, 'Link:', project?.link);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading project...</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project not found</h1>
          <Link to="/projects" className="text-zinc-400 hover:text-white transition-colors">
            Return to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-12">
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {isFeatured && (
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-500/20 flex items-center gap-2">
                  <Star size={12} fill="currentColor" /> Featured Project
                </div>
              )}
              {project.projectType && (
                <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
                  {project.projectType}
                </div>
              )}
              {project.domains && project.domains.length > 0 && (
                <>
                  <span className="text-zinc-600">•</span>
                  <div className="flex flex-wrap gap-2">
                    {project.domains.map(d => (
                      <span key={d} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-wider rounded border border-emerald-500/20">{d}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
              {project.desc}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 shrink-0 w-full md:w-auto">
            {project.link && project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-colors">
                {project.type === 'premium' ? <ShoppingCart size={18} /> : <ArrowUpRight size={18} />}
                {project.type === 'premium' ? `Purchase ${project.price || ''}` : 'Live Demo'}
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border border-white/10 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
                <Github size={18} /> View Source
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {project.tech.map(t => (
            <span key={t} className="px-4 py-1.5 bg-white/5 text-zinc-300 text-sm rounded-full border border-white/10">{t}</span>
          ))}
        </div>

        {(project.architecture || project.challenges || project.performance) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {project.architecture && (
              <div className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">System Architecture</div>
                <p className="text-zinc-400 text-sm leading-relaxed">{project.architecture}</p>
              </div>
            )}
            {project.challenges && (
              <div className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Key Challenges</div>
                <p className="text-zinc-400 text-sm leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.performance && (
              <div className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-3">Performance Metrics</div>
                <p className="text-zinc-400 text-sm leading-relaxed">{project.performance}</p>
              </div>
            )}
          </div>
        )}

        <div className="h-px bg-white/10 w-full mb-16"></div>

        <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/10 mb-24">
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
        <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <ProjectNav slug={slug} />
        </div>
      </motion.div>
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
    <>
      <div className="w-full sm:w-1/2">
        {prevProject ? (
          <Link 
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start gap-2 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Previous Project</span>
            <div className="flex items-center gap-2 text-white group-hover:text-emerald-400 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg font-medium truncate max-w-[200px]">{prevProject.title}</span>
            </div>
          </Link>
        ) : (
          <div className="p-6 opacity-20 grayscale">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">End of list</span>
          </div>
        )}
      </div>

      <div className="w-full sm:w-1/2 flex justify-end">
        {nextProject ? (
          <Link 
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-2 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 text-right"
          >
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Next Project</span>
            <div className="flex items-center gap-2 text-white group-hover:text-emerald-400 transition-colors">
              <span className="text-lg font-medium truncate max-w-[200px]">{nextProject.title}</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        ) : (
          <div className="p-6 opacity-20 grayscale text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">End of list</span>
          </div>
        )}
      </div>
    </>
  );
}
