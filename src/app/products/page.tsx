'use client'

import { useSearchParams } from 'next/navigation'
import { useData } from '@/app/context/DataContext'
import ProductList from '@/app/components/products/ProductList'
import Navigation from '../components/Navigation'

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
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-2">
              {category ? category.name : 'All Products'}
            </h1>
            <p className="text-blue-100 text-lg md:text-xl">
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
    </>
  )
} 