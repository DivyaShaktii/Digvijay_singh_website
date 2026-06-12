# Flute Roots - Technical Specifications & Architecture

## 1. Tech Stack & Architecture
- **Frontend Framework**: React 18 with TypeScript.
- **Build Tool**: Vite.
- **Styling**: Pure CSS (`styles.css`) utilizing a custom design system with CSS variables (nature-inspired palette: olives, greens, gold). It includes embedded SVG motifs (bamboo stalks, leaves) for visual aesthetics.
- **Backend & Database**: **Supabase** (PostgreSQL). It acts as your backend-as-a-service, handling both the database and user authentication.
- **Routing**: Custom state-based routing (`AppRoute`) inside `App.tsx` utilizing the HTML5 History API (`window.history.pushState`) rather than a heavy third-party router.

## 2. Core Features & Routes
The app features several primary views controlled by a state machine in `App.tsx`:
- **Home (`/`)**: A landing page featuring an autoplaying hero audio snippet, an introductory YouTube video embed, and call-to-actions.
- **Courses (`/FluteRoots`)**: A Learning Management System (LMS) interface where users can browse courses, see announcements, view the weekly class schedule, and enroll.
- **Course Player (`/coursePlayer`)**: A dedicated interface for students to watch the video content of courses they are enrolled in.
- **Biography (`/biography`)**: Detailed background on the artist, Digvijaysinh Chauhan.
- **Organizers Corner (`/organizersCorner`)**: A portfolio/press-kit section tailored for event organizers containing a gallery, stage setup requirements, and availability calendar.
- **Contact (`/contact`)**: Standard contact and booking information.

## 3. Authentication & Admin Dashboard (`/admin` & `/login`)
- **Authentication**: Managed by Supabase Auth (`supabase.auth.getSession()`).
- **Role-Based Access Control (RBAC)**: Admin rights are hardcoded to specific emails (`digvijayflute@gmail.com` and `janhavikolekar280@gmail.com`). 
- **Admin Dashboard**: If an admin logs in, they get access to a powerful UI to dynamically manage:
  - Course creation and editing.
  - Gallery images.
  - Dynamic text (announcements, bio paragraphs, awards).
  - Weekly schedules and Calendar events.
  - Hero images/audio and introductory videos.

## 4. Database Schema (Supabase Tables Used)
Based on the API calls, the app relies on 5 main tables:
1. `courses`: Stores course metadata (title, description, price, video_url).
2. `enrollments`: Maps users to courses they have access to (`user_id`, `course_id`).
3. `gallery`: Stores image URLs and display ordering for the portfolio.
4. `events`: Stores dates and types of events (performances, classes, blocked dates).
5. `settings`: A flexible key-value store used to dynamically update site content (e.g., `hero_image_url`, `bio_paragraphs_json`, `weekly_schedule_json`) without needing a code redeploy.

## 5. Notable Integrations & Utilities
- **YouTube Parsing**: Custom logic to automatically extract YouTube IDs from standard URLs to embed them natively via iframes.
- **Image Processing**: Integrates `@imgly/background-removal` for potential on-the-fly image manipulation.
- **Local Caching**: Extensively uses `localStorage` to cache settings, courses, and schedules so the site remains fast and doesn't flicker while waiting for Supabase to respond.
