'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { CartModal } from './CartModal'

export const CartIcon: React.FC = () => {
  const { getItemCount, state } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  
  // Update item count and show notification when it changes
  useEffect(() => {
    const count = getItemCount()
    console.log('Cart item count updated:', count, 'Items in cart:', state.items)
    if (count > itemCount && itemCount > 0) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
    }
    setItemCount(count)
  }, [getItemCount, itemCount, state.items])

  return (
    <>
      <button
        onClick={() => {
          console.log('Cart icon clicked, opening modal')
          setIsCartOpen(true)
        }}
        className="relative p-2 text-white hover:text-blue-200 transition-colors border border-white rounded-lg"
        aria-label="Shopping Bag"
        style={{ minWidth: '40px', minHeight: '40px' }}
      >
        {/* Simple Shopping Bag Icon */}
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        
        {/* Cart Badge */}
        {itemCount > 0 && (
          <span 
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg"
            style={{ minWidth: '24px', minHeight: '24px' }}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
      
      {/* Notification when item is added */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          Item added to cart! 🛒
        </div>
      )}
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
} 