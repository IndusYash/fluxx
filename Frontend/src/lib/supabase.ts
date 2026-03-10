import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url: string) => {
  try { return Boolean(new URL(url)); } catch { return false; }
};

export const supabase =
  supabaseUrl && supabaseKey && isValidUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseKey)
    : null;
