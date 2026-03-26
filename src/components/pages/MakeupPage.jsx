import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function MakeupPage() {
  const { makeup } = useData();
  const { lang } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState(makeup);

  useMemo(() => {
    setFilteredProducts(makeup);
  }, [makeup]);

  const handleFilter = (products) => {
    setFilteredProducts(products);
  };

  return (
    <section className="pt-32 pb-24 px-4 md:px-6 lg:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            {lang === 'ar' ? 'مجموعة كاملة' : 'Full Collection'}
          </p>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('makeup', lang)}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-12">
          <SearchFilter products={makeup} onFilter={handleFilter} />
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
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
              {t('noProducts', lang)}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
