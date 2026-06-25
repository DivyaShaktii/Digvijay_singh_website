-- Note: RLS is already enabled by default on storage.objects.

-- 1. Allow everyone to view/download images (Public Access)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- 2. Allow authenticated users (like Admin) to upload images
create policy "Admin Upload Access"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'images' );

-- 3. Allow authenticated users to update/replace images
create policy "Admin Update Access"
on storage.objects for update
to authenticated
using ( bucket_id = 'images' );

-- 4. Allow authenticated users to delete images
create policy "Admin Delete Access"
on storage.objects for delete
to authenticated
using ( bucket_id = 'images' );
