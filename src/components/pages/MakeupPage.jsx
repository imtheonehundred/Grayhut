import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function MakeupPage() {
  const navigate = useNavigate();
  const { makeup } = useData();
  const { lang } = useLanguage();
  const [searchFiltered, setSearchFiltered] = useState(null);

  // Compute displayed products directly - NO stale state
  const displayedProducts = useMemo(() => {
    return searchFiltered !== null ? searchFiltered : makeup;
  }, [makeup, searchFiltered]);

  const handleFilter = (products) => {
    setSearchFiltered(products);
  };

  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-2">
            {t('makeup', lang)}
          </h1>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter products={makeup} onFilter={handleFilter} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-playfair text-lg">
              {t('noProducts', lang)}
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 border border-accent text-accent text-xs tracking-widest uppercase hover:bg-accent hover:text-primary transition-colors"
          >
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    </section>
  );
}
