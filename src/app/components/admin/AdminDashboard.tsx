'use client'

import React, { useState } from 'react'
import CategoryManager from './CategoryManager'
import ProductManager from './ProductManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex space-x-8">
          <button
            className={`pb-4 px-2 ${
              activeTab === 'categories'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`pb-4 px-2 ${
              activeTab === 'products'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'categories' ? (
          <CategoryManager />
        ) : (
          <ProductManager />
        )}
      </div>
    </div>
  )
} 