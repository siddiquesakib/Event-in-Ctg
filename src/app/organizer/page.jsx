"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrganizerDashboard() {
  const { user, isOrganizer, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalRevenue: 0,
    activeEvents: 0,
  });
  const [myEvents, setMyEvents] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!isOrganizer) {
      router.push("/");
      return;
    }

    fetchOrganizerData();
  }, [user, isOrganizer, authLoading, router]);

  const fetchOrganizerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://event-in-ctg-server.vercel.app/events"
      );
      const allEvents = await response.json();

      // Filter events by this organizer
      const organizerEvents = allEvents.filter(
        (event) =>
          event.userEmail === user?.email || event.email === user?.email
      );

      const now = new Date();
      const active = organizerEvents.filter((e) => new Date(e.date) >= now);

      // Mock registrations data
      const mockRegistrations = organizerEvents.slice(0, 5).map((event, i) => ({
        id: i + 1,
        eventTitle: event.title,
        userName: `User ${i + 1}`,
        userEmail: `user${i + 1}@example.com`,
        date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
        ticketType: i % 2 === 0 ? "VIP" : "Regular",
        amount: event.price || 0,
      }));

      setStats({
        totalEvents: organizerEvents.length,
        totalAttendees: organizerEvents.length * 15, // Mock data
        totalRevenue: organizerEvents.reduce(
          (sum, e) => sum + (e.price || 0) * 15,
          0
        ),
        activeEvents: active.length,
      });

      setMyEvents(organizerEvents);
      setRecentRegistrations(mockRegistrations);
    } catch (error) {
      console.error("Error fetching organizer data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || !isOrganizer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-gray-400">
              Manage your events and track performance
            </p>
          </div>
          <Link
            href="/addevent"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Event
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Total Events</h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.totalEvents}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Active Events</h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.activeEvents}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">
                Total Attendees
              </h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.totalAttendees}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Total Revenue</h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              ৳{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Events */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Events</h2>
                <Link
                  href="/manage_events"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All →
                </Link>
              </div>

              {myEvents.length > 0 ? (
                <div className="space-y-4">
                  {myEvents.slice(0, 5).map((event) => (
                    <div
                      key={event._id}
                      className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                      <img
                        src={event.image || "https://via.placeholder.com/100"}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {event.date} • {event.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">
                          ৳{event.price || 0}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            new Date(event.date) >= new Date()
                              ? "bg-green-600/20 text-green-400"
                              : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {new Date(event.date) >= new Date()
                            ? "Active"
                            : "Ended"}
                        </span>
                      </div>
                      <Link
                        href={`/organizer/event/${event._id}`}
                        className="p-2 hover:bg-gray-600 rounded-lg transition"
                      >
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-600 mb-4"
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
                  <p className="text-gray-400 mb-4">No events yet</p>
                  <Link
                    href="/addevent"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Create your first event →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Registrations */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Recent Registrations</h2>

              {recentRegistrations.length > 0 ? (
                <div className="space-y-4">
                  {recentRegistrations.map((reg) => (
                    <div key={reg.id} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">
                          {reg.userName}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            reg.ticketType === "VIP"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : "bg-blue-600/20 text-blue-400"
                          }`}
                        >
                          {reg.ticketType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        {reg.eventTitle}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{reg.date}</span>
                        <span className="text-green-400">৳{reg.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No registrations yet
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 mt-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/addevent"
                  className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create Event</span>
                </Link>
                <Link
                  href="/organizer/analytics"
                  className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>View Analytics</span>
                </Link>
                <Link
                  href="/organizer/attendees"
                  className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Manage Attendees</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
