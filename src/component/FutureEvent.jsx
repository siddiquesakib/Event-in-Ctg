"use client";

import Link from "next/link";

export default function FutureEvent() {
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Top Green Banner with Title */}
      <div className="relative bg-emerald-500 py-8 overflow-hidden">
        {/* Dotted Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
          }}
        ></div>

        <h2
          className="relative text-center text-6xl md:text-8xl font-black text-white tracking-wider"
          style={{
            WebkitTextStroke: "2px white",
            textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
          }}
        >
          THE VENUE
        </h2>
      </div>

      {/* Background Image Section */}
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=2148&auto=format&fit=crop')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Info Card */}
        <div className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 w-full max-w-md">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-800">
            {/* Venue Name */}
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-wide">
              RADISSON BLU CHITTAGONG
            </h3>

            {/* Location */}
            <p className="text-emerald-400 font-semibold text-lg mb-4">
              CHITTAGONG, BANGLADESH
            </p>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              A premier luxury hotel transformed into our event hub. This year
              we are hosting both indoor conferences and outdoor networking
              sessions!
            </p>

            {/* Address with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  Bulbul Center, OR Nizam Rd, Chittagong
                </span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition"
              >
                Directions
              </a>
            </div>

            {/* CTA Button */}
            <Link
              href="/events"
              className="block w-full py-4 bg-gray-800 hover:bg-gray-700 text-white text-center font-semibold rounded-lg transition border border-gray-700 hover:border-gray-600"
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
