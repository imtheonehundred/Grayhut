import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'
import { DataProvider } from './context/DataContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeaturedProducts from './components/sections/FeaturedProducts'
import Categories from './components/sections/Categories'
import SpecialOffer from './components/sections/SpecialOffer'
import AboutBrand from './components/sections/AboutBrand'
import Testimonials from './components/sections/Testimonials'
import Newsletter from './components/sections/Newsletter'
import CartDrawer from './components/ui/CartDrawer'
import MakeupPage from './components/pages/MakeupPage'
import ProductsPage from './components/pages/ProductsPage'

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

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  return null
}

function ProductsPageWrapper() {
  const location = useLocation()
  return (
    <div key={location.pathname}>
      <Navbar />
      <main>
        <ProductsPage />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

function RootLayout() {
  return (
    <DataProvider>
      <CartProvider>
        <AdminProvider>
          <ScrollToTop />
          <Outlet />
        </AdminProvider>
      </CartProvider>
    </DataProvider>
  )
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <SpecialOffer />
        <AboutBrand />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

function MakeupRoute() {
  return (
    <>
      <Navbar />
      <main>
        <MakeupPage />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'makeup',
        element: <MakeupRoute />
      },
      {
        path: 'category/:category',
        element: <ProductsPageWrapper />
      },
      {
        path: 'admin',
        element: <Outlet />,
        children: [
          { index: true, element: <AdminLogin /> },
          {
            element: (
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            ),
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'products/perfumes', element: <PerfumeProducts /> },
              { path: 'products/makeup', element: <MakeupProducts /> },
              { path: 'categories', element: <CategoriesManagement /> },
              { path: 'testimonials', element: <TestimonialsManagement /> },
              { path: 'offers', element: <OffersManagement /> },
              { path: 'orders', element: <OrdersManagement /> },
              { path: 'settings', element: <SiteSettings /> }
            ]
          }
        ]
      }
    ]
  }
])
