import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing:', {
    url: supabaseUrl ? '✓ Set' : '✗ Missing VITE_SUPABASE_URL',
    key: supabaseAnonKey ? '✓ Set' : '✗ Missing VITE_SUPABASE_ANON_KEY'
  });
}

// Create client with error handling
let supabase = null;
try {
  supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
} catch (err) {
  console.error('❌ Failed to create Supabase client:', err);
}

export { supabase }
