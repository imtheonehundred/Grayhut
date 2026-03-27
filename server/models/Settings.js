const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  whatsapp: {
    enabled: { type: Boolean, default: false },
    accessToken: { type: String, default: '' },
    phoneNumberId: { type: String, default: '' },
    businessPhone: { type: String, default: '' },
    orderReceivedTemplate: { type: String, default: 'Order #{order_id} received! Thank you {customer_name}. We will contact you soon.' },
    orderPreparingTemplate: { type: String, default: 'Your order #{order_id} is now being prepared.' },
    orderDeliveredTemplate: { type: String, default: 'Your order #{order_id} has been delivered! Thank you for shopping with us.' }
  }
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
