'use client'

import { useSearchParams } from 'next/navigation'
import { useData } from '@/app/context/DataContext'
import ProductList from '@/app/components/products/ProductList'

/**
 * Products page component that displays a list of products
 * Can be filtered by category using the category query parameter
 */
export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const { categories, getCategoryById } = useData()

  // Get category name if categoryId is provided
  const category = categoryId ? getCategoryById(Number(categoryId)) : null

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? category.name : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {category 
              ? `Browse our selection of ${category.name.toLowerCase()} products`
              : 'Browse our complete product catalog'
            }
          </p>
        </div>

        {/* Product List */}
        <ProductList categoryId={categoryId ? Number(categoryId) : undefined} />
      </div>
    </main>
  )
} 