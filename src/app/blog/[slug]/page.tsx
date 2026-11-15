import type { Metadata } from "next";
import HomePage, { INITIAL_POSTS, type BlogPost } from "../../page";

const BASE_URL = "https://rojish-sakhakarmi.com.np";

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
      return data.posts;
    }
  } catch {
    // Fall back to static posts if API fetch fails
  }
  return INITIAL_POSTS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

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

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPosts();

  return <HomePage initialPosts={posts} initialPath={`/blog/${slug}`} />;
}