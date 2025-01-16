import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expyr.ai - Smart Grocery Assistant",
  description: "Never throw away expired groceries again! Expyr.ai helps you track expiry dates and manage groceries using AI.",
  keywords: "grocery management, expiry tracking, food waste, AI assistant",
  openGraph: {
    title: "Expyr.ai - Smart Grocery Assistant",
    description: "Never throw away expired groceries again!",
    images: ['/images/logo.png'],
  },
  robots: "index,follow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
