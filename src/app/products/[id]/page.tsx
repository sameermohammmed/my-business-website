'use client'

import { useParams, useRouter } from 'next/navigation'
import { useData } from '@/app/context/DataContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById, getCategoryById, getProductsByCategory } = useData()
  const [selectedImage, setSelectedImage] = useState(0)
  
  const productId = Number(params.id)
  const product = getProductById(productId)
  const category = product ? getCategoryById(product.categoryId) : null
  
  // Get similar products (same category, excluding current product)
  const similarProducts = product 
    ? getProductsByCategory(product.categoryId)
        .filter(p => p.id !== product.id && p.isPublished)
        .slice(0, 4)
    : []

  useEffect(() => {
    if (!product) {
      router.push('/products')
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Product Not Found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <Link 
            href="/products"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
          <li>/</li>
          <li><Link href={`/products?category=${category?.id}`} className="hover:text-blue-600">{category?.name}</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]?.url || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-blue-600 mb-2">{category?.name}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              ₹{product.price.toLocaleString()}
            </div>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="font-medium">Stock:</span>
              <span className={`ml-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>
            <div className="text-sm text-gray-600">SKU: {product.sku}</div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact for Quote
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map(similarProduct => {
              const similarCategory = getCategoryById(similarProduct.categoryId)
              return (
                <Link 
                  key={similarProduct.id} 
                  href={`/products/${similarProduct.id}`}
                  className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={similarProduct.images[0]?.url || '/images/placeholder.jpg'}
                      alt={similarProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-600 mb-1">{similarCategory?.name}</div>
                    <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{similarProduct.name}</h3>
                    <div className="text-lg font-bold text-blue-600">₹{similarProduct.price.toLocaleString()}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 