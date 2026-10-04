import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShieldAlert, Lock, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/admin';

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setAuthError(null);
      if (!supabase) {
        throw new Error('Supabase configuration not detected.');
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface border border-border rounded-lg p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4">
          <div className="text-[10px] font-mono text-fg-subtle uppercase tracking-widest">Auth_v2.4.0</div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-surface-raised rounded-full border border-border mb-4">
            <ShieldAlert className="text-accent" size={28} />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-medium text-fg tracking-wider mb-1 uppercase font-mono">Terminal Access</h1>
            <p className="text-xs text-fg-subtle font-mono">Authorized Engineering Credentials Required</p>
          </div>
        </div>

        {authError && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-3 bg-danger-subtle border border-danger/30 rounded flex items-start gap-2.5 text-danger font-mono text-xs"
          >
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>ERROR: {authError.toUpperCase()}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-mono text-fg-muted">User_Identifier</label>
              {errors.email && <span className="text-[10px] text-danger uppercase font-mono">Required</span>}
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" size={15} />
              <input 
                {...register('email', { required: true })}
                type="email"
                className={`w-full bg-surface-raised border ${errors.email ? 'border-danger/50' : 'border-border'} rounded py-2.5 pl-9 pr-3 text-fg font-mono text-xs focus:outline-none focus:border-accent transition-colors placeholder:text-fg-subtle`}
                placeholder="EMAIL_ADDRESS"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-mono text-fg-muted">Access_Key</label>
              {errors.password && <span className="text-[10px] text-danger uppercase font-mono">Required</span>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" size={15} />
              <input 
                {...register('password', { required: true })}
                type="password"
                className={`w-full bg-surface-raised border ${errors.password ? 'border-danger/50' : 'border-border'} rounded py-2.5 pl-9 pr-3 text-fg font-mono text-xs focus:outline-none focus:border-accent transition-colors placeholder:text-fg-subtle`}
                placeholder="PASSWORD"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-fg text-dark font-mono font-medium py-2.5 rounded text-xs uppercase tracking-wider hover:bg-accent hover:text-on-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Verifying...' : 'Initialize Session'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-border flex justify-between items-center">
          <div className="text-[10px] font-mono text-fg-subtle uppercase tracking-widest">Secure_Layer_Active</div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
