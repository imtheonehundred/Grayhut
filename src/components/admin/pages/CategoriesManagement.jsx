import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, X, Image as ImageIcon, Check } from 'lucide-react'
import { useData } from '../../../context/DataContext'

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg max-h-[90vh] bg-surface border border-white/10 rounded-xl overflow-hidden flex flex-col"
      >
        {children}
      </motion.div>
    </div>,
    document.body
  )
}

export default function CategoriesManagement() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData())

  function getDefaultFormData() {
    return {
      name: '',
      slug: '',
      type: 'perfume',
      image: '',
      description: '',
      isActive: true,
      order: 0
    }
  }

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCreateModal = () => {
    setEditingCategory(null)
    setFormData(getDefaultFormData())
    setIsModalOpen(true)
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      type: category.type,
      image: category.image,
      description: category.description,
      isActive: category.isActive,
      order: category.order || 0
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const categoryData = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData)
    } else {
      addCategory(categoryData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id)
    }
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Categories</h1>
          <p className="text-gray-400 text-sm mt-1">{categories.length} categories</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2">
          <Plus size={18} />
          Add Category
        </button>
      </motion.div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          className="w-full bg-surface border border-white/10 pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none rounded-lg"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface border border-white/5 overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => openEditModal(category)}
                  className="p-2.5 bg-accent text-primary rounded-full hover:bg-yellow-400 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {/* Type Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  category.type === 'perfume' ? 'bg-accent text-primary' : 'bg-purple-500 text-white'
                }`}>
                  {category.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-playfair text-base sm:text-lg text-white mb-1 truncate">{category.name}</h3>
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase">{category.slug}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${category.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-playfair text-lg text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form id="category-form" onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  placeholder="auto-generated"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                >
                  <option value="perfume">Perfume</option>
                  <option value="makeup">Makeup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Image URL</label>
                <div className="relative">
                  <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-primary border border-white/10 pl-10 pr-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-9 h-5 rounded-full transition-colors ${formData.isActive ? 'bg-accent' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${formData.isActive ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-white text-xs">Active</span>
              </label>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary w-full sm:w-auto py-3">
                  Cancel
                </button>
                <button type="submit" form="category-form" className="btn-primary w-full sm:w-auto py-3 flex items-center justify-center gap-2">
                  <Check size={16} />
                  {editingCategory ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
