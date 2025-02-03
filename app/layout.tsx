import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expyr.ai - Smart Grocery Assistant",
  description: "Scan. Track. Never waste food again! Expyr.ai helps you track expiry dates and manage groceries using AI.",
  keywords: "grocery management, expiry tracking, food waste, AI assistant",
  openGraph: {
    title: "Expyr.ai - Smart Grocery Assistant",
    description: "Scan. Track. Never waste food again! Expyr.ai helps you track expiry dates and manage groceries using AI.",
    images: ['/images/logo.png'],
  },
  robots: "index,follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
