// Perfume Product Schema
export const PerfumeProductSchema = {
  id: 'string',
  name: 'string',
  brand: 'string',
  price: 'number',
  originalPrice: 'number | null',
  image: 'string',
  category: 'string',
  gender: 'string',
  notes: {
    top: 'string',
    middle: 'string',
    base: 'string'
  },
  description: 'string',
  volume: 'string',
  inStock: 'boolean',
  isFeatured: 'boolean',
  isNew: 'boolean',
  createdAt: 'string',
  updatedAt: 'string'
}

// Makeup Product Schema
export const MakeupProductSchema = {
  id: 'string',
  name: 'string',
  brand: 'string',
  price: 'number',
  originalPrice: 'number | null',
  image: 'string',
  category: 'string',
  type: 'string',
  description: 'string',
  shades: [
    {
      id: 'string',
      name: 'string',
      hex: 'string',
      image: 'string'
    }
  ],
  finish: 'string',
  coverage: 'string',
  ingredients: 'string',
  inStock: 'boolean',
  isFeatured: 'boolean',
  isNew: 'boolean',
  createdAt: 'string',
  updatedAt: 'string'
}

// Category Schema
export const CategorySchema = {
  id: 'string',
  name: 'string',
  slug: 'string',
  type: 'string',
  image: 'string',
  description: 'string',
  isActive: 'boolean',
  order: 'number',
  createdAt: 'string',
  updatedAt: 'string'
}

// Testimonial Schema
export const TestimonialSchema = {
  id: 'string',
  name: 'string',
  title: 'string',
  image: 'string',
  rating: 'number',
  text: 'string',
  isActive: 'boolean',
  order: 'number',
  createdAt: 'string',
  updatedAt: 'string'
}

// Order Schema
export const OrderSchema = {
  id: 'string',
  items: 'array',
  customerInfo: {
    name: 'string',
    email: 'string',
    phone: 'string',
    address: {
      street: 'string',
      city: 'string',
      state: 'string',
      zip: 'string',
      country: 'string'
    }
  },
  subtotal: 'number',
  shipping: 'number',
  total: 'number',
  status: 'string',
  paymentMethod: 'string',
  notes: 'string',
  createdAt: 'string',
  updatedAt: 'string'
}

// Site Settings Schema
export const SiteSettingsSchema = {
  hero: {
    preTitle: 'string',
    titleLine1: 'string',
    titleLine2Part1: 'string',
    titleLine2Part2: 'string',
    titleLine3Part1: 'string',
    titleLine3Part2: 'string',
    subtitle: 'string',
    ctaText: 'string',
    backgroundImage: 'string'
  },
  about: {
    preTitle: 'string',
    title: 'string',
    quote: 'string',
    bodyParagraph1: 'string',
    bodyParagraph2: 'string',
    image: 'string',
    stats: 'array'
  },
  newsletter: {
    title: 'string',
    subtitle: 'string',
    placeholder: 'string',
    ctaText: 'string'
  },
  footer: {
    tagline: 'string',
    contactEmail: 'string',
    contactPhone: 'string',
    socialLinks: {
      instagram: 'string',
      facebook: 'string',
      twitter: 'string'
    }
  },
  updatedAt: 'string'
}

// Special Offer Schema
export const SpecialOfferSchema = {
  isActive: 'boolean',
  title: 'string',
  subtitle: 'string',
  countdownEndDate: 'string',
  products: 'array',
  discount: {
    type: 'string',
    value: 'number'
  },
  updatedAt: 'string'
}
