import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';
import { Loader2 } from 'lucide-react';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const { perfumes, loading } = useData();
  const { lang } = useLanguage();
  const [searchFiltered, setSearchFiltered] = useState(null);

  // Compute displayed products directly - NO stale state
  const displayedProducts = useMemo(() => {
    return searchFiltered !== null ? searchFiltered : perfumes;
  }, [perfumes, searchFiltered]);

  const handleFilter = (products) => {
    setSearchFiltered(products);
  };

  const viewAllProducts = () => {
    if (location.pathname === '/') {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#categories');
    }
  };

  return (
    <section id="featured" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white">
            {t('heroTitle1', lang)} {t('heroTitle2', lang)}
          </h2>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter products={perfumes} onFilter={handleFilter} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && displayedProducts.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 font-playfair text-lg">
              {t('noProducts', lang)}
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <button
            onClick={viewAllProducts}
            className="px-8 py-3 border border-accent text-accent text-xs tracking-widest uppercase hover:bg-accent hover:text-primary transition-colors"
          >
            {t('viewAll', lang)}
          </button>
        </div>
      </div>
    </section>
  );
}
