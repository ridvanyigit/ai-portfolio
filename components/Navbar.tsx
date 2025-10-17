"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur bg-background/70 border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <Link href="/" className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold text-3xl">
        Rıdvan Yiğit
      </Link>
        <div className="flex items-center gap-4">
          <div className="space-x-4 text-sm font-medium hidden md:block">
            <Link href="/#about" className="hover:text-indigo-500">About</Link>
            <Link href="/#services" className="hover:text-indigo-500">Services</Link>
            <Link href="/#projects" className="hover:text-indigo-500">Projects</Link>
            <Link href="/#contact" className="hover:text-indigo-500">Contact</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}