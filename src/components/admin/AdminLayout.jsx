import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FlaskConical,
  Palette,
  Tags,
  Quote,
  Percent,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products/perfumes', icon: FlaskConical, label: 'Perfumes' },
  { path: '/admin/products/makeup', icon: Palette, label: 'Makeup' },
  { path: '/admin/categories', icon: Tags, label: 'Categories' },
  { path: '/admin/testimonials', icon: Quote, label: 'Testimonials' },
  { path: '/admin/offers', icon: Percent, label: 'Offers' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products/perfumes': 'Perfumes',
  '/admin/products/makeup': 'Makeup',
  '/admin/categories': 'Categories',
  '/admin/testimonials': 'Testimonials',
  '/admin/offers': 'Special Offers',
  '/admin/orders': 'Orders',
  '/admin/settings': 'Site Settings',
}

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { adminUser, logout } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const currentTitle = pageTitles[location.pathname] || 'Admin'

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-72 bg-surface border-r border-white/5 z-50 flex flex-col md:hidden"
          >
            {/* Logo */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h1 className="font-playfair text-xl font-semibold">
                  <span className="gold-text">Gray</span>
                  <span className="text-white">Hut</span>
                </h1>
                <p className="text-xs text-gray-500 tracking-widest uppercase">Admin</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-accent/10 text-accent border-l-2 border-accent'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <item.icon size={20} strokeWidth={1.5} />
                      <span className="text-sm tracking-wider">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User & Logout */}
            <div className="p-4 border-t border-white/5">
              <div className="mb-3 px-4">
                <p className="text-sm text-white truncate">{adminUser?.name}</p>
                <p className="text-xs text-gray-500 truncate">{adminUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span className="text-sm tracking-wider">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-white/5 flex-col fixed h-full z-30">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <h1 className="font-playfair text-xl font-semibold">
            <span className="gold-text">NOIR</span>
            <span className="text-white"> ESSENCE</span>
          </h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent border-l-2 border-accent'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span className="text-sm tracking-wider uppercase">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="mb-3 px-4">
            <p className="text-sm text-white truncate">{adminUser?.name}</p>
            <p className="text-xs text-gray-500 truncate">{adminUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span className="text-sm tracking-wider uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-playfair text-lg text-white">{currentTitle}</h1>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
