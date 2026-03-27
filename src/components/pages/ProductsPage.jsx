import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import ProductCard from '../ui/ProductCard';
import SearchFilter from '../ui/SearchFilter';

export default function ProductsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { perfumes } = useData();
  const { lang } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products based on category
  useEffect(() => {
    if (category && category !== 'all') {
      setFilteredProducts(perfumes.filter(p => p.category === category));
    } else {
      setFilteredProducts(perfumes);
    }
  }, [category, perfumes]);

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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-2">
            {getCategoryTitle()}
          </h1>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter
            products={category && category !== 'all' ? perfumes.filter(p => p.category === category) : perfumes}
            onFilter={handleFilter}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
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
