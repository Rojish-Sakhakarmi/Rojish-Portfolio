import type { Metadata } from "next";
import HomePage from "../../page";

const BASE_URL = "https://rojish-sakhakarmi.com.np";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: "why-creativity-needs-strategy",
    title: "Why creativity becomes truly valuable only when backed by strategy",
    category: "Brand Strategy",
    date: "2026-09-15",
    excerpt:
      "Making things look good is only half the work. True creative impact comes from understanding why a brand exists, who it serves, and the business problem it solves.",
  },
  {
    slug: "international-client-outreach",
    title: "What international client outreach taught me about business development",
    category: "Business Development",
    date: "2026-08-20",
    excerpt:
      "Notes from lead generation and client communication at WebX Nepal. Why listening and understanding client requirements beats high-pressure pitches.",
  },
  {
    slug: "teaching-financial-markets",
    title: "What educating others on financial markets taught me about risk and patience",
    category: "Financial Markets",
    date: "2026-07-10",
    excerpt:
      "Observing the stock and forex markets rewards emotional discipline over impulse. Teaching financial literacy showed me how human psychology drives decision-making.",
  },
  {
    slug: "systems-thinking-from-it",
    title: "How an IT background in cybersecurity shapes business thinking",
    category: "Systems & Tech",
    date: "2026-06-05",
    excerpt:
      "Studying Computer Science and networking at KFA Business School gave me a framework for diagnosing friction and understanding how systems behave under pressure.",
  },
];

async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
      const found = data.posts.find((p: BlogPost) => p.slug === slug);
      if (found) return found;
    }
  } catch {
    // Fall back to static posts if API fetch fails
  }
  return FALLBACK_POSTS.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found — Rojish Sakhakarmi",
    };
  }

  const postUrl = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} — Rojish Sakhakarmi`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["Rojish Sakhakarmi"],
    },
  };
}

export default function BlogPostRoute() {
  return <HomePage />;
}