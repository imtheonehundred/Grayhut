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
        className="relative w-full max-w-2xl max-h-[90vh] bg-surface border border-white/10 rounded-xl overflow-hidden flex flex-col"
      >
        {children}
      </motion.div>
    </div>,
    document.body
  )
}

export default function PerfumeProducts() {
  const { perfumes, addPerfume, updatePerfume, deletePerfume } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPerfume, setEditingPerfume] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData())

  function getDefaultFormData() {
    return {
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: 'luxury',
      gender: 'unisex',
      notes: { top: '', middle: '', base: '' },
      description: '',
      volume: '50ml',
      inStock: true,
      isFeatured: false,
      isNew: false
    }
  }

  const filteredPerfumes = perfumes.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCreateModal = () => {
    setEditingPerfume(null)
    setFormData(getDefaultFormData())
    setIsModalOpen(true)
  }

  const openEditModal = (perfume) => {
    setEditingPerfume(perfume)
    setFormData({
      name: perfume.name,
      price: perfume.price,
      originalPrice: perfume.originalPrice || '',
      image: perfume.image,
      category: perfume.category,
      gender: perfume.gender,
      notes: { ...perfume.notes },
      description: perfume.description,
      volume: perfume.volume || '50ml',
      inStock: perfume.inStock,
      isFeatured: perfume.isFeatured,
      isNew: perfume.isNew
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const perfumeData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      brand: 'GrayHut'
    }

    if (editingPerfume) {
      updatePerfume(editingPerfume.id, perfumeData)
    } else {
      addPerfume(perfumeData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this perfume?')) {
      deletePerfume(id)
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
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Perfumes</h1>
          <p className="text-gray-400 text-sm mt-1">{perfumes.length} products</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2">
          <Plus size={18} />
          Add Perfume
        </button>
      </motion.div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search perfumes..."
          className="w-full bg-surface border border-white/10 pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none rounded-lg"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredPerfumes.map((perfume, index) => (
          <motion.div
            key={perfume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface border border-white/5 overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover" />
              {/* Action Buttons - Always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(perfume)}
                  className="p-2.5 bg-accent text-primary rounded-full hover:bg-yellow-400 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(perfume.id)}
                  className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                {perfume.isNew && <span className="px-2 py-0.5 bg-accent text-primary text-xs font-semibold rounded">NEW</span>}
                {perfume.originalPrice && <span className="px-2 py-0.5 bg-secondary text-white text-xs font-semibold rounded">SALE</span>}
                {perfume.isFeatured && <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded">FEATURED</span>}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-1">{perfume.brand}</p>
              <h3 className="font-playfair text-lg text-white mb-1 truncate">{perfume.name}</h3>
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{perfume.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="gold-text font-semibold">${perfume.price}</span>
                  {perfume.originalPrice && (
                    <span className="text-gray-500 line-through text-xs">${perfume.originalPrice}</span>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${perfume.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {perfume.inStock ? 'In Stock' : 'Out'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPerfumes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 font-playfair text-lg">No perfumes found</p>
          <button onClick={openCreateModal} className="btn-primary mt-4 w-full sm:w-auto">Add Your First Perfume</button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
              <h2 className="font-playfair text-lg md:text-xl text-white">
                {editingPerfume ? 'Edit Perfume' : 'Add New Perfume'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <form id="perfume-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
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

                {/* Price & Original Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Original ($)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Image URL */}
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

                {/* Category & Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                    >
                      <option value="luxury">Luxury</option>
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="unisex">Unisex</option>
                      <option value="arabian">Arabian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Volume</label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  >
                    <option value="30ml">30ml</option>
                    <option value="50ml">50ml</option>
                    <option value="100ml">100ml</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-3">Fragrance Notes</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Top</label>
                      <input
                        type="text"
                        value={formData.notes.top}
                        onChange={(e) => setFormData({ ...formData, notes: { ...formData.notes, top: e.target.value } })}
                        className="w-full bg-primary border border-white/10 px-3 py-2.5 text-white focus:border-accent/50 focus:outline-none rounded-lg text-sm"
                        placeholder="Bergamot"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Middle</label>
                      <input
                        type="text"
                        value={formData.notes.middle}
                        onChange={(e) => setFormData({ ...formData, notes: { ...formData.notes, middle: e.target.value } })}
                        className="w-full bg-primary border border-white/10 px-3 py-2.5 text-white focus:border-accent/50 focus:outline-none rounded-lg text-sm"
                        placeholder="Oud"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Base</label>
                      <input
                        type="text"
                        value={formData.notes.base}
                        onChange={(e) => setFormData({ ...formData, notes: { ...formData.notes, base: e.target.value } })}
                        className="w-full bg-primary border border-white/10 px-3 py-2.5 text-white focus:border-accent/50 focus:outline-none rounded-lg text-sm"
                        placeholder="Musk"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
                    required
                  />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-9 h-5 rounded-full transition-colors ${formData.inStock ? 'bg-accent' : 'bg-gray-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${formData.inStock ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-white text-xs">In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-9 h-5 rounded-full transition-colors ${formData.isFeatured ? 'bg-accent' : 'bg-gray-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${formData.isFeatured ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-white text-xs">Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-9 h-5 rounded-full transition-colors ${formData.isNew ? 'bg-accent' : 'bg-gray-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${formData.isNew ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-white text-xs">New</span>
                  </label>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary w-full sm:w-auto py-3">
                Cancel
              </button>
              <button type="submit" form="perfume-form" className="btn-primary w-full sm:w-auto py-3 flex items-center justify-center gap-2">
                <Check size={16} />
                {editingPerfume ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
