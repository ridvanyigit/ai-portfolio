import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

export const metadata: Metadata = {
  title: "Rıdvan Yiğit | AI Engineer Portfolio",
  description: "Portfolio website showcasing AI Engineering, Agentic Systems, and Generative AI projects.",
  openGraph: {
    title: "Rıdvan Yiğit | AI Engineer Portfolio",
    description: "AI Engineer specializing in Agentic AI, RAG, and autonomous systems.",
    url: "https://ridvan-chatbot-project-git-main-ridvans-projects-c0f0ac2c.vercel.app",
    siteName: "Rıdvan Yiğit",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nabla&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Fixed top navbar */}
        <Navbar />

        {/* Page content */}
        <div className="pt-16">{children}</div>

        {/* Fixed chatbot icon + iframe at bottom right */}
        <FloatingChatbot />

        {/* Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}