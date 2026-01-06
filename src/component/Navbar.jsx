"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { ThemeContext } from "@/Context/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logOut, role, isAdmin, isOrganizer } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [activeEventsCount, setActiveEventsCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const quickActionsRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch active events count
  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        const data = await response.json();
        const now = new Date();
        const active = data.filter((event) => new Date(event.date) >= now);
        setActiveEventsCount(active.length);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchActiveEvents();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteEvents") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // Handle route change loading state
  useEffect(() => {
    const handleRouteChangeStart = () => setIsRouteChanging(true);
    const handleRouteChangeComplete = () => setIsRouteChanging(false);

    // Simple route change detection
    setIsRouteChanging(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        quickActionsRef.current &&
        !quickActionsRef.current.contains(event.target)
      ) {
        setQuickActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user role badge
  const getUserRoleBadge = () => {
    if (isAdmin) return { label: "Admin", color: "bg-red-500" };
    if (isOrganizer) return { label: "Organizer", color: "bg-blue-500" };
    return { label: "User", color: "bg-gray-500" };
  };

  // Get breadcrumb path
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter((p) => p);
    return paths.length > 0 ? paths : ["home"];
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        setDropdownOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const isActive = (path) =>
    pathname === path
      ? "bg-blue-600 text-white px-3 py-1 rounded-md"
      : "text-gray-300 hover:text-blue-400 transition";

  const navlink = (
    <>
      <Link href="/" className={isActive("/")}>
        Home
      </Link>

      <Link href="/events" className={isActive("/events")}>
        Events
      </Link>

      <Link href="/about" className={isActive("/about")}>
        About
      </Link>

      <Link href="/contact" className={isActive("/contact")}>
        Contact
      </Link>

      {user && (
        <>
          <Link href="/addevent" className={isActive("/addevent")}>
            Add Event
          </Link>
          <Link href="/manage_events" className={isActive("/manage_events")}>
            Manage Events
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      {/* Loading Bar */}
      {isRouteChanging && (
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 animate-pulse"></div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          {navlink}
        </div>

        {/* Right Side: Quick Actions, Badges & User Profile */}
        <div className="flex items-center gap-4">
          {/* Active Event Counter Badge */}
          {activeEventsCount > 0 && (
            <div className="hidden md:flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold">
                {activeEventsCount} Active
              </span>
            </div>
          )}

          {/* Quick Actions Menu */}
          {user && (
            <div className="relative hidden md:block" ref={quickActionsRef}>
              <button
                onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                className="p-2 text-gray-300 hover:text-blue-400 transition relative"
                title="Quick Actions"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {quickActionsOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Quick Actions
                    </h3>
                  </div>
                  <Link
                    href="/events"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setQuickActionsOpen(false)}
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Browse Events
                  </Link>
                  <Link
                    href="/addevent"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setQuickActionsOpen(false)}
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
                    Create Event
                  </Link>
                  {favorites.length > 0 ? (
                    <>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <div className="px-4 py-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Favorites ({favorites.length})
                        </p>
                        {favorites.slice(0, 3).map((fav) => (
                          <Link
                            key={fav.id}
                            href={`/events/${fav.id}`}
                            className="block px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 truncate"
                            onClick={() => setQuickActionsOpen(false)}
                          >
                            ⭐ {fav.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No favorites yet
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Profile or Auth Buttons */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div className="relative">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                  />
                  {/* User Role Badge */}
                  <span
                    className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white ${
                      getUserRoleBadge().color
                    }`}
                  >
                    {getUserRoleBadge().label.charAt(0)}
                  </span>
                </div>
                <svg
                  className={`hidden md:block w-4 h-4 text-gray-300 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      {user.displayName || "User"}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full text-white ${
                          getUserRoleBadge().color
                        }`}
                      >
                        {getUserRoleBadge().label}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Admin Panel Link */}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Admin Panel
                    </Link>
                  )}

                  {/* Organizer Dashboard Link */}
                  {isOrganizer && (
                    <Link
                      href="/organizer"
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Organizer Dashboard
                    </Link>
                  )}

                  <Link
                    href="/manage_events"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Events/ Manage Events
                  </Link>
                  <Link
                    href="/addevent"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Add Events
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl text-white focus:outline-none"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400 transition">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          {getBreadcrumbs().map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>/</span>
              <span className="capitalize text-gray-300">{crumb}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 py-4 bg-black/95 border-t border-white/10 text-gray-300">
          {navlink}
          {!user && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-center hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
