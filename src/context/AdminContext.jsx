import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('grayhut-admin-user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('grayhut-admin-user', JSON.stringify(adminUser))
    } else {
      localStorage.removeItem('grayhut-admin-user')
    }
  }, [adminUser])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      // Demo authentication
      if (email === 'admin@grayhut.com' && password === 'admin123') {
        const user = {
          id: '1',
          email: 'admin@grayhut.com',
          name: 'Administrator',
          role: 'superadmin',
          lastLogin: new Date().toISOString()
        }
        setAdminUser(user)
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setAdminUser(null)
  }

  return (
    <AdminContext.Provider value={{
      adminUser,
      isLoading,
      error,
      login,
      logout,
      isAuthenticated: !!adminUser
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
