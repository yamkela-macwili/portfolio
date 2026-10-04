import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { useProjects, usePosts, useEducation, useCertifications } from '../../hooks/useContent';
import { Plus, Edit, LogOut, FileText, Folder, AlertTriangle, ShieldCheck, GraduationCap, Award, User, Camera, Printer, RotateCcw, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { profileImage, cvData, openImageModal, openCVModal, resetCV, resetProfileImage } = useProfile();
  const navigate = useNavigate();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const { education, loading: educationLoading } = useEducation();
  const { certifications, loading: certificationsLoading } = useCertifications();
  const [activeTab, setActiveTab] = useState<'projects' | 'posts' | 'education' | 'certifications' | 'profile'>('projects');

  const error = activeTab === 'projects' ? projectsError : activeTab === 'posts' ? postsError : null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const getEntriesCount = () => {
    switch (activeTab) {
      case 'projects': return projects.length;
      case 'posts': return posts.length;
      case 'education': return education.length;
      case 'certifications': return certifications.length;
      case 'profile': return 1;
      default: return 0;
    }
  };

  const getNewEntryPath = () => {
    switch (activeTab) {
      case 'projects': return '/admin/projects/new';
      case 'posts': return '/admin/posts/new';
      case 'education': return '/admin/education/new';
      case 'certifications': return '/admin/certifications/new';
      default: return '/admin';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-micro text-accent uppercase tracking-widest">System Online</span>
          </div>
          <h1 className="text-4xl font-light text-fg mb-2 tracking-tight">Admin Terminal</h1>
          <p className="text-fg-subtle text-sm font-mono">USER_ID: {user?.email}</p>
        </div>
        
        <div className="flex items-center gap-4">
          {!supabase && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-warning-subtle border border-warning/20 text-warning text-xs font-mono">
              <AlertTriangle size={14} />
              <span>Local Mode</span>
            </div>
          )}
          {supabase && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-accent-subtle border border-accent/20 text-accent text-xs font-mono">
              <ShieldCheck size={14} />
              <span>Live Database</span>
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-fg-subtle hover:text-fg hover:bg-surface-raised transition-all text-xs font-mono uppercase tracking-widest"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 sm:gap-8 mb-8 border-b border-border">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'projects' ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
        >
          <div className="flex items-center gap-2">
            <Folder size={14} /> Projects
          </div>
          {activeTab === 'projects' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('posts')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'posts' ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
        >
          <div className="flex items-center gap-2">
            <FileText size={14} /> Blog Posts
          </div>
          {activeTab === 'posts' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('education')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'education' ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
        >
          <div className="flex items-center gap-2">
            <GraduationCap size={14} /> Education
          </div>
          {activeTab === 'education' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('certifications')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'certifications' ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
        >
          <div className="flex items-center gap-2">
            <Award size={14} /> Certifications
          </div>
          {activeTab === 'certifications' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'profile' ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
        >
          <div className="flex items-center gap-2">
            <User size={14} className="text-accent" /> Profile &amp; CV Template
          </div>
          {activeTab === 'profile' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-micro text-fg-subtle uppercase">
            Showing {getEntriesCount()} entries
          </span>
          {error && (
            <span className="text-[10px] text-danger font-mono uppercase tracking-widest">
              Database Error: {error} (Showing local fallback)
            </span>
          )}
        </div>

        {activeTab !== 'profile' ? (
          <Link 
            to={getNewEntryPath()}
            className="flex items-center gap-2 bg-fg text-dark px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-on-accent transition-all transform hover:scale-105"
          >
            <Plus size={16} /> New Entry
          </Link>
        ) : (
          <button
            onClick={openCVModal}
            className="flex items-center gap-2 bg-accent text-on-accent px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-light transition-all transform hover:scale-105 shadow-glow"
          >
            <Edit size={14} /> Open Full CV Editor
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Photo Card */}
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-base border-2 border-accent/40 shadow-glow shrink-0">
                  <img
                    src={profileImage || '/profile.jpg'}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-fg">Hero Profile Photo</h3>
                  <p className="text-xs text-fg-secondary max-w-md mt-1">
                    Upload your own photo or paste an external image link. This appears across the Hero section and Curriculum Vitae.
                  </p>
                  <div className="text-[11px] font-mono text-fg-subtle mt-2">
                    Current: <span className="text-accent">{profileImage.startsWith('data:') ? 'Uploaded custom file' : profileImage}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={openImageModal}
                  className="px-4 py-2 rounded-xl bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-glow"
                >
                  <Camera size={14} /> Change Photo
                </button>
                <button
                  type="button"
                  onClick={resetProfileImage}
                  className="px-3.5 py-2 rounded-xl bg-surface-raised border border-border text-fg-subtle hover:text-fg text-xs font-mono transition-colors"
                  title="Reset to default photo"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            {/* CV Template Card */}
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <h3 className="text-lg font-bold text-fg">Curriculum Vitae (CV) Engine</h3>
                  <p className="text-xs text-fg-secondary">
                    Active Profile: <span className="text-fg font-semibold">{cvData.name}</span> — {cvData.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openCVModal}
                    className="px-4 py-2 rounded-xl bg-surface-raised border border-border hover:border-accent text-fg hover:text-accent text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <FileText size={14} className="text-accent" />
                    <span>View &amp; Print CV</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-base border border-border space-y-1">
                  <span className="text-fg-subtle text-[11px] uppercase">Technical Skills</span>
                  <div className="text-base font-bold text-fg">{cvData.skills.length} Categories</div>
                  <p className="text-[11px] text-fg-subtle">
                    {cvData.skills.reduce((acc, cat) => acc + cat.items.length, 0)} total technologies
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-base border border-border space-y-1">
                  <span className="text-fg-subtle text-[11px] uppercase">Engineering Projects</span>
                  <div className="text-base font-bold text-fg">{cvData.projects.length} Showcased</div>
                  <p className="text-[11px] text-fg-subtle">With links &amp; architectural breakdowns</p>
                </div>

                <div className="p-4 rounded-xl bg-base border border-border space-y-1">
                  <span className="text-fg-subtle text-[11px] uppercase">Experience &amp; Academics</span>
                  <div className="text-base font-bold text-fg">{cvData.experience.length} Roles</div>
                  <p className="text-[11px] text-fg-subtle">{cvData.education[0]?.degree}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <>
            {projectsLoading ? (
              <div className="text-fg-subtle font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              projects.map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={project.id || project.slug} 
                  className="rounded-xl bg-surface border border-border flex items-center justify-between p-6 group hover:border-border-hover transition-colors"
                >
                  <div>
                    <div className="text-micro text-fg-subtle mb-1">PROJECT_ID: {project.slug.toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-fg mb-2">{project.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-fg-subtle">
                      <span className="px-2 py-0.5 rounded border border-border">{project.category}</span>
                      <span>•</span>
                      <span>{project.tech?.join(', ')}</span>
                      {project.featured && (
                        <>
                          <span>•</span>
                          <span className="text-accent">FEATURED</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link 
                    to={`/admin/projects/${project.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-fg-subtle hover:text-fg hover:bg-surface-raised rounded border border-transparent hover:border-border transition-all text-xs uppercase tracking-widest font-mono"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                </motion.div>
              ))
            )}
          </>
        )}

        {activeTab === 'posts' && (
          <>
            {postsLoading ? (
              <div className="text-fg-subtle font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              posts.map((post, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={post.id || post.slug} 
                  className="rounded-xl bg-surface border border-border flex items-center justify-between p-6 group hover:border-border-hover transition-colors"
                >
                  <div>
                    <div className="text-micro text-fg-subtle mb-1">POST_ID: {post.slug.toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-fg mb-2">{post.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-fg-subtle">
                      <span className="px-2 py-0.5 rounded border border-border">{post.category}</span>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/posts/${post.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-fg-subtle hover:text-fg hover:bg-surface-raised rounded border border-transparent hover:border-border transition-all text-xs uppercase tracking-widest font-mono"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                </motion.div>
              ))
            )}
          </>
        )}

        {activeTab === 'education' && (
          <>
            {educationLoading ? (
              <div className="text-fg-subtle font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              education.map((edu, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={edu.id} 
                  className="rounded-xl bg-surface border border-border flex items-center justify-between p-6 group hover:border-border-hover transition-colors"
                >
                  <div>
                    <div className="text-micro text-fg-subtle mb-1">EDU_ID: {edu.id.substring(0, 8).toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-fg mb-2">{edu.degree}</h3>
                    <div className="flex items-center gap-3 text-micro text-fg-subtle">
                      <span className="px-2 py-0.5 rounded border border-border">{edu.institution}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/education/${edu.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-fg-subtle hover:text-fg hover:bg-surface-raised rounded border border-transparent hover:border-border transition-all text-xs uppercase tracking-widest font-mono"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                </motion.div>
              ))
            )}
          </>
        )}

        {activeTab === 'certifications' && (
          <>
            {certificationsLoading ? (
              <div className="text-fg-subtle font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              certifications.map((cert, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={cert.id} 
                  className="rounded-xl bg-surface border border-border flex items-center justify-between p-6 group hover:border-border-hover transition-colors"
                >
                  <div>
                    <div className="text-micro text-fg-subtle mb-1">CERT_ID: {cert.id.substring(0, 8).toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-fg mb-2">{cert.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-fg-subtle">
                      <span className="px-2 py-0.5 rounded border border-border">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/certifications/${cert.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-fg-subtle hover:text-fg hover:bg-surface-raised rounded border border-transparent hover:border-border transition-all text-xs uppercase tracking-widest font-mono"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                </motion.div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
