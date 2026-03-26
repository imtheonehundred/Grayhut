import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function SearchFilter({ products, onFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    gender: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'men', label: 'For Him' },
    { value: 'women', label: 'For Her' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'arabian', label: 'Arabian' },
    { value: 'luxury', label: 'Luxury Exclusive' },
  ];

  const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'unisex', label: 'Unisex' },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-200', label: 'Under $200' },
    { value: '200-300', label: '$200 - $300' },
    { value: '300-500', label: '$300 - $500' },
    { value: '500+', label: '$500+' },
  ];

  const sortOptions = [
    { value: 'default', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
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

    // Gender
    if (filters.gender !== 'all') {
      filtered = filtered.filter((p) => p.gender === filters.gender);
    }

    // Price Range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (filters.priceRange === '500+') {
        filtered = filtered.filter((p) => p.price >= 500);
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
      gender: 'all',
      priceRange: 'all',
      sortBy: 'default',
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.gender !== 'all' ||
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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search fragrances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors"
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
          <span>Filters</span>
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
                    Category
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

                {/* Gender */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full p-3 bg-primary border border-white/10 text-white focus:border-accent focus:outline-none"
                  >
                    {genderOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 tracking-wider uppercase">
                    Price Range
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
                    Sort By
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
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Button */}
      <div className="flex justify-end">
        <button onClick={applyFilters} className="btn-secondary">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
