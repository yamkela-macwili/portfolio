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
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Post not found</h1>
          <Link to="/blog" className="text-zinc-400 hover:text-white transition-colors">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-12">
          <ArrowLeft size={16} /> Back to all posts
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-300">{post.category}</span>
          </div>
          <ShareButton title={post.title} slug={post.slug} />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-8 leading-[1.1]">
          {post.title}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-16">
          {post.excerpt}
        </p>

        <div className="h-px bg-white/10 w-full mb-16"></div>

        <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/10">
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
      </motion.div>
    </main>
  );
}
