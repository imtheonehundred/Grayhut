const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function fetchAPI(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API Error')
  }

  return data
}

// Products
export const api = {
  // Get all products
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return fetchAPI(`/products${queryString ? `?${queryString}` : ''}`)
  },

  // Get single product
  getProduct: async (id) => {
    return fetchAPI(`/products/${id}`)
  },

  // Create product
  createProduct: async (productData) => {
    return fetchAPI('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    })
  },

  // Update product
  updateProduct: async (id, productData) => {
    return fetchAPI(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    })
  },

  // Delete product
  deleteProduct: async (id) => {
    return fetchAPI(`/products/${id}`, {
      method: 'DELETE'
    })
  }
}

export default api
