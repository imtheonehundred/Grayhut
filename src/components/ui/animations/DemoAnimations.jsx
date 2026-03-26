import { motion } from 'framer-motion'
import {
  ParallaxSection,
  AnimatedText,
  AnimatedChars,
  AnimatedWords,
  AnimatedLine,
  FadeUp,
  ScaleReveal,
  ScrollReveal,
  StaggerReveal,
  CinematicSection,
  CinematicCurtain,
  BlurClear,
  CinematicBackground,
  MouseTilt,
  TiltCard,
  CursorGlow
} from './index'

// Demo showcase of all animation components
export default function DemoAnimations() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cursor glow effect - luxury gold */}
      <CursorGlow color="#d4af37" size={300} />

      {/* Hero Section with Parallax */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1920"
        className="min-h-screen flex items-center justify-center"
        strength={0.4}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <AnimatedChars
            text="NOIR ESSENCE"
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            stagger={0.03}
          />
          <AnimatedWords
            text="The Art of Fragrance"
            className="text-xl md:text-2xl text-gray-300 tracking-widest uppercase"
            stagger={0.1}
          />
        </div>
      </ParallaxSection>

      {/* Fade Up Animation Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <FadeUp blur className="mb-16">
            <span className="text-accent text-sm tracking-widest uppercase">Signature Collection</span>
            <h2 className="font-playfair text-4xl md:text-6xl text-white mt-4">
              Crafted with Passion
            </h2>
          </FadeUp>

          <StaggerReveal direction="up" stagger={0.15} className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Luxury Perfumes', desc: 'Timeless fragrances for the discerning' },
              { title: 'Premium Makeup', desc: 'Artistry meets elegance' },
              { title: 'Exclusive Collections', desc: 'Limited edition pieces' },
              { title: 'Timeless Beauty', desc: 'Classic sophistication' }
            ].map((item, i) => (
              <ScaleReveal key={i} delay={i * 0.1}>
                <div className="bg-surface border border-white/5 p-8 hover:border-accent/30 transition-colors">
                  <h3 className="font-playfair text-2xl text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </ScaleReveal>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Cinematic Section with Blur-to-Clear */}
      <CinematicSection
        backgroundImage="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1920"
        className="min-h-[80vh] flex items-center"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedWords
            text="Discover Your Signature"
            className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-8"
            stagger={0.08}
          />
          <FadeUp delay={0.5} blur={false}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the essence of luxury with our exclusive collection of perfumes and cosmetics.
            </p>
          </FadeUp>
        </div>
      </CinematicSection>

      {/* Scroll Reveal Grid */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal type="fade" className="text-center mb-16">
            <span className="text-accent text-sm tracking-widest uppercase">Our Philosophy</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-4">
              Elegance in Every Detail
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Heritage', text: 'A legacy of excellence since 1895' },
              { num: '02', title: 'Craftsmanship', text: 'Meticulously handcrafted with care' },
              { num: '03', title: 'Innovation', text: 'Pushing boundaries of beauty' }
            ].map((item, i) => (
              <ScrollReveal key={i} type="scale" delay={i * 0.15} className="text-center">
                <div className="bg-surface border border-white/5 p-8 h-full hover:border-accent/30 transition-colors">
                  <span className="text-accent/50 text-6xl font-playfair">{item.num}</span>
                  <h3 className="font-playfair text-2xl text-white mt-4 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tilt Card Section */}
      <section className="py-32 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal type="blur">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-16">
              Interactive Experience
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal type="fade" delay={0.2}>
              <TiltCard className="bg-surface border border-white/10 p-8">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600"
                  alt="Perfume"
                  className="w-full h-64 object-cover mb-6"
                />
                <h3 className="font-playfair text-2xl text-white mb-2">Midnight Rose</h3>
                <p className="text-gray-400">A captivating blend of rare florals</p>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal type="fade" delay={0.4}>
              <TiltCard className="bg-surface border border-white/10 p-8">
                <img
                  src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600"
                  alt="Perfume"
                  className="w-full h-64 object-cover mb-6"
                />
                <h3 className="font-playfair text-2xl text-white mb-2">Noir Oud</h3>
                <p className="text-gray-400">Rich, deep, unforgettable</p>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cinematic Background with Parallax */}
      <CinematicBackground
        backgroundImage="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1920"
        className="min-h-[60vh] flex items-center"
      >
        <BlurClear className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-accent text-sm tracking-widest uppercase">New Collection</span>
          <h2 className="font-playfair text-4xl md:text-6xl text-white mt-4 mb-8">
            The Golden Hour
          </h2>
          <FadeUp delay={0.3} blur={false}>
            <p className="text-xl text-gray-300">
              Inspired by the magical light of sunset
            </p>
          </FadeUp>
        </BlurClear>
      </CinematicBackground>

      {/* Animated Line Reveals */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-4xl mx-auto space-y-24">
          <AnimatedLine delay={0}>
            <span className="text-accent text-sm tracking-widest uppercase">Our Story</span>
            <h2 className="font-playfair text-4xl md:text-6xl text-white mt-4">
              Where Artistry Meets Science
            </h2>
          </AnimatedLine>

          <AnimatedLine delay={0.2}>
            <p className="text-xl text-gray-300 max-w-2xl">
              Every fragrance is a masterpiece, carefully composed by master perfumers
              with decades of expertise. We blend traditional craftsmanship with
              innovative techniques to create scents that become part of your identity.
            </p>
          </AnimatedLine>

          <AnimatedLine delay={0.4}>
            <div className="flex gap-8">
              <div>
                <span className="text-accent text-5xl font-playfair">127</span>
                <p className="text-gray-400 mt-2">Years of Heritage</p>
              </div>
              <div>
                <span className="text-accent text-5xl font-playfair">500+</span>
                <p className="text-gray-400 mt-2">Unique Scents</p>
              </div>
              <div>
                <span className="text-accent text-5xl font-playfair">50M+</span>
                <p className="text-gray-400 mt-2">Happy Clients</p>
              </div>
            </div>
          </AnimatedLine>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-4 bg-surface border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl gold-text mb-4">NOIR ESSENCE</h2>
          <p className="text-gray-400">The Art of Fragrance • Est. 1895</p>
        </div>
      </section>
    </div>
  )
}
