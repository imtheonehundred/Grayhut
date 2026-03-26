require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Product = require('./models/Product')

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
