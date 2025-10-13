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
          I am an AI Engineer specialized in building agentic systems, RAG pipelines, and intelligent chatbots. 
          My focus is on creating production-grade AI applications using frameworks like LangChain, CrewAI, MCP, and Next.js.
          I enjoy working at the intersection of AI, backend architecture, and user experience.
        </motion.p>
      </div>
    </section>
  );
}
