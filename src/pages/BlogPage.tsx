import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Clock, Search, X } from 'lucide-react';
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
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="pb-8 mb-8 border-b border-zinc-800/80">
        <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
          Index / Technical Writing
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Engineering Notes & System Design
        </h1>
        <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed mb-6">
          Technical breakdowns, database performance tuning, distributed consensus explorations, and backend architectures.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search size={15} className="text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-2.5 pl-10 pr-10 font-mono text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-lg animate-pulse h-52">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-4 w-16 bg-zinc-800 rounded"></div>
                  <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                </div>
                <div className="h-6 w-3/4 bg-zinc-800 rounded mb-3"></div>
                <div className="h-12 w-full bg-zinc-800 rounded mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                <p className="font-mono text-xs text-zinc-400">
                  No technical notes match "{searchQuery}".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPosts.map((post) => (
                  <div 
                    key={post.slug}
                  >
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="group block p-6 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3">
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-emerald-400 font-semibold">
                            {post.category}
                          </span>
                          <span className="text-zinc-400 flex items-center gap-1">
                            <Calendar size={12} /> {formatDate(post.date)}
                          </span>
                          <span className="text-zinc-400 flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-sm text-slate-100 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                        <span className="font-mono text-xs text-white group-hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-semibold">
                          Read Note <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
