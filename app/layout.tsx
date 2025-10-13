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
      <body>
        {/* Üst sabit navbar */}
        <Navbar />

        {/* Sayfa içeriği */}
        <div className="pt-16">{children}</div>

        {/* Sağ altta sabit chatbot ikonu + iframe */}
        <FloatingChatbot />

        {/* Footer en altta */}
        <Footer />
      </body>
    </html>
  );
}
