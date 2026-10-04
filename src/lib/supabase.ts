import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const isValidSupabaseConfig = (url: string, key: string): boolean => {
  if (!url || !key) return false;
  if (
    url.includes('your-project') ||
    url.includes('example.com') ||
    url.includes('placeholder') ||
    key.includes('your-anon-key') ||
    key.includes('placeholder') ||
    key.length < 20
  ) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const supabase: SupabaseClient | null = isValidSupabaseConfig(rawUrl, rawKey)
  ? createClient(rawUrl, rawKey)
  : null;
