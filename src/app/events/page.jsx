export default function EventsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 text-gray-200">
      <h1 className="text-4xl font-bold text-white mb-3">All Events</h1>
      <p className="text-gray-400 mb-10">
        Explore the latest events happening across Chittagong.
      </p>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
        />
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg hover:bg-gray-800 transition"
          >
            <div className="h-40 bg-gray-700 rounded-lg mb-4"></div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Event Title {item}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Short description of the event. This will truncate to keep layout
              clean.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-medium">$20</span>
              <a
                href={`/events/${item}`}
                className="text-blue-500 hover:underline"
              >
                Details →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
