import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useProject } from '../../hooks/useContent';

export default function ProjectEditor() {
  const { slug } = useParams();
  const isNew = !slug;
  const navigate = useNavigate();
  const { project, loading: initialLoading } = useProject(slug);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

  // Update form when project data loads
  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const copyJson = () => {
    const values = getValues();
    // Clean values for JSON copy
    const { id, created_at, ...cleanValues } = values;
    
    // Handle arrays
    const techArray = typeof cleanValues.tech === 'string' 
      ? cleanValues.tech.split(',').map((t: string) => t.trim()).filter(Boolean) 
      : (Array.isArray(cleanValues.tech) ? cleanValues.tech : []);
      
    const domainsArray = typeof cleanValues.domains === 'string' 
      ? cleanValues.domains.split(',').map((d: string) => d.trim()).filter(Boolean) 
      : (Array.isArray(cleanValues.domains) ? cleanValues.domains : []);

    const finalJson = {
      ...cleanValues,
      tech: techArray,
      domains: domainsArray
    };

    navigator.clipboard.writeText(JSON.stringify(finalJson, null, 2));
    setSaveStatus({ type: 'success', message: 'Project JSON copied to clipboard! You can use this to update src/data.ts' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const onSubmit = async (data: any) => {
    console.log('Form data received in onSubmit:', data);
    setSaveStatus(null);
    if (!supabase) {
      alert('Supabase is not configured. Saving is disabled. Use "Copy JSON" to save manually to src/data.ts');
      return;
    }
    setSaving(true);

    try {
      // Prepare payload
      const techArray = typeof data.tech === 'string' 
        ? data.tech.split(',').map((t: string) => t.trim()).filter(Boolean) 
        : (Array.isArray(data.tech) ? data.tech : []);
        
      const domainsArray = typeof data.domains === 'string' 
        ? data.domains.split(',').map((d: string) => d.trim()).filter(Boolean) 
        : (Array.isArray(data.domains) ? data.domains : []);

      // Remove created_at as it's handled by DB
      const { created_at, ...payloadData } = data;
      
      // Ensure links have a protocol
      if (payloadData.link && !payloadData.link.startsWith('http') && !payloadData.link.startsWith('#')) {
        payloadData.link = `https://${payloadData.link}`;
      }
      
      const payload = {
        ...payloadData,
        tech: techArray,
        domains: domainsArray,
      };

      console.log('Attempting to save project with payload. Link:', payload.link, 'GitHub:', payload.github);

      if (isNew) {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
      } else {
        // Use upsert to handle both local-to-DB migration and existing DB updates
        // If we have an id, we use it for onConflict to allow slug changes
        // If not (local project), we use 'slug' to avoid duplicates
        const conflictTarget = payload.id ? 'id' : 'slug';
        console.log(`Using conflict target: ${conflictTarget}`);
        const { error } = await supabase.from('projects').upsert(payload, { onConflict: conflictTarget });
        if (error) throw error;
      }

      setSaveStatus({ type: 'success', message: 'Project saved successfully!' });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err: any) {
      console.error('Save error details:', err);
      let message = err.message || 'Unknown error';
      
      if (message.includes('column "github" of relation "projects" does not exist') || 
          message.includes("Could not find the 'github' column") ||
          message.includes('column "projectType" of relation "projects" does not exist') ||
          message.includes("Could not find the 'projectType' column") ||
          message.includes('column "architecture" of relation "projects" does not exist') ||
          message.includes('column "challenges" of relation "projects" does not exist') ||
          message.includes('column "performance" of relation "projects" does not exist') ||
          message.includes('column "domains" of relation "projects" does not exist') ||
          message.includes('column "tech" of relation "projects" does not exist') ||
          message.includes('column "link" of relation "projects" does not exist')) {
        
        let missingCol = 'a required';
        if (message.includes('github')) missingCol = 'github';
        else if (message.includes('projectType')) missingCol = 'projectType';
        else if (message.includes('architecture')) missingCol = 'architecture';
        else if (message.includes('challenges')) missingCol = 'challenges';
        else if (message.includes('performance')) missingCol = 'performance';
        else if (message.includes('domains')) missingCol = 'domains';
        else if (message.includes('tech')) missingCol = 'tech';
        else if (message.includes('link')) missingCol = 'link';

        message = `Database Schema Mismatch: The "${missingCol}" column is missing from your Supabase "projects" table. Please add it using the SQL Editor in your Supabase dashboard.`;
      }
      
      setSaveStatus({ type: 'error', message: `Error saving project: ${message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    if (!supabase) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('slug', slug);
      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Error deleting project');
    }
  };

  if (!isNew && initialLoading) return <div className="pt-32 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-2xl font-light text-white">{isNew ? 'New Project' : 'Edit Project'}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <Trash2 size={18} /> Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {!supabase && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm">
            Supabase is not configured. Saving is disabled. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Title</label>
              <input 
                {...register('title', { required: 'Title is required' })} 
                className={`w-full bg-zinc-900 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Slug</label>
              <input 
                {...register('slug', { required: 'Slug is required' })} 
                className={`w-full bg-zinc-900 border ${errors.slug ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Category</label>
              <select 
                {...register('category', { required: 'Category is required' })} 
                className={`w-full bg-zinc-900 border ${errors.category ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`}
              >
                <option value="">Select a category</option>
                <option value="AI / Full-Stack">AI / Full-Stack</option>
                <option value="Machine Learning / Backend">Machine Learning / Backend</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Backend Architecture">Backend Architecture</option>
                <option value="Premium Source Code">Premium Source Code</option>
                <option value="Open Source">Open Source</option>
                <option value="Research / Experiment">Research / Experiment</option>
                <option value="Web Systems">Web Systems</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Project Type</label>
              <select {...register('projectType')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white">
                <option value="Client Work">Client Work</option>
                <option value="Personal Project">Personal Project</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Description</label>
              <textarea 
                {...register('desc', { required: 'Description is required' })} 
                rows={4} 
                className={`w-full bg-zinc-900 border ${errors.desc ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
              />
              {errors.desc && <p className="text-red-500 text-xs mt-1">{errors.desc.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Tech Stack (comma separated)</label>
              <input {...register('tech')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" placeholder="React, Node.js, Supabase" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Domains (comma separated)</label>
              <input {...register('domains')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" placeholder="Frontend, Backend, AI" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div>
              <label className="block text-sm text-zinc-400 mb-1">Type</label>
              <select {...register('type')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Price</label>
              <input {...register('price')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Live Link</label>
              <input {...register('link')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">GitHub Link</label>
              <input {...register('github')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
        </div>

        <div className="space-y-4">
           <div>
              <label className="block text-sm text-zinc-400 mb-1">Architecture</label>
              <textarea {...register('architecture')} rows={3} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Challenges</label>
              <textarea {...register('challenges')} rows={3} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Performance</label>
              <textarea {...register('performance')} rows={3} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Content (Markdown)</label>
          <textarea {...register('content')} rows={15} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white font-mono text-sm" />
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" {...register('featured')} id="featured" className="w-4 h-4 rounded bg-zinc-900 border-white/10" />
          <label htmlFor="featured" className="text-white">Featured Project</label>
        </div>

        <div className="flex flex-col gap-4">
          {saveStatus && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg text-sm font-mono ${
                saveStatus.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}
            >
              <p className="font-bold mb-1 uppercase tracking-widest text-xs">
                {saveStatus.type === 'success' ? 'System Message' : 'Error Detected'}
              </p>
              {saveStatus.message}
            </motion.div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-mono">
              <p className="font-bold mb-1 uppercase tracking-widest text-xs">Validation Error</p>
              <ul className="list-disc list-inside">
                {Object.entries(errors).map(([key, error]: [string, any]) => (
                  <li key={key}>{key}: {error.message || 'Invalid value'}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50 flex-1"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Project'}
            </button>
            
            <button 
              type="button"
              onClick={copyJson}
              className="flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
            >
              Copy JSON
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
