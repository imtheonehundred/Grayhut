import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function ProductsPage() {
  const { category } = useParams();
  const { perfumes } = useData();
  const { lang } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useMemo(() => {
    if (category && category !== 'all') {
      setFilteredProducts(perfumes.filter(p => p.category === category));
    } else {
      setFilteredProducts(perfumes);
    }
  }, [perfumes, category]);

  const handleFilter = (products) => {
    setFilteredProducts(products);
  };

  const getCategoryTitle = () => {
    switch(category) {
      case 'makeup': return t('makeup', lang);
      case 'skincare': return t('skincare', lang);
      case 'hair': return t('hair', lang);
      case 'fragrance': return t('fragrance', lang);
      case 'body': return t('body', lang);
      default: return t('allProducts', lang);
    }
  };

  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header - Clean Sephora Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-4">
            {getCategoryTitle()}
          </h1>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter products={category && category !== 'all' ? perfumes.filter(p => p.category === category) : perfumes} onFilter={handleFilter} />
        </div>

        {/* Products Grid - Sephora Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
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

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <Link
            to="/"
            className="btn-secondary inline-block"
          >
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
