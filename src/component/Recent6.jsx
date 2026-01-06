import Link from "next/link";

export default async function Recent6() {
  try {
    const res = await fetch(
      "https://event-in-ctg-server.vercel.app/latest-events",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();

    return (
      <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Title */}
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 rounded-full text-sm font-medium mb-4 border border-blue-500/20">
              ✨ Latest Updates
            </span>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Recent Events
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Discover the best events happening in Chattogram — workshops,
              exhibitions, meetups, and more.
            </p>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event, index) => (
              <div
                key={event._id}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:-translate-y-3"
              >
                {/* Event Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {event.category}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 group/btn hover:scale-110">
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
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <svg
                        className="w-4 h-4 text-blue-400"
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
                      <span className="text-white text-sm font-medium">
                        {new Date(event.start_date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Live/Hot Badge */}
                  {index < 2 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        HOT
                      </span>
                    </div>
                  )}
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
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <svg
                        className="w-4 h-4 text-blue-400"
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
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <svg
                        className="w-4 h-4 text-purple-400"
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
                    className="group/btn flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
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
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-white font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              View All Events
              <svg
                className="w-5 h-5"
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
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Failed to load events
        </p>
      </div>
    );
  }
}
