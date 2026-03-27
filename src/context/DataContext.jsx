import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import api from '../lib/api'
import { products as defaultProducts } from '../data/products'

const DataContext = createContext()

const DEFAULT_SITE_SETTINGS = {
  hero: {
    preTitle: 'اكتشف جمالك',
    titleLine1: 'اكتشف',
    titleLine2Part1: 'أفضل',
    titleLine2Part2: '',
    titleLine3Part1: 'المستحضرات',
    titleLine3Part2: '',
    subtitle: 'مستحضرات تجميل فاخرة من أجود المواد الطبيعية',
    ctaText: 'تسوق الآن',
    backgroundImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80'
  },
  about: {
    preTitle: 'تراثنا',
    title: 'إرث من الأناقة الخالدة',
    quote: 'GrayHut وجهتك الأولى لمستحضرات التجميل الفاخرة. نقدم لك أفضل المنتجات من أشهر الماركات العالمية.',
    bodyParagraph1: 'نقدم لك أفضل المستحضرات من أشهر الماركات العالمية',
    bodyParagraph2: 'جميع منتجاتنا أصلية 100% ومختارة بعناية فائقة',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    stats: [
      { label: 'جودة عالية', value: '100%' },
      { label: 'عملاء سعداء', value: '50K+' },
      { label: 'منتجات فاخرة', value: '200+' }
    ]
  },
  newsletter: {
    title: 'انضم للنادي الخاص',
    subtitle: 'احصل على خصم 10% على طلبك الأول',
    placeholder: 'بريدك الإلكتروني',
    ctaText: 'اشترك'
  },
  footer: {
    tagline: 'جمالك يبدأ من هنا',
    contactEmail: 'info@grayhut.com',
    contactPhone: '+964 770 123 4567',
    socialLinks: { instagram: '', facebook: '', twitter: '' }
  },
  updatedAt: new Date().toISOString()
}

// Normalize product from API (handle both _id and id)
const normalizeProduct = (p) => ({
  ...p,
  id: p._id || p.id,
  createdAt: p.createdAt || new Date().toISOString()
})

export function DataProvider({ children }) {
  const [perfumes, setPerfumes] = useState([])
  const [makeup, setMakeup] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const products = await api.getProducts()
      // If API returns empty or invalid data, use fallback
      if (!products || !Array.isArray(products) || products.length === 0) {
        throw new Error('API returned empty products')
      }
      // Normalize all products
      const normalized = products.map(normalizeProduct)
      const perfumesData = normalized.filter(p => p.productType === 'perfume' || !p.productType)
      const makeupData = normalized.filter(p => p.productType === 'makeup')
      setPerfumes(perfumesData)
      setMakeup(makeupData)
      // Cache to localStorage on successful fetch
      localStorage.setItem('grayhut-perfumes', JSON.stringify(perfumesData))
      localStorage.setItem('grayhut-makeup', JSON.stringify(makeupData))
      setError(null)
    } catch (err) {
      console.error('Failed to load products from API:', err)
      setError(err.message)
      // Fallback to localStorage first, then default products
      const savedPerfumes = localStorage.getItem('grayhut-perfumes')
      const savedMakeup = localStorage.getItem('grayhut-makeup')
      if (savedPerfumes && JSON.parse(savedPerfumes).length > 0) {
        setPerfumes(JSON.parse(savedPerfumes))
      } else {
        setPerfumes(defaultProducts.filter(p => !p.category || p.category !== 'makeup'))
      }
      if (savedMakeup && JSON.parse(savedMakeup).length > 0) {
        setMakeup(JSON.parse(savedMakeup))
      } else {
        setMakeup(defaultProducts.filter(p => p.category === 'makeup'))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchWhatsAppSettings()
  }, [fetchProducts, fetchWhatsAppSettings])

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

  // WhatsApp Settings (fetched from API)
  const [whatsappSettings, setWhatsappSettings] = useState({
    enabled: false,
    accessToken: '',
    phoneNumberId: '',
    businessPhone: '',
    orderReceivedTemplate: 'Order #{order_id} received! Thank you {customer_name}. We will contact you soon.',
    orderPreparingTemplate: 'Your order #{order_id} is now being prepared.',
    orderDeliveredTemplate: 'Your order #{order_id} has been delivered! Thank you for shopping with us.'
  })

  // Fetch WhatsApp settings from API
  const fetchWhatsAppSettings = useCallback(async () => {
    try {
      const settings = await api.getWhatsAppSettings()
      setWhatsappSettings(settings)
    } catch (err) {
      console.error('Failed to fetch WhatsApp settings:', err)
      // Fallback to defaults
      setWhatsappSettings({
        enabled: false,
        accessToken: '',
        phoneNumberId: '',
        businessPhone: '',
        orderReceivedTemplate: 'Order #{order_id} received! Thank you {customer_name}. We will contact you soon.',
        orderPreparingTemplate: 'Your order #{order_id} is now being prepared.',
        orderDeliveredTemplate: 'Your order #{order_id} has been delivered! Thank you for shopping with us.'
      })
    }
  }, [])

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
  useEffect(() => { localStorage.setItem('grayhut-whatsapp-settings', JSON.stringify(whatsappSettings)) }, [whatsappSettings])

  // Perfume CRUD - API with refresh
  const addPerfume = useCallback(async (perfume) => {
    try {
      const newPerfume = await api.createProduct({ ...perfume, productType: 'perfume' })
      const normalized = normalizeProduct(newPerfume)
      setPerfumes(prev => [normalized, ...prev])
      return normalized
    } catch (err) {
      console.error('Failed to add perfume:', err)
      const localPerfume = { ...perfume, id: uuidv4(), productType: 'perfume', createdAt: new Date().toISOString() }
      setPerfumes(prev => [localPerfume, ...prev])
      localStorage.setItem('grayhut-perfumes', JSON.stringify([localPerfume, ...perfumes]))
      return localPerfume
    }
  }, [perfumes])

  const updatePerfume = useCallback(async (id, updates) => {
    try {
      const updated = await api.updateProduct(id, updates)
      const normalized = normalizeProduct(updated)
      setPerfumes(prev => prev.map(p => (p.id === id || p._id === id) ? normalized : p))
      return normalized
    } catch (err) {
      console.error('Failed to update perfume:', err)
      setPerfumes(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    }
  }, [])

  const deletePerfume = useCallback(async (id) => {
    try {
      await api.deleteProduct(id)
      setPerfumes(prev => prev.filter(p => p.id !== id && p._id !== id))
    } catch (err) {
      console.error('Failed to delete perfume:', err)
      setPerfumes(prev => prev.filter(p => p.id !== id && p._id !== id))
    }
  }, [])

  // Makeup CRUD - API with refresh
  const addMakeup = useCallback(async (item) => {
    try {
      const newItem = await api.createProduct({ ...item, productType: 'makeup' })
      const normalized = normalizeProduct(newItem)
      setMakeup(prev => [normalized, ...prev])
      return normalized
    } catch (err) {
      console.error('Failed to add makeup:', err)
      const localMakeup = { ...item, id: uuidv4(), productType: 'makeup', createdAt: new Date().toISOString() }
      setMakeup(prev => [localMakeup, ...prev])
      return localMakeup
    }
  }, [])

  const updateMakeup = useCallback(async (id, updates) => {
    try {
      const updated = await api.updateProduct(id, updates)
      const normalized = normalizeProduct(updated)
      setMakeup(prev => prev.map(m => (m.id === id || m._id === id) ? normalized : m))
      return normalized
    } catch (err) {
      console.error('Failed to update makeup:', err)
      setMakeup(prev => prev.map(m => (m.id === id || m._id === id) ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m))
    }
  }, [])

  const deleteMakeup = useCallback(async (id) => {
    try {
      await api.deleteProduct(id)
      setMakeup(prev => prev.filter(m => m.id !== id && m._id !== id))
    } catch (err) {
      console.error('Failed to delete makeup:', err)
      setMakeup(prev => prev.filter(m => m.id !== id && m._id !== id))
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

  // Orders - API synced
  const addOrder = useCallback(async (order) => {
    const newOrder = {
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    try {
      const savedOrder = await api.createOrder(newOrder)
      setOrders(prev => [...prev, savedOrder])
      return savedOrder
    } catch (err) {
      console.error('Failed to create order:', err)
      // Fallback to local storage
      const localOrder = { ...newOrder, id: uuidv4() }
      setOrders(prev => [...prev, localOrder])
      return localOrder
    }
  }, [])

  const updateOrderStatus = useCallback(async (id, status) => {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
    ))
    try {
      await api.updateOrderStatus(id, status)
    } catch (err) {
      console.error('Failed to update order status:', err)
    }
  }, [])

  // WhatsApp Settings - save to API
  const updateWhatsappSettings = useCallback(async (updates) => {
    const newSettings = { ...whatsappSettings, ...updates }
    setWhatsappSettings(newSettings)
    try {
      await api.updateWhatsAppSettings(newSettings)
    } catch (err) {
      console.error('Failed to save WhatsApp settings:', err)
    }
  }, [whatsappSettings])

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
      whatsappSettings,
      loading, error,
      // Refresh function
      refreshProducts: fetchProducts,
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
      updateSiteSettings, updateSpecialOffer, updateWhatsappSettings,
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
