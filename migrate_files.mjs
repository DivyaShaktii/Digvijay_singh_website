import { createClient } from '@supabase/supabase-js';

const oldUrl = 'https://ogiugaqlpvoqunwddjoc.supabase.co';
const oldKey = 'sb_publishable_rygu1LDpnF0RG5iz03DeVA_PB4pPaVQ';
const oldClient = createClient(oldUrl, oldKey);

const newUrl = 'https://wfyvndcialfvggzpooyv.supabase.co';
const newKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeXZuZGNpYWxmdmdnenBvb3l2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTgyOTM5OCwiZXhwIjoyMDk3NDA1Mzk4fQ.hu5Z3mFj9LufL0heaDyQ75m3qj_FRH8kxnmsXEOrOqo';
const newClient = createClient(newUrl, newKey);

async function migrateBucket(oldBucketName, newBucketName) {
  console.log(`Migrating bucket: ${oldBucketName} -> ${newBucketName}`);
  const { data: files, error: listError } = await oldClient.storage.from(oldBucketName).list();
  
  if (listError) {
    console.error(`Error listing ${oldBucketName}:`, listError.message);
    return;
  }
  
  if (!files || files.length === 0) {
    console.log(`No files in ${oldBucketName}.`);
    return;
  }

  for (const file of files) {
    if (file.name === '.emptyFolderPlaceholder') continue;
    
    console.log(`Downloading ${file.name}...`);
    const { data: fileData, error: downloadError } = await oldClient.storage.from(oldBucketName).download(file.name);
    
    if (downloadError) {
      console.error(`Error downloading ${file.name}:`, downloadError.message);
      continue;
    }
    
    console.log(`Uploading ${file.name} to ${newBucketName}...`);
    const { error: uploadError } = await newClient.storage.from(newBucketName).upload(file.name, fileData, {
      upsert: true,
      contentType: file.metadata?.mimetype || 'image/jpeg'
    });
    
    if (uploadError) {
      console.error(`Error uploading ${file.name}:`, uploadError.message);
    } else {
      console.log(`Successfully migrated ${file.name}`);
    }
  }
}

async function updateDatabaseUrls() {
  console.log('Updating database URLs...');
  const oldPrefixes = [
    `${oldUrl}/storage/v1/object/public/gallery-photos/`,
    `${oldUrl}/storage/v1/object/public/course-media/`,
    `${oldUrl}/storage/v1/object/public/images/`
  ];
  const newPrefix = `${newUrl}/storage/v1/object/public/images/`;

  // Update Courses
  const { data: courses } = await newClient.from('courses').select('*');
  if (courses) {
    for (const course of courses) {
      let updated = false;
      let newImage = course.image_url;
      let newPdf = course.notes_pdf_url;
      
      for (const oldPrefix of oldPrefixes) {
        if (newImage && newImage.startsWith(oldPrefix)) {
          newImage = newImage.replace(oldPrefix, newPrefix);
          updated = true;
        }
        if (newPdf && newPdf.startsWith(oldPrefix)) {
          newPdf = newPdf.replace(oldPrefix, newPrefix);
          updated = true;
        }
      }
      
      if (updated) {
        await newClient.from('courses').update({ image_url: newImage, notes_pdf_url: newPdf }).eq('id', course.id);
        console.log(`Updated URLs for course: ${course.title}`);
      }
    }
  }

  // Update Gallery
  const { data: gallery } = await newClient.from('gallery').select('*');
  if (gallery) {
    for (const item of gallery) {
      let updated = false;
      let newUrlVal = item.url;
      
      for (const oldPrefix of oldPrefixes) {
        if (newUrlVal && newUrlVal.startsWith(oldPrefix)) {
          newUrlVal = newUrlVal.replace(oldPrefix, newPrefix);
          updated = true;
        }
      }
      
      if (updated) {
        await newClient.from('gallery').update({ url: newUrlVal }).eq('id', item.id);
        console.log(`Updated URL for gallery item: ${item.title}`);
      }
    }
  }

  // Update Settings
  const { data: settings } = await newClient.from('settings').select('*');
  if (settings) {
    for (const item of settings) {
      let updated = false;
      let newVal = item.value;
      
      if (typeof newVal === 'string') {
        for (const oldPrefix of oldPrefixes) {
          if (newVal.startsWith(oldPrefix)) {
            newVal = newVal.replace(oldPrefix, newPrefix);
            updated = true;
          }
        }
        if (updated) {
          await newClient.from('settings').update({ value: newVal }).eq('key', item.key);
          console.log(`Updated URL for setting: ${item.key}`);
        }
      }
    }
  }
}

async function run() {
  await migrateBucket('gallery-photos', 'images');
  await migrateBucket('course-media', 'images');
  await migrateBucket('images', 'images');
  
  await updateDatabaseUrls();
  console.log('All files and URLs migrated successfully!');
}

run();
