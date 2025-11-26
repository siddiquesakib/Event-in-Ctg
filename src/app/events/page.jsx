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
      const res = await fetch("https://event-in-ctg-server.vercel.app");
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover the best events happening in Chattogram — workshops,
          exhibitions, meetups, and more.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search events by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterEvent.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No events found.
          </p>
        ) : (
          filterEvent.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500 hover:border-2"
            >
              {/* Event Image */}
              <div className="relative w-full h-48">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Info */}
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {event.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {event.description}
                </p>
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  {event.category}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(event.start_date).toLocaleDateString()} -{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </p>

                {/* Details Button */}
                <Link
                  href={`/events/${event._id}`}
                  className="block text-center mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
