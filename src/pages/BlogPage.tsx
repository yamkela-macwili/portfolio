import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Calendar, Clock, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/useContent';
import { formatDate } from '../lib/utils';

export default function BlogPage() {
  const { posts, loading } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase().trim();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6">Writing</h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mb-10">
          Thoughts, tutorials, and essays on software engineering, AI systems, and building scalable products.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search posts by title, category, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </motion.div>

      <div className="space-y-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel rounded-3xl p-8 h-[350px] animate-pulse">
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-8 w-3/4 bg-white/10 rounded"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                  </div>
                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-20 glass-panel rounded-3xl"
              >
                <Search size={48} className="mx-auto text-zinc-700 mb-4" />
                <h3 className="text-xl text-white font-medium mb-2">No posts found</h3>
                <p className="text-zinc-500">Try adjusting your search query or category.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, i) => (
                  <motion.div 
                    layout
                    key={post.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="h-full"
                  >
                    <Link 
                      to={`/blog/${post.slug}`}
                      className={`group block glass-panel rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-500 h-full border ${post === posts[0] && !searchQuery ? 'border-emerald-500/20' : 'border-white/10'}`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-6 uppercase tracking-wider">
                          {post === posts[0] && !searchQuery ? (
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                              Featured
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-300">{post.category}</span>
                          )}
                          <span className="flex items-center gap-1.5 text-zinc-500"><Calendar size={14} /> {formatDate(post.date)}</span>
                          <span className="flex items-center gap-1.5 text-zinc-500"><Clock size={14} /> {post.readTime}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-emerald-400">
                          {post.title}
                        </h2>
                        <p className="text-base text-zinc-400 font-light leading-relaxed mb-8 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                          <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                            Read Article <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
