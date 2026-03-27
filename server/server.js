require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Product = require('./models/Product')
const Settings = require('./models/Settings')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err))

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, type, featured, search } = req.query
    let query = {}

    if (category) query.category = category
    if (type) query.productType = type
    if (featured === 'true') query.isFeatured = true

    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }

    const products = await Product.find(query).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ==================== SETTINGS ROUTES ====================

// GET all settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Settings.find()
    // Convert to object with key-value pairs
    const settingsObj = {}
    settings.forEach(s => {
      settingsObj[s.key] = s
    })
    res.json(settingsObj)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single setting by key
app.get('/api/settings/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key })
    if (!setting) return res.status(404).json({ message: 'Setting not found' })
    res.json(setting)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT update or create setting
app.put('/api/settings/:key', async (req, res) => {
  try {
    const { key } = req.params
    const updates = req.body

    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, ...updates },
      { new: true, upsert: true, runValidators: true }
    )
    res.json(setting)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// WhatsApp specific endpoint
app.get('/api/settings/whatsapp', async (req, res) => {
  try {
    let setting = await Settings.findOne({ key: 'whatsapp' })
    if (!setting) {
      // Create default whatsapp settings
      setting = new Settings({
        key: 'whatsapp',
        whatsapp: {
          enabled: false,
          accessToken: '',
          phoneNumberId: '',
          businessPhone: '',
          orderReceivedTemplate: 'Order #{order_id} received! Thank you {customer_name}. We will contact you soon.',
          orderPreparingTemplate: 'Your order #{order_id} is now being prepared.',
          orderDeliveredTemplate: 'Your order #{order_id} has been delivered! Thank you for shopping with us.'
        }
      })
      await setting.save()
    }
    res.json(setting.whatsapp)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/settings/whatsapp', async (req, res) => {
  try {
    const whatsappData = req.body
    let setting = await Settings.findOne({ key: 'whatsapp' })

    if (!setting) {
      setting = new Settings({ key: 'whatsapp', whatsapp: whatsappData })
    } else {
      setting.whatsapp = whatsappData
    }

    await setting.save()
    res.json(setting.whatsapp)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ==================== ORDERS ROUTES ====================

// In-memory orders storage (can be moved to MongoDB later)
let orders = []

// GET all orders
app.get('/api/orders', (req, res) => {
  res.json(orders)
})

// POST create order
app.post('/api/orders', (req, res) => {
  try {
    const order = {
      ...req.body,
      id: require('crypto').randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    orders.push(order)
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update order status
app.put('/api/orders/:id', (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const orderIndex = orders.findIndex(o => o.id === id)

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' })
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    }
    res.json(orders[orderIndex])
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
