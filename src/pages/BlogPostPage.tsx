import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { usePost } from '../hooks/useContent';
import Markdown from 'react-markdown';
import Mermaid from '../components/Mermaid';
import { formatDate } from '../lib/utils';
import ShareButton from '../components/ShareButton';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading } = usePost(slug);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-mono text-xs text-zinc-400">Loading record...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Technical Note Not Found</h1>
          <p className="text-xs text-zinc-400 mb-6">The requested document slug does not exist.</p>
          <Link to="/blog" className="font-mono text-xs text-emerald-400 hover:underline">
            ← Return to notes index
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <div>
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-emerald-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={14} /> Back to all notes
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-800">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-emerald-400 font-semibold">
              {post.category}
            </span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Calendar size={13} /> {formatDate(post.date)}
            </span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
          <ShareButton title={post.title} slug={post.slug} />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-base text-slate-100 leading-relaxed mb-8 pb-8 border-b border-zinc-800">
          {post.excerpt}
        </p>

        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-slate-100 prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-emerald-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-zinc-700 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg prose-blockquote:border-l-2 prose-blockquote:border-emerald-400 prose-blockquote:text-slate-100 prose-blockquote:font-sans prose-li:text-slate-100">
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
            {post.content?.replace(/\\n/g, '\n')}
          </Markdown>
        </article>
      </div>
    </main>
  );
}
