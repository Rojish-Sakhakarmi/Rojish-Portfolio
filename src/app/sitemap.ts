import type { MetadataRoute } from "next";

const BASE_URL = "https://rojish-sakhakarmi.com.np";

// Fallback posts in case the API is unavailable at request time
const FALLBACK_POSTS = [
  { slug: "why-creativity-needs-strategy", date: "2026-09-15" },
  { slug: "international-client-outreach", date: "2026-08-20" },
  { slug: "teaching-financial-markets", date: "2026-07-10" },
  { slug: "systems-thinking-from-it", date: "2026-06-05" },
];

export const revalidate = 3600; // Refresh sitemap every 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  let posts = FALLBACK_POSTS;

  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
      posts = data.posts;
    }
  } catch {
    // Falls back to FALLBACK_POSTS automatically
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}