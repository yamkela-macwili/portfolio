import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/useContent';
import { formatDate } from '../lib/utils';

export default function Blog() {
  const { posts, loading } = usePosts();
  // Find the post marked as featured, or fallback to the latest one
  const featuredPost = posts.find(p => p.featured) || (posts.length > 0 ? posts[0] : null);

  return (
    <section id="blog" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
      <div className="flex items-end justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Writing & Insights
          </h2>
          <p className="text-zinc-500 font-light max-w-md">
            I write about real challenges I encounter while building systems.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Link 
            to="/blog" 
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
      
      <div className="flex flex-col border-t border-white/10">
        {loading ? (
          <div className="py-10 text-zinc-500 font-mono text-xs animate-pulse">Scanning database...</div>
        ) : featuredPost ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="group border-b border-white/10 -mx-6 px-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <div className="text-micro text-zinc-500">FEATURED ENTRY</div>
            </div>
            <Link to={`/blog/${featuredPost.slug}`} className="py-10 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-white/[0.02] transition-colors cursor-pointer block">
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-light text-white mb-3 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-emerald-400">{featuredPost.title}</h3>
                <p className="text-base text-zinc-400 font-light leading-relaxed">{featuredPost.excerpt}</p>
              </div>
              <div className="text-xs font-mono text-zinc-500 whitespace-nowrap pt-1 uppercase tracking-wider">{formatDate(featuredPost.date)}</div>
            </Link>
          </motion.div>
        ) : (
          <div className="py-10 text-zinc-500 font-mono text-xs">No entries found.</div>
        )}
      </div>
    </section>
  )
}
