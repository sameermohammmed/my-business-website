'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useData } from '@/app/context/DataContext'
import { useEffect, useState } from 'react'

interface Activity {
  type: 'product' | 'category'
  action: 'created' | 'updated' | 'deleted'
  name: string
  timestamp: number
}

/**
 * Admin dashboard page component
 */
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { products, categories } = useData()
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  // Calculate stats
  const totalProducts = products.length
  const totalCategories = categories.length
  const publishedProducts = products.filter(p => p.isPublished).length
  const draftProducts = products.filter(p => !p.isPublished).length

  // Track recent activity
  useEffect(() => {
    const activities: Activity[] = []
    
    // Add product activities
    products.forEach(product => {
      if (product.updatedAt) {
        activities.push({
          type: 'product',
          action: 'updated',
          name: product.name,
          timestamp: product.updatedAt
        })
      }
    })

    // Add category activities
    categories.forEach(category => {
      activities.push({
        type: 'category',
        action: 'updated',
        name: category.name,
        timestamp: Date.now() // Since categories don't have timestamps yet
      })
    })

    // Sort by timestamp and get the 5 most recent
    const sortedActivities = activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)

    setRecentActivity(sortedActivities)
  }, [products, categories])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/admin/products"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Manage Products
              </Link>
              <Link
                href="/admin/categories"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Manage Categories
              </Link>
              <Link
                href="/admin/gallery"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Manage Gallery
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="text-green-600">{publishedProducts} published</span>
                  {' • '}
                  <span className="text-yellow-600">{draftProducts} draft</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold">{totalCategories}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{activity.name}</span>
                    <span className="text-gray-600"> was {activity.action}</span>
                    <span className="text-gray-400 text-xs block">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 