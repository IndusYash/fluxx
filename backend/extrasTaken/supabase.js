import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  try { return Boolean(new URL(url)); } catch { return false; }
};

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Supabase URL or KEY not set in environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (recommended) or SUPABASE_KEY.');
}

export const supabase = (SUPABASE_URL && SUPABASE_KEY && isValidUrl(SUPABASE_URL))
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

export default supabase;
