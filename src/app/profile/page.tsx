'use client';

import { useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useMe } from '@/hooks/me.hook';

export default function ProfilePage() {
  const { data, isLoading, error, refetch } = useMe();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
            <p className="text-lg text-gray-600">
              Manage your dietary preferences, goals, and health information
            </p>
            {isLoading && (
              <div className="mt-4 text-blue-600">Loading user info...</div>
            )}
            {error && (
              <div className="mt-4 text-red-600">{error.message}</div>
            )}
            {data && (
              <div className="mt-4 text-lg text-gray-800">
                <div><span className="font-semibold">Name:</span> {data.name}</div>
                <div><span className="font-semibold">Email:</span> {data.email}</div>
              </div>
            )}
          </header>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Level
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Sedentary</option>
                      <option>Lightly active</option>
                      <option>Moderately active</option>
                      <option>Very active</option>
                      <option>Extremely active</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-semibold mb-6">Dietary Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dietary Restrictions
                    </label>
                    <div className="space-y-2">
                      {['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Keto', 'Paleo'].map((diet) => (
                        <label key={diet} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          {diet}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      placeholder="List any food allergies..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disliked Foods
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      placeholder="List foods you don't like..."
                    />
                  </div>
                </div>
              </div>

              {/* Health Goals */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-semibold mb-6">Health Goals</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Goal
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Maintain current weight</option>
                      <option>Lose weight</option>
                      <option>Gain weight</option>
                      <option>Build muscle</option>
                      <option>Improve energy levels</option>
                      <option>Better digestion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Weight (kg)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="65"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Goal
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Lose 0.5 kg per week</option>
                      <option>Lose 1 kg per week</option>
                      <option>Gain 0.5 kg per week</option>
                      <option>Gain 1 kg per week</option>
                      <option>Maintain weight</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Nutrition Targets */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-semibold mb-6">Nutrition Targets</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Calories
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="250"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fat (g)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="67"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 