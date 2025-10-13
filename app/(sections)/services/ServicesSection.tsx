"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Database, Rocket } from "lucide-react";

const services = [
  {
    icon: <Bot className="w-8 h-8 mb-4 text-indigo-500" />,
    title: "Agentic AI Systems",
    desc: "I design and build multi-agent systems with OpenAI SDK, CrewAI, LangGraph and MCP.",
  },
  {
    icon: <Database className="w-8 h-8 mb-4 text-indigo-500" />,
    title: "RAG Pipelines",
    desc: "Production-ready Retrieval-Augmented Generation solutions for real data.",
  },
  {
    icon: <Rocket className="w-8 h-8 mb-4 text-indigo-500" />,
    title: "AI Deployments",
    desc: "From prototype to scalable deployments on AWS, Azure, GCP, Vercel, and Hugging Face Spaces.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          What I Do
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="h-full text-center p-6 hover:shadow-lg transition">
                <CardContent>
                  {s.icon}
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
