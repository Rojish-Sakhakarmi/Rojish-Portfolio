import type { MetadataRoute } from "next";
import { INITIAL_POSTS, type BlogPost } from "@/lib/posts";

const BASE_URL = "https://rojish-sakhakarmi.com.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: BlogPost[] = INITIAL_POSTS;

  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
      posts = data.posts;
    }
  } catch {
    // Fall back to static posts if API fetch fails
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
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
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...postEntries,
  ];
}