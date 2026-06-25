# Flute Roots - Platform Overview & Setup Guide

Welcome to the technical overview for the **Flute Roots** Learning Management System (LMS) and Portfolio. This document explains how the platform is built, what services power it, and what information is required to launch it.

---

## 1. Platform Architecture Explained

To keep the platform fast, secure, and cost-effective, we are using a modern "serverless" architecture split across three main services:

### A. The Frontend (The Website Itself)
* **Technology**: React.js 
* **Purpose**: This is the visual interface that your users interact with. It handles the routing between pages (Home, Courses, Course Player, Biography, etc.) and provides the Admin Dashboard.
* **Hosting**: (e.g., Vercel, Netlify, or GitHub Pages depending on your deployment choice).

### B. The Backend & Database (Supabase)
* **Technology**: Supabase (PostgreSQL Database)
* **Purpose**: Supabase acts as the "brain" of the operation. It securely handles:
  * **User Login & Authentication**: Managing student accounts.
  * **Database Storage**: Storing course details, enrollments, gallery images, and dynamic text (like announcements and weekly schedules).
* **Why Supabase?**: It provides real-time database capabilities and highly secure authentication out-of-the-box, ensuring student data is safe.

### C. Video Hosting (Bunny Stream)
* **Technology**: Bunny.net (Bunny Stream)
* **Purpose**: Hosting the actual video files for the paid courses. 
* **Why Bunny Stream?**: 
  1. **Piracy Protection**: Standard video hosting allows users to easily right-click and download videos. Bunny Stream uses HLS streaming to protect your paid content from being easily stolen.
  2. **Fast Loading**: It automatically adjusts the video quality based on the student's internet speed (adaptive bitrate streaming), preventing constant buffering.
  3. **Cost-Effective**: It is significantly cheaper than hosting massive video files directly on your own server.

---

## 2. Managing Your Content

Once the site is live, you won't need to touch the code to update content. 

1. **The Admin Dashboard**: By logging in with an authorized admin email (e.g., `digvijayflute@gmail.com`), you unlock the `/admin` page. From here, you can dynamically update:
   * Course details and pricing.
   * Announcements and weekly schedules.
   * Biography text and gallery images.
2. **Uploading Videos**: 
   * You will upload your raw `.mp4` video files directly into your **Bunny Stream Video Library**.
   * Bunny Stream will give you a specific Video ID or URL for that upload.
   * You simply paste that Video URL into the Course creation form on your Admin Dashboard.

---

## 3. Action Required: Environment Variables

To connect the website to your specific Supabase and Bunny.net accounts, we need a few "secret keys" from your dashboards. 

> **⚠️ Security Note:** Do not share these keys publicly. Please send them securely to your developer.

### Step 1: Get Supabase Keys
1. Log into your Supabase Dashboard and select your project.
2. Click on the **Settings** (gear icon) in the bottom left.
3. Click on **API** under Configuration.
**Please provide:**
* `Project URL`
* `Project API Key` (The one labeled "anon" or "public")

### Step 2: Get Bunny Stream Keys
1. Log into your Bunny.net Dashboard.
2. Go to **Stream** on the left menu.
3. Click on the **Video Library** you created for the courses.
4. Go to **API** on the left sidebar of that library.
**Please provide:**
* `Video Library ID`
* `API Key` (The key for this specific Video Library)

Once these keys are securely provided, they will be plugged into the platform, and the website will be fully connected to your accounts and ready to launch!
