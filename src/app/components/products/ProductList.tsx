'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Product, Category } from '../../../types'
import { useData, useSearch } from '@/app/context/DataContext'
import { useCart } from '../../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

/**
 * ProductList component displays horizontal cards with filtering capabilities
 * @param {Object} props - Component props
 * @param {number} [props.categoryId] - Optional category ID to filter products
 */
export default function ProductList({ categoryId }: { categoryId?: number }) {
  const { products, categories, getCategoryById } = useData()
  const { searchQuery, setSearchQuery } = useSearch()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
      .filter(product => product.isPublished) // Only show published products
      .filter(product => categoryId ? product.categoryId === categoryId : true)
      .filter(product => {
        if (!searchQuery.trim()) return true
        const queryWords = searchQuery.toLowerCase().split(/\s+/)
        const fields = [product.name, product.description, product.sku].join(' ').toLowerCase()
        return queryWords.every(word => fields.includes(word))
      })

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
  }, [products, categoryId, searchQuery, sortBy, sortOrder])

  return (
    <div className="w-full">
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

      {/* Product Grid - Single Horizontal Cards */}
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
              <div className="flex flex-col md:flex-row h-auto md:h-40">
                {/* Product Image */}
                <div className="relative w-full md:w-48 h-32 md:h-40 flex-shrink-0">
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
                <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                    <div className="text-xs md:text-sm text-gray-600 mb-1">{category?.name}</div>
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-2">{product.description}</p>
                    <div className="text-xl md:text-2xl font-bold text-blue-600">₹{product.price.toLocaleString()}</div>
                    <div className="text-sm md:text-base text-gray-600">Stock: {product.stock}</div>
                  </div>
                  
                  {/* Add to Cart Button - Always visible on the right */}
                  <div className="flex-shrink-0">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Adding to cart:', product.name, product.id)
                        addItem({
                          id: String(product.id),
                          name: product.name,
                          price: product.price,
                          image: product.images[0]?.url || '/images/placeholder.jpg',
                          category: category?.name
                        })
                        // Show visual feedback
                        const button = e.currentTarget
                        const originalText = button.innerHTML
                        button.innerHTML = `
                          <svg class="w-4 h-4 md:w-5 md:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Added!
                        `
                        button.classList.add('bg-green-600')
                        setTimeout(() => {
                          button.innerHTML = originalText
                          button.classList.remove('bg-green-600')
                        }, 1000)
                      }}
                      className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded text-sm md:text-base font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
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