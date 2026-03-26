import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';
import { ScrollReveal, StaggerReveal, FadeUp } from '../ui/animations';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const { perfumes } = useData();
  const { lang, dir } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState(perfumes);

  useMemo(() => {
    setFilteredProducts(perfumes);
  }, [perfumes]);

  const handleFilter = (products) => {
    setFilteredProducts(products);
  };

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewAllProducts = () => {
    navigate('/category/all');
  };

  return (
    <section id="featured" className="py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Cinematic Reveal */}
        <ScrollReveal type="blur" className="text-center mb-16">
          <FadeUp blur delay={0}>
            <p className="text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
              {t('heroPreTitle', lang)}
            </p>
          </FadeUp>

          <FadeUp blur delay={0.15}>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              <span className="gold-text">{t('heroTitle1', lang)}</span>{' '}
              <span className="text-white">{t('heroTitle2', lang)}</span>
            </h2>
          </FadeUp>

          <FadeUp blur delay={0.3}>
            <div className="flex items-center justify-center gap-4">
              <motion.div
                className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.div
                className="w-3 h-3 border border-accent rotate-45"
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.div
                className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </FadeUp>
        </ScrollReveal>

        {/* Search & Filter */}
        <ScrollReveal type="fade" delay={0.2}>
          <div className="mb-12">
            <SearchFilter products={perfumes} onFilter={handleFilter} />
          </div>
        </ScrollReveal>

        {/* Products Grid with Stagger Animation */}
        <StaggerReveal direction="up" stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </StaggerReveal>

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

        {/* View All Button */}
        <ScrollReveal type="fade" delay={0.3}>
          <div className="text-center mt-16">
            <motion.button
              onClick={viewAllProducts}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('viewAll', lang)}
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
