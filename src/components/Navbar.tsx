import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: isHome ? "#about" : "/#about" },
    { name: 'Projects', href: isHome ? "#projects" : "/#projects" },
    { name: 'Blog', href: isHome ? "#blog" : "/#blog" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-4xl"
      >
        <div className="glass-panel rounded-full px-4 md:px-6 h-14 flex items-center justify-between shadow-2xl">
          <Link 
            to="/" 
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white group-hover:bg-emerald-400 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 17L10 11L4 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-medium tracking-tight group-hover:text-emerald-400 transition-colors hidden sm:inline">
              Yamkela Macwili
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-micro text-zinc-400">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link key={link.name} to={link.href} className="hover:text-white transition-colors">{link.name}</Link>
              ) : (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
              )
            ))}
            {user && (
              <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 transition-colors">Admin</Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a href={isHome ? "#contact" : "/#contact"} className="hidden sm:block text-micro text-white hover:text-emerald-400 transition-colors">
              Contact
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.href.startsWith('/') ? (
                    <Link 
                      to={link.href} 
                      className="text-3xl font-light text-white hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-3xl font-light text-white hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    to="/admin" 
                    className="text-3xl font-light text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Admin
                  </Link>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href={isHome ? "#contact" : "/#contact"} 
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-emerald-400 transition-colors inline-block"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
