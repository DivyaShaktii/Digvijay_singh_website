-- Allow public read access for enrollments
create policy "Public Select Access Enrollments" on enrollments for select using (true);

-- Allow authenticated users (Admin) full access to modify enrollments
create policy "Admin Modify Enrollments" on enrollments for all to authenticated using (true) with check (true);

-- Optional: Allow anyone to insert enrollments (if users don't need to be logged in to enroll)
-- (If your website lets random visitors enroll, run this line too:)
create policy "Public Insert Access Enrollments" on enrollments for insert with check (true);
