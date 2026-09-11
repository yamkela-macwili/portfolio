import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects, usePosts, useEducation, useCertifications } from '../../hooks/useContent';
import { Plus, Edit, LogOut, FileText, Folder, AlertTriangle, ShieldCheck, GraduationCap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const { education, loading: educationLoading } = useEducation();
  const { certifications, loading: certificationsLoading } = useCertifications();
  const [activeTab, setActiveTab] = useState<'projects' | 'posts' | 'education' | 'certifications'>('projects');

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
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-micro text-emerald-500 uppercase tracking-widest">System Online</span>
          </div>
          <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Admin Terminal</h1>
          <p className="text-zinc-500 text-sm font-mono">USER_ID: {user?.email}</p>
        </div>
        
        <div className="flex items-center gap-4">
          {!supabase && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs">
              <AlertTriangle size={14} />
              <span>Local Mode</span>
            </div>
          )}
          {supabase && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs">
              <ShieldCheck size={14} />
              <span>Live Database</span>
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-xs uppercase tracking-widest"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </div>

      <div className="flex gap-8 mb-8 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'projects' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <div className="flex items-center gap-2">
            <Folder size={14} /> Projects
          </div>
          {activeTab === 'projects' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
        </button>
        <button 
          onClick={() => setActiveTab('posts')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'posts' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <div className="flex items-center gap-2">
            <FileText size={14} /> Blog Posts
          </div>
          {activeTab === 'posts' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
        </button>
        <button 
          onClick={() => setActiveTab('education')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'education' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <div className="flex items-center gap-2">
            <GraduationCap size={14} /> Education
          </div>
          {activeTab === 'education' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
        </button>
        <button 
          onClick={() => setActiveTab('certifications')}
          className={`pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors relative ${activeTab === 'certifications' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <div className="flex items-center gap-2">
            <Award size={14} /> Certifications
          </div>
          {activeTab === 'certifications' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
        </button>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-micro text-zinc-600 uppercase">
            Showing {getEntriesCount()} entries
          </span>
          {error && (
            <span className="text-[10px] text-red-500 font-mono uppercase tracking-widest">
              Database Error: {error} (Showing local fallback)
            </span>
          )}
        </div>
        <Link 
          to={getNewEntryPath()}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all transform hover:scale-105"
        >
          <Plus size={16} /> New Entry
        </Link>
      </div>

      <div className="grid gap-4">
        {activeTab === 'projects' && (
          <>
            {projectsLoading ? (
              <div className="text-zinc-500 font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              projects.map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={project.slug} 
                  className="glass-panel border-dashed-subtle flex items-center justify-between p-6 group hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="text-micro text-zinc-600 mb-1">ID: {project.slug.toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-zinc-500">
                      <span className="px-2 py-0.5 rounded border border-white/10">{project.category}</span>
                      <span>•</span>
                      <span>{project.type}</span>
                      {project.featured && <span className="text-emerald-400">• FEATURED</span>}
                    </div>
                  </div>
                  <Link 
                    to={`/admin/projects/${project.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/10 transition-all text-xs uppercase tracking-widest"
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
              <div className="text-zinc-500 font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              posts.map((post, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={post.slug} 
                  className="glass-panel border-dashed-subtle flex items-center justify-between p-6 group hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="text-micro text-zinc-600 mb-1">LOG_ID: {post.slug.toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-zinc-500">
                      <span className="px-2 py-0.5 rounded border border-white/10">{formatDate(post.date)}</span>
                      <span>•</span>
                      <span className="uppercase">{post.category}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/posts/${post.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/10 transition-all text-xs uppercase tracking-widest"
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
              <div className="text-zinc-500 font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              education.map((edu, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={edu.id} 
                  className="glass-panel border-dashed-subtle flex items-center justify-between p-6 group hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="text-micro text-zinc-600 mb-1">EDU_ID: {edu.id.substring(0, 8).toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-white mb-2">{edu.degree}</h3>
                    <div className="flex items-center gap-3 text-micro text-zinc-500">
                      <span className="px-2 py-0.5 rounded border border-white/10">{edu.institution}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/education/${edu.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/10 transition-all text-xs uppercase tracking-widest"
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
              <div className="text-zinc-500 font-mono text-xs animate-pulse">Scanning database...</div>
            ) : (
              certifications.map((cert, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={cert.id} 
                  className="glass-panel border-dashed-subtle flex items-center justify-between p-6 group hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="text-micro text-zinc-600 mb-1">CERT_ID: {cert.id.substring(0, 8).toUpperCase()}</div>
                    <h3 className="text-lg font-medium text-white mb-2">{cert.title}</h3>
                    <div className="flex items-center gap-3 text-micro text-zinc-500">
                      <span className="px-2 py-0.5 rounded border border-white/10">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/certifications/${cert.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/10 transition-all text-xs uppercase tracking-widest"
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
