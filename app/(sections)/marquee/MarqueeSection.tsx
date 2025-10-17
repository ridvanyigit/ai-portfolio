"use client";

import { motion } from "framer-motion";

const skills = [
  "LangChain",
  "CrewAI",
  "Agents SDK",
  "LangGraph",
  "MCP",
  "Python",
  "FastAPI",
  "RAG",
  "AI Chatbot",
  "AI Agents",
  "Workflow Automation",
  "Multi-Agent Systems",
];

export default function MarqueeSection() {
  return (
    <div className="overflow-hidden bg-background border-y border-border">
      <motion.div
        className="flex whitespace-nowrap py-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="mx-8 text-lg font-semibold text-foreground/80"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
