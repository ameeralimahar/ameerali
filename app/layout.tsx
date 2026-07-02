import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollReveal from "@/components/ScrollReveal";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-display" });
const body    = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-body" });
const mono    = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Ameer Ali — AI Engineer",
  description: "AI/ML-focused Software Engineer building computer vision pipelines, enterprise systems, and cloud infrastructure deployed at scale for millions.",
  metadataBase: new URL("https://ameerali-six.vercel.app"),
  openGraph: {
    title: "Ameer Ali — AI Engineer",
    description: "Production AI/ML systems serving 3M+ candidates. Full-stack, Cloud, Computer Vision.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider>
          <ScrollReveal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
