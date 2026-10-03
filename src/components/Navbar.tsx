import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: isHome ? '#projects' : '/projects' },
    { name: 'Profile', href: isHome ? '#about' : '/#about' },
    { name: 'Credentials', href: isHome ? '#education' : '/#education' },
    { name: 'Articles', href: isHome ? '#blog' : '/blog' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'py-3.5 bg-base/95 border-b border-border'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Signature */}
          <Link
            to="/"
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center font-mono text-xs font-bold text-fg group-hover:border-accent group-hover:text-accent transition-colors">
              YM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
                Yamkela Macwili
              </span>
              <span className="hidden sm:inline text-[11px] font-mono text-fg-subtle">
                Full-Stack Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-surface border border-border">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-fg-muted hover:text-fg hover:bg-surface-raised transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-fg-muted hover:text-fg hover:bg-surface-raised transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
            {user && (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-accent hover:bg-surface-raised transition-colors"
              >
                ADMIN
              </Link>
            )}
          </nav>

          {/* Right Action & Let's Talk CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yamkela-macwili"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-mono text-fg-muted hover:text-fg px-3.5 py-2 rounded-xl border border-border bg-surface hover:border-border-hover transition-colors"
            >
              GitHub <ArrowUpRight size={12} />
            </a>

            <a
              href={isHome ? '#contact' : '/#contact'}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-fg text-dark hover:bg-accent hover:text-on-accent transition-colors active:scale-95"
            >
              Let's Talk <ArrowUpRight size={13} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-surface border border-border text-fg-muted hover:text-fg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-16 z-40 bg-base/98 backdrop-blur-2xl border-b border-border flex flex-col p-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-3 pt-2">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-fg hover:text-accent py-3 border-b border-border transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-fg hover:text-accent py-3 border-b border-border transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
              {user && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-mono text-accent py-3 border-b border-border"
                >
                  ADMIN DASHBOARD
                </Link>
              )}

              <div className="pt-6 space-y-4">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-accent text-on-accent font-semibold text-center block shadow-glow"
                >
                  Initiate Contact
                </a>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-fg-subtle">
                  <a
                    href="https://github.com/yamkela-macwili"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border text-center hover:text-fg transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yamkela-macwili-116442253/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border text-center hover:text-fg transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
