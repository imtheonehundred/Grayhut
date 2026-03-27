import { categories } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import CategoryCard from '../ui/CategoryCard';

export default function Categories() {
  const { lang } = useLanguage();

  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Clean */}
        <div className="text-center mb-8">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white">
            {t('categoriesTitle', lang)}
          </h2>
        </div>

        {/* Categories Grid - 3 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
