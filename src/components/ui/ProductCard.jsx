import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { formatPriceIQD } from '../../lib/utils';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card Container */}
      <div
        className={`relative bg-surface rounded-sm overflow-hidden transition-all duration-500 ${
          isHovered
            ? 'shadow-[0_0_50px_rgba(212,175,55,0.2)]'
            : 'shadow-lg'
        }`}
      >
        {/* Image Container - Mobile Responsive */}
        <div className="relative h-40 sm:h-56 md:h-72 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-60'
            }`}
          />

          {/* Badges */}
          <div className="absolute top-4 start-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold tracking-wider">
                {t('new', lang)}
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-secondary text-white text-xs font-semibold tracking-wider">
                {t('sale', lang)}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 end-4 flex flex-col gap-2"
          >
            <button className="p-3 bg-surface/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-accent hover:bg-surface transition-colors">
              <Eye size={18} strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 30
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 start-4 end-4"
          >
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold tracking-wider transition-all duration-300 ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-accent text-primary hover:bg-yellow-400'
              }`}
            >
              {isAdded ? (
                t('success', lang)
              ) : (
                <>
                  <ShoppingBag size={16} />
                  {t('addToCart', lang)}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Product Info - Mobile Responsive */}
        <div className="p-3 sm:p-4">
          {/* Brand */}
          <p className="text-[10px] sm:text-xs text-gray-500 tracking-widest uppercase mb-1">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="font-playfair text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-accent transition-colors truncate">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-400 mb-3 sm:mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="gold-text font-semibold text-sm sm:text-base">
              {formatPriceIQD(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-xs sm:text-sm">
                {formatPriceIQD(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Gold Border on Hover */}
        <div
          className={`absolute inset-0 border-2 pointer-events-none transition-all duration-500 ${
            isHovered ? 'border-accent/50' : 'border-transparent'
          }`}
        />
      </div>
    </motion.div>
  );
}
