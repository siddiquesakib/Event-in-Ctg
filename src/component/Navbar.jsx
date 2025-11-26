"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/Context/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setDropdownOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const navlink = (
    <>
      <Link href="/" className="hover:text-blue-400 transition">
        Home
      </Link>
      <Link href="/events" className="hover:text-blue-400 transition">
        Events
      </Link>
      <Link href="/about" className="hover:text-blue-400 transition">
        About
      </Link>
      <Link href="/contact" className="hover:text-blue-400 transition">
        Contact
      </Link>
      {user && (
        <>
          <Link href="/addevent" className="hover:text-blue-400 transition">
            Add Event
          </Link>
          <Link href="/manage_events" className="hover:text-blue-400 transition">
            Manage Events
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          {navlink}
        </div>

        {/* User Profile or Auth Buttons */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />
              <svg
                className={`w-4 h-4 text-gray-300 transition-transform ${
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
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
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
