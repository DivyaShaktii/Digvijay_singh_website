import { createClient } from '@supabase/supabase-js';

const oldUrl = 'https://ogiugaqlpvoqunwddjoc.supabase.co';
const oldKey = 'sb_publishable_rygu1LDpnF0RG5iz03DeVA_PB4pPaVQ';

const newUrl = 'https://wfyvndcialfvggzpooyv.supabase.co';
const newKey = 'sb_publishable_CRjJ-G1cDkgV5Eaic7MOOQ_ML5nBRE6';

const oldClient = createClient(oldUrl, oldKey);
const newClient = createClient(newUrl, newKey);

async function migrateTable(tableName) {
  console.log(`Migrating table: ${tableName}...`);
  const { data, error } = await oldClient.from(tableName).select('*');
  
  if (error) {
    console.error(`Error reading ${tableName}:`, error);
    return;
  }
  
  if (!data || data.length === 0) {
    console.log(`Table ${tableName} is empty, skipping.`);
    return;
  }
  
  console.log(`Read ${data.length} rows from ${tableName}. Inserting to new DB...`);
  
  // Try to insert everything
  const { error: insertError } = await newClient.from(tableName).upsert(data);
  
  if (insertError) {
    console.error(`Error inserting to ${tableName}:`, insertError);
  } else {
    console.log(`Successfully migrated ${tableName}!`);
  }
}

async function run() {
  await migrateTable('settings');
  await migrateTable('courses');
  await migrateTable('gallery');
  await migrateTable('events');
  console.log('Migration finished!');
}

run();
