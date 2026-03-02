"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto"
        >
          I am an MSc AI Engineer and Systems Architect based in Vienna, bridging the gap between advanced academic research and scalable production systems. For over five years, I have specialized in designing autonomous AI agents, RAG pipelines, and intelligent automation flows that solve complex business challenges.
          <br />
          My approach goes beyond writing code; I engineer end-to-end solutions. From fine-tuning Large Language Models (LLMs) to deploying serverless architectures on AWS and creating seamless frontends with Next.js, I handle the entire lifecycle of an AI product. I leverage tools like n8n and OpenAI to build systems that are not just smart, but reliable and business-critical.
          <br />          
          Living in Vienna shapes my professional ethos—combining innovation with European standards of quality and privacy. I view every project as a partnership, committed to delivering precision, transparency, and measurable value.
          <br />
          <strong className="block text-left mt-2">Beyond the Code:</strong>
          <br />
          Strategy and creativity fuel my work. I am a competitive chess player (1900 Elo) and a musician playing both violin and guitar. Whether on the chessboard or in a codebase, I thrive on discipline, foresight, and the art of solving complex problems elegantly.
          <br />
        </motion.p>
      </div>
    </section>
  );
}
