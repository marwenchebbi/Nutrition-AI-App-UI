import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nutrition AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized nutrition advice and analyze your food with AI
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/analyze" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analyze Food</h2>
              <p className="text-gray-600 mb-6">
                Upload food images or describe your meals to get detailed nutritional analysis and recommendations
              </p>
              <div className="text-blue-500 font-semibold">Get Started →</div>
            </div>
          </Link>

          <Link href="/profile" className="group" >
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Profile</h2>
              <p className="text-gray-600 mb-6">
                Manage your dietary preferences, health goals, and personal information
              </p>
              <div className="text-blue-500 font-semibold">Manage Profile →</div>
            </div>
          </Link>
        </main>

        <div className="text-center mt-12">
          <div className="text-gray-600 mb-4">Don't have an account?</div>
          <div className="space-x-4">
            <Link href="/login" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              Login
            </Link>
            <Link href="/signup" className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
