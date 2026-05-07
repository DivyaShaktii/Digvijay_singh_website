import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogiugaqlpvoqunwddjoc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naXVnYXFscHZvcXVud2Rkam9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzIyMDAsImV4cCI6MjA5MzY0ODIwMH0.tsxRBV6T6HaB9Xgg9bAaoU3HSGhc70ktMjMFhFcEwRQ'

console.log("Supabase initialized with URL:", supabaseUrl);
console.log("Supabase Key length:", supabaseAnonKey?.length);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
