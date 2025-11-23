"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white">
      {/* Overlay for subtle darkening in light mode */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-32 text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Discover the Best Events in Chittagong
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl mb-8 text-gray-100/90 dark:text-gray-200/90">
          Concerts, workshops, meetups, and more — all in one place.
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center md:justify-start gap-4">
          <Link
            href="/events"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            View Events
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-600 rounded-lg transition"
          >
            Register Now
          </Link>
        </div>
      </div>

      {/* Optional Background Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/30 to-transparent dark:from-black/60"></div>
    </section>
  );
}
