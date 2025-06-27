'use client'
import Link from 'next/link'
import { FaSearch, FaBars, FaTimes, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useData, useSearch } from '../context/DataContext'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { categories, products } = useData()
  const { searchQuery, setSearchQuery } = useSearch()
  const router = useRouter()
  const pathname = usePathname()
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (pathname !== '/products' && searchQuery) {
      setSearchQuery('')
    }
  }, [pathname])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (isSearchOpen && pathname === '/products' && searchInputRef.current) {
      searchInputRef.current.focus()
    }
    // If redirected to /products and search is not open, open it and focus
    if (pathname === '/products' && !isSearchOpen) {
      setIsSearchOpen(true)
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.focus()
      }, 0)
    }
  }, [pathname, isSearchOpen])

  return (
    <div className="bg-blue-800 text-white w-full max-lg:overflow-x-auto lg:overflow-x-visible">
      <div className="flex justify-between items-center h-16 px-2 md:px-8 w-full min-w-0 pr-2 md:pr-8">
        {/* Logo and Company Name */}
        <Link href="/" className="flex flex-row items-center gap-2 md:gap-3 min-w-0 pl-0 text-left whitespace-nowrap">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center bg-white rounded-full p-1 shadow relative flex-shrink-0">
            <Image
              src="/images/IKLOGO.jpg"
              alt="I K Engineering Company Logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-base md:text-lg tracking-wide leading-tight sm:leading-normal whitespace-nowrap">
            I K ENGINEERING COMPANY
          </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-6 w-full justify-end overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-200">Home</Link>
          <Link href="/services" className="hover:text-blue-200">Our Services</Link>
          <Link href="/gallery" className="hover:text-blue-200">Gallery</Link>
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
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                if (pathname !== '/products') router.push('/products')
              }}
            />
            <FaSearch className="absolute right-3 top-2 text-gray-500" />
          </div>
          {/* Contact Info - Responsive */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 ml-6 whitespace-nowrap max-w-xl overflow-x-auto">
            <a href="tel:+918309067404" className="flex items-center hover:text-blue-200 min-w-fit">
              <FaPhone className="text-lg" />
            </a>
            <a href="mailto:ikengineeringcompany@gmail.com" className="flex items-center hover:text-blue-200 min-w-fit">
              <FaEnvelope className="text-lg" />
            </a>
            <a 
              href="https://wa.me/918309067404" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-200 min-w-fit"
            >
              <FaWhatsapp className="text-lg" />
            </a>
          </div>
        </div>
        {/* Mobile Navigation Icons */}
        <div className="flex items-center space-x-4 md:hidden z-20 flex-shrink-0">
          {!isSearchOpen && (
            <button 
              onClick={() => {
                setIsSearchOpen(true)
                setIsMenuOpen(false)
              }}
              className="hover:text-blue-200 flex-shrink-0"
            >
              <FaSearch className="text-2xl text-white" />
            </button>
          )}
          {!isSearchOpen && (
            <button 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsSearchOpen(false)
              }}
              className="hover:text-blue-200 flex-shrink-0"
            >
              {isMenuOpen ? <FaTimes className="text-3xl text-white" /> : <FaBars className="text-3xl text-white" />}
            </button>
          )}
        </div>
        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="fixed top-0 left-0 w-full z-50 bg-blue-800 px-4 py-2 flex items-center shadow-lg h-16">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg text-gray-800 text-base focus:outline-none border-2 border-blue-400 shadow-lg"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  if (pathname !== '/products') router.push('/products')
                }}
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl" />
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false)
                if (pathname === '/products') {
                  setSearchQuery('')
                  setTimeout(() => router.back(), 0)
                }
              }}
              className="ml-3 text-white hover:text-blue-200 text-2xl"
              aria-label="Close search"
            >
              <FaTimes />
            </button>
          </div>
        )}
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed left-0 top-16 w-full z-40 bg-blue-800 px-4 pb-4 space-y-4 shadow-lg border-b border-blue-900">
            <Link 
              href="/" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link 
              href="/gallery" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/products" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Products
            </Link>
            <Link 
              href="/contact" 
              className="block hover:text-blue-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Contact Info for Mobile */}
            <div className="flex flex-row gap-4 pt-4 border-t border-blue-900 justify-center">
              <a href="tel:+918309067404" className="flex items-center hover:text-blue-200">
                <FaPhone className="text-lg" />
              </a>
              <a href="mailto:ikengineeringcompany@gmail.com" className="flex items-center hover:text-blue-200">
                <FaEnvelope className="text-lg" />
              </a>
              <a 
                href="https://wa.me/918309067404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-200"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 