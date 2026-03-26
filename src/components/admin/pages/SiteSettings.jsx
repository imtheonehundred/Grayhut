import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Image as ImageIcon } from 'lucide-react'
import { useData } from '../../../context/DataContext'

export default function SiteSettings() {
  const { siteSettings, updateSiteSettings } = useData()

  const [formData, setFormData] = useState({
    hero: {
      preTitle: siteSettings.hero?.preTitle || '',
      titleLine1: siteSettings.hero?.titleLine1 || '',
      titleLine2Part1: siteSettings.hero?.titleLine2Part1 || '',
      titleLine2Part2: siteSettings.hero?.titleLine2Part2 || '',
      titleLine3Part1: siteSettings.hero?.titleLine3Part1 || '',
      titleLine3Part2: siteSettings.hero?.titleLine3Part2 || '',
      subtitle: siteSettings.hero?.subtitle || '',
      ctaText: siteSettings.hero?.ctaText || '',
      backgroundImage: siteSettings.hero?.backgroundImage || ''
    },
    about: {
      preTitle: siteSettings.about?.preTitle || '',
      title: siteSettings.about?.title || '',
      quote: siteSettings.about?.quote || '',
      bodyParagraph1: siteSettings.about?.bodyParagraph1 || '',
      bodyParagraph2: siteSettings.about?.bodyParagraph2 || '',
      image: siteSettings.about?.image || '',
      stats: siteSettings.about?.stats || []
    },
    newsletter: {
      title: siteSettings.newsletter?.title || '',
      subtitle: siteSettings.newsletter?.subtitle || '',
      placeholder: siteSettings.newsletter?.placeholder || '',
      ctaText: siteSettings.newsletter?.ctaText || ''
    },
    footer: {
      tagline: siteSettings.footer?.tagline || '',
      contactEmail: siteSettings.footer?.contactEmail || '',
      contactPhone: siteSettings.footer?.contactPhone || '',
      socialLinks: siteSettings.footer?.socialLinks || { instagram: '', facebook: '', twitter: '' }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSiteSettings(formData)
    alert('Settings saved successfully!')
  }

  const updateHero = (key, value) => {
    setFormData({
      ...formData,
      hero: { ...formData.hero, [key]: value }
    })
  }

  const updateAbout = (key, value) => {
    setFormData({
      ...formData,
      about: { ...formData.about, [key]: value }
    })
  }

  const updateNewsletter = (key, value) => {
    setFormData({
      ...formData,
      newsletter: { ...formData.newsletter, [key]: value }
    })
  }

  const updateFooter = (key, value) => {
    setFormData({
      ...formData,
      footer: { ...formData.footer, [key]: value }
    })
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Site Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Customize your website content</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">Hero Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Pre Title</label>
              <input
                type="text"
                value={formData.hero.preTitle}
                onChange={(e) => updateHero('preTitle', e.target.value)}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                placeholder="Est. 1895 • Paris"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">CTA Button Text</label>
              <input
                type="text"
                value={formData.hero.ctaText}
                onChange={(e) => updateHero('ctaText', e.target.value)}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                placeholder="Shop Now"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Subtitle</label>
              <textarea
                value={formData.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Background Image URL</label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="url"
                  value={formData.hero.backgroundImage}
                  onChange={(e) => updateHero('backgroundImage', e.target.value)}
                  className="w-full bg-primary border border-white/10 pl-10 pr-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">About Section</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Pre Title</label>
                <input
                  type="text"
                  value={formData.about.preTitle}
                  onChange={(e) => updateAbout('preTitle', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={formData.about.title}
                  onChange={(e) => updateAbout('title', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Quote</label>
              <textarea
                value={formData.about.quote}
                onChange={(e) => updateAbout('quote', e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Body Paragraph 1</label>
              <textarea
                value={formData.about.bodyParagraph1}
                onChange={(e) => updateAbout('bodyParagraph1', e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Body Paragraph 2</label>
              <textarea
                value={formData.about.bodyParagraph2}
                onChange={(e) => updateAbout('bodyParagraph2', e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Image URL</label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="url"
                  value={formData.about.image}
                  onChange={(e) => updateAbout('image', e.target.value)}
                  className="w-full bg-primary border border-white/10 pl-10 pr-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">Newsletter Section</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={formData.newsletter.title}
                  onChange={(e) => updateNewsletter('title', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.newsletter.ctaText}
                  onChange={(e) => updateNewsletter('ctaText', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Subtitle</label>
              <textarea
                value={formData.newsletter.subtitle}
                onChange={(e) => updateNewsletter('subtitle', e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Placeholder Text</label>
              <input
                type="text"
                value={formData.newsletter.placeholder}
                onChange={(e) => updateNewsletter('placeholder', e.target.value)}
                className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <h2 className="font-playfair text-base sm:text-lg text-white mb-4">Footer</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Tagline</label>
                <input
                  type="text"
                  value={formData.footer.tagline}
                  onChange={(e) => updateFooter('tagline', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.footer.contactEmail}
                  onChange={(e) => updateFooter('contactEmail', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.footer.contactPhone}
                  onChange={(e) => updateFooter('contactPhone', e.target.value)}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={formData.footer.socialLinks?.instagram || ''}
                  onChange={(e) => updateFooter('socialLinks', { ...formData.footer.socialLinks, instagram: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={formData.footer.socialLinks?.facebook || ''}
                  onChange={(e) => updateFooter('socialLinks', { ...formData.footer.socialLinks, facebook: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Twitter URL</label>
                <input
                  type="url"
                  value={formData.footer.socialLinks?.twitter || ''}
                  onChange={(e) => updateFooter('socialLinks', { ...formData.footer.socialLinks, twitter: e.target.value })}
                  className="w-full bg-primary border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none rounded-lg"
                />
              </div>
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
            Save All Settings
          </button>
        </motion.div>
      </form>
    </div>
  )
}
