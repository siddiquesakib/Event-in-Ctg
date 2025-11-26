"use client";

import { useState } from "react";

export default function ExploreByDate() {
  const dates = [
    { id: 1, date: "2025-12-01", label: "Dec 1, 2025" },
    { id: 2, date: "2025-12-05", label: "Dec 5, 2025" },
    { id: 3, date: "2025-12-10", label: "Dec 10, 2025" },
    { id: 4, date: "2025-12-15", label: "Dec 15, 2025" },
    { id: 5, date: "2025-12-20", label: "Dec 20, 2025" },
    { id: 6, date: "2025-12-25", label: "Dec 25, 2025" },
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Explore Events by Date</h2>
        <p className="text-gray-400 mt-2">
          Pick a date and discover all events happening on that day in Chattogram.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {dates.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDate(d.date)}
            className={`py-8 px-6 rounded-2xl text-center font-semibold text-lg transition-all transform
              ${
                selectedDate === d.date
                  ? "bg-blue-600 text-white shadow-2xl scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
              }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-12 text-center text-white text-xl">
          <p>
            Showing events for:{" "}
            <span className="font-bold">{new Date(selectedDate).toDateString()}</span>
          </p>
          {/* Map events here based on selectedDate */}
        </div>
      )}
    </section>
  );
}
