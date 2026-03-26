import { motion } from 'framer-motion';
import { categories } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import CategoryCard from '../ui/CategoryCard';

export default function Categories() {
  const { lang } = useLanguage();

  return (
    <section id="categories" className="py-24 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
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
            {t('exploreProducts', lang)}
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            {t('categoriesTitle', lang)} <span className="gold-text">{t('shopAndMore', lang)}</span>
          </h2>

          {/* Gold Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
