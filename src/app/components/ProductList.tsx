'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useData, useSearch } from '../context/DataContext'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ProductList() {
  const { products, categories, getCategoryById, isLoading, error } = useData()
  const { searchQuery, setSearchQuery } = useSearch()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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

    // Advanced search logic (partial, multi-word, case-insensitive)
    if (searchQuery.trim()) {
      const queryWords = searchQuery.toLowerCase().split(/\s+/)
      filtered = filtered.filter(p => {
        const fields = [p.name, p.description, p.sku].join(' ').toLowerCase()
        return queryWords.every(word => fields.includes(word))
      })
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
        </div>
      </div>

      {/* Product Grid - All Horizontal Cards */}
      <div className="space-y-4">
        {filteredAndSortedProducts.map(product => {
          const category = getCategoryById(product.categoryId)
          return (
            <div
              key={product.id} 
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white group cursor-pointer"
              onClick={() => window.open(`/products/${product.id}`, '_blank')}
            >
              {/* Horizontal Card Layout */}
              <div className="flex h-32 md:h-40">
                {/* Product Image */}
                <div className="relative w-32 md:w-48 flex-shrink-0">
                  <Image
                    src={product.images[0]?.url || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholder.jpg'
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium">
                      View Details
                    </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs md:text-sm text-gray-600 mb-1">{category?.name}</div>
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-3">{product.description}</p>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">₹{product.price.toLocaleString()}</div>
                      <div className="text-sm md:text-base text-gray-600">Stock: {product.stock}</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Add to cart functionality here
                        console.log('Add to cart:', product.id)
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm md:text-base font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
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
    </div>
  )
} 