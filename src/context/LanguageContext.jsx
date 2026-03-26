import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grayhut-lang')
      return saved || 'ar'
    }
    return 'ar'
  })

  const [dir, setDir] = useState('rtl')

  useEffect(() => {
    const newDir = lang === 'ar' ? 'rtl' : 'ltr'
    setDir(newDir)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = newDir
      document.body.style.direction = newDir
      document.body.setAttribute('dir', newDir)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('grayhut-lang', lang)
    }
  }, [lang])

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar')
  }

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
