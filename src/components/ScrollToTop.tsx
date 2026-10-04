import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Reset scroll to top on initial page load, refresh, or route change
  useEffect(() => {
    // If on home page and page was refreshed, reset hash and scroll to Hero top
    if (location.pathname === '/') {
      const isReload = window.performance && 
        window.performance.getEntriesByType &&
        (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';

      if (isReload || !location.hash) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // Floating button visibility listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-[60] w-9 h-9 rounded-xl bg-surface/90 backdrop-blur-md border border-border hover:border-accent flex items-center justify-center text-fg-subtle hover:text-accent transition-colors shadow-lg group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
