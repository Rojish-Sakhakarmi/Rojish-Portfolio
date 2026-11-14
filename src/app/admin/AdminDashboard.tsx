"use client";

import React, { useState, useEffect } from "react";

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Business Development");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    const checkSavedSession = async () => {
      const savedPw = localStorage.getItem("portfolio_admin_pw");
      if (!savedPw) {
        setAuthChecking(false);
        return;
      }

      // Verify the saved password against the backend API
      try {
        const res = await fetch("/api/posts", {
          headers: { "x-admin-password": savedPw },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setPassword(savedPw);
          setIsAuthenticated(true);
          setPosts(data.posts || []);
        } else {
          localStorage.removeItem("portfolio_admin_pw");
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkSavedSession();
  }, []);

  const fetchPosts = async (activePw?: string) => {
    const pwToUse = activePw || password;
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        headers: { "x-admin-password": pwToUse },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      }
    } catch (e) {
      setError("Failed to load posts from backend");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setError(null);
    setLoading(true);

    try {
      // Test credentials against your posts API route
      const res = await fetch("/api/posts", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("portfolio_admin_pw", password);
        setIsAuthenticated(true);
        setPosts(data.posts || []);
      } else {
        setError("Incorrect admin password.");
        setIsAuthenticated(false);
        localStorage.removeItem("portfolio_admin_pw");
      }
    } catch (e) {
      setError("Failed to authenticate with server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_pw");
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingSlug) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(autoSlug);
    }
  };

  const startEdit = (post: Post) => {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setDate(post.date);
    setExcerpt(post.excerpt);
    setBodyText(post.body.join("\n\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setTitle("");
    setSlug("");
    setCategory("Business Development");
    setDate(new Date().toISOString().split("T")[0]);
    setExcerpt("");
    setBodyText("");
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const paragraphs = bodyText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const payload = {
      password,
      post: {
        title,
        slug,
        category,
        date,
        excerpt,
        body: paragraphs,
      },
    };

    try {
      const method = editingSlug ? "PUT" : "POST";
      const res = await fetch("/api/posts", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Operation failed");
        return;
      }

      setSuccess(editingSlug ? "Post updated successfully!" : "New post published!");
      cancelEdit();
      fetchPosts();
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      setError("Network error while saving post");
    }
  };

  const handleDelete = async (postSlug: string) => {
    if (!confirm(`Are you sure you want to delete "${postSlug}"?`)) return;

    try {
      const res = await fetch(`/api/posts?slug=${encodeURIComponent(postSlug)}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Delete failed");
        return;
      }

      setSuccess("Post deleted");
      fetchPosts();
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      alert("Error deleting post");
    }
  };

  // 1. Session check loading screen
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex items-center justify-center p-6">
        <div className="text-xs font-mono text-[#71717a] animate-pulse">
          Verifying security session...
        </div>
      </div>
    );
  }

  // 2. Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#111114] border border-[#27272a] rounded-2xl p-8 space-y-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717a]">
              [ CMS // ACCESS CONTROL ]
            </span>
            <h1 className="text-2xl font-bold tracking-tight mt-1">Admin Portal</h1>
            <p className="text-sm text-[#a1a1aa] mt-1">
              Enter your password to manage your strategic essays and notes.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm outline-none focus:border-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-xs font-mono text-[#71717a] hover:text-white">
              ← Return to live site
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans pb-16">
      {/* Admin Header */}
      <header className="border-b border-[#27272a] bg-[#111114]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm tracking-tight">Rojish Sakhakarmi</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
              CMS Admin
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="/" className="hover:text-white text-[#a1a1aa] transition-colors">
              View Website ↗
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full border border-[#27272a] hover:border-white text-[#a1a1aa] hover:text-white transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-6 pt-10">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Post Editor Form */}
          <div className="lg:col-span-7 bg-[#111114] border border-[#27272a] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#27272a]">
              <div>
                <h2 className="text-lg font-bold">
                  {editingSlug ? "Edit Article" : "Write New Strategic Note"}
                </h2>
                <p className="text-xs text-[#71717a] font-mono mt-0.5">
                  Changes save directly to the live backend.
                </p>
              </div>
              {editingSlug && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-[#27272a] hover:border-white text-[#a1a1aa]"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Navigating Deal Friction in B2B Partnerships"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="deal-friction-b2b"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm font-mono outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm outline-none focus:border-white transition-colors"
                  >
                    <option value="Business Development">Business Development</option>
                    <option value="Brand Strategy">Brand Strategy</option>
                    <option value="Financial Markets">Financial Markets</option>
                    <option value="Product & UX">Product & UX</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 1-2 sentence commercial takeaway..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
                  Body Content (Separate paragraphs with double Enter)
                </label>
                <textarea
                  rows={8}
                  required
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="Paragraph 1...&#10;&#10;Paragraph 2...&#10;&#10;Paragraph 3..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#27272a] bg-black text-sm outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  {editingSlug ? "Save Changes" : "Publish Article →"}
                </button>
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#a1a1aa]">
                Published Articles ({posts.length})
              </h2>
              <button
                onClick={() => fetchPosts()}
                className="text-xs font-mono text-[#71717a] hover:text-white"
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs font-mono text-[#71717a]">
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#71717a] border border-dashed border-[#27272a] rounded-xl">
                No articles found. Add your first note using the form.
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="p-4 rounded-xl border border-[#27272a] bg-[#111114] hover:border-neutral-500 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                          {post.category}
                        </span>
                        <h3 className="font-semibold text-sm mt-1">{post.title}</h3>
                      </div>
                      <span className="text-xs font-mono text-[#71717a] whitespace-nowrap">
                        {post.date}
                      </span>
                    </div>

                    <p className="text-xs text-[#a1a1aa] line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#27272a]/60 text-xs font-mono">
                      <a
                        href={`/#post/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#71717a] hover:text-white"
                      >
                        View Post ↗
                      </a>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => startEdit(post)}
                          className="text-[#a1a1aa] hover:text-white underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}