import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'
import { DataProvider } from './context/DataContext'

// Public components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeaturedPerfumes from './components/sections/FeaturedPerfumes'
import FeaturedMakeup from './components/sections/FeaturedMakeup'
import Categories from './components/sections/Categories'
import SpecialOffer from './components/sections/SpecialOffer'
import AboutBrand from './components/sections/AboutBrand'
import Testimonials from './components/sections/Testimonials'
import Newsletter from './components/sections/Newsletter'
import CartDrawer from './components/ui/CartDrawer'

// Admin components
import AdminLogin from './components/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/pages/Dashboard'
import PerfumeProducts from './components/admin/pages/PerfumeProducts'
import MakeupProducts from './components/admin/pages/MakeupProducts'
import CategoriesManagement from './components/admin/pages/CategoriesManagement'
import TestimonialsManagement from './components/admin/pages/TestimonialsManagement'
import OffersManagement from './components/admin/pages/OffersManagement'
import OrdersManagement from './components/admin/pages/OrdersManagement'
import SiteSettings from './components/admin/pages/SiteSettings'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <AdminProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main>
                  <Hero />
                  <FeaturedPerfumes />
                  <FeaturedMakeup />
                  <Categories />
                  <SpecialOffer />
                  <AboutBrand />
                  <Testimonials />
                  <Newsletter />
                </main>
                <Footer />
                <CartDrawer />
              </>
            } />

            {/* Admin Login */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin Protected Routes with Layout */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products/perfumes" element={<PerfumeProducts />} />
              <Route path="products/makeup" element={<MakeupProducts />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="testimonials" element={<TestimonialsManagement />} />
              <Route path="offers" element={<OffersManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>
          </Routes>
        </AdminProvider>
      </CartProvider>
    </DataProvider>
  )
}

export default App
