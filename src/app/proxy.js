"use client";

import { NextResponse } from "next/server";
import { AuthContext } from "../Context/AuthProvider";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { useContext } from "react";

// This function can be marked `async` if using `await` inside
export function proxy(request) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
