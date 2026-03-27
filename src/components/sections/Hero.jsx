import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../data/translations'

export default function Hero() {
  const { lang, dir } = useLanguage()
  const ref = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Smooth spring for luxurious parallax
  const springConfig = { damping: 30, stiffness: 100 }

  // Parallax for background image
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '40%']),
    springConfig
  )

  // Fade out content on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%'])

  // Scale effect for background
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          willChange: 'transform'
        }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-secondary/30" />

        {/* Main background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80"
            alt="Luxury Cosmetics"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content with fade on scroll */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-12"
        style={{
          opacity: contentOpacity,
          y: contentY
        }}
      >
        {/* Content Wrapper */}
        <div className="w-full max-w-3xl mx-auto">
          {/* Pre Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent tracking-[0.3em] uppercase text-xs mb-6"
          >
            {t('heroPreTitle', lang)}
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
          >
            <span className="gold-text">{t('heroTitle1', lang)}</span>{' '}
            <span className="text-white">{t('heroTitle2', lang)}</span>
          </motion.h1>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => scrollToSection('featured')}
              className="px-10 py-4 bg-accent text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('shopNow', lang)}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
