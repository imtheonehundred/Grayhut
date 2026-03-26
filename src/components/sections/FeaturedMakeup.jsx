import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function FeaturedMakeup() {
  const { makeup } = useData();
  const [filteredProducts, setFilteredProducts] = useState(makeup);

  const handleFilter = (products) => {
    setFilteredProducts(products);
  };

  // Update filtered products when makeup changes
  useMemo(() => {
    setFilteredProducts(makeup);
  }, [makeup]);

  if (makeup.length === 0) return null;

  return (
    <section id="makeup" className="py-24 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
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
          <p className="text-purple-400 tracking-[0.3em] uppercase text-sm mb-4">
            New Collection
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            Luxury <span className="gold-text">Makeup</span>
          </h2>

          {/* Gold Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-400" />
            <div className="w-3 h-3 border border-purple-400 rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </motion.div>

        {/* Search & Filter */}
        <SearchFilter products={makeup} onFilter={handleFilter} />

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
              No makeup products match your criteria
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Add makeup products from the admin panel
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
          <button className="btn-secondary border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            View All Makeup
          </button>
        </motion.div>
      </div>
    </section>
  );
}
