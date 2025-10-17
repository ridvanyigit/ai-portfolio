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
          I’m an AI Engineer based in Vienna, blending deep technical expertise with a perfectionist mindset. For the past five years, I’ve specialized in Large Language Model (LLM) Engineering, working end-to-end — from research to production — to deliver reliable, intelligent, and scalable solutions.
          <br />
          My core focus areas include RAG pipelines, MLOps, fine-tuning, autonomous AI agents, and chatbot development. I design and integrate intelligent assistants into modern web platforms, and I build automation flows using tools like n8n, OpenAI, AWS, and Vercel to bring advanced AI capabilities into real-world systems.
          <br />          
          What truly sets my work apart is the way I approach it: with precision, dedication, and genuine respect for the craft. I see every project as an opportunity to create something exceptional — where quality, trust, and collaboration come first. This mindset has made me a reliable partner for individuals, SMBs, and enterprises seeking tailored AI solutions.
          <br />
          Living in Vienna — a city that embodies both tradition and innovation — shapes my perspective. I value European standards of quality, cultural diversity, and forward-thinking approaches, all of which reflect in the solutions I deliver.
          <br />
          Beyond work, I’m passionate about travel, classical music, and chess. I play both violin and guitar, and I regularly compete in chess tournaments, holding a 1900 Elo rating. These passions keep me curious, disciplined, and creatively engaged — qualities that naturally extend into my professional life.
        </motion.p>
      </div>
    </section>
  );
}
