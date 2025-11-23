import Link from "next/link";

// app/register/page.jsx
export default function RegisterPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Register</h1>

        <form className="grid gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

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
            Create Account
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}