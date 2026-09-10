import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporary debug logs
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);
console.log('All env vars:', import.meta.env);

export const supabase = createClient(supabaseUrl, supabaseKey);
