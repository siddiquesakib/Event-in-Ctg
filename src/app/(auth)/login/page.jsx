"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        toast.success(`Welcome ${res.user.displayName}!`);
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Login
        </h1>

        <form className="grid gap-6">
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Login
          </button>

          <button
            onClick={handleGoogle}
            type="button"
            className="w-full border border-gray-300 dark:border-gray-700 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors mb-8 flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-700 dark:text-gray-200 text-base font-medium cursor-pointer">
              Login with Google
            </span>
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}
