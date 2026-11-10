import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const dataFilePath = path.join(process.cwd(), "src", "data", "posts.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function getPosts() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading posts file:", error);
    return [];
  }
}

function savePosts(posts: any[]) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing posts file:", error);
    return false;
  }
}

// GET: Fetch all posts
export async function GET() {
  const posts = getPosts();
  return NextResponse.json({ success: true, posts }, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate"
    }
  });
}

// POST: Add a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, post } = body;
    const authHeader = request.headers.get("x-admin-password");
    const activePassword = password || authHeader;

    if (activePassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    if (!post || !post.title || !post.slug) {
      return NextResponse.json({ success: false, error: "Title and slug are required" }, { status: 400 });
    }

    const posts = getPosts();
    
    // Check if slug already exists
    const existingIndex = posts.findIndex((p: any) => p.slug === post.slug);
    if (existingIndex !== -1) {
      return NextResponse.json({ success: false, error: "A post with this slug already exists" }, { status: 400 });
    }

    const newPost = {
      slug: post.slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-"),
      title: post.title.trim(),
      category: post.category?.trim() || "Strategy",
      date: post.date || new Date().toISOString().split("T")[0],
      excerpt: post.excerpt?.trim() || "",
      body: Array.isArray(post.body) ? post.body : [post.body || ""]
    };

    posts.unshift(newPost);
    savePosts(posts);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// PUT: Update an existing post
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, post } = body;
    const authHeader = request.headers.get("x-admin-password");
    const activePassword = password || authHeader;

    if (activePassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    if (!post || !post.slug) {
      return NextResponse.json({ success: false, error: "Post slug is required" }, { status: 400 });
    }

    const posts = getPosts();
    const index = posts.findIndex((p: any) => p.slug === post.slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    posts[index] = {
      ...posts[index],
      title: post.title ? post.title.trim() : posts[index].title,
      category: post.category ? post.category.trim() : posts[index].category,
      date: post.date || posts[index].date,
      excerpt: post.excerpt ? post.excerpt.trim() : posts[index].excerpt,
      body: Array.isArray(post.body) ? post.body : [post.body || ""]
    };

    savePosts(posts);

    return NextResponse.json({ success: true, post: posts[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// DELETE: Remove a post
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const password = request.headers.get("x-admin-password");

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug parameter is required" }, { status: 400 });
    }

    let posts = getPosts();
    const initialLength = posts.length;
    posts = posts.filter((p: any) => p.slug !== slug);

    if (posts.length === initialLength) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    savePosts(posts);

    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}