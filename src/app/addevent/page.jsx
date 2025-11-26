"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddEventPage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    const startDate = new Date(e.target.start_date.value);
    const endDate = new Date(e.target.end_date.value);

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      email: user.email,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
      location: e.target.location.value,
      organizer: e.target.organizer.value,
      time: e.target.time.value,
      img: e.target.img.value,
    };

    console.log(formData);

    fetch("http://localhost:4000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Success:", data);
        toast.success("Event added successfully!");
        e.target.reset();
        setIsSubmitting(false);

        // Redirect to manage events page
        setTimeout(() => {
          // router.push("/manage_events");
        }, 1500);
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.message || "Failed to add event. Please try again.");
        setIsSubmitting(false);
      });
  };

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
              // required
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
              // required
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
                // required
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
                // required
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
                // required
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
                // required
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
                // required
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
                // required
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
              // required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Event"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/events")}
              disabled={isSubmitting}
              className="px-8 border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
