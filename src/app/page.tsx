"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Palette,
  TrendingUp,
  MessageCircle,
  MapPin,
  Copy,
  Mail,
  Share2
} from "lucide-react";

// --- Custom Minimal SVGs ---
const IconLinkedin = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const IconInstagram = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const IconFileText = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);

// --- Underline Doodles ---
const DoodleHeroSwirl = () => (
  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[var(--text)] opacity-60 pointer-events-none overflow-visible" viewBox="0 0 260 14" fill="none" preserveAspectRatio="none">
    <motion.path
      d="M 4 8 C 50 2, 110 12, 160 6 C 190 2, 215 10, 255 7"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
    />
  </svg>
);

const DoodleArrowSweep = () => (
  <svg className="absolute -bottom-2.5 left-0 w-full h-4 text-[var(--text)] opacity-60 pointer-events-none overflow-visible" viewBox="0 0 320 16" fill="none" preserveAspectRatio="none">
    <motion.path
      d="M 4 10 Q 80 2, 170 12 T 310 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
    />
  </svg>
);

const DoodleCleanUnderline = () => (
  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[var(--text)] opacity-70 pointer-events-none overflow-visible" viewBox="0 0 340 12" fill="none" preserveAspectRatio="none">
    <motion.path
      d="M 2 6 C 70 2, 170 10, 338 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
    />
  </svg>
);

const DoodlePulseLine = () => (
  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[var(--text)] opacity-70 pointer-events-none overflow-visible" viewBox="0 0 220 12" fill="none" preserveAspectRatio="none">
    <motion.path
      d="M 2 6 H 65 L 75 2 L 85 10 L 95 3 L 105 7 H 218" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.85 }}
    />
  </svg>
);

// 4-Node Focus Badge (Removed Systems & Comms)
const MinimalFocusBadge = () => (
  <div className="relative w-52 sm:w-56 h-auto rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-sm group hover:border-[var(--text)] transition-colors">
    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-subtle)] mb-3">
      <span>[ CORE NODES ]</span>
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    </div>
    
    <div className="grid grid-cols-2 gap-2 my-1">
      {[
        { label: "Strategy", code: "01" },
        { label: "Design", code: "02" },
        { label: "Markets", code: "03" },
        { label: "Marketing", code: "04" }
      ].map((item) => (
        <div key={item.code} className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--text-muted)] truncate pr-1">{item.label}</span>
          <span className="text-[var(--text-subtle)] shrink-0">{item.code}</span>
        </div>
      ))}
    </div>

    <div className="text-[10px] font-mono text-[var(--text-subtle)] flex items-center justify-between border-t border-[var(--border)]/60 pt-2 mt-3">
      <span>FOCUS MATRIX</span>
      <span className="text-[var(--text)] font-semibold">4 Core Nodes</span>
    </div>
  </div>
);

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
  readTime: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    slug: "why-creativity-needs-strategy",
    title: "Why creativity becomes truly valuable only when backed by strategy",
    category: "Brand Strategy",
    date: "2026-09-15",
    readTime: "4 min read",
    excerpt: "Making things look good is only half the work. True creative impact comes from understanding why a brand exists, who it serves, and the business problem it solves.",
    body: [
      "In graphic design and branding, it is easy to get caught up in aesthetic trends, colors, and typography. But over time, working across both creative design and business development, I realized that aesthetics without strategy rarely produce lasting business value.",
      "Good design catches attention, but strategic positioning builds trust. Before sketching a logo or planning a website layout, you have to ask the fundamental commercial questions: What specific problem are we solving? What expectation are we setting in the client's mind? And can the business consistently deliver on that expectation?",
      "When creativity is anchored to a clear business objective, design stops being a decorative expense and becomes a powerful commercial asset. It communicates value before a word is read and removes friction for the decision-maker."
    ]
  },
  {
    slug: "international-client-outreach",
    title: "What international client outreach taught me about business development",
    category: "Business Development",
    date: "2026-08-20",
    readTime: "5 min read",
    excerpt: "Notes from lead generation and client communication at WebX Nepal. Why listening and understanding client requirements beats high-pressure pitches.",
    body: [
      "Stepping into business development at WebX Nepal, I was tasked with international outreach, lead generation, and digital positioning. Coming in with a design and IT background, I initially wondered how much persuasion would be required.",
      "What I quickly discovered was that effective business development is not about aggressive selling. It is about careful research, active listening, and diagnosing what a prospective partner actually needs before proposing a digital solution.",
      "When you take the time to understand a client's workflows, target audience, and current bottlenecks, the commercial proposal almost writes itself. Genuine communication and clear expectations build partnerships that last."
    ]
  },
  {
    slug: "teaching-financial-markets",
    title: "What educating others on financial markets taught me about risk and patience",
    category: "Financial Markets",
    date: "2026-07-10",
    readTime: "6 min read",
    excerpt: "Observing the stock and forex markets rewards emotional discipline over impulse. Teaching financial literacy showed me how human psychology drives decision-making.",
    body: [
      "My fascination with the financial markets—from stock investing to forex—began with a simple curiosity about how capital flows and how market participants react to uncertainty. In trading, you quickly learn that being right matters far less than managing downside risk.",
      "When I started teaching and educating others about financial literacy and market fundamentals, I noticed that the hardest lesson is rarely technical analysis—it is emotional discipline. Most beginners lose money not because of bad charts, but because of impatience and ego.",
      "Whether in the markets or in business negotiations, patience is an active position. Managing risk, preserving resources, and waiting for high-probability setups will always compound better than chasing restless impulses. (This reflects personal experience, not financial advice.)"
    ]
  },
  {
    slug: "systems-thinking-from-it",
    title: "How an IT background in cybersecurity shapes business thinking",
    category: "Systems & Tech",
    date: "2026-06-05",
    readTime: "4 min read",
    excerpt: "Studying Computer Science and networking at KFA Business School gave me a framework for diagnosing friction and understanding how systems behave under pressure.",
    body: [
      "Completing my Bachelor's in Computer Science and IT with a focus on networking and cybersecurity gave me a foundational appreciation for how interconnected systems function—and where they break.",
      "In cybersecurity, you learn that vulnerabilities rarely appear in the center of a well-trodden process; they emerge at the handoffs, the edge cases, and the gaps where communication breaks down. The exact same rule applies to business operations and sales funnels.",
      "When a business struggles to convert leads or scale its brand, the bottleneck is almost always an unaddressed operational edge case. Having an IT mindset allows me to analyze commercial problems with structured logic, ensuring that marketing promises align with operational capability."
    ]
  }
];

const EMAIL = "hello@rojish-sakhakarmi.com.np";
const LINKEDIN = "https://linkedin.com/in/rojish0";
const INSTAGRAM = "https://instagram.com/rojish0";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentRoute, setCurrentRoute] = useState("#");
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [nepalTime, setNepalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        setNepalTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
      } catch {
        setNepalTime("Bhaktapur, NP");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const handleHash = () => {
      setCurrentRoute(window.location.hash || "#");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (document.documentElement.scrollTop / height) * 100 : 0);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Email address copied! 📋");
    } catch {
      showToast(`Contact me at ${EMAIL}`);
    }
  };

  const copyPostUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Article link copied! 🔗");
    } catch {
      showToast("Article link copied!");
    }
  };

  const triggerDirectMail = () => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Hey Rojish — Let's Connect")}`;
  };

  const isBlogsPage = currentRoute === "#blog" || currentRoute === "#blogs";
  const isPostRoute = currentRoute.startsWith("#post/");
  const activePostSlug = isPostRoute ? currentRoute.slice("#post/".length) : null;
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = [post.title, post.excerpt, post.body.join(" ")].join(" ").toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const activePost = posts.find((post) => post.slug === activePostSlug);
  const activePostIndex = activePost ? posts.findIndex((post) => post.slug === activePost.slug) : -1;
  const prevPost = posts.length && activePostIndex > 0 ? posts[activePostIndex - 1] : null;
  const nextPost = posts.length && activePostIndex >= 0 && activePostIndex < posts.length - 1 ? posts[activePostIndex + 1] : null;

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 selection:bg-[var(--text)] selection:text-[var(--bg)]">
      <style dangerouslySetInnerHTML={{__html: `
        [data-theme='dark'] {
          --bg: #050505;
          --bg-subtle: #0a0a0a;
          --bg-card: #0e0e11;
          --bg-hover: #16161a;
          --border: #222226;
          --border-dark: #333338;
          --text: #ffffff;
          --text-muted: #a1a1aa;
          --text-subtle: #52525b;
        }
      `}} />

      <div className="fixed top-0 left-0 h-[2px] bg-[var(--text)] z-50 transition-all duration-75 opacity-90" style={{ width: `${activePostSlug ? scrollProgress : 0}%` }} />

      <header className="sticky top-0 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] z-40 transition-colors">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          <a href="#" className="font-bold text-[17px] tracking-tight hover:opacity-80 transition-opacity">
            Rojish0
          </a>
          <nav className="flex items-center gap-4 sm:gap-7">
            {[
              { href: "#about", label: "About" },
              { href: "#blogs", label: "Blogs" },
              { href: "#contact", label: "Contact" }
            ].map((item) => (
              <a key={item.href} href={item.href} className={`text-xs sm:text-sm transition-colors hover:text-[var(--text)] ${currentRoute === item.href || (item.href === "#blogs" && currentRoute === "#blog") ? "text-[var(--text)] font-semibold" : "text-[var(--text-muted)]"}`}>
                {item.label}
              </a>
            ))}
            <button onClick={toggleTheme} className="px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-5 sm:px-8 overflow-hidden">
        {activePostSlug ? (
          activePost ? (
            /* --- READ ESSAY VIEW --- */
            <article className="max-w-[700px] mx-auto py-8 sm:py-16">
              <div className="flex items-center justify-between gap-4 mb-8">
                <a href="#blogs" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                  ← Back to blogs
                </a>
                <button onClick={copyPostUrl} className="text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--text)] flex items-center gap-1.5 transition-colors">
                  <Share2 size={13} /> Share Link
                </button>
              </div>

              <div className="pb-8 mb-10 border-b border-[var(--border)]">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-subtle)] mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] font-medium">{activePost.category}</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 text-[var(--text)]">
                  {activePost.title}
                </h1>

                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {activePost.excerpt}
                </p>
              </div>

              <div className="space-y-6 text-base sm:text-[18px] leading-relaxed text-[var(--text-muted)]">
                {activePost.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {activePost.category.toLowerCase().includes("market") && (
                <div className="my-8 pl-4 border-l-2 border-[var(--border)] italic text-sm text-[var(--text-subtle)] bg-[var(--bg-subtle)] py-3 px-4 rounded-r-xl">
                  Note: This reflects personal market experience, not financial advice.
                </div>
              )}

              <div className="mt-14 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4">
                {prevPost ? (
                  <a href={`#post/${prevPost.slug}`} className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors line-clamp-1">
                    ← {prevPost.title}
                  </a>
                ) : <div />}

                {nextPost ? (
                  <a href={`#post/${nextPost.slug}`} className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-right line-clamp-1">
                    {nextPost.title} →
                  </a>
                ) : <div />}
              </div>
            </article>
          ) : (
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold mb-3">Article not found</h1>
              <a href="#blogs" className="px-5 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-xs uppercase tracking-wider hover:scale-105 transition-transform inline-block">Back to blogs</a>
            </div>
          )
        ) : currentRoute === "#contact" ? (
          /* --- CONTACT SECTION --- */
          <section className="py-10 sm:py-20">
            <div className="max-w-[1000px] mx-auto">
              <div className="mb-8 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] shadow-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">Direct Inbox</span>
                </div>
                <h1 className="text-3xl sm:text-6xl font-bold tracking-tight leading-[1.02] mb-4">
                  Let’s connect.<br />
                  <span className="relative inline-block">
                    <span>Simple & direct.</span>
                    <DoodleCleanUnderline />
                  </span>
                </h1>
                <p className="text-[var(--text-muted)] text-sm sm:text-lg max-w-xl leading-relaxed">
                  No forms to submit. Drop me a line directly via email or connect through social platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] font-bold">[ EMAIL ADDRESS ]</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">OPEN INBOX</span>
                    </div>
                    <div className="font-mono text-lg sm:text-2xl font-bold text-[var(--text)] tracking-tight mb-4 break-all">
                      {EMAIL}
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-8">
                      Always open to discussions regarding business growth, brand strategy, IT systems, and financial markets.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[var(--border)]/70 flex items-center gap-3">
                    <button onClick={triggerDirectMail} className="group w-full py-4 px-6 rounded-2xl bg-[var(--text)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:scale-[1.01] active:scale-98 transition-all shadow-md flex items-center justify-center gap-2">
                      <Mail size={16} />
                      <span>Send Mail</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button onClick={copyEmail} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--text)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0" title="Copy Address">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] font-bold mb-2">[ LOCAL TIME ]</div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--text)] tracking-tight">{nepalTime || "Bhaktapur, NP"}</div>
                      <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mt-1">
                        <MapPin size={13} className="text-emerald-500" /> Bhaktapur, Nepal (UTC +5:45)
                      </div>
                    </div>
                    <hr className="border-[var(--border)] opacity-60" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] font-bold mb-3">[ SOCIAL CHANNELS ]</div>
                      <div className="grid grid-cols-2 gap-2">
                        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text)] transition-all group text-xs font-medium">
                          <span className="flex items-center gap-2"><IconLinkedin size={15} /> LinkedIn</span>
                          <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text)] transition-all group text-xs font-medium">
                          <span className="flex items-center gap-2"><IconInstagram size={15} /> Instagram</span>
                          <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[var(--border)]/70 text-[10px] font-mono text-[var(--text-subtle)] flex items-center justify-between mt-6">
                    <span>LOCATION: BHAKTAPUR</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">● ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : currentRoute === "#about" ? (
          /* --- ABOUT PAGE WITH ALIGNED CORE MINDSET & 2X2 SHORT TOOLS CARD --- */
          <article className="about-page py-8 sm:py-16">
            <section className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-10 lg:p-14 mb-10 sm:mb-12">
              <div className="absolute right-10 top-10 hidden lg:block" aria-hidden="true">
                <MinimalFocusBadge />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <span className="h-2 w-2 rounded-full bg-[var(--text)]" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)]">Personal Overview</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  <div className="lg:col-span-8">
                    <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.05em] leading-[1.02] sm:leading-[0.98] max-w-3xl">
                      I connect strategy,<br />
                      <span className="relative inline-block">
                        <span>creative design</span>
                        <DoodlePulseLine />
                      </span>{" "}
                      & tech.
                    </h1>
                    <p className="mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-[var(--text-muted)]">I’m Rojish, an IT graduate interested in the human side of business: understanding what people need, shaping ideas, and communicating them effectively.</p>
                  </div>
                  <div className="lg:col-span-4 lg:pb-2">
                    <div className="border-l-2 border-[var(--text)] pl-4 max-w-xs">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-2">My Philosophy</div>
                      <p className="text-xs sm:text-base font-medium leading-relaxed">Good conversations. Clear ideas. Useful connections.</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] text-[var(--bg)] px-5 py-3 text-xs sm:text-sm font-semibold hover:scale-105 active:scale-95 transition-transform">Say hello <ArrowUpRight size={16} /></a>
                      <a href="/Rojish_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dark)] px-5 py-3 text-xs sm:text-sm font-medium hover:bg-[var(--text)] hover:text-[var(--bg)] hover:border-[var(--text)] active:scale-95 transition-all">Resume <ArrowUpRight size={15} /></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-4">01 / Background & Story</div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight mb-6">From understanding systems<br />to understanding people.</h2>
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-2xl">
                    <p>My background is in Computer Science and IT, where I developed an interest in technology, problem-solving, and understanding how things work behind the scenes.</p>
                    <p>Over time, I found myself drawn just as much to the people side of things. I enjoy coming up with design ideas, thinking about how a brand or message should come across, and finding the right way to communicate with someone.</p>
                    <p>I've also spent time learning about financial markets and sharing knowledge through informal classes and mentoring. It taught me how to break down complex ideas, understand different perspectives, and communicate in a way people can relate to.</p>
                    <p>These experiences have shaped my interest in business development and sales. I enjoy researching businesses, identifying opportunities, starting conversations, understanding what people need, and finding ways to create value.</p>
                  </div>
                </div>
                
                {/* Core Mindset Card */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-2">Core Mindset</div>
                  <p className="text-lg sm:text-xl font-semibold leading-snug tracking-tight text-[var(--text)]">“The best ideas only matter when you can make people understand them.”</p>
                  <div className="mt-3 text-xs text-[var(--text-muted)]">A guiding principle for communication, creative work, and business.</div>
                </div>
              </div>

              <aside className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-[var(--border)]">
                    <div>
                      <div className="text-xs text-[var(--text-subtle)] font-mono uppercase tracking-[0.18em]">Profile Spec</div>
                      <div className="font-semibold text-lg mt-1">Rojish Sakhakarmi</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl border border-[var(--border-dark)] flex items-center justify-center font-mono text-xs bg-[var(--bg-subtle)]">Rojis</div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                      <span className="text-[var(--text-subtle)] font-mono uppercase">Location</span>
                      <span className="font-medium text-[var(--text)]">Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                      <span className="text-[var(--text-subtle)] font-mono uppercase">Education</span>
                      <span className="font-medium text-[var(--text)]">Bachelor in Computer Science</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                      <span className="text-[var(--text-subtle)] font-mono uppercase">Focus Areas</span>
                      <span className="font-medium text-[var(--text)]">Business & Marketing</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                      <span className="text-[var(--text-subtle)] font-mono uppercase">Interests</span>
                      <span className="font-medium text-[var(--text)]">Markets & Strategy</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-2.5">Core Competencies</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Brand Strategy','Client Outreach','Marketing Strategy','Financial Markets','Networking & Security','Visual Positioning'].map((item) => (
                      <span key={item} className="rounded-full border border-[var(--border-dark)] bg-[var(--bg-card)] px-2.5 py-1 text-[11px] text-[var(--text-muted)] cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* COMPACT 2x2 TOOLS & WORKFLOW CARD */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-subtle)] uppercase tracking-[0.2em] mb-3">
                    <span>Tools & Workflow</span>
                    <span className="text-emerald-400 font-bold">● Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { area: "UI & Design", stack: "Figma, Photoshop & Illustrator" },
                      { area: "Brand Strategy", stack: "Brand Positioning & Messaging" },
                      { area: "Market Analysis", stack: "SMC, Market Structure & Liquidity" },
                      { area: "Sales & Communication", stack: "Client Relations & Negotiation" }
                    ].map((row, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs flex flex-col justify-between">
                        <span className="text-[9px] font-mono uppercase text-[var(--text-subtle)] font-semibold mb-1">{row.area}</span>
                        <span className="font-medium text-[var(--text)] text-[11px] leading-tight">{row.stack}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </section>

            {/* DOMAINS OF INTEREST */}
            <section className="mb-16">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-3">02 / Key Pillars</div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-6">Different ways of looking at a problem.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: BriefcaseBusiness, title: 'Business & sales', desc: 'Understanding businesses, spotting opportunities, and finding ways to create value.' },
                  { icon: MessageCircle, title: 'Communication', desc: 'Making ideas easier to understand, whether in a conversation or a message.' },
                  { icon: Palette, title: 'Design thinking', desc: 'Combining creativity and purpose to shape better visual experiences, brand identities, and ideas.' },
                  { icon: TrendingUp, title: 'Markets', desc: 'Following financial markets and helping people understand the market dynamics.' }
                ].map(({icon: Icon, title, desc}) => (
                  <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:-translate-y-1 transition-transform">
                    <Icon size={20} className="mb-6 text-[var(--text-muted)]" />
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 03 BOTTOM CALLOUT */}
            <section className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] mb-3">03 / Next Steps</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Open to interesting conversations.</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)] max-w-xl">Whether it's strategy, technology, or creative direction, I'm always down to connect.</p>
              </div>
              <a href="#contact" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text)] text-[var(--bg)] px-6 py-3.5 text-sm font-bold hover:scale-105 active:scale-95 transition-transform">Start a conversation <ArrowUpRight size={16} /></a>
            </section>
          </article>
        ) : isBlogsPage ? (
          /* --- MINIMAL BLOGS LIST --- */
          <section className="py-10 sm:py-16">
            <div className="mb-8 pb-6 border-b border-[var(--border)]">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)] font-bold mb-2 block">[ ESSAYS & FIELD NOTES ]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Blogs & Perspectives
              </h1>
              <p className="text-[var(--text-muted)] text-sm sm:text-base mt-2 max-w-xl">
                Curated thoughts on strategy, technology, markets, and human decision-making. Clear ideas, high density.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${activeCategory === category ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-md" : "bg-[var(--bg-card)] border-[var(--border)] hover:border-[var(--text)] hover:text-[var(--text)] text-[var(--text-muted)]"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <input
                type="search"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-xs outline-none focus:border-[var(--text)] w-full sm:w-64 font-mono transition-colors"
              />
            </div>

            <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)] my-6">
              {!filteredPosts || filteredPosts.length === 0 ? (
                <div className="py-12 text-center text-[var(--text-muted)] text-xs font-mono">No blogs match your search query.</div>
              ) : filteredPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`#post/${post.slug}`}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-6 px-3 hover:bg-[var(--bg-hover)] rounded-2xl transition-all group relative overflow-hidden"
                >
                  <div className="sm:col-span-3 text-xs text-[var(--text-subtle)] font-mono flex flex-col justify-center gap-1">
                    <span className="font-semibold text-[var(--text-muted)]">{post.category}</span>
                    <span className="text-[10px] text-[var(--text-subtle)]">{post.date} · {post.readTime}</span>
                  </div>
                  <div className="sm:col-span-8 space-y-1.5">
                    <h3 className="font-semibold text-base sm:text-lg group-hover:underline leading-snug tracking-tight text-[var(--text)]">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="sm:col-span-1 flex items-center justify-end">
                    <span className="text-[var(--text-muted)] group-hover:translate-x-1.5 transition-transform font-bold text-lg">→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : (
          /* --- FULL HERO HOMEPAGE --- */
          <>
            <section className="home-hero relative isolate min-h-[580px] sm:min-h-[650px] lg:min-h-[720px] flex items-center py-12 sm:py-20">
              <div className="hero-glow hero-glow-one" aria-hidden="true" />
              <div className="hero-glow hero-glow-two" aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full relative z-10">
                <div className="lg:col-span-7 relative z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs text-[var(--text-muted)] mb-6 sm:mb-8 shadow-sm"
                  >
                    <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-500" />
                    Based in Bhaktapur, Nepal
                    <span className="text-[var(--text-subtle)]">·</span>
                    Open to opportunities
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="text-[10px] sm:text-sm uppercase tracking-[0.28em] font-mono text-[var(--text-subtle)] mb-3 font-bold"
                  >
                    Hey, I’m Rojish
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.14 }}
                    className="text-[clamp(2.5rem,7vw,6.8rem)] leading-[0.95] font-bold tracking-[-0.065em] max-w-[780px]"
                  >
                    I connect
                    <span className="relative inline-block block">
                      <span>ideas to</span>
                      <DoodleHeroSwirl />
                    </span>
                    <span className="block">opportunity<span className="text-[var(--text)]">.</span></span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.25 }}
                    className="mt-6 max-w-[510px] text-sm sm:text-lg leading-relaxed text-[var(--text-muted)]"
                  >
                    IT graduate exploring the space between business, technology, and creative thinking. I enjoy understanding people, spotting opportunities, and making things happen.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.34 }}
                    className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8"
                  >
                    <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-[var(--text)] text-[var(--bg)] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold hover:gap-4 hover:scale-105 active:scale-95 transition-all">
                      Let’s talk <ArrowUpRight size={17} />
                    </a>
                    <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold hover:bg-[var(--text)] hover:text-[var(--bg)] hover:border-[var(--text)] hover:scale-105 active:scale-95 transition-all">
                      More about me <ArrowRight size={16} />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-8 sm:mt-10 text-[var(--text-subtle)]"
                  >
                    <a aria-label="LinkedIn" href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[10px] sm:text-xs font-mono font-bold hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all">
                      <IconLinkedin size={13} /> LINKEDIN
                    </a>
                    <a aria-label="Instagram" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[10px] sm:text-xs font-mono font-bold hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all">
                      <IconInstagram size={13} /> INSTAGRAM
                    </a>
                    <a href="/Rojish_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[10px] sm:text-xs font-mono font-bold hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all">
                      <IconFileText size={13} /> RESUME
                    </a>
                  </motion.div>
                </div>

                <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[480px] flex items-center justify-center lg:-translate-x-8 pointer-events-none mt-4 lg:mt-0">
                  <div className="doodle-cross doodle-cross-one" aria-hidden="true">✳</div>
                  <div className="doodle-cross doodle-cross-two" aria-hidden="true">✳</div>
                  <motion.div
                    className="doodle-scribble"
                    animate={{ rotate: [0, 8, -5, 0], scale: [1, 1.04, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 420 420" fill="none">
                      <path d="M210 22C314 22 398 106 398 210C398 314 314 398 210 398C106 398 22 314 22 210C22 106 106 22 210 22Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 10" />
                      <path d="M210 58C294 58 362 126 362 210C362 294 294 362 210 362C126 362 58 294 58 210C58 126 126 58 210 58Z" stroke="currentColor" strokeWidth="1" opacity=".45" />
                      <path d="M90 270C126 188 170 310 214 220C248 151 281 195 326 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="90" cy="270" r="5" fill="currentColor" />
                      <circle cx="326" cy="112" r="5" fill="currentColor" />
                    </svg>
                  </motion.div>

                  <motion.div
                    className="idea-map relative z-10 scale-90 sm:scale-100"
                    initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.2 }}
                  >
                    <svg className="idea-map-lines" viewBox="0 0 500 500" fill="none" aria-hidden="true">
                      <path d="M250 250 C180 165 112 140 85 93" />
                      <path d="M250 250 C330 155 385 130 420 90" />
                      <path d="M250 250 C365 245 405 250 455 260" />
                      <path d="M250 250 C340 340 390 370 410 425" />
                      <path d="M250 250 C165 350 120 375 70 415" />
                      <path d="M250 250 C140 245 95 255 42 230" />
                      <path d="M85 93 q-10 -14 -22 -8 M420 90 q14 -8 20 3 M455 260 q16 8 21 -3 M410 425 q-3 15 -17 18 M70 415 q-17 1 -20 -12 M42 230 q-12 -10 -20 1" />
                      <circle cx="250" cy="250" r="112" className="idea-map-orbit" />
                      <circle cx="250" cy="250" r="94" className="idea-map-orbit inner" />
                      <path d="M210 258 q18 -35 38 -2 t42 -3" className="idea-map-scribble" />
                      <path d="M222 286 q28 14 56 -2" className="idea-map-scribble" />
                      <path d="M205 213 q-10 -18 7 -28 q14 -8 26 5 q12 -15 28 -5 q17 11 5 28" className="idea-map-scribble" />
                      <path d="M240 178 l8 -13 l8 13" className="idea-map-scribble" />
                      <circle cx="85" cy="93" r="5" /><circle cx="420" cy="90" r="5" />
                      <circle cx="455" cy="260" r="5" /><circle cx="410" cy="425" r="5" />
                      <circle cx="70" cy="415" r="5" /><circle cx="42" cy="230" r="5" />
                    </svg>
                    <div className="idea-map-core">
                      <span className="idea-core-kicker">THE CONNECTION</span>
                      <strong>MAKE<br />IT HAPPEN.</strong>
                      <span className="idea-core-arrow">↗</span>
                    </div>
                    <span className="idea-label idea-label-tech">technology</span>
                    <span className="idea-label idea-label-creative">creativity</span>
                    <span className="idea-label idea-label-sales">sales</span>
                    <span className="idea-label idea-label-market">markets</span>
                    <span className="idea-label idea-label-people">people</span>
                    <span className="idea-label idea-label-comms">communication</span>
                    <span className="idea-handwritten">different dots,<br />one big picture ↗</span>
                    <span className="idea-star idea-star-one">✳</span>
                    <span className="idea-star idea-star-two">✧</span>
                  </motion.div>

                  <motion.span className="hero-hand-note hidden sm:block" animate={{ rotate: [-8, -3, -8], y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                    always connecting dots ↗
                  </motion.span>
                </div>
              </div>
            </section>

            <section className="home-marquee -mx-5 sm:-mx-8 border-y border-[var(--border)] bg-[var(--bg-subtle)] overflow-hidden py-4 sm:py-5">
              <div className="ticker-wrap">
                <div className="ticker-inner gap-8 sm:gap-16 whitespace-nowrap text-[11px] sm:text-sm font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <span key={index} className="inline-flex items-center gap-8 sm:gap-16">
                      <span>Business Development</span><span className="text-[var(--text-subtle)]">✳</span>
                      <span>Digital Growth</span><span className="text-[var(--text-subtle)]">✳</span>
                      <span>Creative Thinking & Design</span><span className="text-[var(--text-subtle)]">✳</span>
                      <span>Technology</span><span className="text-[var(--text-subtle)]">✳</span>
                      <span>People & Communication</span><span className="text-[var(--text-subtle)]">✳</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* WHERE THINGS CONNECT SECTION */}
            <section className="pt-12 sm:pt-24 pb-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)]">Where things connect</span>
                  <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                    Different worlds.<br />
                    <span className="relative inline-block">
                      <span>One connected mind.</span>
                      <DoodleArrowSweep />
                    </span>
                  </h2>
                </div>
                <a href="#about" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold hover:gap-4 transition-all bg-[var(--bg-card)] border border-[var(--border)] px-5 py-2.5 rounded-full hover:border-[var(--text)] shadow-sm shrink-0">
                  Get to know me <ArrowUpRight size={17} />
                </a>
              </div>

              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    number: "01",
                    label: "Business",
                    icon: BriefcaseBusiness,
                    note: "People & opportunities",
                    highlights: ["Outreach & Pitching", "Lead Generation", "Client Relationships"],
                    badge: "Growth Focus"
                  },
                  {
                    number: "02",
                    label: "Technology",
                    icon: Code2,
                    note: "Systems & problem-solving",
                    highlights: ["Web Architecture", "Cybersecurity Baseline", "Structured Logic"],
                    badge: "IT CS Degree"
                  },
                  {
                    number: "03",
                    label: "Creative",
                    icon: Palette,
                    note: "Ideas & visual stories",
                    highlights: ["Brand Positioning", "Design Aesthetics", "UI/UX Presentation"],
                    badge: "Visual Strategy"
                  },
                  {
                    number: "04",
                    label: "Markets",
                    icon: TrendingUp,
                    note: "Money & human behavior",
                    highlights: ["Technical Analysis", "Risk Management", "Market Literacy"],
                    badge: "Capital Flows"
                  },
                ].map(({ number, label, icon: Icon, note, highlights, badge }, index) => (
                  <motion.a
                    href="#about"
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--text)] hover:shadow-xl hover:shadow-black/20 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--text)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)]">{number} / 04</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-muted)]">{badge}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] group-hover:bg-[var(--text)] group-hover:text-[var(--bg)] transition-colors">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold group-hover:underline flex items-center gap-1">
                            {label}
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-xs text-[var(--text-subtle)]">{note}</p>
                        </div>
                      </div>

                      <hr className="border-[var(--border)] my-4 opacity-50" />

                      <div className="space-y-2">
                        {highlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                            <span className="w-1 h-1 rounded-full bg-[var(--text-subtle)] group-hover:bg-[var(--text)]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] flex items-center justify-between pt-3 border-t border-[var(--border)]/40">
                      <span>Explore domain</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>

            {/* HOMEPAGE CTA */}
            <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-12 my-8 shadow-xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-lg">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] font-bold">[ GET IN TOUCH ]</span>
                  <h2 className="text-2xl sm:text-5xl font-bold tracking-tight leading-tight">
                    Let's create something<br />
                    <span className="relative inline-block mt-1">
                      <span>extraordinary together.</span>
                      <DoodleCleanUnderline />
                    </span>
                  </h2>
                  <p className="text-[var(--text-muted)] text-xs sm:text-base leading-relaxed">
                    Have an idea, project, or topic you'd like to discuss? Drop me a line anytime.
                  </p>
                </div>

                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[var(--text)] text-[var(--bg)] px-7 py-3.5 text-xs sm:text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all shrink-0"
                >
                  <span>Start a conversation</span>
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] mt-10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div>© 2026 Rojish Sakhakarmi — Bhaktapur, Nepal</div>
          <div className="flex items-center gap-5">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[var(--text)] transition-colors">LinkedIn</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[var(--text)] transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-xs font-mono font-bold shadow-2xl z-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--bg)] opacity-70 animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}