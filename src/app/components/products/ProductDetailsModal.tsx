'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { useData } from '@/app/context/DataContext'
import { Product } from '@/types'

interface ProductDetailsModalProps {
  productId: number
  isOpen: boolean
  onClose: () => void
}

/**
 * ProductDetailsModal component displays detailed product information in a modal
 * @param {ProductDetailsModalProps} props - Component props
 */
export default function ProductDetailsModal({ productId, isOpen, onClose }: ProductDetailsModalProps) {
  const { getProductById, getCategoryById } = useData()
  const [product, setProduct] = useState<Product | undefined>()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const productData = getProductById(productId)
      setProduct(productData)
      setSelectedImageIndex(0)
    }
  }, [isOpen, productId, getProductById])

  if (!isOpen || !product) return null

  const category = getCategoryById(product.categoryId)
  const selectedImage = product.images[selectedImageIndex]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  {selectedImage ? (
                    <Image
                      src={selectedImage.url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg ${
                          selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  {category && (
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {category.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <dl className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        value && (
                          <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b last:border-0">
                            <dt className="font-medium text-gray-600">{key}</dt>
                            <dd className="text-gray-900">{value}</dd>
                          </div>
                        )
                      ))}
                    </dl>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 