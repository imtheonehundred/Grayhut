import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function SearchFilter({ products, onFilter }) {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });

  const sortOptions = [
    { value: 'default', label: lang === 'ar' ? 'مميز' : 'Featured' },
    { value: 'price-low', label: lang === 'ar' ? 'السعر للأقل' : 'Price: Low' },
    { value: 'price-high', label: lang === 'ar' ? 'السعر للأعلى' : 'Price: High' },
    { value: 'name', label: lang === 'ar' ? 'الاسم' : 'Name' },
  ];

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (filters.priceRange === '100000+') {
        filtered = filtered.filter((p) => p.price >= 100000);
      } else if (max) {
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      }
    }

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
  }, [products, searchQuery, filters, onFilter]);

  // Apply filters when state changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: 'all', type: 'all', priceRange: 'all', sortBy: 'default' });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.category !== 'all' || filters.type !== 'all' || filters.priceRange !== 'all' || filters.sortBy !== 'default' || searchQuery;

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-500`} />
          <input
            type="text"
            placeholder={t('searchProducts', lang)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors text-sm`}
          />
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 text-gray-400 hover:text-accent transition-colors text-sm flex items-center gap-2"
          >
            <X size={16} />
            {lang === 'ar' ? 'مسح' : 'Clear'}
          </button>
        )}
      </div>
    </div>
  );
}
