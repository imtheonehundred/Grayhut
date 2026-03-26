import { motion } from 'framer-motion'
import {
  FlaskConical,
  Palette,
  ShoppingBag,
  Quote,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useData } from '../../../context/DataContext'

export default function Dashboard() {
  const { perfumes, makeup, orders, testimonials } = useData()

  const stats = [
    { label: 'Perfumes', value: perfumes.length, icon: FlaskConical, link: '/admin/products/perfumes', color: 'text-accent' },
    { label: 'Makeup', value: makeup.length, icon: Palette, link: '/admin/products/makeup', color: 'text-purple-400' },
    { label: 'Orders', value: orders.length, icon: ShoppingBag, link: '/admin/orders', color: 'text-emerald-400' },
    { label: 'Testimonials', value: testimonials.length, icon: Quote, link: '/admin/testimonials', color: 'text-amber-400' },
  ]

  const recentOrders = orders.slice(-5).reverse()
  const pendingOrders = orders.filter(o => o.status === 'pending').length

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Administrator</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="block bg-surface border border-white/5 p-4 md:p-6 hover:border-accent/30 transition-colors group rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">{stat.label}</p>
                  <p className={`font-playfair text-2xl md:text-4xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon size={20} className={`${stat.color} opacity-50 group-hover:opacity-100 transition-opacity mt-1`} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-lg text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-accent text-xs hover:underline">View All</Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingBag size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm">{order.customerInfo?.name || 'Guest'}</p>
                    <p className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="gold-text font-semibold text-sm">${order.total}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                      order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-white/5 p-4 md:p-6 rounded-xl"
        >
          <h2 className="font-playfair text-lg text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/products/perfumes" className="btn-secondary text-center py-3 text-sm">
              Add Perfume
            </Link>
            <Link to="/admin/products/makeup" className="btn-secondary text-center py-3 text-sm">
              Add Makeup
            </Link>
            <Link to="/admin/testimonials" className="btn-secondary text-center py-3 text-sm">
              Add Testimonial
            </Link>
            <Link to="/admin/offers" className="btn-secondary text-center py-3 text-sm">
              Manage Offers
            </Link>
          </div>

          {/* Alerts */}
          {pendingOrders > 0 && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-400 rounded-lg">
              <AlertCircle size={18} />
              <span className="text-xs">{pendingOrders} pending orders</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
