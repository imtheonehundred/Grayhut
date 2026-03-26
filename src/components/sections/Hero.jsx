import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedChars, AnimatedWords } from '../ui/animations'

export default function Hero() {
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

  // Parallax for smoke effects
  const smoke1Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '20%']),
    springConfig
  )
  const smoke2Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
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
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920&q=80"
            alt="Luxury Perfume"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />
      </motion.div>

      {/* Parallax Smoke Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: smoke1Y }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-float" />
      </motion.div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: smoke2Y }}
      >
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: '2s' }}
        />
      </motion.div>

      {/* Additional floating particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '15%']) }}
      >
        <div
          className="absolute top-1/3 right-1/3 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[60px] animate-float"
          style={{ animationDelay: '1s' }}
        />
      </motion.div>

      {/* Content with fade on scroll */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          opacity: contentOpacity,
          y: contentY
        }}
      >
        {/* Pre Title */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-accent tracking-[0.4em] uppercase text-xs md:text-sm mb-8"
        >
          Est. 1895 • Paris
        </motion.p>

        {/* Main Title with character animation */}
        <div className="mb-8 overflow-hidden">
          <AnimatedChars
            text="Discover the"
            className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-white block"
            stagger={0.03}
          />
        </div>

        <div className="mb-16 overflow-hidden">
          <AnimatedWords
            text="Essence of Luxury"
            className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold"
            stagger={0.05}
          />
        </div>

        {/* Subtitle with fade up */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-cormorant text-lg md:text-2xl text-gray-300 max-w-3xl mb-16 italic leading-relaxed"
        >
          Exquisite fragrances crafted from the world's finest ingredients.
          <br className="hidden md:block" />
          Each scent tells a story of elegance and refinement.
        </motion.p>

        {/* CTA Button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            onClick={() => scrollToSection('featured')}
            className="group relative px-14 py-5 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-yellow-400 to-accent" />

            {/* Shine Animation */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            {/* Button Text */}
            <span className="relative text-primary font-semibold tracking-[0.2em] uppercase text-sm">
              Shop Now
            </span>
          </motion.button>
        </motion.div>

        {/* Gold Line Decoration */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isLoaded ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('featured')}
        >
          <span className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-3">
            Scroll
          </span>
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations with fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 w-12 md:w-20 h-12 md:h-20 border-l border-t border-accent/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.3, duration: 1 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 md:w-20 h-12 md:h-20 border-r border-t border-accent/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-12 md:w-20 h-12 md:h-20 border-l border-b border-accent/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 md:w-20 h-12 md:h-20 border-r border-b border-accent/40"
      />
    </section>
  )
}
