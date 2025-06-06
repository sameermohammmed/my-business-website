'use client'

import React, { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData()
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      addCategory({ name: newCategoryName.trim() })
      setNewCategoryName('')
    }
  }

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory && editingCategory.name.trim()) {
      updateCategory(editingCategory.id, { name: editingCategory.name.trim() })
      setEditingCategory(null)
    }
  }

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all associated products.')) {
      deleteCategory(id)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="flex-1 px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
              {editingCategory?.id === category.id ? (
                <form onSubmit={handleUpdateCategory} className="flex-1 flex gap-4">
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span className="text-lg">{category.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCategory({ id: category.id, name: category.name })}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 