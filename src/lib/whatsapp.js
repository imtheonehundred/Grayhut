// WhatsApp Cloud API integration
// Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api

const WHATSAPP_API_VERSION = 'v18.0'

/**
 * Send WhatsApp message using Cloud API
 * @param {Object} params
 * @param {string} params.accessToken - WhatsApp Access Token
 * @param {string} params.phoneNumberId - Phone Number ID from WhatsApp Business
 * @param {string} params.customerPhone - Customer's WhatsApp number (with country code)
 * @param {string} params.message - Message template with variables replaced
 * @returns {Promise<Object>} - API response
 */
export async function sendWhatsAppMessage({ accessToken, phoneNumberId, customerPhone, message }) {
  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`

  const payload = {
    messaging_product: 'whatsapp',
    to: customerPhone,
    type: 'text',
    text: {
      preview_url: false,
      body: message
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to send WhatsApp message')
  }

  return data
}

/**
 * Format phone number for WhatsApp (ensure it has country code)
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone with country code
 */
export function formatWhatsAppPhone(phone) {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '')

  // If starts with 0, assume local Iraq number and add 964
  if (digits.startsWith('0')) {
    digits = '964' + digits.substring(1)
  }

  // Add + if not present
  if (!digits.startsWith('+')) {
    digits = '+' + digits
  }

  return digits
}

/**
 * Replace template variables in message
 * @param {string} template - Message template
 * @param {Object} vars - Variables to replace
 * @returns {string} - Formatted message
 */
export function formatMessageTemplate(template, vars) {
  let message = template
  for (const [key, value] of Object.entries(vars)) {
    message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }
  return message
}

/**
 * Send order notification via WhatsApp
 * @param {Object} params
 * @param {Object} params.settings - WhatsApp settings from admin
 * @param {Object} params.order - Order object
 * @param {string} params.status - Order status: 'received', 'preparing', 'delivered'
 * @returns {Promise<Object|null>} - API response or null if disabled/error
 */
export async function sendOrderWhatsApp({ settings, order, status }) {
  if (!settings?.enabled || !settings?.accessToken || !settings?.phoneNumberId) {
    console.log('WhatsApp notifications disabled or not configured')
    return null
  }

  try {
    const templates = {
      received: settings.orderReceivedTemplate,
      preparing: settings.orderPreparingTemplate,
      delivered: settings.orderDeliveredTemplate
    }

    const template = templates[status]
    if (!template) {
      console.error(`Unknown order status: ${status}`)
      return null
    }

    // Get short order ID (last 6 characters)
    const shortOrderId = order.id.substring(order.id.length - 6).toUpperCase()

    const message = formatMessageTemplate(template, {
      order_id: shortOrderId,
      customer_name: order.customerInfo?.name || 'Customer'
    })

    const customerPhone = formatWhatsAppPhone(order.customerInfo?.phone || '')

    if (!customerPhone || customerPhone.length < 10) {
      console.error('Invalid customer phone number')
      return null
    }

    const result = await sendWhatsAppMessage({
      accessToken: settings.accessToken,
      phoneNumberId: settings.phoneNumberId,
      customerPhone,
      message
    })

    console.log('WhatsApp message sent successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error)
    return null
  }
}
