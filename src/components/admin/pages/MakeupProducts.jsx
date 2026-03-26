import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, X, Image as ImageIcon, Check, Palette } from 'lucide-react'
import { useData } from '../../../context/DataContext'
import Modal from '../../ui/Modal'

function MakeupForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      brand: 'GrayHut'
    })
  }

  return (
    <form id="makeup-form" onSubmit={handleSubmit} className="space-y-5">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Price (IQD)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Original Price</label>
          <input
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
            min="0"
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

      {/* Category & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
          >
            <option value="lips">Lips</option>
            <option value="eyes">Eyes</option>
            <option value="face">Face</option>
            <option value="complexion">Complexion</option>
            <option value="makeup">Makeup</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
          >
            <option value="lipstick">Lipstick</option>
            <option value="lipgloss">Lip Gloss</option>
            <option value="eyeshadow">Eyeshadow</option>
            <option value="blush">Blush</option>
            <option value="foundation">Foundation</option>
            <option value="mascara">Mascara</option>
            <option value="eyeliner">Eyeliner</option>
            <option value="skincare">Skincare</option>
          </select>
        </div>
      </div>

      {/* Finish & Coverage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Finish</label>
          <select
            value={formData.finish}
            onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
          >
            <option value="matte">Matte</option>
            <option value="satin">Satin</option>
            <option value="shimmer">Shimmer</option>
            <option value="metallic">Metallic</option>
            <option value="glossy">Glossy</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Coverage</label>
          <select
            value={formData.coverage}
            onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
            className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
          >
            <option value="sheer">Sheer</option>
            <option value="medium">Medium</option>
            <option value="full">Full</option>
          </select>
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
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-white/10">
        <button type="button" onClick={onCancel} className="btn-secondary w-full sm:w-auto py-3">
          Cancel
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto py-3 flex items-center justify-center gap-2">
          <Check size={16} />
          {initialData.id ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}

export default function MakeupProducts() {
  const { makeup, addMakeup, updateMakeup, deleteMakeup } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const defaultFormData = {
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: 'lips',
    type: 'lipstick',
    description: '',
    shades: [],
    finish: 'matte',
    coverage: 'medium',
    ingredients: '',
    inStock: true,
    isFeatured: false,
    isNew: false
  }

  const filteredMakeup = makeup.filter(m =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleSubmit = async (formData) => {
    if (editingItem) {
      await updateMakeup(editingItem.id || editingItem._id, formData)
    } else {
      await addMakeup(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this makeup product?')) {
      await deleteMakeup(id || id._id)
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
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Makeup</h1>
          <p className="text-gray-400 text-sm mt-1">{makeup.length} products</p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto py-3"
        >
          <Plus size={18} />
          Add Makeup
        </button>
      </motion.div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search makeup..."
          className="w-full bg-surface border border-white/10 pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none rounded-lg"
        />
      </div>

      {/* Products Grid - Mobile 1 column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredMakeup.map((item, index) => (
          <motion.div
            key={item.id || item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface border border-white/5 overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2.5 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id || item._id)}
                  className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                {item.isNew && <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded">NEW</span>}
                {item.originalPrice && <span className="px-2 py-0.5 bg-secondary text-white text-xs font-semibold rounded">SALE</span>}
                {item.isFeatured && <span className="px-2 py-0.5 bg-pink-500 text-white text-xs font-semibold rounded">FEATURED</span>}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-1">{item.brand}</p>
              <h3 className="font-playfair text-lg text-white mb-1 truncate">{item.name}</h3>
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="gold-text font-semibold">{item.price?.toLocaleString()} IQD</span>
                  {item.originalPrice && (
                    <span className="text-gray-500 line-through text-xs">{item.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${item.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.inStock ? 'In Stock' : 'Out'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMakeup.length === 0 && (
        <div className="text-center py-16">
          <Palette size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-400 font-playfair text-lg">No makeup products yet</p>
          <button onClick={openCreateModal} className="btn-primary mt-4 w-full sm:w-auto">Add Your First Makeup</button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Makeup' : 'Add New Makeup'}
      >
        <MakeupForm
          initialData={editingItem || defaultFormData}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}