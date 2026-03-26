import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

export default function ParallaxSection({
  children,
  backgroundImage,
  foregroundImage,
  className = '',
  strength = 0.5,
  showDepthLayers = true
}) {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth spring for luxurious feel
  const springConfig = { damping: 25, stiffness: 100 }

  // Parallax transforms - background moves slower
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', `${30 * strength}%`]),
    springConfig
  )

  // Midground parallax
  const midgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', `${15 * strength}%`]),
    springConfig
  )

  // Foreground parallax (moves faster)
  const foregroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', `${-10 * strength}%`]),
    springConfig
  )

  // Text fades in as you scroll
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.3, 0.5], ['30px', '0px'])

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Layer */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: isMobile ? 0 : backgroundY,
            willChange: 'transform'
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: 'brightness(0.4) saturate(1.2)'
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
        </motion.div>
      )}

      {/* Midground Layer (smoke/glow effect) */}
      {showDepthLayers && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            y: isMobile ? 0 : midgroundY,
            willChange: 'transform'
          }}
        >
          {/* Subtle radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-maroon/20 via-transparent to-transparent" />
        </motion.div>
      )}

      {/* Content Layer */}
      <motion.div
        className="relative z-20"
        style={{
          opacity: isMobile ? 1 : textOpacity,
          y: isMobile ? 0 : textY
        }}
      >
        {children}
      </motion.div>

      {/* Foreground Layer (subtle overlay) */}
      {foregroundImage && showDepthLayers && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            y: isMobile ? 0 : foregroundY,
            willChange: 'transform'
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url(${foregroundImage})`
            }}
          />
        </motion.div>
      )}

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
