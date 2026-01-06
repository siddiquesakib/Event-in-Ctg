"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEvent, setFilterEvent] = useState([]);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("https://event-in-ctg-server.vercel.app/events");
      const data = await res.json();
      setEvents(data);
      setFilterEvent(data);
    };
    fetchEvents();
  }, []);

  // Filter events whenever search changes
  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilterEvent(filtered);
  }, [search, events]);

  return (
    <div className=" pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-4">
            🎉 Discover Amazing Events
          </span>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the best events happening in Chattogram — workshops,
            exhibitions, meetups, and more.
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search events by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterEvent.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-xl">No events found.</p>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            filterEvent.map((event, index) => (
              <div
                key={event._id}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                      {event.category}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 group/btn">
                    <svg
                      className="w-5 h-5 text-white group-hover/btn:text-red-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.start_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {event.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
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
                      <span>Chittagong</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {new Date(event.start_date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}{" "}
                        -{" "}
                        {new Date(event.end_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                  {/* Details Button */}
                  <Link
                    href={`/events/${event._id}`}
                    className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    View Details
                    <svg
                      className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
