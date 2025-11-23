"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d0d0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Event<span className="text-blue-500">CTG</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/events" className="hover:text-blue-400 transition">Events</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>

          {/* Auth Button */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-300"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 py-4 bg-[#0d0d0f] border-t border-white/10 text-gray-300">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/events" className="hover:text-blue-400 transition">Events</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
