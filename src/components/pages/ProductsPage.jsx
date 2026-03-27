import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { perfumes, loading } = useData();
  const { lang } = useLanguage();
  const [searchFiltered, setSearchFiltered] = useState(null);

  // Reset search when category changes
  useEffect(() => {
    setSearchFiltered(null);
  }, [category]);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  // Compute filtered products directly from perfumes and category - NO stale state
  const displayedProducts = useMemo(() => {
    // Start with all perfumes (or filtered by category)
    let products = category && category !== 'all'
      ? perfumes.filter(p => p.category === category)
      : perfumes;

    // Apply search filter if it exists
    if (searchFiltered !== null) {
      products = searchFiltered;
    }

    return products;
  }, [category, perfumes, searchFiltered]);

  const handleFilter = (products) => {
    setSearchFiltered(products);
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-2">
            {getCategoryTitle()}
          </h1>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter
            products={category && category !== 'all'
              ? perfumes.filter(p => p.category === category)
              : perfumes}
            onFilter={handleFilter}
          />
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
          <div className="text-center py-20">
            <p className="text-gray-400 font-playfair text-lg">
              {t('noProducts', lang)}
            </p>
          </div>
        )}

        {/* Back Link */}
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
