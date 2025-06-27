'use client'

import { useState } from 'react'
import { useData, useSearch } from '@/app/context/DataContext'
import ProductDetailView from './ProductDetailView'
import ProductDetailsModal from './ProductDetailsModal'

/**
 * ProductList component displays a grid of products with filtering capabilities
 * @param {Object} props - Component props
 * @param {number} [props.categoryId] - Optional category ID to filter products
 */
export default function ProductList({ categoryId }: { categoryId?: number }) {
  const { products } = useData()
  const { searchQuery, setSearchQuery } = useSearch()
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter products by category and published status
  const filteredProducts = products
    .filter(product => product.isPublished) // Only show published products
    .filter(product => categoryId ? product.categoryId === categoryId : true)
    .filter(product => {
      if (!searchQuery.trim()) return true
      const queryWords = searchQuery.toLowerCase().split(/\s+/)
      const fields = [product.name, product.description, product.sku].join(' ').toLowerCase()
      return queryWords.every(word => fields.includes(word))
    })

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 flex flex-col h-full"
          >
            <ProductDetailView
              product={product}
              onViewDetails={() => {
                setSelectedProduct(product.id)
                setIsModalOpen(true)
              }}
            />
          </div>
        ))}
        {selectedProduct && (
          <ProductDetailsModal
            productId={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </div>
    </div>
  )
} 