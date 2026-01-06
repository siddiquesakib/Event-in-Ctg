"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingEvents: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
      return;
    }

    fetchAdminData();
  }, [user, isAdmin, authLoading, router]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch real users from database
      const usersResponse = await fetch(
        "https://event-in-ctg-server.vercel.app/users"
      );
      const allUsers = await usersResponse.json();

      // Fetch events
      const eventsResponse = await fetch(
        "https://event-in-ctg-server.vercel.app/events"
      );
      const allEvents = await eventsResponse.json();

      setStats({
        totalUsers: allUsers.length,
        totalEvents: allEvents.length,
        pendingEvents: Math.floor(allEvents.length * 0.2),
        totalRevenue: allEvents.reduce(
          (sum, e) => sum + (e.price || 0) * 15,
          0
        ),
      });

      setUsers(allUsers);
      setEvents(allEvents);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (email, action) => {
    try {
      const newStatus = action === "suspend" ? "suspended" : "active";
      const response = await fetch(
        `https://event-in-ctg-server.vercel.app/users/${email}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((u) => {
            if (u.email === email) {
              return { ...u, status: newStatus };
            }
            return u;
          })
        );
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const response = await fetch(
        `https://event-in-ctg-server.vercel.app/users/${email}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((u) => {
            if (u.email === email) {
              return { ...u, role: newRole };
            }
            return u;
          })
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleEventAction = async (eventId, action) => {
    if (action === "delete") {
      try {
        await fetch(
          `https://event-in-ctg-server.vercel.app/events/${eventId}`,
          {
            method: "DELETE",
          }
        );
        setEvents(events.filter((e) => e._id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-4 hidden lg:block">
          <div className="flex items-center gap-3 mb-8 p-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-bold">Admin Panel</h2>
              <p className="text-xs text-gray-400">Event in CTG</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "overview" ? "bg-purple-600" : "hover:bg-gray-800"
              }`}
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "users" ? "bg-purple-600" : "hover:bg-gray-800"
              }`}
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Users
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "events" ? "bg-purple-600" : "hover:bg-gray-800"
              }`}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Events
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "analytics"
                  ? "bg-purple-600"
                  : "hover:bg-gray-800"
              }`}
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "settings" ? "bg-purple-600" : "hover:bg-gray-800"
              }`}
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition"
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
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Back to Site
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="overview">Overview</option>
              <option value="users">Users</option>
              <option value="events">Events</option>
              <option value="analytics">Analytics</option>
              <option value="settings">Settings</option>
            </select>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <p className="text-green-400 text-xs mt-2">+12% this month</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Total Events</p>
                  <p className="text-3xl font-bold">{stats.totalEvents}</p>
                  <p className="text-green-400 text-xs mt-2">+8% this month</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {stats.pendingEvents}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">Needs review</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-400">
                    ৳{stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-green-400 text-xs mt-2">+25% this month</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Recent Events</h2>
                  <div className="space-y-3">
                    {events.slice(0, 5).map((event) => (
                      <div
                        key={event._id}
                        className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-400">{event.date}</p>
                        </div>
                        <span className="text-green-400 text-sm">
                          ৳{event.price || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Recent Users</h2>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((u) => (
                      <div
                        key={u._id || u.email}
                        className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            {(u.name || u.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{u.name || "No Name"}</p>
                            <p className="text-sm text-gray-400">{u.email}</p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            u.role === "admin"
                              ? "bg-red-600/20 text-red-400"
                              : u.role === "organizer"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {u.role || "user"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Events
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((u) => (
                      <tr
                        key={u._id || u.email}
                        className="hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                              {(u.name || u.email || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium">
                                {u.name || "No Name"}
                              </p>
                              <p className="text-sm text-gray-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={u.role || "user"}
                            onChange={(e) =>
                              handleRoleChange(u.email, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs bg-gray-700 border-none cursor-pointer ${
                              u.role === "admin"
                                ? "text-red-400"
                                : u.role === "organizer"
                                ? "text-blue-400"
                                : "text-gray-400"
                            }`}
                          >
                            <option value="user">User</option>
                            <option value="organizer">Organizer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              u.status === "active"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-red-600/20 text-red-400"
                            }`}
                          >
                            {u.status || "active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {u.eventsCount || 0}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {u.status === "active" || !u.status ? (
                              <button
                                onClick={() =>
                                  handleUserAction(u.email, "suspend")
                                }
                                className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition text-sm"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUserAction(u.email, "activate")
                                }
                                className="px-3 py-1 bg-green-600/20 text-green-400 rounded hover:bg-green-600/40 transition text-sm"
                              >
                                Activate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Event Management</h1>
                <div className="flex gap-4">
                  <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                    <option>All Events</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={event.image || "https://via.placeholder.com/80"}
                        alt={event.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {event.date} • {event.location}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          By: {event.userEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-green-400 font-semibold">
                        ৳{event.price || 0}
                      </span>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/40 transition text-sm">
                          Approve
                        </button>
                        <button
                          onClick={() => handleEventAction(event._id, "delete")}
                          className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Analytics</h1>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Revenue Chart Placeholder */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
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
                      <p>Revenue Chart</p>
                      <p className="text-sm">
                        Integration with Chart.js needed
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Growth Chart Placeholder */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">User Growth</h2>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <p>Growth Chart</p>
                      <p className="text-sm">
                        Integration with Chart.js needed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Events */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Top Events</h2>
                  <div className="space-y-3">
                    {events.slice(0, 5).map((event, i) => (
                      <div
                        key={event._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-600">
                            #{i + 1}
                          </span>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-400">
                              {event.category}
                            </p>
                          </div>
                        </div>
                        <span className="text-green-400">
                          ৳{(event.price || 0) * 15}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories Distribution */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Event Categories</h2>
                  <div className="space-y-3">
                    {[
                      "Conference",
                      "Workshop",
                      "Concert",
                      "Sports",
                      "Festival",
                    ].map((cat, i) => (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400">{cat}</span>
                          <span className="text-sm">{20 - i * 3}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${20 - i * 3}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Settings</h1>

              <div className="max-w-2xl space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Event in CTG"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@eventinctg.com"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Event Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require Approval</p>
                        <p className="text-sm text-gray-400">
                          New events need admin approval
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Free Events</p>
                        <p className="text-sm text-gray-400">
                          Users can create free events
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
