import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'motion/react';
import { Lock, Mail, AlertCircle, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (!supabase) {
      setAuthError("Supabase is not configured. Authentication unavailable.");
      return;
    }
    
    setLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-panel border-dashed-subtle p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4">
          <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Auth_v2.4.0</div>
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-emerald-500/5 rounded-full border border-emerald-500/10 mb-4">
            <ShieldAlert className="text-emerald-500" size={32} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-light text-white tracking-tight mb-1 uppercase tracking-[0.2em]">Terminal Access</h1>
            <p className="text-micro text-zinc-500 uppercase tracking-widest">Restricted Area // Authorization Required</p>
          </div>
        </div>

        {authError && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded flex items-start gap-3 text-red-400 text-xs font-mono"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>ERROR: {authError.toUpperCase()}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-micro text-zinc-500 uppercase tracking-widest">User_Identifier</label>
              {errors.email && <span className="text-[10px] text-red-500 uppercase font-mono">Required</span>}
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                {...register('email', { required: true })}
                type="email"
                className={`w-full bg-white/[0.02] border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded py-3.5 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/30 transition-all placeholder:text-zinc-700`}
                placeholder="EMAIL_ADDRESS"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-micro text-zinc-500 uppercase tracking-widest">Access_Key</label>
              {errors.password && <span className="text-[10px] text-red-500 uppercase font-mono">Required</span>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                {...register('password', { required: true })}
                type="password"
                className={`w-full bg-white/[0.02] border ${errors.password ? 'border-red-500/50' : 'border-white/5'} rounded py-3.5 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/30 transition-all placeholder:text-zinc-700`}
                placeholder="PASSWORD"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded text-xs uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="relative z-10">{loading ? 'Verifying...' : 'Initialize Session'}</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Secure_Layer_Active</div>
          <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
