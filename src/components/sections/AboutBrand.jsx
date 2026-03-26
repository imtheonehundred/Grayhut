import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Award, Heart, Sparkles } from 'lucide-react'
import { ScrollReveal, AnimatedWords, FadeUp, CinematicSection } from '../ui/animations'

export default function AboutBrand() {
  const ref = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start']
  })

  // Parallax for image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="about" className="py-24 lg:py-32 px-4 md:px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side - Cinematic Reveal */}
          <ScrollReveal type="scale" delay={0.2} className="relative">
            {/* Main Image with parallax */}
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, willChange: 'transform' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
                  alt="Perfume Crafting"
                  className="w-full h-[120%] object-cover"
                />
              </motion.div>
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
            </div>

            {/* Floating Badge - Scale reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -bottom-6 -right-4 md:right-8 bg-surface/90 backdrop-blur-sm p-6 border border-accent/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
            >
              <p className="font-playfair text-4xl font-semibold gold-text">130+</p>
              <p className="text-gray-400 text-sm tracking-wider">Years of Excellence</p>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/40" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-accent/40" />
          </ScrollReveal>

          {/* Content Side */}
          <div className="relative">
            {/* Label */}
            <ScrollReveal type="blur" delay={0}>
              <p className="text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
                Our Heritage
              </p>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal type="blur" delay={0.1}>
              <AnimatedWords
                text="A Legacy of Timeless Elegance"
                className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 block"
                stagger={0.03}
              />
            </ScrollReveal>

            {/* Gold Line - Clip reveal */}
            <ScrollReveal type="clip" delay={0.3} direction="left">
              <div className="w-24 h-[2px] bg-gradient-to-r from-accent to-transparent mb-8" />
            </ScrollReveal>

            {/* Story */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <ScrollReveal type="blur" delay={0.3}>
                <p className="font-cormorant text-lg md:text-xl italic text-white">
                  "Since 1895, NOIR ESSENCE has been the epitome of luxury perfumery,
                  crafting scents that transcend time and capture the essence of
                  life's most precious moments."
                </p>
              </ScrollReveal>

              <ScrollReveal type="fade" delay={0.4}>
                <p>
                  Our master perfumers source the rarest ingredients from across the globe—
                  Bulgarian roses plucked at dawn, Arabian oud aged for decades, and
                  Calabrian bergamot kissed by Mediterranean sun.
                </p>
              </ScrollReveal>

              <ScrollReveal type="fade" delay={0.5}>
                <p>
                  Each fragrance is a masterpiece, meticulously blended using
                  time-honored techniques passed down through five generations of
                  master perfumers. We create scents that don't just smell extraordinary—
                  they tell a story, evoke emotions, and become an extension of who you are.
                </p>
              </ScrollReveal>
            </div>

            {/* Features - Staggered reveal */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { icon: Award, label: 'Premium Quality', value: '100%' },
                { icon: Heart, label: 'Happy Clients', value: '50K+' },
                { icon: Sparkles, label: 'Unique Scents', value: '85+' }
              ].map((feature, i) => (
                <ScrollReveal key={i} type="scale" delay={0.5 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="text-center group"
                  >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <feature.icon size={24} className="text-accent" />
                    </div>
                    <p className="font-playfair text-2xl md:text-3xl font-semibold text-white">
                      {feature.value}
                    </p>
                    <p className="text-xs text-gray-500 tracking-wider uppercase mt-1">
                      {feature.label}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
