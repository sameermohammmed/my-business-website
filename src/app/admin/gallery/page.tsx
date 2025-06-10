'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useData } from '@/app/context/DataContext'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'

export default function GalleryPage() {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useData()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<{ id: number; title: string; description?: string } | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)

    try {
      const title = prompt('Enter image title:')
      if (!title) {
        throw new Error('Title is required')
      }

      const description = prompt('Enter image description (optional):')
      await addGalleryImage(files[0], title, description || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (image: { id: number; title: string; description?: string }) => {
    setEditingImage(image)
  }

  const handleSaveEdit = () => {
    if (!editingImage) return

    const newTitle = prompt('Enter new title:', editingImage.title)
    if (!newTitle) return

    const newDescription = prompt('Enter new description (optional):', editingImage.description)
    updateGalleryImage(editingImage.id, {
      title: newTitle,
      description: newDescription || ''
    })

    setEditingImage(null)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <label className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <FaPlus />
              <span>{isUploading ? 'Uploading...' : 'Add Image'}</span>
            </div>
          </label>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-600 mb-4">{image.description}</p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images in the gallery yet.</p>
          </div>
        )}
      </div>
    </main>
  )
} 