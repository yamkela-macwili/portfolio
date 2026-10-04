import { ArrowUpRight, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/useContent';
import { formatDate } from '../lib/utils';

export default function Blog() {
  const { posts, loading } = usePosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-border gap-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
            Engineering Notes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
            Technical Writing &amp; Case Studies
          </h2>
          <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
            Architectural teardowns, data pipeline deep dives, and lessons from building production systems.
          </p>
        </div>

        <Link
          to="/blog"
          className="px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-fg-muted hover:text-fg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          All Articles Archive ({posts.length}) <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Solid Theme Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center font-mono text-xs text-fg-subtle">
            Loading articles...
          </div>
        ) : recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl bg-surface border border-border hover:border-border-hover p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 font-mono text-xs">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {post.category || 'Engineering'}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1 text-fg-subtle">
                      <Clock size={12} className="text-fg-subtle" />
                      {post.readTime}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">
                  <Link to={`/blog/${post.slug}`} className="block">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-fg-secondary leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-fg-subtle flex items-center gap-1.5">
                  <Calendar size={12} className="text-fg-subtle" />
                  {formatDate(post.date)}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-fg hover:text-accent font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  Read Article <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-12 text-center font-mono text-xs text-fg-subtle bg-surface border border-border rounded-2xl">
            No articles published yet.
          </div>
        )}
      </div>
    </section>
  );
}
