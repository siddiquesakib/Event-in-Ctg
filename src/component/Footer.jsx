import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-300">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-3 text-gray-400">
            Discover the best events happening in Chittagong — concerts,
            workshops, meetups, and more.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link className="hover:text-white transition" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                className="hover:text-white transition"
                target="_blank"
                href="https://www.facebook.com/"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="hover:text-white transition"
                target="_blank"
                href="https://www.instagram.com/"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="hover:text-white transition"
                target="_blank"
                href="https://github.com/siddiquesakib"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="hover:text-white transition"
                target="_blank"
                href="https://x.com/"
              >
                X
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EventCTG — All Rights Reserved.
      </div>
    </footer>
  );
}
