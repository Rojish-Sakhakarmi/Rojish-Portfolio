import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rojish-sakhakarmi.com.np"),
  title: "Rojish Sakhakarmi",
  description:
    "Personal website of Rojish Sakhakarmi — Financial Market Analyst, Trader, and Brand Strategist. Notes on brand, marketing, design, systems, and capital markets.",
  keywords: [
    "Rojish Sakhakarmi",
    "Rojish0",
    "Financial Market Analyst",
    "Trader",
    "Brand Strategy",
    "Nepali",
    "Smart Money Concepts",
    "Nepal",
    "Forex Trader",
    "Nepali Trader",
    "Nepali gold trader",
    "SMC Trader",
  ],
  authors: [{ name: "Rojish Sakhakarmi", url: "https://rojish-sakhakarmi.com.np" }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Rojish Sakhakarmi — Strategy, Systems & Markets",
    description:
      "Connecting ideas to opportunity across brand strategy, business growth, IT systems, and financial markets.",
    url: "https://rojish-sakhakarmi.com.np",
    siteName: "Rojish Sakhakarmi",
    locale: "en_US",
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
        <Analytics />
        <SpeedInsights />

        {/* Google Tag (G-0BFP519WZ3) */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=G-0BFP519WZ3"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ze44xwue1x");
          `}
        </Script>
      </body>
    </html>
  );
}