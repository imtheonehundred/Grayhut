import { motion } from 'framer-motion';
import { countdownDate, products } from '../../data/products';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../ui/ProductCard';
import { Gift } from 'lucide-react';

export default function SpecialOffer() {
  const offerProducts = products.filter((p) => p.originalPrice);

  return (
    <section id="offer" className="py-24 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Label */}
          <p className="text-accent tracking-[0.3em] uppercase text-sm mb-4">
            Limited Time
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            Special <span className="gold-text">Offers</span>
          </h2>

          {/* Gold Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gift size={24} className="text-accent" />
            <span className="text-gray-400 tracking-widest uppercase text-sm">
              Offer Ends In
            </span>
          </div>
          <CountdownTimer targetDate={countdownDate} />
        </motion.div>

        {/* Offer Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="btn-primary">
            Shop All Offers
          </button>
        </motion.div>
      </div>
    </section>
  );
}
