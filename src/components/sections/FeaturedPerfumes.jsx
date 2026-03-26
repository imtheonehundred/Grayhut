import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function FeaturedPerfumes() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (products) => {
    setFilteredProducts(products);
  };

  return (
    <section id="featured" className="py-24 lg:py-32 px-6 lg:px-12">
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
            Curated Collection
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            Featured <span className="gold-text">Fragrances</span>
          </h2>

          {/* Gold Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
        </motion.div>

        {/* Search & Filter */}
        <SearchFilter products={products} onFilter={handleFilter} />

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 font-playfair text-xl">
              No fragrances match your criteria
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Try adjusting your filters
            </p>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="btn-secondary">
            View All Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
}
