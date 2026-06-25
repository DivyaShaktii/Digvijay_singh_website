# Environment Variables Required from Client

To successfully deploy and run the **Flute Roots** application, we need a few secret keys from your accounts. Please provide the following environment variables. 

> **⚠️ Security Note:** Do not share these keys publicly. Please send them securely.

---

## 1. Supabase (Database & Authentication)
We are using Supabase as our backend database and for user login authentication. 

You can find these in your Supabase Dashboard:
1. Go to your project.
2. Click on the **Settings** (gear icon) in the bottom left.
3. Click on **API** under Configuration.

Please provide:
* `VITE_SUPABASE_URL`: (The Project URL)
* `VITE_SUPABASE_ANON_KEY`: (The Project API Key labeled "anon" / "public")

---

## 2. Bunny.net (Video Hosting)
Since Flute Roots is an LMS selling courses, we are using **Bunny Stream** to host the video lessons. Bunny Stream protects the videos from being downloaded and provides fast adaptive streaming.

You can find these in your Bunny.net Dashboard:
1. Go to **Stream** on the left menu.
2. Click on the **Video Library** you created for this project.
3. Go to **API** on the left sidebar of the library.

Please provide:
* `VITE_BUNNY_STREAM_LIBRARY_ID`: (The ID of your Video Library)
* `VITE_BUNNY_STREAM_API_KEY`: (The API Key for this specific Video Library)

---

## Example `.env` format
For our reference, the `.env` file structure will look like this:

```env
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

VITE_BUNNY_STREAM_LIBRARY_ID="your-library-id"
VITE_BUNNY_STREAM_API_KEY="your-library-api-key"
```
