import { motion } from 'framer-motion';
import { Award, Heart, Sparkles } from 'lucide-react';

export default function AboutBrand() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
                alt="Perfume Crafting"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 lg:right-8 bg-surface p-6 border border-accent/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
            >
              <p className="font-playfair text-4xl font-semibold gold-text">130+</p>
              <p className="text-gray-400 text-sm tracking-wider">Years of Excellence</p>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/40" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-accent/40" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Label */}
            <p className="text-accent tracking-[0.3em] uppercase text-sm mb-4">
              Our Heritage
            </p>

            {/* Title */}
            <h2 className="section-title text-white mb-8">
              A Legacy of
              <br />
              <span className="gold-text">Timeless Elegance</span>
            </h2>

            {/* Gold Line */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-accent to-transparent mb-8" />

            {/* Story */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="font-cormorant text-xl italic text-white">
                "Since 1895, NOIR ESSENCE has been the epitome of luxury perfumery,
                crafting scents that transcend time and capture the essence of
                life's most precious moments."
              </p>
              <p>
                Our master perfumers source the rarest ingredients from across the globe—
                Bulgarian roses plucked at dawn, Arabian oud aged for decades, and
                Calabrian bergamot kissed by Mediterranean sun.
              </p>
              <p>
                Each fragrance is a masterpiece, meticulously blended using
                time-honored techniques passed down through five generations of
                master perfumers. We create scents that don't just smell extraordinary—
                they tell a story, evoke emotions, and become an extension of who you are.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { icon: Award, label: 'Premium Quality', value: '100%' },
                { icon: Heart, label: 'Happy Clients', value: '50K+' },
                { icon: Sparkles, label: 'Unique Scents', value: '85+' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <feature.icon size={24} className="text-accent mx-auto mb-2" />
                  <p className="font-playfair text-2xl font-semibold text-white">
                    {feature.value}
                  </p>
                  <p className="text-xs text-gray-500 tracking-wider uppercase">
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
