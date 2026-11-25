import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-dm",
  display: "swap",
  weight: "400 700",
});
const display = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "400 700",
});
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: "Aditya Jaiswal — Full-Stack Developer & AI Automation Engineer",
  description:
    "Full-stack applications, intelligent agents, and automation that connects it all. Explore Aditya Jaiswal’s projects, experience, and applied AI work.",
  openGraph: {
    title: "Aditya Jaiswal — Code. Connect. Automate.",
    description:
      "Full-Stack Developer & AI Automation Engineer. Selected web applications, voice agents, and intelligent workflows.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
