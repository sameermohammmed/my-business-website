'use client'

import Link from 'next/link'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'
import { useData } from '@/app/context/DataContext'

/**
 * Main navigation component for the website
 * Includes responsive design for mobile and desktop views
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { categories, products } = useData()

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold hover:text-blue-200">
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full p-1 shadow relative">
              <Image
                src="/images/IKLOGO.jpg"
                alt="I K Engineering Company Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline">I K ENGINEERING COMPANY</span>
            <span className="sm:hidden">I K</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200">Home</Link>
            <div className="relative group">
              <Link href="/products" className="hover:text-blue-200 flex items-center">
                Our Products
              </Link>
              <div className="absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  {categories.map((category) => (
                    <div key={category.id} className="mb-4 last:mb-0">
                      <h3 className="font-semibold text-blue-600 mb-2">{category.name}</h3>
                      <div className="pl-2 space-y-1">
                        {products
                          .filter(product => product.categoryId === category.id)
                          .slice(0, 3)
                          .map(product => (
                            <Link
                              key={product.id}
                              href={`/products?category=${category.id}`}
                              className="block text-sm hover:text-blue-600 truncate"
                            >
                              {product.name}
                            </Link>
                          ))}
                        {products.filter(product => product.categoryId === category.id).length > 3 && (
                          <Link
                            href={`/products?category=${category.id}`}
                            className="block text-sm text-blue-600 hover:text-blue-800"
                          >
                            View all {category.name} products →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1 rounded-lg text-gray-800 text-sm w-40 focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-2 text-gray-500" />
            </div>
          </div>

          {/* Mobile Navigation Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-blue-200"
            >
              <FaSearch className="text-xl" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:text-blue-200"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-4">
            <Link 
              href="/" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-2">
              <Link 
                href="/products" 
                className="block hover:text-blue-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Products
              </Link>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-blue-200">{category.name}</h3>
                    <div className="pl-2 space-y-1">
                      {products
                        .filter(product => product.categoryId === category.id)
                        .slice(0, 3)
                        .map(product => (
                          <Link
                            key={product.id}
                            href={`/products?category=${category.id}`}
                            className="block text-sm hover:text-blue-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {product.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 