"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_25%,theme(colors.blue.400)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,theme(colors.purple.400)_0%,transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl px-4"
      >
        <span className="inline-block px-4 py-2 mb-4 text-white bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
          Available for AI Projects
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
          Rıdvan Yiğit
        </h1>
        <p className="text-xl text-white/90 mb-8">
          AI Engineer & Autonomous Agent Developer
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:-translate-y-1 transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-white/50 text-white font-semibold hover:bg-white/10 transition"
          >
            Let's Talk
          </a>
        </div>
      </motion.div>
    </section>
  );
}
