import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";
import Script from "next/script"; // GA4 için gerekli

export const metadata: Metadata = {
  title: "Rıdvan Yiğit | AI Engineer Portfolio",
  description:
    "Portfolio website showcasing AI Engineering, Agentic Systems, and Generative AI projects.",
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
        <Navbar />
        <div className="pt-16">{children}</div>

        {/* MEVCUT CHATBOT'U YORUM SATIRI YAPARAK DEVRE DIŞI BIRAKIYORUZ */}
        {/* <FloatingChatbot /> */}

        <Footer />

        {/* YENİ ELEVENLABS SESLİ CHATBOT'U BURAYA EKLİYORUZ */}
        <elevenlabs-convai agent-id="agent_6301kfjerfxnfxt9mmeaam1mggrs"></elevenlabs-convai>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </body>
    </html>
  );
}