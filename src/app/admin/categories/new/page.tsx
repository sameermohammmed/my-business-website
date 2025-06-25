'use client'

import { useRouter } from 'next/navigation'
import CategoryForm from '../components/CategoryForm'

export default function NewCategory() {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Category</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <CategoryForm mode="create" />
        </div>
      </div>
    </div>
  )
} 