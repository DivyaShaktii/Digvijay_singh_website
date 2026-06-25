import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfyvndcialfvggzpooyv.supabase.co';
const supabaseKey = 'sb_publishable_CRjJ-G1cDkgV5Eaic7MOOQ_ML5nBRE6';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing Supabase connection...");
  
  // 1. Test database access
  const { data, error } = await supabase.from('courses').select('id').limit(1);
  if (error) {
    console.error("❌ ERROR: Could not connect to database or 'courses' table is missing.");
    console.error("Details:", error.message);
  } else {
    console.log("✅ SUCCESS: Connected to the database and tables exist!");
  }

  // 2. Test storage access
  const { data: bucket, error: bucketError } = await supabase.storage.getBucket('images');
  if (bucketError) {
    console.error("❌ ERROR: Could not access the 'images' storage bucket.");
    console.error("Details:", bucketError.message);
  } else {
    console.log("✅ SUCCESS: 'images' storage bucket exists and is accessible!");
  }
}

testConnection();
