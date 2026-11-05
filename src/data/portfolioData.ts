export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: "Full Stack" | "Frontend" | "AI / ML" | "Tools";
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  image?: string;
  highlights: string[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "Internship" | "Extracurricular" | "Hackathon" | "Leadership";
  description: string[];
  skillsUsed: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  coursework: string[];
  achievements?: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: "Beginner" | "Intermediate" | "Advanced" }[];
}

export const portfolioData = {
  personal: {
    name: "Alex Rivera",
    role: "Aspiring Software Engineer & Computer Science Student",
    headline: "Building modern, scalable web applications with a focus on high-impact user experiences.",
    bio: "I'm a computer science student passionate about full-stack development, distributed systems, and modern web architectures. Currently seeking software engineering internships and new grad opportunities where I can solve meaningful problems and grow alongside passionate engineers.",
    location: "San Francisco, CA / Remote",
    email: "alex.rivera.dev@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    resumeUrl: "#", // Replace with /resume.pdf
    availableForHire: true,
    statusText: "Actively looking for Summer 2026 Internships & New Grad Roles",
  },

  stats: [
    { label: "Projects Completed", value: "12+" },
    { label: "Git Commits This Year", value: "450+" },
    { label: "Hackathons Attended", value: "4" },
    { label: "Years Coding", value: "3+" },
  ],

  education: {
    degree: "B.S. in Computer Science",
    institution: "University of Technology",
    period: "2023 - 2027 (Expected)",
    gpa: "3.85 / 4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Systems",
      "Web Architecture & Distributed Systems",
      "Operating Systems",
      "Computer Networks",
    ],
    achievements: [
      "Dean's Honor List (All Semesters)",
      "1st Place - University Annual Hackathon 2025",
      "Undergraduate Teaching Assistant for Data Structures",
    ],
  } as Education,

  skills: [
    {
      title: "Languages",
      skills: [
        { name: "TypeScript", level: "Advanced" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
        { name: "Java", level: "Intermediate" },
        { name: "C++", level: "Intermediate" },
        { name: "SQL", level: "Intermediate" },
        { name: "HTML5/CSS3", level: "Advanced" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Next.js (App Router)", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Framer Motion", level: "Intermediate" },
        { name: "Redux / Zustand", level: "Intermediate" },
        { name: "Responsive Design", level: "Advanced" },
      ],
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "Node.js & Express", level: "Advanced" },
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Prisma ORM", level: "Intermediate" },
        { name: "RESTful APIs", level: "Advanced" },
        { name: "GraphQL Basics", level: "Beginner" },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Linux / Bash", level: "Intermediate" },
        { name: "Postman", level: "Advanced" },
        { name: "Vercel / Netlify", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      title: "DevFlow - Developer Productivity Hub",
      description: "A full-stack collaborative kanban and notes app for engineering teams with real-time sync.",
      longDescription:
        "Built with Next.js 15, Prisma, and PostgreSQL. Features real-time state synchronization, drag-and-drop task boards, Markdown documentation notes, and GitHub OAuth integration.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      category: "Full Stack",
      githubUrl: "https://github.com",
      liveUrl: "https://devflow-demo.vercel.app",
      featured: true,
      highlights: [
        "Implemented optimistic UI updates reducing perceived latency by 40%",
        "Designed relational database schema in PostgreSQL with Prisma ORM",
        "Secure authentication with NextAuth and GitHub OAuth",
      ],
    },
    {
      title: "AlgoVisualizer - Interactive Algorithm Sandbox",
      description: "Interactive visualizer for pathfinding and sorting algorithms with step-by-step playback.",
      longDescription:
        "An educational tool helping students visualize Dijkstra, A* search, BFS/DFS, QuickSort, and MergeSort. Includes speed controls, maze generation, and custom obstacle drawing.",
      tags: ["React", "TypeScript", "Canvas API", "Algorithms"],
      category: "Frontend",
      githubUrl: "https://github.com",
      liveUrl: "https://algoviz-demo.vercel.app",
      featured: true,
      highlights: [
        "Rendered 60fps graph traversals using requestAnimationFrame and HTML5 Canvas",
        "Created custom maze generation using recursive division algorithms",
        "Used by 500+ peers in university CS courses",
      ],
    },
    {
      title: "DocuSense - AI Document Assistant",
      description: "RAG-powered conversational assistant to question and summarize PDF research papers.",
      longDescription:
        "Upload PDF research papers and ask questions. Utilizes vector embeddings, semantic search, and streaming LLM responses to provide citations and summaries.",
      tags: ["Python", "FastAPI", "React", "Vector DB", "OpenAI API"],
      category: "AI / ML",
      githubUrl: "https://github.com",
      liveUrl: "https://docusense-demo.vercel.app",
      featured: true,
      highlights: [
        "Engineered chunking & embedding pipeline with cosine similarity search",
        "Streamed responses via Server-Sent Events (SSE) for zero perceived lag",
        "Built responsive UI with markdown rendering and source citation badges",
      ],
    },
    {
      title: "GitPulse - GitHub Repository Analytics CLI",
      description: "Command-line tool to analyze commit frequency, contributor breakdown, and pull request metrics.",
      longDescription:
        "A lightweight Node.js CLI tool that queries the GitHub REST API and generates terminal tables and charts of repository velocity and health.",
      tags: ["Node.js", "TypeScript", "CLI", "GitHub API"],
      category: "Tools",
      githubUrl: "https://github.com",
      featured: false,
      highlights: [
        "Built with Commander.js and Chalk for sleek terminal UX",
        "Integrated rate-limit caching with local SQLite store",
      ],
    },
  ] as Project[],

  experiences: [
    {
      role: "Software Engineering Intern",
      organization: "TechNova Solutions",
      period: "May 2025 - Aug 2025",
      location: "San Jose, CA (Hybrid)",
      type: "Internship",
      description: [
        "Engineered automated internal dashboard using Next.js and Tailwind CSS, saving the operations team 8 hours weekly.",
        "Refactored legacy REST endpoints in Node.js/Express, improving average API response time by 28%.",
        "Wrote end-to-end test suites using Playwright achieving 85% critical-path code coverage.",
      ],
      skillsUsed: ["Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Playwright"],
    },
    {
      role: "Lead Coordinator & Web Lead",
      organization: "Google Developer Student Club (GDSC)",
      period: "Sep 2024 - Present",
      location: "University Campus",
      type: "Leadership",
      description: [
        "Organized 6 hands-on technical workshops on Web Dev, Git, and Cloud computing for 200+ students.",
        "Maintained and enhanced the chapter's official website, boosting event registration by 45%.",
        "Mentored junior students through their first open-source contributions during Hacktoberfest.",
      ],
      skillsUsed: ["React", "Git", "Community Leadership", "Event Planning"],
    },
    {
      role: "1st Place Winner",
      organization: "HackWest Annual Hackathon",
      period: "Nov 2025",
      location: "San Francisco, CA",
      type: "Hackathon",
      description: [
        "Built 'EcoRoute', an accessibility-first public transit navigation app in 36 hours among 80+ competing teams.",
        "Integrated real-time transit APIs with Mapbox GL and voice-guided turn-by-turn prompts.",
      ],
      skillsUsed: ["React Native", "Mapbox", "FastAPI", "Pitching"],
    },
  ] as Experience[],
};
