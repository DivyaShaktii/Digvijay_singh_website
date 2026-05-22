const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ogiugaqlpvoqunwddjoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naXVnYXFscHZvcXVud2Rkam9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzIyMDAsImV4cCI6MjA5MzY0ODIwMH0.tsxRBV6T6HaB9Xgg9bAaoU3HSGhc70ktMjMFhFcEwRQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching gallery:', error);
    return;
  }
  console.log('Gallery images in DB:');
  console.log(JSON.stringify(data, null, 2));
}

run();
