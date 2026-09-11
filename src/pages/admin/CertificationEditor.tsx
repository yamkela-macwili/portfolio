import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function CertificationEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (!isNew && id) {
      async function fetchCert() {
        try {
          const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          if (data) reset(data);
        } catch (err) {
          console.error(err);
          setSaveStatus({ type: 'error', message: 'Error loading certification entry' });
        } finally {
          setLoading(false);
        }
      }
      fetchCert();
    }
  }, [id, isNew, reset]);

  const onSubmit = async (data: any) => {
    setSaveStatus(null);
    if (!supabase) return;
    setSaving(true);

    try {
      if (isNew) {
        const { error } = await supabase.from('certifications').insert([data]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('certifications').update(data).eq('id', id);
        if (error) throw error;
      }

      setSaveStatus({ type: 'success', message: 'Certification saved successfully!' });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err: any) {
      console.error(err);
      setSaveStatus({ type: 'error', message: `Error saving: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  if (loading) return <div className="pt-32 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-2xl font-light text-white">{isNew ? 'New Certification' : 'Edit Certification'}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <Trash2 size={18} /> Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input 
              {...register('title', { required: 'Title is required' })} 
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Issuer</label>
            <input 
              {...register('issuer', { required: 'Issuer is required' })} 
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Date (e.g., 2023)</label>
            <input 
              {...register('date', { required: 'Date is required' })} 
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Link</label>
            <input 
              {...register('link')} 
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white" 
            />
          </div>
        </div>

        {saveStatus && (
          <div className={`p-4 rounded-lg text-sm ${saveStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {saveStatus.message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={saving}
          className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Certification'}
        </button>
      </form>
    </div>
  );
}
