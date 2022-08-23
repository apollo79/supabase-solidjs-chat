import { createClient } from '@supabase/supabase-js';

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY);

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabaseClient as supabase };

export default supabaseClient;

/**
 * Convenience re-exports for typed selections
 *
 */
export const auth = supabaseClient.auth;

export const storage = supabaseClient.storage;
