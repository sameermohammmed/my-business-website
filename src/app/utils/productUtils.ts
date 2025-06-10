export const generateProductCode = () => {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `PRD-${timestamp.slice(-3)}${random}`
}

export const validateImage = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.')
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.')
  }

  return true
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export const getMainImage = (images: { url: string; isMain: boolean }[]) => {
  return images.find(img => img.isMain)?.url || '/images/placeholder.jpg'
}

export const validateProductData = (data: {
  name: string
  price: number
  stock: number
  description: string
  categoryId: number
}) => {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Product name is required'
  }

  if (data.price <= 0) {
    errors.price = 'Price must be greater than 0'
  }

  if (data.stock < 0) {
    errors.stock = 'Stock cannot be negative'
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required'
  }

  if (!data.categoryId) {
    errors.categoryId = 'Category is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
} 