-- SUPABASE DATABASE SETUP SCRIPT FOR FLUTE ROOTS
-- Paste this entire file into the "SQL Editor" in your Supabase Dashboard and click "Run"

-- 1. Create the 'courses' table
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  level text,
  duration text,
  lessons integer,
  price text,
  video_url text,
  thumbnail_url text,
  notes_url text,
  announcement text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the 'enrollments' table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- 3. Create the 'gallery' table
CREATE TABLE IF NOT EXISTS public.gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the 'events' table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date text NOT NULL, -- format YYYY-MM-DD
  title text NOT NULL,
  type text NOT NULL, -- 'performance', 'class', 'blocked', 'available'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create the 'settings' table (for dynamic site content)
CREATE TABLE IF NOT EXISTS public.settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies allowing ANYONE to READ the data (so the website can load it)
CREATE POLICY "Allow public read access on courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON public.settings FOR SELECT USING (true);

-- For enrollments, a user can only read their OWN enrollments
CREATE POLICY "Allow individual read access on enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);

-- NOTE FOR ADMIN ACCESS:
-- To allow admins (like digvijayflute@gmail.com) to insert/update/delete records from the /admin page,
-- you will either need to set up an 'admin' role in Supabase or temporarily allow all operations during development:
-- (Uncomment the lines below to allow full access temporarily, but remember to secure this later!)

-- CREATE POLICY "Allow full access courses" ON public.courses FOR ALL USING (true);
-- CREATE POLICY "Allow full access gallery" ON public.gallery FOR ALL USING (true);
-- CREATE POLICY "Allow full access events" ON public.events FOR ALL USING (true);
-- CREATE POLICY "Allow full access settings" ON public.settings FOR ALL USING (true);
-- CREATE POLICY "Allow full access enrollments" ON public.enrollments FOR ALL USING (true);

-- 6. Insert some default settings so the site doesn't crash on first load
INSERT INTO public.settings (key, value) VALUES
  ('hero_image_url', '/digvijay_hero_final.png'),
  ('bio_image_url', '/images/digvijay-performance-blue.png')
ON CONFLICT (key) DO NOTHING;
