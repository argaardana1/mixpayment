import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bzyuoiibybmujvpnvlsa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6eXVvaWlieWJtdWp2cG52bHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTEyMzUsImV4cCI6MjA5MDYyNzIzNX0.gmG-mBcvnbiUpPj6DqxhKVMvPk_c_CiJVsU9inOqsrA';

if (!supabaseUrl || supabaseUrl === 'undefined') {
  throw new Error('Supabase URL is missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
