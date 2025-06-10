'use client'

import { useState } from 'react'
import { useData } from '@/app/context/DataContext'
import ProductDetailView from './ProductDetailView'
import ProductDetailsModal from './ProductDetailsModal'

/**
 * ProductList component displays a grid of products with filtering capabilities
 * @param {Object} props - Component props
 * @param {number} [props.categoryId] - Optional category ID to filter products
 */
export default function ProductList({ categoryId }: { categoryId?: number }) {
  const { products } = useData()
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter products by category and published status
  const filteredProducts = products
    .filter(product => product.isPublished) // Only show published products
    .filter(product => categoryId ? product.categoryId === categoryId : true)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
  )
} 