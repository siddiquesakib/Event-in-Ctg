import Link from "next/link";

export default async function EventsPage() {
  const res = await fetch("http://localhost:4000/events");
  const data = await res.json();
  // console.log(data);

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

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((event) => (
          <div
            key={event._id}
            className="bg-lightBg dark:bg-darkBg shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
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
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                {event.description}
              </p>
              <p className="font-medium">{event.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(event.start_date).toLocaleDateString()} -{" "}
                {new Date(event.end_date).toLocaleDateString()}
              </p>

              {/* Details Button */}
              <Link
                href={`/events/${event._id}`}
                className="block text-center mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
