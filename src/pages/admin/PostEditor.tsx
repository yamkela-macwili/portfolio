import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { usePost } from '../../hooks/useContent';

export default function PostEditor() {
  const { slug } = useParams();
  const isNew = !slug;
  const navigate = useNavigate();
  const { post, loading: initialLoading } = usePost(slug);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

  // Update form when post data loads
  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post, reset]);

  const copyJson = () => {
    const values = getValues();
    // Clean values for JSON copy
    const { id, created_at, ...cleanValues } = values;
    
    navigator.clipboard.writeText(JSON.stringify(cleanValues, null, 2));
    setSaveStatus({ type: 'success', message: 'Post JSON copied to clipboard! You can use this to update src/data.ts' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const onSubmit = async (data: any) => {
    setSaveStatus(null);
    if (!supabase) {
      alert('Supabase is not configured. Saving is disabled. Use "Copy JSON" to save manually to src/data.ts');
      return;
    }
    setSaving(true);

    try {
      // Remove created_at as it's handled by DB
      const { created_at, ...payloadData } = data;

      if (isNew) {
        const { error } = await supabase.from('posts').insert([payloadData]);
        if (error) throw error;
      } else {
        // Use upsert to handle both local-to-DB migration and existing DB updates
        // If we have an id, we use it for onConflict to allow slug changes
        // If not (local post), we use 'slug' to avoid duplicates
        const conflictTarget = payloadData.id ? 'id' : 'slug';
        const { error } = await supabase.from('posts').upsert(payloadData, { onConflict: conflictTarget });
        if (error) throw error;
      }

      setSaveStatus({ type: 'success', message: 'Post saved successfully!' });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err: any) {
      console.error('Save error:', err);
      let message = err.message || 'Unknown error';
      
      if (message.includes('column "excerpt" of relation "posts" does not exist') || 
          message.includes("Could not find the 'excerpt' column") ||
          message.includes('column "readTime" of relation "posts" does not exist') ||
          message.includes("Could not find the 'readTime' column")) {
        const missingCol = message.includes('excerpt') ? 'excerpt' : 'readTime';
        message = `Database Schema Mismatch: The "${missingCol}" column is missing from your Supabase "posts" table. Please add it using the SQL Editor in your Supabase dashboard.`;
      }
      
      setSaveStatus({ type: 'error', message: `Error saving post: ${message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    if (!supabase) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('slug', slug);
      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Error deleting post');
    }
  };

  if (!isNew && initialLoading) return <div className="pt-32 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-2xl font-light text-white">{isNew ? 'New Post' : 'Edit Post'}</h1>
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
              <input 
                {...register('category', { required: 'Category is required' })} 
                className={`w-full bg-zinc-900 border ${errors.category ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
              />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message as string}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Date</label>
              <input 
                type="date" 
                {...register('date', { required: 'Date is required' })} 
                className={`w-full bg-zinc-900 border ${errors.date ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Read Time</label>
              <input {...register('readTime')} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" placeholder="5 min read" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Excerpt</label>
          <textarea 
            {...register('excerpt', { required: 'Excerpt is required' })} 
            rows={3} 
            className={`w-full bg-zinc-900 border ${errors.excerpt ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white`} 
          />
          {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Content (Markdown)</label>
          <textarea {...register('content')} rows={20} className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white font-mono text-sm" />
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
              <Save size={18} /> {saving ? 'Saving...' : 'Save Post'}
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
