"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { ThemeContext } from "@/Context/ThemeProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    myEvents: 0,
    favorites: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = {
    dashboard: "Dashboard",
    welcome: "Welcome back",
    totalEvents: "Total Events",
    activeEvents: "Active Events",
    myEvents: "My Events",
    favorites: "Favorites",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    createEvent: "Create New Event",
    browseEvents: "Browse Events",
    manageEvents: "Manage Events",
    viewProfile: "View Profile",
    noEvents: "No recent events",
    loading: "Loading...",
  };

  useEffect(() => {
    //     if (!user) {
    //       router.push("/login");
    //       return;
    //     }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://event-in-ctg-server.vercel.app/events"
        );
        const data = await response.json();

        const now = new Date();
        const activeEvents = data.filter(
          (event) => new Date(event.date) >= now
        );
        const myEvents = data.filter((event) => event.userEmail === user.email);
        const favorites = JSON.parse(
          localStorage.getItem("favoriteEvents") || "[]"
        );

        setStats({
          totalEvents: data.length,
          activeEvents: activeEvents.length,
          myEvents: myEvents.length,
          favorites: favorites.length,
        });

        setRecentEvents(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t.dashboard}</h1>
          <p className="text-gray-400">
            {t.welcome}, {user.displayName}! 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">
                {t.totalEvents}
              </h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.totalEvents}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">
                {t.activeEvents}
              </h3>
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
              <h3 className="text-sm font-medium opacity-90">{t.myEvents}</h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.myEvents}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">{t.favorites}</h3>
              <svg
                className="w-8 h-8 opacity-75"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{stats.favorites}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">{t.recentActivity}</h2>
              {recentEvents.length > 0 ? (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <Link
                      key={event._id}
                      href={`/events/${event._id}`}
                      className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                      <img
                        src={event.image || "/placeholder-event.jpg"}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">{t.noEvents}</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">{t.quickActions}</h2>
              <div className="space-y-3">
                <Link
                  href="/addevent"
                  className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  <svg
                    className="w-6 h-6"
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
                  <span className="font-semibold">{t.createEvent}</span>
                </Link>

                <Link
                  href="/events"
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="font-semibold">{t.browseEvents}</span>
                </Link>

                <Link
                  href="/manage_events"
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-semibold">{t.manageEvents}</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-semibold">{t.viewProfile}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
