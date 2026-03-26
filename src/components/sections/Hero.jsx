import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-secondary/30" />

        {/* Video/Image Background */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920&q=80"
            alt="Luxury Perfume"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Smoke/Particle Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="smoke-1 absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-float" />
          <div className="smoke-2 absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Pre Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-accent tracking-[0.3em] uppercase text-sm md:text-base mb-6"
        >
          Est. 1895 • Paris
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 text-shadow"
        >
          Discover the
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-semibold mb-8"
        >
          <span className="gold-text">Essence</span>
          <span className="text-white"> of </span>
          <span className="gold-text">Luxury</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 italic"
        >
          Exquisite fragrances crafted from the world's finest ingredients.
          <br className="hidden md:block" />
          Each scent tells a story of elegance and refinement.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => scrollToSection('featured')}
            className="group relative px-12 py-5 overflow-hidden"
          >
            {/* Button Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-yellow-500 to-accent" />

            {/* Shine Animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Button Text */}
            <span className="relative text-primary font-semibold tracking-widest uppercase">
              Shop Now
            </span>
          </button>
        </motion.div>

        {/* Gold Lines Decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('featured')}
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase mb-2">
            Scroll
          </span>
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/30" />
    </section>
  );
}
