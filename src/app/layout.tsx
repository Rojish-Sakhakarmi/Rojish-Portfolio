import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rojish Sakhakarmi — Brand, Systems & Markets",
  description: "Personal website of Rojish Sakhakarmi. Notes on brand, marketing, design, systems, and markets.",
  authors: [{ name: "Rojish Sakhakarmi" }],
  openGraph: {
    title: "Rojish Sakhakarmi",
    description: "I think about brands, people and markets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Caveat:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
