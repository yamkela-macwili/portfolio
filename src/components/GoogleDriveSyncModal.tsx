import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  RefreshCw,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  LogOut,
  AlertCircle,
  FolderOpen,
  ArrowDownToLine,
  Sparkles,
} from 'lucide-react';
import {
  signInWithGoogleDrive,
  signOutGoogleDrive,
  listGoogleDriveFiles,
  fetchDriveFileAsDataUrl,
  fetchDriveJsonContent,
  DriveFile,
} from '../lib/googleDrive';
import { useProfile } from '../context/ProfileContext';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'photo' | 'resume';
}

export default function GoogleDriveSyncModal({ isOpen, onClose, defaultTab = 'photo' }: GoogleDriveSyncModalProps) {
  const { updateProfileImage, updateCV, cvData } = useProfile();
  const [activeTab, setActiveTab] = useState<'photo' | 'resume'>(defaultTab);
  const [user, setUser] = useState<{ email: string | null; displayName: string | null } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncingFileId, setSyncingFileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setError(null);
      setSuccessMessage(null);
      if (accessToken) {
        loadFiles(accessToken, defaultTab, searchQuery);
      }
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (accessToken) {
      loadFiles(accessToken, activeTab, searchQuery);
    }
  }, [activeTab, accessToken]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await signInWithGoogleDrive();
      setUser({ email: res.user.email, displayName: res.user.displayName });
      setAccessToken(res.accessToken);
      await loadFiles(res.accessToken, activeTab, searchQuery);
    } catch (err: any) {
      // Quietly ignore when the user voluntarily closes the popup
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        err.message?.includes('popup-closed-by-user')
      ) {
        return;
      }
      console.error('Google Sign-in error:', err);
      setError(err.message || 'Failed to authenticate with Google Drive');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutGoogleDrive();
      setUser(null);
      setAccessToken(null);
      setFiles([]);
      setError(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const loadFiles = async (token: string, tab: 'photo' | 'resume', query: string) => {
    try {
      setLoading(true);
      setError(null);
      const filter = tab === 'photo' ? 'images' : 'documents';
      const driveFiles = await listGoogleDriveFiles(token, filter, query);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error('Failed to load drive files:', err);
      setError(err.message || 'Failed to list files from Google Drive');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadFiles(accessToken, activeTab, searchQuery);
    }
  };

  const handleSelectPhoto = async (file: DriveFile) => {
    if (!accessToken) return;
    try {
      setSyncingFileId(file.id);
      setError(null);
      const dataUrl = await fetchDriveFileAsDataUrl(file.id, accessToken, file.mimeType);
      updateProfileImage(dataUrl);
      setSuccessMessage(`Profile photo updated from "${file.name}"!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Error syncing photo from Drive:', err);
      setError(err.message || 'Failed to download and apply image from Google Drive');
    } finally {
      setSyncingFileId(null);
    }
  };

  const handleSelectResume = async (file: DriveFile) => {
    if (!accessToken) return;
    try {
      setSyncingFileId(file.id);
      setError(null);

      // If it is a JSON file export of CV
      if (file.mimeType === 'application/json' || file.name.endsWith('.json')) {
        const jsonContent = await fetchDriveJsonContent(file.id, accessToken);
        updateCV(jsonContent);
        setSuccessMessage(`CV data successfully updated from "${file.name}"!`);
      } else {
        // PDF or document: set as custom link / resume reference
        const dataUrl = await fetchDriveFileAsDataUrl(file.id, accessToken, file.mimeType);
        updateCV({
          ...cvData,
          customPdfUrl: dataUrl,
        });
        setSuccessMessage(`Resume file "${file.name}" linked from Google Drive!`);
      }
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Error syncing resume from Drive:', err);
      setError(err.message || 'Failed to sync resume from Google Drive');
    } finally {
      setSyncingFileId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-accent">
                  <FolderOpen size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-fg flex items-center gap-2">
                    Google Drive Sync
                  </h3>
                  <p className="text-xs text-fg-subtle">
                    Pull your profile portrait and resume directly from your Google Drive
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-surface hover:bg-surface-hover text-fg-subtle hover:text-fg transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success alert */}
            {successMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-accent-subtle border border-accent/30 text-accent text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error alert with reconnect option */}
            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-danger-subtle border border-danger/30 text-danger text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="px-3 py-1 bg-danger/20 hover:bg-danger/30 text-danger rounded-lg font-mono text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Grant Permissions &amp; Reconnect
                </button>
              </div>
            )}

            {/* Authentication Strip */}
            {!user ? (
              <div className="p-6 rounded-2xl bg-base border border-border text-center space-y-4 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto text-accent">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-fg">Connect with Google Drive</h4>
                  <p className="text-xs text-fg-subtle max-w-sm mx-auto mt-1">
                    Authorize the app to view and import your profile photos and resume files from your Google Drive storage.
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-surface hover:bg-surface-raised border border-border hover:border-border-hover text-xs font-mono font-semibold text-fg transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    <span>{loading ? 'Connecting...' : 'Sign in with Google Drive'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1 overflow-hidden space-y-4">
                {/* Connected User Bar */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-base border border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    <div className="text-xs font-mono text-fg">
                      Connected: <span className="font-semibold text-accent">{user.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 text-xs font-mono text-fg-subtle hover:text-danger transition-colors cursor-pointer"
                    title="Disconnect Google Drive"
                  >
                    <LogOut size={13} />
                    <span>Disconnect</span>
                  </button>
                </div>

                {/* Tabs & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex rounded-xl bg-base p-1 border border-border shrink-0">
                    <button
                      onClick={() => setActiveTab('photo')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'photo'
                          ? 'bg-accent text-on-accent font-bold shadow-sm'
                          : 'text-fg-subtle hover:text-fg'
                      }`}
                    >
                      <ImageIcon size={14} />
                      <span>Profile Photos</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('resume')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'resume'
                          ? 'bg-accent text-on-accent font-bold shadow-sm'
                          : 'text-fg-subtle hover:text-fg'
                      }`}
                    >
                      <FileText size={14} />
                      <span>Resume &amp; CV Files</span>
                    </button>
                  </div>

                  <form onSubmit={handleSearch} className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" size={14} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search ${activeTab === 'photo' ? 'images' : 'documents'} in Drive...`}
                      className="w-full pl-9 pr-8 py-2 bg-base border border-border focus:border-accent text-xs font-mono text-fg rounded-xl focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => accessToken && loadFiles(accessToken, activeTab, searchQuery)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg cursor-pointer"
                      title="Refresh files"
                    >
                      <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                    </button>
                  </form>
                </div>

                {/* Drive File List */}
                <div className="flex-1 overflow-y-auto border border-border rounded-xl bg-base p-3 space-y-2 max-h-[380px]">
                  {loading && files.length === 0 ? (
                    <div className="py-12 text-center text-xs font-mono text-fg-subtle animate-pulse">
                      Loading files from Google Drive...
                    </div>
                  ) : files.length === 0 ? (
                    <div className="py-12 text-center text-xs font-mono text-fg-subtle">
                      No matching {activeTab === 'photo' ? 'image' : 'resume'} files found in your Google Drive.
                    </div>
                  ) : (
                    files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 rounded-xl bg-surface border border-border hover:border-accent/40 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {file.thumbnailLink ? (
                            <img
                              src={file.thumbnailLink}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-base border border-border shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-surface-raised border border-border flex items-center justify-center text-accent shrink-0">
                              {activeTab === 'photo' ? <ImageIcon size={18} /> : <FileText size={18} />}
                            </div>
                          )}

                          <div className="overflow-hidden">
                            <div className="text-xs font-medium text-fg truncate" title={file.name}>
                              {file.name}
                            </div>
                            <div className="text-[11px] font-mono text-fg-subtle flex items-center gap-2 mt-0.5">
                              <span>{file.mimeType.split('/').pop()?.toUpperCase()}</span>
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-accent inline-flex items-center gap-0.5 text-[10px]"
                                >
                                  Drive ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => (activeTab === 'photo' ? handleSelectPhoto(file) : handleSelectResume(file))}
                          disabled={syncingFileId === file.id}
                          className="px-3.5 py-1.5 rounded-lg bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          {syncingFileId === file.id ? (
                            <>
                              <RefreshCw size={12} className="animate-spin" />
                              <span>Syncing...</span>
                            </>
                          ) : (
                            <>
                              <ArrowDownToLine size={12} />
                              <span>{activeTab === 'photo' ? 'Use as Photo' : 'Sync CV'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
