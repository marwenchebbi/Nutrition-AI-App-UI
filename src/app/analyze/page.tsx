import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AnalyzePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Food Analysis</h1>
            <p className="text-lg text-gray-600">
              Upload food images or describe your meals to get detailed nutritional information
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload Food Image</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">📷</div>
                  <p className="text-gray-600 mb-4">Drag and drop your food image here, or click to browse</p>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Or Describe Your Meal</h2>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                  rows={4}
                  placeholder="Describe what you ate (e.g., 'Grilled chicken breast with steamed broccoli and brown rice')"
                />
              </div>

              <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                Analyze Nutrition
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 