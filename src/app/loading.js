export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-blue-300 rounded-full animate-spin animation-delay-300"></div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-2 animate-pulse">
          Loading Events
        </h2>
        <p className="text-gray-400 animate-pulse">
          Please wait while we prepare everything...
        </p>

        {/* Dots Animation */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-400"></span>
        </div>
      </div>
    </div>
  );
}