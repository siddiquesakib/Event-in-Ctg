// components/Logo.tsx
export default function Logo() {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 select-none cursor-pointer">
      {/* Main text */}
      <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
        Event
      </span>

      {/* Secondary text */}
      <span className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider">
        in CTG
      </span>
      
    </div>
  );
}
