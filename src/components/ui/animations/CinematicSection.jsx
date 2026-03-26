import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

// Cinematic curtain effect
export function CinematicCurtain({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })

  const clipPaths = {
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)'
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ clipPath: clipPaths[direction], opacity: 0.5 }}
        animate={isInView ? {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          transition: {
            duration: 1.2,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }
        } : {}}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Blur-to-clear effect
export function BlurClear({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? {
        filter: 'blur(0px)',
        opacity: 1,
        transition: {
          duration: 1.2,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Gradient reveal
export function GradientReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{
        backgroundImage: 'linear-gradient(to right, transparent, transparent)',
        backgroundClip: 'text'
      }}
      animate={isInView ? {
        backgroundImage: 'linear-gradient(to right, #d4af37, #f0d875, #d4af37)',
        transition: {
          duration: 1.5,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Opacity split reveal (like a double exposure)
export function SplitReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? {
        opacity: 1,
        transition: {
          duration: 1,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      } : {}}
      className={className}
      style={{ mixBlendMode: 'difference' }}
    >
      {children}
    </motion.div>
  )
}

// Scale parallax background
export function CinematicBackground({ children, backgroundImage, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const springConfig = { damping: 30, stiffness: 100 }

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
    springConfig
  )

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y: backgroundY,
          opacity
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Full cinematic section with all effects
export function CinematicSection({
  children,
  backgroundImage,
  className = '',
  showCurtain = true,
  curtainDirection = 'up',
  showBlur = true,
  showParallax = true,
  parallaxStrength = 0.3,
  animated = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const springConfig = { damping: 25, stiffness: 100 }

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', `${40 * parallaxStrength}%`]),
    springConfig
  )

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], ['5%', '0%', '-5%']),
    springConfig
  )

  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  if (!animated) {
    return (
      <section ref={ref} className={`relative overflow-hidden ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      {backgroundImage && showParallax && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            y: backgroundY,
            filter: 'brightness(0.3) saturate(1.3)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
        </motion.div>
      )}

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-background/40 z-10" />

      {/* Curtain reveal */}
      {showCurtain && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ clipPath: curtainDirection === 'up' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }}
          animate={isInView ? {
            clipPath: 'inset(0% 0 0 0)',
            transition: {
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1]
            }
          } : {}}
        />
      )}

      {/* Content with parallax and fade */}
      <motion.div
        className="relative z-30"
        style={{
          y: showParallax ? contentY : 0,
          opacity: showBlur ? contentOpacity : 1
        }}
      >
        {children}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
    </section>
  )
}

// Default export is the same component
export default CinematicSection
