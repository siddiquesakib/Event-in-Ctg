import React from "react";

export default function addevent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-lightBg dark:bg-darkBg rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-2">Add New Event</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Fill in the details to create a new event in Chattogram
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Tech Conference 2026"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Provide detailed information about your event..."
            />
          </div>

          {/* Category & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Technology/Workshop"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Organizer *
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Organization name"
              />
            </div>
          </div>

          {/* Start & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                End Date & Time *
              </label>
              <input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Time & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Time Display *
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., 10:00 AM – 6:00 PM (GMT+6)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full address in Chattogram"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Image URL *
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Event..." : "Add Event"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/events")}
              className="px-8 border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
