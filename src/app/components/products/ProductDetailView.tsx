'use client'

import Image from 'next/image'
import { Product } from '@/types'

interface ProductDetailViewProps {
  product: Product
  onViewDetails: () => void
}

/**
 * ProductDetailView component displays a product card with basic information
 * @param {ProductDetailViewProps} props - Component props
 */
export default function ProductDetailView({ product, onViewDetails }: ProductDetailViewProps) {
  const mainImage = product.images.find(img => img.isMain) || product.images[0]

  return (
    <div className="flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price and Stock */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
} 