import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { products as defaultPerfumes, categories as defaultCategories, testimonials as defaultTestimonials } from '../data/products'

const DataContext = createContext()

const DEFAULT_SITE_SETTINGS = {
  hero: {
    preTitle: 'Est. 1895 • Paris',
    titleLine1: 'Discover the',
    titleLine2Part1: 'Essence',
    titleLine2Part2: 'of',
    titleLine3Part1: 'Luxury',
    titleLine3Part2: '',
    subtitle: 'Exquisite fragrances crafted from the world\'s finest ingredients.',
    ctaText: 'Shop Now',
    backgroundImage: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920&q=80'
  },
  about: {
    preTitle: 'Our Heritage',
    title: 'A Legacy of Timeless Elegance',
    quote: 'Since 1895, NOIR ESSENCE has been the epitome of luxury perfumery, crafting scents that transcend time and capture the essence of life\'s most precious moments.',
    bodyParagraph1: 'Our master perfumers source the rarest ingredients from across the globe—Bulgarian roses plucked at dawn, Arabian oud aged for decades, and Calabrian bergamot kissed by Mediterranean sun.',
    bodyParagraph2: 'Each fragrance is a masterpiece, meticulously blended using time-honored techniques passed down through five generations of master perfumers.',
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80',
    stats: [
      { label: 'Premium Quality', value: '100%' },
      { label: 'Happy Clients', value: '50K+' },
      { label: 'Unique Scents', value: '85+' }
    ]
  },
  newsletter: {
    title: 'Join the Inner Circle',
    subtitle: 'Subscribe to receive exclusive previews of new collections, members-only offers, and the latest from our master perfumers.',
    placeholder: 'Enter your email address',
    ctaText: 'Subscribe'
  },
  footer: {
    tagline: 'Where Luxury Meets Essence',
    contactEmail: 'contact@noiressence.com',
    contactPhone: '+33 1 23 45 67 89',
    socialLinks: { instagram: '', facebook: '', twitter: '' }
  },
  updatedAt: new Date().toISOString()
}

export function DataProvider({ children }) {
  // Perfumes
  const [perfumes, setPerfumes] = useState(() => {
    const saved = localStorage.getItem('noir-perfumes')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultPerfumes
      }
    }
    return defaultPerfumes
  })

  // Makeup
  const [makeup, setMakeup] = useState(() => {
    const saved = localStorage.getItem('noir-makeup')
    return saved ? JSON.parse(saved) : []
  })

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('noir-categories')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultCategories
      }
    }
    return defaultCategories
  })

  // Testimonials
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('noir-testimonials')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultTestimonials
      }
    }
    return defaultTestimonials
  })

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('noir-orders')
    return saved ? JSON.parse(saved) : []
  })

  // Site Settings
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('noir-site-settings')
    return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS
  })

  // Special Offer
  const [specialOffer, setSpecialOffer] = useState(() => {
    const saved = localStorage.getItem('noir-special-offer')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Set default countdown if none exists
      if (!parsed.countdownEndDate) {
        const countdownDate = new Date()
        countdownDate.setDate(countdownDate.getDate() + 7)
        parsed.countdownEndDate = countdownDate.toISOString()
      }
      return parsed
    }
    const countdownDate = new Date()
    countdownDate.setDate(countdownDate.getDate() + 7)
    return {
      isActive: true,
      title: 'Special Offers',
      subtitle: 'Limited time exclusive discounts',
      countdownEndDate: countdownDate.toISOString(),
      products: [],
      discount: { type: 'percentage', value: 20 },
      updatedAt: new Date().toISOString()
    }
  })

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('noir-perfumes', JSON.stringify(perfumes)) }, [perfumes])
  useEffect(() => { localStorage.setItem('noir-makeup', JSON.stringify(makeup)) }, [makeup])
  useEffect(() => { localStorage.setItem('noir-categories', JSON.stringify(categories)) }, [categories])
  useEffect(() => { localStorage.setItem('noir-testimonials', JSON.stringify(testimonials)) }, [testimonials])
  useEffect(() => { localStorage.setItem('noir-orders', JSON.stringify(orders)) }, [orders])
  useEffect(() => { localStorage.setItem('noir-site-settings', JSON.stringify(siteSettings)) }, [siteSettings])
  useEffect(() => { localStorage.setItem('noir-special-offer', JSON.stringify(specialOffer)) }, [specialOffer])

  // Perfume CRUD
  const addPerfume = useCallback((perfume) => {
    const newPerfume = {
      ...perfume,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setPerfumes(prev => [...prev, newPerfume])
    return newPerfume
  }, [])

  const updatePerfume = useCallback((id, updates) => {
    setPerfumes(prev => prev.map(p =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deletePerfume = useCallback((id) => {
    setPerfumes(prev => prev.filter(p => p.id !== id))
  }, [])

  // Makeup CRUD
  const addMakeup = useCallback((item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setMakeup(prev => [...prev, newItem])
    return newItem
  }, [])

  const updateMakeup = useCallback((id, updates) => {
    setMakeup(prev => prev.map(m =>
      m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
    ))
  }, [])

  const deleteMakeup = useCallback((id) => {
    setMakeup(prev => prev.filter(m => m.id !== id))
  }, [])

  // Categories CRUD
  const addCategory = useCallback((category) => {
    const newCategory = {
      ...category,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCategories(prev => [...prev, newCategory])
    return newCategory
  }, [])

  const updateCategory = useCallback((id, updates) => {
    setCategories(prev => prev.map(c =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ))
  }, [])

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }, [])

  // Testimonials CRUD
  const addTestimonial = useCallback((testimonial) => {
    const newTestimonial = {
      ...testimonial,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setTestimonials(prev => [...prev, newTestimonial])
    return newTestimonial
  }, [])

  const updateTestimonial = useCallback((id, updates) => {
    setTestimonials(prev => prev.map(t =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    ))
  }, [])

  const deleteTestimonial = useCallback((id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }, [])

  // Orders
  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setOrders(prev => [...prev, newOrder])
    return newOrder
  }, [])

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
    ))
  }, [])

  // Site Settings
  const updateSiteSettings = useCallback((updates) => {
    setSiteSettings(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }))
  }, [])

  // Special Offer
  const updateSpecialOffer = useCallback((updates) => {
    setSpecialOffer(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }))
  }, [])

  // Combined products for filtering
  const allProducts = [...perfumes, ...makeup]

  return (
    <DataContext.Provider value={{
      // Data
      perfumes, makeup, categories, testimonials, orders, siteSettings, specialOffer, allProducts,
      // Perfume CRUD
      addPerfume, updatePerfume, deletePerfume,
      // Makeup CRUD
      addMakeup, updateMakeup, deleteMakeup,
      // Categories CRUD
      addCategory, updateCategory, deleteCategory,
      // Testimonials CRUD
      addTestimonial, updateTestimonial, deleteTestimonial,
      // Orders
      addOrder, updateOrderStatus,
      // Settings
      updateSiteSettings, updateSpecialOffer,
      // Defaults
      DEFAULT_SITE_SETTINGS
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
