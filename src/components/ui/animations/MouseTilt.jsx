import { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

// Mouse tilt effect for cards/images
export function TiltCard({ children, className = '', maxTilt = 10, speed = 0.5 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 25, stiffness: 200 }

  const rotateX = useSpring(
    useTransform(position.y, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(position.x, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig
  )

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setPosition({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'all 0.5s ease'
      }}
    >
      <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  )
}

// Parallax mouse movement for background elements
export function MouseParallax({ children, className = '', strength = 20 }) {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const x = mousePosition.x * strength
  const y = mousePosition.y * strength

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x, y }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic button effect
export function MagneticButton({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

// Floating element that follows mouse
export function FollowMouse({ children, className = '', offsetX = 0, offsetY = 0 }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX + offsetX, y: e.clientY + offsetY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [offsetX, offsetY])

  return (
    <motion.div
      className={className}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      style={{ pointerEvents: 'none' }}
    >
      {children}
    </motion.div>
  )
}

// Glow effect following cursor
export function CursorGlow({ color = '#d4af37', size = 200, className = '' }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 ${className}`}
      animate={{ x: position.x - size / 2, y: position.y - size / 2 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`
      }}
    />
  )
}

// Main component - combines mouse effects
export default function MouseTilt({
  children,
  className = '',
  tilt = true,
  parallax = false,
  magnetic = false,
  tiltStrength = { x: 10, y: 10 },
  parallaxStrength = 20
}) {
  const components = []

  let content = children

  if (magnetic) {
    content = <MagneticButton className={className}>{children}</MagneticButton>
  } else if (tilt) {
    content = (
      <TiltCard className={className} maxTilt={Math.max(tiltStrength.x, tiltStrength.y)}>
        {children}
      </TiltCard>
    )
  }

  if (parallax && !magnetic && !tilt) {
    content = <MouseParallax className={className} strength={parallaxStrength}>{children}</MouseParallax>
  }

  return content
}
