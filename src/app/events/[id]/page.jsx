export default async function page({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/events/${id}`, {
    cache: 'no-store'
  });
  const data = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Image */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
        <img 
          src={data.img} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <span className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-sm font-medium mb-4">
            {data.category}
          </span>
          <h1 className="text-5xl font-bold mb-2">{data.title}</h1>
        </div>
      </div>

      {/* Event Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-lightBg dark:bg-darkBg p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-semibold text-lg">Date</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {new Date(data.start_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            to {new Date(data.end_date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>

        <div className="bg-lightBg dark:bg-darkBg p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-semibold text-lg">Time</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{data.time}</p>
        </div>

        <div className="bg-lightBg dark:bg-darkBg p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="font-semibold text-lg">Location</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{data.location}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-lightBg dark:bg-darkBg p-8 rounded-xl shadow-md mb-8">
        <h2 className="text-3xl font-bold mb-6">About This Event</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {data.description}
        </p>
      </div>

      {/* Organizer */}
      <div className="bg-lightBg dark:bg-darkBg p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Organized By</h2>
        <div className="flex items-center gap-4">
          
          <div>
            <p className="text-xl font-semibold">{data.organizer}</p>
            <p className="text-gray-500 dark:text-gray-400">Event Organizer</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg">
          Register Now
        </button>
        <button className="px-8 border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-4 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition">
          Share Event
        </button>
      </div>
    </div>
  );
}