import { createClient } from '@supabase/supabase-js';

const newUrl = 'https://wfyvndcialfvggzpooyv.supabase.co';
const newKey = 'sb_publishable_CRjJ-G1cDkgV5Eaic7MOOQ_ML5nBRE6';
const newClient = createClient(newUrl, newKey);

async function checkSettings() {
  const { data, error } = await newClient.from('settings').select('*');
  if (error) {
    console.error("Error reading settings:", error);
  } else {
    console.log("Settings:");
    data.forEach(s => console.log(`${s.key}: ${s.value}`));
  }
}

checkSettings();
