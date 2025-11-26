"use client";

import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="max-w-11/12 mx-auto relative py-20 px-4 md:px-8 bg-gray-900 overflow-hidden rounded-3xl">
      {/* Background Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full animate-pulse"></div>

      {/* Glassmorphism Card */}
      <div className="relative max-w-4xl mx-auto text-center p-10 bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Stay Ahead of Every Event!
        </h1>
        <p className="text-white/80 text-lg md:text-xl">
          Sign up to get updates on Chattogram’s latest workshops, meetups, and exhibitions.
        </p>
        <Link
          href="/register"
          className="inline-block mt-4 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Register Free
        </Link>
      </div>
    </section>
  );
}
