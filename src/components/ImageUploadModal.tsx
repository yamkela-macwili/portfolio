import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link2, Image as ImageIcon, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function ImageUploadModal() {
  const { profileImage, updateProfileImage, resetProfileImage, isImageModalOpen, closeImageModal } = useProfile();
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profileImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview when opening
  React.useEffect(() => {
    if (isImageModalOpen) {
      setPreviewUrl(profileImage);
      setUrlInput(profileImage.startsWith('data:') ? '' : profileImage);
      setError(null);
    }
  }, [isImageModalOpen, profileImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
      setUrlInput('');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    setError(null);
    if (val.trim()) {
      setPreviewUrl(val.trim());
    }
  };

  const handleSave = () => {
    if (!previewUrl) {
      setError('Please provide or upload an image.');
      return;
    }
    updateProfileImage(previewUrl);
    closeImageModal();
  };

  const handleResetDefault = () => {
    resetProfileImage();
    setPreviewUrl('/profile.jpg');
    setUrlInput('/profile.jpg');
    setError(null);
  };

  return (
    <AnimatePresence>
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-accent">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-fg">Update Profile Picture</h3>
                  <p className="text-xs text-fg-subtle">Use your own photo or enter an external image URL</p>
                </div>
              </div>

              <button
                onClick={closeImageModal}
                className="p-2 rounded-lg bg-surface-raised hover:bg-surface-hover text-fg-subtle hover:text-fg transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-danger-subtle border border-danger/30 text-danger text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Live Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-base border border-border mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-surface-raised border-2 border-accent/40 shadow-glow shrink-0">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setError('Unable to load image from URL. Please check the URL or upload a file.');
                  }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                  Preview Active
                </div>
                <div className="text-sm font-bold text-fg">Yamkela Macwili</div>
                <p className="text-xs text-fg-secondary">
                  This image will appear on the Hero showcase and your interactive CV.
                </p>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-subtle hover:text-accent transition-colors pt-1"
                >
                  <RotateCcw size={12} /> Reset to Default Photo
                </button>
              </div>
            </div>

            {/* Option 1: File Upload */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted font-semibold mb-2">
                  Upload Image from Device
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 px-4 rounded-xl border border-dashed border-border hover:border-accent bg-surface-raised hover:bg-surface-hover text-fg text-xs font-mono transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                >
                  <Upload size={20} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Click to select photo</span>
                  <span className="text-[11px] text-fg-subtle">PNG, JPG, or WEBP up to 5MB</span>
                </button>
              </div>

              {/* Option 2: Image URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted font-semibold mb-2">
                  Or Paste Image Web URL
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle" size={15} />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full pl-10 pr-4 py-3 bg-base border border-border focus:border-accent text-xs font-mono text-fg rounded-xl focus:outline-none transition-colors placeholder:text-fg-subtle"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={closeImageModal}
                className="px-5 py-2.5 rounded-xl border border-border text-fg-muted hover:text-fg text-xs font-mono font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-glow"
              >
                <Check size={14} /> Apply Photo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
