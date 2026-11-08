"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
}

const INITIAL_POSTS: BlogPost[] = [
  {
    slug: "why-creativity-needs-strategy",
    title: "Why creativity becomes truly valuable only when backed by strategy",
    category: "Brand Strategy",
    date: "2026-09-15",
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
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSent, setFormSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;
    const loadBackendPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Unable to load posts");
        const data = await response.json();
        if (!cancelled && data.success && Array.isArray(data.posts) && data.posts.length) {
          setPosts(data.posts);
        }
      } catch {
        console.warn("Could not load backend posts; using local defaults.");
      }
    };
    loadBackendPosts();
    return () => { cancelled = true; };
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
      showToast("Email copied to clipboard.");
    } catch {
      showToast(`Contact me at ${EMAIL}`);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Opportunity / Inquiry from ${contactName}`;
    const body = `Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
    showToast("Opening your email client...");
  };

  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(y / rect.height) * 12, y: (x / rect.width) * 12 });
  };

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
  const nextPost = posts.length && activePostIndex >= 0 ? posts[(activePostIndex + 1) % posts.length] : null;

  const PostList = ({ items }: { items: BlogPost[] }) => (
    <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
      {items.length === 0 ? (
        <div className="py-12 text-center text-[var(--text-muted)] text-xs font-mono">No notes match your search.</div>
      ) : items.map((post) => (
        <a
          key={post.slug}
          href={`#post/${post.slug}`}
          className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-5 px-3 hover:bg-[var(--bg-hover)] rounded-xl transition-all group"
        >
          <div className="sm:col-span-2 text-xs text-[var(--text-subtle)] font-mono">{post.date}</div>
          <div className="sm:col-span-8 space-y-0.5">
            <h3 className="font-semibold text-base group-hover:underline">{post.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">{post.excerpt}</p>
          </div>
          <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--pill-bg)] text-[var(--text-muted)]">{post.category}</span>
            <span className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      <div className="fixed top-0 left-0 h-[2px] bg-[var(--progress-bg)] z-50 transition-all duration-75" style={{ width: `${activePostSlug ? scrollProgress : 0}%` }} />

      <header className="sticky top-0 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] z-40">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-semibold text-[16px] tracking-tight hover:opacity-80 transition-opacity">
            <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--pill-bg)]">RS</span>
            <span>Rojish Sakhakarmi</span>
          </a>
          <nav className="flex items-center gap-5 sm:gap-7">
            {[
              { href: "#about", label: "About" },
              { href: "#blog", label: "Writing" },
              { href: "#contact", label: "Contact" }
            ].map((item) => (
              <a key={item.href} href={item.href} className={`text-sm transition-colors hover:text-[var(--text)] ${currentRoute === item.href ? "text-[var(--text)] font-semibold" : "text-[var(--text-muted)]"}`}>
                {item.label}
              </a>
            ))}
            <button onClick={toggleTheme} className="px-3 py-1 rounded-full border border-[var(--border)] hover:border-[var(--text)] text-xs uppercase tracking-wider font-medium transition-all">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {activePostSlug ? (
          activePost ? (
            <article className="max-w-[700px] mx-auto py-12 sm:py-16">
              <a href="#blog" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] mb-8">← Back to writing</a>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">{activePost.title}</h1>
              <div className="text-xs text-[var(--text-subtle)] font-mono pb-5 mb-8 border-b border-[var(--border)] flex items-center gap-3">
                <span>{activePost.category}</span><span>/</span><span>{activePost.date}</span><span>/</span><span>Rojish Sakhakarmi</span>
              </div>
              <div className="space-y-6 text-base sm:text-[18px] leading-relaxed">
                {activePost.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
              {activePost.category.toLowerCase().includes("market") && (
                <div className="my-8 pl-4 border-l-2 border-[var(--border)] italic text-sm text-[var(--text-subtle)]">
                  Note: This reflects personal market experience, not financial advice.
                </div>
              )}
              {nextPost && (
                <div className="mt-12 pt-6 border-t border-[var(--border)] flex justify-end">
                  <a href={`#post/${nextPost.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-dark)] hover:bg-[var(--pill-bg)] text-xs font-semibold uppercase tracking-wider">
                    <span>Next: {nextPost.title}</span><span>→</span>
                  </a>
                </div>
              )}
            </article>
          ) : (
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold mb-3">Article not found</h1>
              <a href="#blog" className="px-5 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-xs uppercase tracking-wider">Back to writing</a>
            </div>
          )
        ) : currentRoute === "#contact" ? (
          <section className="py-12 sm:py-16">
            <div className="max-w-[840px] mx-auto">
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2 block">[ DIRECT CONTACT & COLLABORATION ]</span>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">Let's talk about ideas worth building.</h1>
                <p className="text-[var(--text-muted)] text-base sm:text-lg">Business development, brand positioning, creative direction, or financial market conversations. Send a note and I will reply personally.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 sm:p-7 shadow-sm">
                  {formSent ? (
                    <div className="py-10 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full border border-[var(--border)] mx-auto flex items-center justify-center font-mono text-xs">✓</div>
                      <h3 className="font-semibold text-lg">Inquiry Prepared</h3>
                      <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto">Your message has opened in your email client. You can also reach me directly at <span className="font-mono text-[var(--text)]">{EMAIL}</span>.</p>
                      <button onClick={() => setFormSent(false)} className="text-xs font-mono underline hover:text-[var(--text)] mt-2">Send another note</button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] mb-1.5">Your Name / Company</label>
                        <input type="text" required value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="e.g. Sujan Shrestha" className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm outline-none focus:border-[var(--text)]" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] mb-1.5">Your Email Address</label>
                        <input type="email" required value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="sujan@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm outline-none focus:border-[var(--text)]" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] mb-1.5">Message / Opportunity Scope</label>
                        <textarea required rows={4} value={contactMessage} onChange={(event) => setContactMessage(event.target.value)} placeholder="Tell me about your project, role, or what you'd like to collaborate on..." className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm outline-none focus:border-[var(--text)] resize-none" />
                      </div>
                      <button type="submit" className="w-full py-3 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-xs uppercase tracking-wider hover:opacity-90 flex items-center justify-center gap-2">
                        <span>Send Message</span><span>→</span>
                      </button>
                    </form>
                  )}
                </div>
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)]">Direct Email</span>
                    <div className="font-mono text-sm font-semibold truncate">{EMAIL}</div>
                    <div className="flex items-center gap-2 pt-1">
                      <button onClick={copyEmail} className="px-3.5 py-1.5 rounded-full border border-[var(--border)] hover:border-[var(--text)] text-xs font-medium">Copy email</button>
                      <a href={`mailto:${EMAIL}`} className="px-3.5 py-1.5 rounded-full bg-[var(--text)] text-[var(--bg)] text-xs font-medium">Direct Mail ↗</a>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)]">Professional Channels</span>
                    <div className="flex flex-col gap-2 text-sm">
                      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-hover)]"><span>LinkedIn</span><span className="text-xs font-mono text-[var(--text-subtle)]">in/rojish0 ↗</span></a>
                      <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-hover)]"><span>Instagram</span><span className="text-xs font-mono text-[var(--text-subtle)]">@rojish0 ↗</span></a>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-[var(--border)] text-xs text-[var(--text-subtle)] font-mono space-y-1">
                    <div>LOCATION: Bhaktapur, Nepal</div><div>TIMEZONE: UTC+5:45 (Nepal Standard Time)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : currentRoute === "#about" ? (
          <article className="py-12 sm:py-16">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2">About Me</h1>
                <p className="text-[var(--text-muted)] text-sm sm:text-base">Business Development • Brand Strategy • Graphic Design • Financial Markets</p>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">[ BHAKTAPUR // NEPAL ]</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-12">
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-3">Personal Introduction</h2>
                  <p className="text-xl sm:text-2xl font-medium leading-snug tracking-tight mb-4">I'm Rojish, an IT student from Bhaktapur with hands-on experience in client outreach, e-commerce, SEO, and creative work.</p>
                  <p className="text-xl sm:text-2xl font-medium leading-snug tracking-tight mb-4">I enjoy understanding how businesses work, identifying opportunities, communicating with people, and finding practical ways to solve problems.</p>
                  <div className="space-y-4 text-[var(--text-muted)] leading-relaxed text-sm sm:text-base">
                    <p>My experience spans business development, international client outreach, graphic design, e-commerce operations, and digital marketing. These roles have helped me connect technical understanding with commercial thinking.</p>
                    <p>I am particularly interested in understanding people, identifying commercial opportunities, solving real bottlenecks, and building lasting professional relationships.</p>
                  </div>
                </section>

                <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">My Philosophy</span>
                  <blockquote className="text-lg sm:text-xl font-semibold italic text-[var(--text)] leading-snug">"Creativity becomes more valuable when it is backed by strategy."</blockquote>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">I believe in more than just making things look good. I want to understand why something exists, who it serves, and how it can create real commercial and human value. When visual design is paired with clear business logic and active listening, brands earn trust that lasts.</p>
                </section>

                <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">Financial Markets & Education</span>
                  <h3 className="font-bold text-lg">Financial Market Literacy</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">Outside my commercial work, I have a strong interest in financial markets, including stock market investing and forex trading. I also share market fundamentals and financial literacy concepts with others.</p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">Following markets has reinforced the importance of patience, emotional discipline, and managing risk under uncertainty.</p>
                </section>

                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-4">Academic Background</h2>
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg">Bachelor's in Computer Science / IT (BCS.IT)</h3>
                        <span className="text-xs font-mono text-[var(--text-subtle)]">KFA Business School and IT</span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--pill-bg)]">Cybersecurity & Networking Focus</span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed pt-1">Academic focus on cybersecurity and network infrastructure, providing a technical foundation for understanding modern systems and digital workflows.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-4">Skills & Areas of Capability</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Business Development", skills: ["International client outreach", "Business research & lead generation", "Client communication", "Relationship building", "Understanding customer needs"] },
                      { title: "Branding & Creative Design", skills: ["Brand identity & visual communication", "Graphic design & typography", "Creative direction & layout", "Adobe Photoshop & Illustrator", "Figma & Canva"] },
                      { title: "Digital Growth & Operations", skills: ["Search Engine Optimization (SEO)", "E-commerce listing & mockups", "Social media management", "Content planning", "Website experience planning"] },
                      { title: "Financial Markets & Tech", skills: ["Stock market investing & Forex", "Financial literacy", "Risk management & psychology", "HTML & CSS fundamentals", "Cybersecurity & networking"] }
                    ].map((group) => (
                      <div key={group.title} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-2">
                        <h4 className="font-semibold text-sm">{group.title}</h4>
                        <ul className="text-xs font-mono text-[var(--text-muted)] space-y-1">
                          {group.skills.map((skill) => <li key={skill}>• {skill}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a href="#contact" className="px-6 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-xs font-semibold uppercase tracking-wider">Get in touch →</a>
                  <a href="/Rojish_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full border border-[var(--border)] hover:border-[var(--text)] text-xs font-mono">Download Resume (PDF) ↗</a>
                </div>
              </div>

              <aside className="lg:col-span-4 sticky top-24 space-y-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--bg-subtle)] text-center space-y-2">
                    <div className="w-16 h-16 rounded-full border border-[var(--border)] mx-auto overflow-hidden bg-black flex items-center justify-center font-mono text-lg font-bold text-white">RS</div>
                    <div className="font-semibold text-base">Rojish Sakhakarmi</div>
                    <div className="text-xs text-[var(--text-subtle)] font-mono">Aspiring Business Development Professional</div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">Bhaktapur, Nepal</div>
                  </div>
                  <div className="border-t border-[var(--border)] pt-4 space-y-3 font-mono text-xs">
                    {[
                      ["Focus", "Business Development"],
                      ["Creative", "Graphic Design & Brand"],
                      ["Markets", "Forex & Stock Markets"],
                      ["Education", "BCS.IT (KFA)"],
                      ["Status", "Open to Opportunities"]
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 py-1 border-b border-[var(--border)] last:border-0">
                        <span className="text-[var(--text-subtle)]">{label}</span><span className="font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`mailto:${EMAIL}`} className="w-full py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--text)] text-xs font-mono flex items-center justify-center text-center">{EMAIL}</a>
                </div>
              </aside>
            </div>
          </article>
        ) : currentRoute === "#blog" ? (
          <section className="py-12 sm:py-16">
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2">Writing & Notes</h1>
                <p className="text-[var(--text-muted)] text-sm sm:text-base">Thoughts on business development, brand strategy, graphic design, financial markets, and systems.</p>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">[ {posts.length} ARTICLES ]</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${activeCategory === category ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]" : "border-[var(--border)] hover:border-[var(--text)] text-[var(--text-muted)]"}`}>
                    {category}
                  </button>
                ))}
              </div>
              <input type="search" placeholder="Search notes..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-transparent text-xs outline-none focus:border-[var(--text)] w-full sm:w-60 font-mono" />
            </div>
            <PostList items={filteredPosts} />
          </section>
        ) : (
          <>
            <section className="pt-8 pb-12 sm:pt-14 sm:pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pill-bg)] border border-[var(--border)] text-xs font-mono mb-5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Bhaktapur, Nepal • Open to opportunities</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.08]">Business. People. Growth.</h1>
                  <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-7 leading-relaxed">I’m an IT student with hands-on experience in client outreach, lead generation, e-commerce, SEO, and creative work. I enjoy understanding business needs and building meaningful professional relationships.</p>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <a href="#contact" className="px-5 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-xs uppercase tracking-wider flex items-center gap-2">Initiate Conversation →</a>
                    <a href="#about" className="px-5 py-2.5 rounded-full border border-[var(--border-dark)] hover:bg-[var(--pill-bg)] font-medium text-xs uppercase tracking-wider">Read My Story</a>
                    <a href="/Rojish_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--text)] text-xs font-mono">Resume.pdf ↗</a>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-subtle)]">
                    <span className="text-[var(--text)]">CHANNELS //</span>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">LinkedIn ↗</a>
                    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">Instagram ↗</a>
                    <a href={`mailto:${EMAIL}`} className="hover:text-[var(--text)]">{EMAIL} ↗</a>
                  </div>
                </div>

                <div className="lg:col-span-5" style={{ perspective: "1000px" }}>
                  <motion.div ref={cardRef} onMouseMove={handleCardMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-md relative overflow-hidden group hover:border-[var(--text)]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-subtle)] pb-3 mb-4 border-b border-[var(--border)]">
                      <span>BUSINESS DEVELOPMENT</span><span>RESEARCH // RELATIONSHIPS</span>
                    </div>
                    <svg className="w-full max-w-[270px] mx-auto stroke-[var(--text)] fill-none my-2" viewBox="0 0 260 210" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="currentColor" strokeWidth="0.8" opacity="0.2">
                        <line x1="30" y1="20" x2="240" y2="20" strokeDasharray="3 3" />
                        <line x1="30" y1="100" x2="240" y2="100" strokeDasharray="3 3" />
                        <line x1="30" y1="180" x2="240" y2="180" />
                        <line x1="30" y1="20" x2="30" y2="180" />
                        <line x1="135" y1="20" x2="135" y2="180" strokeDasharray="3 3" />
                        <line x1="240" y1="20" x2="240" y2="180" strokeDasharray="3 3" />
                      </g>
                      <text x="35" y="15" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.6">COMMERCIAL VALUE ▲</text>
                      <text x="160" y="196" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.6">BRAND TRUST ▶</text>
                      <path d="M 30 175 Q 80 170, 110 145 T 170 95 T 235 35" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="85" cy="165" r="4" strokeWidth="1.6" fill="var(--bg-card)" />
                      <circle cx="140" cy="120" r="4" strokeWidth="1.6" fill="var(--bg-card)" />
                      <circle cx="210" cy="55" r="6" strokeWidth="2" fill="var(--bg-card)" />
                      <text x="95" y="168" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none">Client Discovery</text>
                      <text x="150" y="123" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none">Strategic Alignment</text>
                      <text x="180" y="42" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace" stroke="none">Value Delivered ✓</text>
                    </svg>
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-subtle)]">
                      <span>OUTREACH & DISCOVERY</span><span>CLIENT RELATIONSHIPS</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="border-t border-b border-[var(--border)] bg-[var(--bg-subtle)] -mx-5 sm:-mx-8 px-5 sm:px-8 py-8">
              <div className="max-w-[1240px] mx-auto">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-5">CORE DISCIPLINES & CAPABILITIES //</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    ["01. OUTREACH & GROWTH", "Business Development", "International client outreach, lead generation, researching partner requirements, and digital positioning."],
                    ["02. BRAND & CREATIVE", "Graphic Design & Positioning", "Brand identity, visual communication, layout, and creative direction backed by clear commercial intent."],
                    ["03. FINANCIAL MARKETS", "Market Literacy & Risk", "Stock investing, Forex trading, and an interest in risk management, patience, and market psychology."],
                    ["04. SYSTEMS & DIGITAL", "IT & E-Commerce Operations", "BCS.IT foundations in cybersecurity and networking, combined with hands-on SEO and product management."]
                  ].map(([eyebrow, title, description]) => (
                    <div key={eyebrow} className="space-y-1.5 border-l-2 border-[var(--border-dark)] pl-3.5">
                      <span className="font-mono text-xs text-[var(--text-subtle)]">{eyebrow}</span>
                      <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-14 sm:py-18">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">What each discipline taught me</h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">Practical lessons drawn from business development, design, retail, technology, and market education.</p>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] hidden sm:inline">[ 06 DISCIPLINES ]</span>
              </div>
              <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
                {[
                  ["Business Development", "Listening is the skill. Research the prospect's real requirements first, understand their workflow bottlenecks, and the commercial proposal explains itself."],
                  ["Graphic Design & Branding", "Creativity becomes valuable when backed by strategy. Typography, spacing, and visual hierarchy shape how a brand feels before a word is read."],
                  ["Financial Markets", "Being right matters far less than managing risk. Following markets reinforced that emotional discipline and patience matter over time."],
                  ["Client & Customer Communication", "Sales is not about pressure; it is about diagnosing need. Understand customer psychology and align your solution with what people genuinely seek."],
                  ["Information Technology & Cybersecurity", "Systems fail at the handoffs and edges. Simple, dependable processes that teams understand beat overly complex systems."],
                  ["E-Commerce & Digital Operations", "Attention to detail matters. Optimized product listings, precise mockups, and structured SEO help build organic visibility."]
                ].map(([title, lesson], index) => (
                  <div key={title} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4 px-2 hover:bg-[var(--bg-hover)] rounded-lg">
                    <div className="md:col-span-4 font-semibold text-sm sm:text-base flex items-center gap-2"><span className="text-xs font-mono text-[var(--text-subtle)]">0{index + 1}.</span><span>{title}</span></div>
                    <div className="md:col-span-8 text-[var(--text-muted)] text-sm leading-relaxed">{lesson}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pb-16 sm:pb-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Recent Writing & Notes</h2>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Perspectives on brand strategy, client outreach, and market education.</p>
                </div>
                <a href="#blog" className="text-xs font-mono uppercase tracking-wider hover:underline">All notes →</a>
              </div>
              <PostList items={posts.slice(0, 3)} />
            </section>
          </>
        )}

        <section id="contact-band" className="border-t border-[var(--border)] py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">Get in touch //</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let's talk about ideas worth building.</h2>
              <p className="text-sm text-[var(--text-muted)] max-w-md">Business development opportunities, brand strategy, or creative collaborations. Send a note and I will reply personally.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact" className="px-5 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-xs uppercase tracking-wider">Initiate Conversation →</a>
              <button onClick={copyEmail} className="px-4 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--text)] text-xs font-mono">Copy email</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-6 text-xs text-[var(--text-muted)]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div>© 2026 Rojish Sakhakarmi — Bhaktapur, Nepal</div>
          <div className="flex items-center gap-5">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">LinkedIn</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">Instagram</a>
            <a href="/admin" className="text-[var(--text-subtle)] hover:text-[var(--text)]">Admin CMS ↗</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="fixed bottom-6 right-6 px-4 py-2 rounded-full bg-[var(--text)] text-[var(--bg)] text-xs font-mono shadow-xl z-50">
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}