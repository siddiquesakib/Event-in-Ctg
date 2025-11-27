"use client";

import { toast } from "react-toastify";

export default function ContactPage() {
  const handleSend = (e) => {
    e.preventDefault();
    toast.success("Thanks!");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-20 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>

      <p className="text-gray-300 mb-10">
        Have questions, suggestions, or want to collaborate? We’d love to hear
        from you. Fill out the form below.
      </p>

      <form onSubmit={handleSend} className="grid gap-6">
        <div>
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Message</label>
          <textarea
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-fit"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
