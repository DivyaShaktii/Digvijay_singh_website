-- Allow public read access for all tables
create policy "Public Select Access Settings" on settings for select using (true);
create policy "Public Select Access Courses" on courses for select using (true);
create policy "Public Select Access Gallery" on gallery for select using (true);
create policy "Public Select Access Events" on events for select using (true);

-- Allow authenticated users (Admin) full access to modify settings
create policy "Admin Modify Settings" on settings for all to authenticated using (true) with check (true);

-- Allow authenticated users (Admin) full access to modify courses
create policy "Admin Modify Courses" on courses for all to authenticated using (true) with check (true);

-- Allow authenticated users (Admin) full access to modify gallery
create policy "Admin Modify Gallery" on gallery for all to authenticated using (true) with check (true);

-- Allow authenticated users (Admin) full access to modify events
create policy "Admin Modify Events" on events for all to authenticated using (true) with check (true);
