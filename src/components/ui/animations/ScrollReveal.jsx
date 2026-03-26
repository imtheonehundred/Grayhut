import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// Staggered children reveal
export function StaggerReveal({ children, className = '', delay = 0, stagger = 0.1, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

// Single item reveal
export function RevealItem({ children, className = '', delay = 0, direction = 'up', blur = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: blur ? 'blur(10px)' : 'blur(0px)'
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
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

// Horizontal slide reveal
export function HorizontalReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 1,
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

// Vertical clip reveal (like a curtain lifting)
export function ClipReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const clipPaths = {
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction], opacity: 0 }}
      animate={isInView ? {
        clipPath: 'inset(0% 0 0 0)',
        opacity: 1,
        transition: {
          duration: 1,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      } : {}}
      className={className}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}

// Scale burst reveal
export function ScaleReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={isInView ? {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
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

// Smooth fade in on scroll
export function FadeOnScroll({ children, className = '', start = 'top 80%', end = 'top 20%' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [start, end]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50])

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}

// Parallax item on scroll
export function ParallaxItem({ children, className = '', speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// Main wrapper component
export default function ScrollReveal({
  children,
  type = 'fade',
  className = '',
  delay = 0,
  stagger = 0.1,
  direction = 'up',
  blur = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const directions = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 }
  }

  const variants = {
    fade: {
      hidden: { opacity: 0, ...directions[direction], filter: blur ? 'blur(10px)' : 'blur(0px)' },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9, filter: blur ? 'blur(8px)' : 'blur(0px)' },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    clip: {
      hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
      visible: {
        clipPath: 'inset(0% 0 0 0)',
        opacity: 1,
        transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[type]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
