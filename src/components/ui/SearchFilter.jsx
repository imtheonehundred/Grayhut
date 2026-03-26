import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function SearchFilter({ products, onFilter }) {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });

  const categories = [
    { value: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { value: 'makeup', label: lang === 'ar' ? 'مكياج' : 'Makeup' },
    { value: 'skincare', label: lang === 'ar' ? 'عناية بالبشرة' : 'Skincare' },
    { value: 'hair', label: lang === 'ar' ? 'شعر' : 'Hair' },
    { value: 'fragrance', label: lang === 'ar' ? 'عطور' : 'Fragrance' },
    { value: 'body', label: lang === 'ar' ? 'جسم' : 'Body' },
  ];

  const types = [
    { value: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { value: 'lipstick', label: 'Lipstick' },
    { value: 'mascara', label: 'Mascara' },
    { value: 'eyeshadow', label: 'Eyeshadow' },
    { value: 'foundation', label: 'Foundation' },
    { value: 'serum', label: 'Serum' },
    { value: 'moisturizer', label: 'Moisturizer' },
    { value: 'shampoo', label: 'Shampoo' },
    { value: 'perfume', label: 'Perfume' },
  ];

  const priceRanges = [
    { value: 'all', label: lang === 'ar' ? 'الكل' : 'All Prices' },
    { value: '0-30000', label: lang === 'ar' ? 'أقل من 30,000 د.ع' : 'Under 30,000 IQD' },
    { value: '30000-60000', label: lang === 'ar' ? '30,000 - 60,000 د.ع' : '30,000 - 60,000 IQD' },
    { value: '60000-100000', label: lang === 'ar' ? '60,000 - 100,000 د.ع' : '60,000 - 100,000 IQD' },
    { value: '100000+', label: lang === 'ar' ? 'أكثر من 100,000 د.ع' : '100,000+ IQD' },
  ];

  const sortOptions = [
    { value: 'default', label: lang === 'ar' ? 'مميز' : 'Featured' },
    { value: 'price-low', label: lang === 'ar' ? 'السعر: الأقل للأعلى' : 'Price: Low to High' },
    { value: 'price-high', label: lang === 'ar' ? 'السعر: الأعلى للأقل' : 'Price: High to Low' },
    { value: 'name', label: lang === 'ar' ? 'الاسم أ-ي' : 'Name A-Z' },
  ];

  const applyFilters = () => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Type
    if (filters.type !== 'all') {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    // Price Range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (filters.priceRange === '100000+') {
        filtered = filtered.filter((p) => p.price >= 100000);
      } else if (max) {
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    onFilter(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      type: 'all',
      priceRange: 'all',
      sortBy: 'default',
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.sortBy !== 'default' ||
    searchQuery;

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            size={20}
            className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500`}
          />
          <input
            type="text"
            placeholder={t('searchProducts', lang)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors`}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-6 py-4 border transition-colors ${
            showFilters || hasActiveFilters
              ? 'border-accent text-accent'
              : 'border-white/10 text-gray-300 hover:border-accent hover:text-accent'
          }`}
        >
          <SlidersHorizontal size={20} />
          <span>{lang === 'ar' ? 'تصفية' : 'Filters'}</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-accent rounded-full" />
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-surface/50 border border-white/10 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    {t('category', lang)}
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-3 bg-primary border border-white/10 text-white focus:border-accent focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    {lang === 'ar' ? 'النوع' : 'Type'}
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full p-3 bg-primary border border-white/10 text-white focus:border-accent focus:outline-none"
                  >
                    {types.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    {t('price', lang)}
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full p-3 bg-primary border border-white/10 text-white focus:border-accent focus:outline-none"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    {lang === 'ar' ? 'ترتيب' : 'Sort By'}
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full p-3 bg-primary border border-white/10 text-white focus:border-accent focus:outline-none"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className={`mt-6 pt-6 border-t border-white/10 flex ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    <X size={16} />
                    {lang === 'ar' ? 'مسح الكل' : 'Clear All Filters'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Button */}
      <div className={`flex ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
        <button onClick={applyFilters} className="btn-secondary">
          {lang === 'ar' ? 'تطبيق' : 'Apply Filters'}
        </button>
      </div>
    </div>
  );
}
