import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../context/DataContext'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Responsive visible count
function getVisibleCount(width: number) {
  if (width < 640) return 1 // mobile
  if (width < 1024) return 2 // tablet
  return 4 // desktop
}

export default function ProductCarousel() {
  const { products, categories } = useData()
  const { addItem } = useCart()
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [windowWidth, setWindowWidth] = useState(1200)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Responsive visible count
  const VISIBLE_COUNT = getVisibleCount(windowWidth)

  // Shuffle products for random order
  const [shuffled, setShuffled] = useState<typeof products>([])
  useEffect(() => {
    if (products.length) {
      const arr = [...products].sort(() => Math.random() - 0.5)
      setShuffled(arr)
    }
  }, [products])

  // Track window width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide
  useEffect(() => {
    if (shuffled.length <= VISIBLE_COUNT) return
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shuffled.length)
    }, 3000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [shuffled, VISIBLE_COUNT])

  if (!shuffled.length) return null

  const goTo = (idx: number) => setCurrent((idx + shuffled.length) % shuffled.length)

  // Get the products to display in the current window
  const getVisibleProducts = () => {
    if (shuffled.length <= VISIBLE_COUNT) return shuffled
    const visible = []
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      visible.push(shuffled[(current + i) % shuffled.length])
    }
    return visible
  }

  const visibleProducts = getVisibleProducts()

  // Touch/swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(current + 1) // swipe left
        else goTo(current - 1) // swipe right
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="relative w-full lg:max-w-7xl mx-auto mt-10 mb-16 px-0 sm:px-4">
      <div
        className="relative flex items-center bg-white rounded-xl shadow-lg overflow-hidden px-0 sm:px-2 py-6"
      >
        {/* Left Arrow (hide on mobile) */}
        {shuffled.length > VISIBLE_COUNT && windowWidth >= 640 && (
          <button
            className="absolute left-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
          >
            <FaChevronLeft className="text-2xl text-blue-600" />
          </button>
        )}
        {/* Product Cards */}
        <div
          className="flex-1 flex justify-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide touch-pan-x"
          ref={carouselRef}
          onTouchStart={windowWidth < 640 ? onTouchStart : undefined}
          onTouchMove={windowWidth < 640 ? onTouchMove : undefined}
          onTouchEnd={windowWidth < 640 ? onTouchEnd : undefined}
        >
          {visibleProducts.map((product) => (
            <div
              key={String(product.id)}
              className="flex flex-col items-center cursor-pointer w-72 sm:w-56 md:w-64 h-80 bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-2 flex-shrink-0 group"
              onClick={() => window.open(`/products/${product.id}`, '_blank')}
            >
              <div className="relative w-40 h-40 mb-2">
                <Image
                  src={product.images.find(img => img.isMain)?.url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium">
                    View Details
                  </span>
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1 text-center line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 text-xs line-clamp-2 text-center max-w-[10rem]">{product.description}</p>
              <div className="text-lg font-bold text-blue-600 mt-2">₹{product.price.toLocaleString()}</div>
              
              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Adding to cart from carousel:', product.name, product.id)
                  addItem({
                    id: String(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.images.find(img => img.isMain)?.url || '/images/placeholder.jpg',
                    category: product.categoryId ? categories.find(c => c.id === product.categoryId)?.name : undefined
                  })
                  // Show visual feedback
                  const button = e.currentTarget
                  const originalText = button.innerHTML
                  button.innerHTML = `
                    <svg class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="mt-2 bg-blue-600 text-white py-1 px-3 rounded text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        {/* Right Arrow (hide on mobile) */}
        {shuffled.length > VISIBLE_COUNT && windowWidth >= 640 && (
          <button
            className="absolute right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            onClick={() => goTo(current + 1)}
            aria-label="Next"
          >
            <FaChevronRight className="text-2xl text-blue-600" />
          </button>
        )}
      </div>
      {/* Dots (show only if more than visible count) */}
      {shuffled.length > VISIBLE_COUNT && (
        <div className="flex justify-center mt-4 gap-2">
          {shuffled.map((_, idx) => (
            idx < shuffled.length && idx % 1 === 0 && (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-300'}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          ))}
        </div>
      )}
    </div>
  )
} 