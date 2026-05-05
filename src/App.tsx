import { useEffect, useState, useCallback } from "react";

type AppRoute = "home" | "biography" | "courses" | "gallery" | "contact" | "admin";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  price: string;
  youtubeUrl: string;
}

const STORAGE_KEY = "flute_courses";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function loadCourses(): Course[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveCourses(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

const GALLERY_KEY = "flute_gallery";

function loadGalleryImages(): string[] {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveGalleryImages(imgs: string[]) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(imgs));
}

const artistProfile = {
  name: "Digvijaysinh Chauhan",
  role: "Professional Flautist",
  email: "digvijayflute@gmail.com",
  phone: "+91 77890 23982",
  location: "Bhubaneswar, Odisha",
  summary:
    "Disciple of Padma Vibhushan Pandit Hariprasad Chaurasia ji, presenting Hindustani classical flute with deep meditative precision and contemporary flair."
};

const images = {
  hero: "/digvijay_hero_new.jpg",
  bio: "/images/digvijay-performance-blue.png",
  gallery: [
    "/images/digvijay-casual-flute.png",
    "/images/digvijay-performance-blue.png",
    "/images/digvijay-portrait-white.jpeg",
    "/images/digvijay-hero-white.jpeg",
    "/images/digvijay-hero-red.jpeg",
    "/images/digvijay-profile-poster.jpeg"
  ]
};

function App() {
  const [route, setRoute] = useState<AppRoute>(() => {
    const hash = window.location.hash.replace("#/", "") as AppRoute;
    return ["home", "biography", "courses", "gallery", "contact", "admin"].includes(hash) ? hash : "home";
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "") as AppRoute;
      setRoute(["home", "biography", "courses", "gallery", "contact", "admin"].includes(hash) ? hash : "home");
      window.scrollTo(0, 0);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);
    document.title = `${artistProfile.name} | ${artistProfile.role}`;

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDarkMode = route === "home" || route === "biography";
  const isAdmin = route === "admin";

  return (
    <div className="app-container">
      {!isAdmin && (
        <header className={`site-header ${scrolled ? "scrolled" : ""} ${!scrolled && isDarkMode ? "dark-mode" : ""}`}>
          <nav className="nav-container">
            <div className="site-nav">
              <a href="#/home" className="nav-link">Home</a>
              <a href="#/biography" className="nav-link">Biography</a>
              <a href="#/courses" className="nav-link">Courses</a>
              <a href="#/gallery" className="nav-link">Gallery</a>
              <a href="#/contact" className="nav-link">Contact</a>
            </div>
          </nav>
        </header>
      )}

      <main>
        {route === "home" && <HomePage />}
        {route === "biography" && <BiographyPage />}
        {route === "courses" && <CoursesPage />}
        {route === "gallery" && <GalleryPage />}
        {route === "contact" && <ContactPage />}
        {route === "admin" && <AdminPage />}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="text-serif text-italic">Stay Connected</p>
        <div className="social-icons">
          <a href="https://www.youtube.com/@digvijaysinhchauhan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://instagram.com/digvijay_flute" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://facebook.com/DigvijayFlute" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <img src={images.hero} alt={artistProfile.name} />
        </div>
        <div className="hero-content hero-content-top">
          <h1 className="hero-title">{artistProfile.name}</h1>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-container">
          <span className="quote-marks top">“</span>
          <p className="quote-text text-serif text-italic">
            Music is not just sound, it is the silence between the notes that speaks to the soul. 
            The Bansuri is the breath of the divine, a bridge between the physical and the spiritual.
          </p>
          <p className="quote-author">Classical Music Review, India</p>
          <span className="quote-marks bottom">“</span>
        </div>
      </section>

      <section className="split-section">
        <div className="split-image">
          <img src={images.gallery[1]} alt="Performance" />
        </div>
        <div className="split-content">
          <span className="eyebrow">Biography</span>
          <h2 className="split-title">Supreme Interpreter Of The Classical Flute</h2>
          <p className="split-text">
            Trained in the traditional Guru-Shishya Parampara, Digvijaysinh Chauhan brings a rare depth of emotion and technical mastery to the bansuri. His performances are a journey through the meditative landscapes of Indian Ragas.
          </p>
          <a href="#/biography" className="text-gold text-serif text-italic">Read more about the artist →</a>
        </div>
      </section>
    </>
  );
}

function BiographyPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Biography</h1>
      </section>

      <section className="bio-section">
        <div className="bio-grid">
          <img src={images.bio} alt={artistProfile.name} className="bio-image" />
          <div className="bio-content">
            <h3>{artistProfile.name}</h3>
            <div className="bio-text">
              <p>
                Digvijaysinh Chauhan is a renowned Indian classical flautist and a dedicated disciple of Padma Vibhushan Pandit Hariprasad Chaurasia ji. His musical journey is rooted in the authentic Guru-Shishya Parampara system at Vrindaban Gurukul, Bhubaneswar.
              </p>
              <p>
                A PhD scholar in Electronics Engineering, Digvijay represents a rare blend of scientific precision and artistic depth. His style of playing reflects the pure tone, clear raga presentation, and deeply expressive approach of the Maihar tradition.
              </p>
              <p>
                Through his brand 'Flute Roots | Nothing But Music', he is committed to preserving and promoting the traditional art of bansuri while exploring contemporary collaborations that resonate with global audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="recognition">
        <p className="eyebrow">Awards & Recognition</p>
        <div className="logo-grid">
          <span className="text-serif">Sanskar Vibhushan Samman</span>
          <span className="text-serif">CCRT Scholarship</span>
          <span className="text-serif">OMC Foundation Award</span>
          <span className="text-serif">NALCO Cultural Honor</span>
        </div>
      </section>
    </>
  );
}

const placeholderCourses = [
  {
    id: 1,
    title: "Bansuri Basics — Foundation Course",
    level: "Beginner",
    duration: "8 Weeks",
    lessons: 24,
    description: "Master the fundamentals of bansuri playing — breath control, finger technique, and your first ragas.",
    price: "Coming Soon",
  },
  {
    id: 2,
    title: "Raga Exploration — Intermediate",
    level: "Intermediate",
    duration: "12 Weeks",
    lessons: 36,
    description: "Dive deep into Hindustani ragas, learn alap-jod-jhala structures and develop your improvisational skills.",
    price: "Coming Soon",
  },
  {
    id: 3,
    title: "Advanced Raga Rendition",
    level: "Advanced",
    duration: "16 Weeks",
    lessons: 48,
    description: "Master complex ragas, advanced taan patterns, and concert-level performance techniques.",
    price: "Coming Soon",
  },
  {
    id: 4,
    title: "Meditation & Flute — Healing Sounds",
    level: "All Levels",
    duration: "6 Weeks",
    lessons: 18,
    description: "Explore the spiritual dimension of the bansuri through meditative ragas and breathing exercises.",
    price: "Coming Soon",
  },
];

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => { setCourses(loadCourses()); }, []);

  const displayCourses = courses.length > 0 ? courses : placeholderCourses.map(c => ({ ...c, youtubeUrl: "" }));

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Courses</h1>
        <p className="page-hero-subtitle">Learn the art of Bansuri from the tradition of Guru-Shishya Parampara</p>
      </section>

      <section className="courses-section">
        <div className="courses-header">
          <span className="eyebrow">Learn Bansuri</span>
          <h2 className="courses-heading">Master the Classical Flute</h2>
          <p className="courses-desc">
            Whether you are a complete beginner or an advanced player, these carefully designed courses will guide you through the authentic tradition of Hindustani classical flute.
          </p>
        </div>

        <div className="courses-grid">
          {displayCourses.map((course) => {
            const ytId = course.youtubeUrl ? getYouTubeId(course.youtubeUrl) : null;
            return (
              <div key={course.id} className="course-card">
                <div className="course-thumbnail">
                  {ytId ? (
                    <iframe
                      className="course-video-embed"
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={course.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <div className="course-level-badge">{course.level}</div>
                      <svg className="course-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 19V6l12-3v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    </>
                  )}
                  {ytId && <div className="course-level-badge">{course.level}</div>}
                </div>
                <div className="course-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-meta">
                    <span className="course-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {course.duration}
                    </span>
                    <span className="course-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      {course.lessons} Lessons
                    </span>
                  </div>
                  <div className="course-footer">
                    <span className="course-price">{course.price}</span>
                    <button className="course-enroll-btn" disabled>Notify Me</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="courses-cta">
        <div className="courses-cta-content">
          <h2 className="text-serif">Private Lessons Available</h2>
          <p>For personalized one-on-one training in the Guru-Shishya tradition, reach out directly.</p>
          <a href="#/contact" className="courses-cta-btn">Get In Touch</a>
        </div>
      </section>
    </>
  );
}

function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  useEffect(() => { setGalleryImages(loadGalleryImages()); }, []);

  const displayImages = galleryImages.length > 0 ? galleryImages : images.gallery;

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Gallery</h1>
      </section>

      <section className="gallery-grid">
        {displayImages.map((src, i) => (
          <div key={i} className="gallery-item">
            <img src={src} alt={`Gallery image ${i + 1}`} />
          </div>
        ))}
      </section>

      <section className="quote-section">
        <p className="quote-text text-serif text-italic">
          "The bansuri is an extension of the breath, and through it, one breathes life into the silence."
        </p>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Contact</h1>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p className="hero-text">Available for solo recitals, fusion collaborations, and lecture-demonstrations across India and internationally.</p>
          
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <p>Vrindaban Gurukul, K-8 Kalinga Nagar, Bhubaneswar, Odisha 751029</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <p>{artistProfile.phone}</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">✉️</span>
              <p>{artistProfile.email}</p>
            </div>
          </div>

          <div className="map-placeholder">
            [ Interactive Map Placeholder ]
          </div>
        </div>

        <form className="contact-form">
          <h3 style={{marginBottom: '32px'}}>Send A Message</h3>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="Your email" required />
          </div>
          <div className="form-group">
            <label>Message *</label>
            <textarea rows={5} placeholder="How can I help you?" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <footer className="site-footer">
        <div className="footer-col">
          <h4>{artistProfile.name}</h4>
          <p>© 2026 Flute Artist. Powered by Flute Roots.</p>
        </div>
        <div className="footer-col">
          <h4>Address</h4>
          <p>K-8 Kalinga Nagar, Bhubaneswar, Odisha</p>
        </div>
        <div className="footer-col">
          <h4>Phone</h4>
          <p>{artistProfile.phone}</p>
        </div>
        <div className="footer-col">
          <h4>Email</h4>
          <p>{artistProfile.email}</p>
        </div>
      </footer>
    </>
  );
}

function AdminPage() {
  const [courses, setCourses] = useState<Course[]>(loadCourses);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", level: "Beginner", duration: "", lessons: 0, price: "", youtubeUrl: "" });
  const [toast, setToast] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    const stored = loadGalleryImages();
    return stored.length > 0 ? stored : [...images.gallery];
  });
  const [newImageUrl, setNewImageUrl] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const resetForm = () => {
    setForm({ title: "", description: "", level: "Beginner", duration: "", lessons: 0, price: "", youtubeUrl: "" });
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    let updated: Course[];
    if (editingId !== null) {
      updated = courses.map(c => c.id === editingId ? { ...form, id: editingId, lessons: Number(form.lessons) } : c);
      showToast("Course updated successfully!");
    } else {
      const newCourse: Course = { ...form, id: Date.now(), lessons: Number(form.lessons) };
      updated = [...courses, newCourse];
      showToast("Course added successfully!");
    }
    setCourses(updated);
    saveCourses(updated);
    resetForm();
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({ title: course.title, description: course.description, level: course.level, duration: course.duration, lessons: course.lessons, price: course.price, youtubeUrl: course.youtubeUrl });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this course?")) return;
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    saveCourses(updated);
    showToast("Course deleted.");
  };

  const ytPreviewId = form.youtubeUrl ? getYouTubeId(form.youtubeUrl) : null;

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          <a href="#/admin" className="admin-nav-item active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a href="#/courses" className="admin-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Site
          </a>
          <a href="#/home" className="admin-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            Back to Site
          </a>
        </nav>
        <div className="admin-stats">
          <div className="admin-stat"><span className="admin-stat-num">{courses.length}</span><span className="admin-stat-label">Courses</span></div>
          <div className="admin-stat"><span className="admin-stat-num">{galleryImages.length}</span><span className="admin-stat-label">Photos</span></div>
        </div>
      </div>

      <div className="admin-main">
        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-header">
          <h1>{editingId !== null ? "Edit Course" : "Add New Course"}</h1>
          <p className="admin-subtitle">Fill in the details below — just like uploading a YouTube video</p>
        </div>

        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-form-grid">
            <div className="admin-form-left">
              <div className="admin-field">
                <label>Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Bansuri Basics — Foundation Course" required />
              </div>
              <div className="admin-field">
                <label>Description *</label>
                <textarea rows={5} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe what students will learn in this course..." required />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Level</label>
                  <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>Duration</label>
                  <input type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 8 Weeks" />
                </div>
                <div className="admin-field">
                  <label>Lessons</label>
                  <input type="number" value={form.lessons || ""} onChange={e => setForm({...form, lessons: parseInt(e.target.value) || 0})} placeholder="24" />
                </div>
              </div>
              <div className="admin-field">
                <label>Price</label>
                <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="e.g. ₹2,999 or Coming Soon" />
              </div>
            </div>

            <div className="admin-form-right">
              <div className="admin-field">
                <label>YouTube Video URL</label>
                <input type="url" value={form.youtubeUrl} onChange={e => setForm({...form, youtubeUrl: e.target.value})} placeholder="https://www.youtube.com/watch?v=..." />
              </div>
              <div className="admin-preview">
                {ytPreviewId ? (
                  <iframe src={`https://www.youtube.com/embed/${ytPreviewId}`} title="Preview" allowFullScreen className="admin-preview-video" />
                ) : (
                  <div className="admin-preview-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <p>Paste a YouTube URL to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="admin-form-actions">
            {editingId !== null && <button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button>}
            <button type="submit" className="admin-btn admin-btn-primary">{editingId !== null ? "Update Course" : "Add Course"}</button>
          </div>
        </form>

        <div className="admin-list-header">
          <h2>All Courses ({courses.length})</h2>
        </div>

        {courses.length === 0 ? (
          <div className="admin-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <p>No courses yet. Add your first course above!</p>
          </div>
        ) : (
          <div className="admin-course-list">
            {courses.map(course => {
              const ytId = course.youtubeUrl ? getYouTubeId(course.youtubeUrl) : null;
              return (
                <div key={course.id} className="admin-course-row">
                  <div className="admin-course-thumb">
                    {ytId ? (
                      <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" />
                    ) : (
                      <div className="admin-course-thumb-empty">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19V6l12-3v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="admin-course-info">
                    <h4>{course.title}</h4>
                    <p>{course.description.substring(0, 80)}{course.description.length > 80 ? "..." : ""}</p>
                    <div className="admin-course-tags">
                      <span className="admin-tag">{course.level}</span>
                      <span className="admin-tag">{course.duration}</span>
                      <span className="admin-tag">{course.lessons} Lessons</span>
                      {course.price && <span className="admin-tag">{course.price}</span>}
                    </div>
                  </div>
                  <div className="admin-course-actions">
                    <button className="admin-btn-icon" onClick={() => handleEdit(course)} title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(course.id)} title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== Gallery Manager ===== */}
        <div className="admin-list-header" style={{marginTop: '60px'}}>
          <h2>Gallery Manager ({galleryImages.length} images)</h2>
        </div>

        <div className="admin-gallery-add">
          <div className="admin-field" style={{flex: 1}}>
            <label>Image URL</label>
            <input type="url" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
          </div>
          <button type="button" className="admin-btn admin-btn-primary" style={{alignSelf: 'flex-end'}} onClick={() => {
            if (!newImageUrl.trim()) return;
            const updated = [...galleryImages, newImageUrl.trim()];
            setGalleryImages(updated);
            saveGalleryImages(updated);
            setNewImageUrl("");
            showToast("Image added to gallery!");
          }}>Add URL</button>
          <label className="admin-btn admin-btn-ghost" style={{alignSelf: 'flex-end', cursor: 'pointer'}}>
            Upload File
            <input type="file" accept="image/*" style={{display: 'none'}} onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                const updated = [...galleryImages, dataUrl];
                setGalleryImages(updated);
                saveGalleryImages(updated);
                showToast("Image uploaded to gallery!");
              };
              reader.readAsDataURL(file);
              e.target.value = "";
            }} />
          </label>
        </div>

        {galleryImages.length === 0 ? (
          <div className="admin-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <p>No gallery images. Add your first image above!</p>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {galleryImages.map((src, i) => (
              <div key={i} className="admin-gallery-item">
                <img src={src} alt={`Gallery ${i + 1}`} />
                <div className="admin-gallery-overlay">
                  {i > 0 && (
                    <button className="admin-btn-icon" title="Move Left" onClick={() => {
                      const updated = [...galleryImages];
                      [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
                      setGalleryImages(updated);
                      saveGalleryImages(updated);
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                  )}
                  {i < galleryImages.length - 1 && (
                    <button className="admin-btn-icon" title="Move Right" onClick={() => {
                      const updated = [...galleryImages];
                      [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
                      setGalleryImages(updated);
                      saveGalleryImages(updated);
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  )}
                  <button className="admin-btn-icon admin-btn-danger" title="Delete" onClick={() => {
                    if (!confirm("Remove this image?")) return;
                    const updated = galleryImages.filter((_, idx) => idx !== i);
                    setGalleryImages(updated);
                    saveGalleryImages(updated);
                    showToast("Image removed.");
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
