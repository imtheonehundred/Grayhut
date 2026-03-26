import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result.success) {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-semibold tracking-wider">
            <span className="gold-text">Gray</span>
            <span className="text-white">Hut</span>
          </h1>
          <p className="text-gray-500 tracking-widest uppercase text-sm mt-2">
            لوحة التحكم
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-surface border border-white/10 p-10">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400"
            >
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary border border-white/10 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none transition-colors"
                placeholder="admin@grayhut.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary border border-white/10 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-accent via-yellow-500 to-accent text-primary font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          GrayHut Admin Portal
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-surface/50 border border-white/5 text-center">
          <p className="text-gray-500 text-xs mb-2">Demo Credentials</p>
          <p className="text-gray-400 text-sm">admin@grayhut.com / admin123</p>
        </div>
      </motion.div>
    </div>
  )
}
