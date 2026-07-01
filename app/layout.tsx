import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import TrackPageView from "@/components/TrackPageView";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ameer Ali — Software Engineer",
  description:
    "Software Engineer building production systems at scale — full-stack web platforms, cloud infrastructure, and AI/ML/computer-vision pipelines used by millions of candidates.",
  metadataBase: new URL("https://ameerali.vercel.app"),
  openGraph: {
    title: "Ameer Ali — Software Engineer",
    description:
      "Full-stack, cloud, and AI/ML engineering — production systems used by millions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <TrackPageView />
        {children}
      </body>
    </html>
  );
}
