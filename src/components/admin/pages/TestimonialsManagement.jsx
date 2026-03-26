import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, X, Image as ImageIcon, Check, Star } from 'lucide-react'
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

export default function TestimonialsManagement() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData())

  function getDefaultFormData() {
    return {
      name: '',
      title: '',
      image: '',
      rating: 5,
      text: '',
      isActive: true,
      order: 0
    }
  }

  const filteredTestimonials = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCreateModal = () => {
    setEditingTestimonial(null)
    setFormData(getDefaultFormData())
    setIsModalOpen(true)
  }

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      title: testimonial.title,
      image: testimonial.image,
      rating: testimonial.rating,
      text: testimonial.text,
      isActive: testimonial.isActive,
      order: testimonial.order || 0
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, formData)
    } else {
      addTestimonial(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id)
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
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">{testimonials.length} testimonials</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2">
          <Plus size={18} />
          Add Testimonial
        </button>
      </motion.div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search testimonials..."
          className="w-full bg-surface border border-white/10 pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none rounded-lg"
        />
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface border border-white/5 p-4 sm:p-6 rounded-xl"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-accent/30"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-playfair text-base sm:text-lg text-white">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded ${testimonial.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(testimonial)}
                      className="p-2 text-gray-400 hover:text-accent transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 font-playfair text-lg">No testimonials found</p>
          <button onClick={openCreateModal} className="btn-primary mt-4 w-full sm:w-auto">Add Your First</button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-playfair text-lg text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form id="testimonial-form" onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto flex-1">
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
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  placeholder="CEO, Vogue Magazine"
                  required
                />
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
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="p-2 transition-colors"
                    >
                      <Star
                        size={22}
                        className={rating <= formData.rating ? 'text-accent fill-accent' : 'text-gray-600'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Testimonial</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={3}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
                  required
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
                <button type="submit" form="testimonial-form" className="btn-primary w-full sm:w-auto py-3 flex items-center justify-center gap-2">
                  <Check size={16} />
                  {editingTestimonial ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
