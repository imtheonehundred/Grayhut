import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import api from '../lib/api'
import { products as defaultProducts } from '../data/products'

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
  const [perfumes, setPerfumes] = useState([])
  const [makeup, setMakeup] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const products = await api.getProducts()
        const perfumesData = products.filter(p => p.productType === 'perfume' || !p.productType)
        const makeupData = products.filter(p => p.productType === 'makeup')
        setPerfumes(perfumesData)
        setMakeup(makeupData)
        setError(null)
      } catch (err) {
        console.error('Failed to load products:', err)
        setError(err.message)
        // Fallback to localStorage first, then default products
        const savedPerfumes = localStorage.getItem('grayhut-perfumes')
        const savedMakeup = localStorage.getItem('grayhut-makeup')
        if (savedPerfumes) {
          setPerfumes(JSON.parse(savedPerfumes))
        } else {
          // Use default products as fallback
          setPerfumes(defaultProducts.filter(p => !p.category || p.category !== 'makeup'))
        }
        if (savedMakeup) {
          setMakeup(JSON.parse(savedMakeup))
        } else {
          setMakeup(defaultProducts.filter(p => p.category === 'makeup'))
        }
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Categories (localStorage for now)
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('grayhut-categories')
    return saved ? JSON.parse(saved) : []
  })

  // Testimonials (localStorage for now)
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('grayhut-testimonials')
    return saved ? JSON.parse(saved) : []
  })

  // Orders (localStorage for now)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('grayhut-orders')
    return saved ? JSON.parse(saved) : []
  })

  // Site Settings (localStorage for now)
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('grayhut-site-settings')
    return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS
  })

  // Special Offer (localStorage for now)
  const [specialOffer, setSpecialOffer] = useState(() => {
    const saved = localStorage.getItem('grayhut-special-offer')
    if (saved) {
      const parsed = JSON.parse(saved)
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
  useEffect(() => { localStorage.setItem('grayhut-categories', JSON.stringify(categories)) }, [categories])
  useEffect(() => { localStorage.setItem('grayhut-testimonials', JSON.stringify(testimonials)) }, [testimonials])
  useEffect(() => { localStorage.setItem('grayhut-orders', JSON.stringify(orders)) }, [orders])
  useEffect(() => { localStorage.setItem('grayhut-site-settings', JSON.stringify(siteSettings)) }, [siteSettings])
  useEffect(() => { localStorage.setItem('grayhut-special-offer', JSON.stringify(specialOffer)) }, [specialOffer])

  // Perfume CRUD - API
  const addPerfume = useCallback(async (perfume) => {
    try {
      const newPerfume = await api.createProduct({ ...perfume, productType: 'perfume' })
      setPerfumes(prev => [newPerfume, ...prev])
      return newPerfume
    } catch (err) {
      console.error('Failed to add perfume:', err)
      // Fallback to local
      const localPerfume = { ...perfume, id: uuidv4(), productType: 'perfume', createdAt: new Date().toISOString() }
      setPerfumes(prev => [localPerfume, ...prev])
      localStorage.setItem('grayhut-perfumes', JSON.stringify([localPerfume, ...perfumes]))
      return localPerfume
    }
  }, [perfumes])

  const updatePerfume = useCallback(async (id, updates) => {
    try {
      const updated = await api.updateProduct(id, updates)
      setPerfumes(prev => prev.map(p => p.id === id ? updated : p))
      return updated
    } catch (err) {
      console.error('Failed to update perfume:', err)
      // Fallback to local
      setPerfumes(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    }
  }, [])

  const deletePerfume = useCallback(async (id) => {
    try {
      await api.deleteProduct(id)
      setPerfumes(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Failed to delete perfume:', err)
      // Fallback to local
      setPerfumes(prev => prev.filter(p => p.id !== id))
    }
  }, [])

  // Makeup CRUD - API
  const addMakeup = useCallback(async (item) => {
    try {
      const newItem = await api.createProduct({ ...item, productType: 'makeup' })
      setMakeup(prev => [newItem, ...prev])
      return newItem
    } catch (err) {
      console.error('Failed to add makeup:', err)
      // Fallback to local
      const localMakeup = { ...item, id: uuidv4(), productType: 'makeup', createdAt: new Date().toISOString() }
      setMakeup(prev => [localMakeup, ...prev])
      return localMakeup
    }
  }, [])

  const updateMakeup = useCallback(async (id, updates) => {
    try {
      const updated = await api.updateProduct(id, updates)
      setMakeup(prev => prev.map(m => m.id === id ? updated : m))
      return updated
    } catch (err) {
      console.error('Failed to update makeup:', err)
      setMakeup(prev => prev.map(m => m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m))
    }
  }, [])

  const deleteMakeup = useCallback(async (id) => {
    try {
      await api.deleteProduct(id)
      setMakeup(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error('Failed to delete makeup:', err)
      setMakeup(prev => prev.filter(m => m.id !== id))
    }
  }, [])

  // Categories CRUD - Local
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

  // Testimonials CRUD - Local
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

  // Orders - Local
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
      loading, error,
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
