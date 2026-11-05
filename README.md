# Modern Developer Portfolio

A sleek, responsive, and performance-optimized personal portfolio designed specifically for **students and early-career software engineers**. Built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Features

- **⚡ Blazing Fast**: Powered by Next.js App Router and optimized React Server Components.
- **🎨 Glassmorphism & Modern Dark Aesthetic**: Subtle glowing ambient gradients, frosted glass panels, and clean typography.
- **📱 Fully Responsive**: Seamless layout on mobile, tablet, and desktop screens.
- **✨ Smooth Motion**: Fluid entry and filtering animations using Framer Motion.
- **🎯 Student & Early Career Tailored**:
  - **Availability Badge**: Highlights recruitment status (Internships, New Grad roles).
  - **Education & Honors**: Highlights degree, GPA, coursework, and awards.
  - **Categorized Skills**: Visual pills for Languages, Frontend, Backend, and Tools.
  - **Interactive Projects**: Filter by category (Full Stack, Frontend, AI/ML, Tools), featuring GitHub and live demo links.
  - **Experience & Leadership**: Timeline for internships, hackathon victories, and student developer clubs.
  - **Contact Section**: One-click "Copy Email" button and ready-to-send contact form.
- **🧩 100% Centralized Data**: Edit your personal information in a single file (`src/data/portfolioData.ts`) without digging through components!

---

## 🛠️ Quick Start

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm start
```

---

## 📝 How to Customize Your Portfolio

All personal information, projects, skills, education, and links are neatly organized in:
👉 `src/data/portfolioData.ts`

### 1. Update Personal Info & Socials
Open `src/data/portfolioData.ts` and modify the `personal` object:
```typescript
personal: {
  name: "Your Name",
  role: "Aspiring Software Engineer & CS Student",
  headline: "Building scalable web apps...",
  location: "Your City / Remote",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "/resume.pdf", // Place resume in the /public folder
  availableForHire: true,
  statusText: "Actively looking for Summer 2026 Internships",
}
```

### 2. Add Your Resume
1. Name your resume PDF `resume.pdf`.
2. Place it into the `public/` folder (`public/resume.pdf`).
3. Set `resumeUrl: "/resume.pdf"` in `portfolioData.ts`.

### 3. Add or Edit Projects
Add your own projects in the `projects` array with tags, categories, highlights, and demo links.

### 4. Update Skills & Education
Modify `education` and `skills` categories to match your courses, university, and preferred languages/frameworks.

---

## 🌐 Deploy to Vercel (Free & Instant)

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will automatically build and publish your portfolio with a live URL and custom domain support!

---

## 📂 Project Structure

```
├── public/                 # Static assets (resume, images, icons)
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind imports and custom glow effects
│   │   ├── layout.tsx      # Root HTML layout and SEO metadata
│   │   └── page.tsx        # Portfolio page layout
│   ├── components/
│   │   ├── Navbar.tsx      # Responsive navigation & resume button
│   │   ├── Hero.tsx        # Introduction, recruitment badge & CTAs
│   │   ├── About.tsx       # Bio, core focus & education card
│   │   ├── Skills.tsx      # Grouped skill pills & badges
│   │   ├── Projects.tsx    # Filterable project showcase
│   │   ├── Experience.tsx  # Timeline for internships & hackathons
│   │   ├── Contact.tsx     # Copy-email button & contact form
│   │   ├── Footer.tsx      # Footer & back-to-top button
│   │   └── Icons.tsx       # SVG brand icons (GitHub, LinkedIn, Twitter)
│   └── data/
│       └── portfolioData.ts # Central configuration for all content
├── package.json
└── tailwind.config.ts
```
