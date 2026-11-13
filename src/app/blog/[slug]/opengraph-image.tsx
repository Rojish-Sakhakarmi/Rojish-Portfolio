import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rojish Sakhakarmi — Essay & Field Notes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const BASE_URL = "https://rojish-sakhakarmi.com.np";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime?: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: "why-creativity-needs-strategy",
    title: "Why creativity becomes truly valuable only when backed by strategy",
    category: "Brand Strategy",
    date: "2026-09-15",
    readTime: "4 min read",
  },
  {
    slug: "international-client-outreach",
    title: "What international client outreach taught me about business development",
    category: "Business Development",
    date: "2026-08-20",
    readTime: "5 min read",
  },
  {
    slug: "teaching-financial-markets",
    title: "What educating others on financial markets taught me about risk and patience",
    category: "Financial Markets",
    date: "2026-07-10",
    readTime: "6 min read",
  },
  {
    slug: "systems-thinking-from-it",
    title: "How an IT background in cybersecurity shapes business thinking",
    category: "Systems & Tech",
    date: "2026-06-05",
    readTime: "4 min read",
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
    // Falls back to static posts automatically
  }
  return FALLBACK_POSTS.find((p) => p.slug === slug);
}

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || "Essays & Field Notes";
  const category = post?.category || "Perspectives";
  const metaLine = [post?.date, post?.readTime].filter(Boolean).join("  •  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          border: "1px solid #222226",
        }}
      >
        {/* Top Row: Category Badge & Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 20,
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#0e0e11",
              border: "1px solid #333338",
              padding: "10px 22px",
              borderRadius: "12px",
            }}
          >
            <span>{category}</span>
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#a1a1aa",
              fontWeight: 600,
            }}
          >
            rojish-sakhakarmi.com.np
          </div>
        </div>

        {/* Center: Dynamic Article Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1020px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 75 ? 48 : 58,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom Row: Author & Date/Read Time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #222226",
            paddingTop: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
              }}
            />
            <span>Rojish Sakhakarmi</span>
          </div>

          <div style={{ fontSize: 20, color: "#a1a1aa" }}>
            {metaLine || "Essays & Field Notes"}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}