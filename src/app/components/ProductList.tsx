'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useData } from '../context/DataContext'
import Image from 'next/image'
import ProductDetailView from './ProductDetailView'
import { useSearchParams } from 'next/navigation'

export default function ProductList() {
  const { products, categories, getCategoryById, isLoading, error } = useData()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [isQuickView, setIsQuickView] = useState(false)

  // Handle URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const categoryId = parseInt(categoryParam)
      if (!isNaN(categoryId)) {
        setSelectedCategory(categoryId)
      }
    }
  }, [searchParams])

  const filteredAndSortedProducts = useMemo(() => {
    if (isLoading) return []

    let filtered = products

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      )
    }

    // Sort products
    return filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'stock':
          comparison = a.stock - b.stock
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [products, selectedCategory, sortBy, sortOrder, searchQuery, isLoading])

  const handleViewDetails = (productId: number, quickView: boolean = false) => {
    setSelectedProductId(productId)
    setIsQuickView(quickView)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'stock')}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>

          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>

          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded-lg flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map(product => {
          const category = getCategoryById(product.categoryId)
          return (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 group">
                <Image
                  src={product.images[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.jpg'
                  }}
                />
                {/* Quick View Button */}
                <button
                  onClick={() => handleViewDetails(product.id, true)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <span className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                    Quick View
                  </span>
                </button>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-1">{category?.name}</div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">₹{product.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Stock: {product.stock}</div>
                </div>
                <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => handleViewDetails(product.id, false)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleViewDetails(product.id, true)}
                    className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductId && (
        <ProductDetailView
          productId={selectedProductId}
          onClose={() => {
            setSelectedProductId(null)
            setIsQuickView(false)
          }}
          isQuickView={isQuickView}
        />
      )}
    </div>
  )
} 