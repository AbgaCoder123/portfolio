import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bernard Godsgift | Full-Stack Developer & UI/UX Designer",
  description:
    "Explore the portfolio of Bernard Godsgift — a creative full-stack developer and UI/UX designer building modern, user-focused web applications with animations, interactivity, and cutting-edge design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
