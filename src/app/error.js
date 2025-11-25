"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-6 transition-colors duration-300">
      <title>Error 404</title>
      <h1 className="text-4xl lg:text-9xl font-extrabold text-[#294cda] mb-6">
        Error 404
      </h1>

      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
    </div>
  );
}
