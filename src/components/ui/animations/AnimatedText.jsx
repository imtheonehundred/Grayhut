import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1
    }
  }
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Line-by-line reveal
export function AnimatedLine({ children, className = '', delay = 0, blur = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
        filter: blur ? 'blur(12px)' : 'blur(0px)'
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
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

// Character-by-character reveal with blur effect
export function AnimatedChars({ text, className = '', stagger = 0.02, blur = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const words = text.split(' ')

  return (
    <motion.div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-2">
          {word.split('').map((char, charIndex) => {
            const globalIndex = words.slice(0, wordIndex).join('').length + charIndex
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={letterVariants}
                custom={globalIndex}
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center bottom'
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.div>
  )
}

// Word-by-word reveal with blur
export function AnimatedWords({ text, className = '', stagger = 0.1, blur = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const words = text.split(' ')

  return (
    <motion.div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={defaultVariants}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-2"
          style={{ perspective: '1000px' }}
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
            custom={index}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}

// Fade up reveal
export function FadeUp({ children, className = '', delay = 0, blur = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 60,
        filter: blur ? 'blur(10px)' : 'blur(0px)'
      }}
      animate={isInView ? {
        opacity: 1,
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

// Scale reveal
export function ScaleReveal({ children, className = '', delay = 0, blur = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.9,
        filter: blur ? 'blur(8px)' : 'blur(0px)'
      }}
      animate={isInView ? {
        opacity: 1,
        scale: 1,
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

// Main component for animated text blocks
export default function AnimatedText({
  children,
  type = 'fade', // 'fade', 'blur', 'chars', 'words', 'scale'
  className = '',
  stagger = 0.1,
  blur = true,
  delay = 0
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  const animations = {
    fade: {
      hidden: { opacity: 0, y: 60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    blur: {
      hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9, filter: blur ? 'blur(8px)' : 'blur(0px)' },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animations[type]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
