import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const oldUrl = 'https://ogiugaqlpvoqunwddjoc.supabase.co';
const oldKey = 'sb_publishable_rygu1LDpnF0RG5iz03DeVA_PB4pPaVQ';
const oldClient = createClient(oldUrl, oldKey);

function escapeSqlString(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str !== 'string') return `'${JSON.stringify(str).replace(/'/g, "''")}'`;
  return `'${str.replace(/'/g, "''")}'`;
}

async function generateTableSql(tableName) {
  const { data, error } = await oldClient.from(tableName).select('*');
  if (error || !data || data.length === 0) return '';
  
  let sql = `-- Migration for table: ${tableName}\n`;
  for (const row of data) {
    // Remove columns that might not exist in the new DB (like updated_at for settings)
    if (tableName === 'settings') {
      delete row.updated_at;
    }
    
    const keys = Object.keys(row);
    const cols = keys.map(k => `"${k}"`).join(', ');
    const vals = keys.map(k => escapeSqlString(row[k])).join(', ');
    
    sql += `INSERT INTO ${tableName} (${cols}) VALUES (${vals}) ON CONFLICT DO NOTHING;\n`;
  }
  return sql + '\n';
}

async function run() {
  let finalSql = '';
  finalSql += await generateTableSql('settings');
  finalSql += await generateTableSql('courses');
  finalSql += await generateTableSql('gallery');
  finalSql += await generateTableSql('events');
  
  fs.writeFileSync('migration_data.sql', finalSql);
  console.log('SQL generated successfully at migration_data.sql');
}

run();
