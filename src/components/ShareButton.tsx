import { useState, useEffect, useRef } from 'react';
import { Share2, Link2, Linkedin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareButtonProps {
  title: string;
  slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const shareUrl = `${window.location.origin}/blog/${slug}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=600');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-raised hover:bg-surface-hover border border-border hover:border-border-hover rounded font-mono text-xs text-fg-subtle hover:text-fg transition-colors"
      >
        <Share2 size={12} />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 bg-surface border border-border rounded shadow-xl z-50 overflow-hidden"
          >
            <div className="p-1">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 font-mono text-xs text-fg-subtle hover:text-fg hover:bg-surface-raised rounded transition-colors text-left"
              >
                {copied ? (
                  <Check size={14} className="text-accent" />
                ) : (
                  <Link2 size={14} />
                )}
                <span>{copied ? 'Copied' : 'Copy link'}</span>
              </button>
              <button
                onClick={handleLinkedInShare}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 font-mono text-xs text-fg-subtle hover:text-fg hover:bg-surface-raised rounded transition-colors text-left"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
