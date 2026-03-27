import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronRight, MessageCircle } from 'lucide-react'
import { useData } from '../../../context/DataContext'
import { sendOrderWhatsApp } from '../../../lib/whatsapp'

export default function OrdersManagement() {
  const { orders, updateOrderStatus, siteSettings } = useData()
  const [sendingWhatsApp, setSendingWhatsApp] = useState(null) // orderId being sent

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'amber' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'shipped', label: 'Shipped', color: 'purple' },
    { value: 'delivered', label: 'Delivered', color: 'emerald' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ]

  const getStatusColor = (status) => {
    const statusInfo = statusOptions.find(s => s.value === status)
    return statusInfo?.color || 'gray'
  }

  const handleStatusChange = async (orderId, newStatus) => {
    // Update order status first
    updateOrderStatus(orderId, newStatus)

    // Get the order
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    // Send WhatsApp notification for certain statuses
    const whatsappSettings = siteSettings?.whatsapp
    if (whatsappSettings?.enabled) {
      // Map our status to WhatsApp template status
      const whatsappStatusMap = {
        processing: 'preparing',
        delivered: 'delivered'
      }

      const whatsappStatus = whatsappStatusMap[newStatus]
      if (whatsappStatus) {
        setSendingWhatsApp(orderId)
        try {
          await sendOrderWhatsApp({ settings: whatsappSettings, order, status: whatsappStatus })
        } catch (error) {
          console.error('Failed to send WhatsApp notification:', error)
        }
        setSendingWhatsApp(null)
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} total orders</p>
      </motion.div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-surface border border-white/5 p-8 md:p-16 text-center rounded-xl"
        >
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-400 font-playfair text-lg">No orders yet</p>
          <p className="text-gray-600 text-sm mt-2">Orders will appear here when customers checkout</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface border border-white/5 rounded-xl p-4 md:hidden"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-xs font-mono">#{order.id.slice(0, 8)}</p>
                  <p className="text-white font-medium mt-1">{order.customerInfo?.name || 'Guest'}</p>
                  <p className="text-gray-500 text-xs">{order.customerInfo?.email || 'No email'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded bg-${getStatusColor(order.status)}-500/20 text-${getStatusColor(order.status)}-400 capitalize`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">{order.items?.length || 0} items</p>
                  <p className="gold-text font-semibold">${order.total}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-primary border border-white/10 px-2 py-1.5 text-white text-xs rounded-lg focus:border-accent/50 focus:outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Desktop Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden md:block bg-surface border border-white/5 overflow-hidden rounded-xl"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Order ID</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Customer</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Items</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Total</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Status</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Date</th>
                  <th className="text-left text-xs text-gray-500 tracking-widest uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm font-mono">#{order.id.slice(0, 8)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white">{order.customerInfo?.name || 'Guest'}</p>
                        <p className="text-gray-500 text-xs">{order.customerInfo?.email || 'No email'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="gold-text font-semibold">${order.total}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded bg-${getStatusColor(order.status)}-500/20 text-${getStatusColor(order.status)}-400 capitalize`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-primary border border-white/10 px-3 py-2 text-white text-sm focus:border-accent/50 focus:outline-none rounded-lg"
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </div>
  )
}
