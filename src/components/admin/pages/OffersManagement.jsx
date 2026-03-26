import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Calendar } from 'lucide-react'
import { useData } from '../../../context/DataContext'

export default function OffersManagement() {
  const { specialOffer, updateSpecialOffer } = useData()
  const [formData, setFormData] = useState({
    isActive: specialOffer.isActive,
    title: specialOffer.title,
    subtitle: specialOffer.subtitle,
    countdownEndDate: specialOffer.countdownEndDate ? new Date(specialOffer.countdownEndDate).toISOString().slice(0, 16) : '',
    discountType: specialOffer.discount?.type || 'percentage',
    discountValue: specialOffer.discount?.value || 20
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSpecialOffer({
      isActive: formData.isActive,
      title: formData.title,
      subtitle: formData.subtitle,
      countdownEndDate: new Date(formData.countdownEndDate).toISOString(),
      discount: {
        type: formData.discountType,
        value: Number(formData.discountValue)
      }
    })
    alert('Special offer updated successfully!')
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Special Offers</h1>
        <p className="text-gray-400 text-sm mt-1">Configure your special offer</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        {/* Active Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-white/5 p-4 md:p-6 mb-4 md:mb-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-base sm:text-lg text-white mb-1">Enable Special Offer</h2>
              <p className="text-gray-400 text-xs">Turn on to show offers section</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-accent' : 'bg-gray-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${formData.isActive ? 'translate-x-6' : ''}`} />
              </div>
            </label>
          </div>
        </motion.div>

        {/* Offer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 p-4 md:p-6 mb-4 md:mb-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">Offer Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                placeholder="Special Offers"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                placeholder="Limited time exclusive discounts"
              />
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-white/5 p-4 md:p-6 mb-4 md:mb-6 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-accent" />
            <h2 className="font-playfair text-base sm:text-lg text-white">Countdown Timer</h2>
          </div>

          <div>
            <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">End Date & Time</label>
            <input
              type="datetime-local"
              value={formData.countdownEndDate}
              onChange={(e) => setFormData({ ...formData, countdownEndDate: e.target.value })}
              className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
            />
          </div>
        </motion.div>

        {/* Discount Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-white/5 p-4 md:p-6 mb-4 md:mb-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">Discount</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Type</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
                {formData.discountType === 'percentage' ? 'Percent' : 'Amount'}
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                min="0"
                max={formData.discountType === 'percentage' ? 100 : undefined}
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-end gap-3"
        >
          <button type="submit" className="btn-primary w-full sm:w-auto py-3 flex items-center justify-center gap-2">
            <Check size={16} />
            Save Changes
          </button>
        </motion.div>
      </form>
    </div>
  )
}
