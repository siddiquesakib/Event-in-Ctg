"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            toast.success("Account created successfully!");
            router.push("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        toast.success(`Welcome ${res.user.displayName}!`);
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="grid gap-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            required
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <button
            onClick={handleGoogle}
            type="button"
            className="w-full border border-gray-700 py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-200 text-base font-medium">
              Register with Google
            </span>
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
