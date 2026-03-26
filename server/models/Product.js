const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    default: null
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['luxury', 'women', 'men', 'unisex', 'arabian', 'lips', 'eyes', 'face', 'complexion'],
    default: 'luxury'
  },
  type: {
    type: String,
    default: 'perfume'
  },
  brand: {
    type: String,
    default: 'NOIR ESSENCE'
  },
  description: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    default: 'unisex'
  },
  volume: {
    type: String,
    default: '50ml'
  },
  notes: {
    top: String,
    middle: String,
    base: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  finish: {
    type: String,
    default: 'matte'
  },
  coverage: {
    type: String,
    default: 'medium'
  },
  productType: {
    type: String,
    enum: ['perfume', 'makeup'],
    default: 'perfume'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
