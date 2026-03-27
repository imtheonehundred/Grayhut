import { useNavigate, useLocation } from 'react-router-dom';
import { countdownDate, products } from '../../data/products';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../ui/ProductCard';
import { Gift } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function SpecialOffer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const offerProducts = products.filter((p) => p.originalPrice);

  return (
    <section id="offer" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white">
            {t('specialOffers', lang)}
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-accent" />
            <span className="text-gray-400 text-xs tracking-wider uppercase">
              {lang === 'ar' ? 'ينتهي العرض خلال' : 'Offer Ends In'}
            </span>
          </div>
          <CountdownTimer targetDate={countdownDate} />
        </div>

        {/* Offer Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {offerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/#offer');
              }
            }}
            className="px-8 py-3 bg-accent text-primary text-xs tracking-widest uppercase hover:bg-yellow-400 transition-colors font-semibold"
          >
            {t('shopAllOffers', lang)}
          </button>
        </div>
      </div>
    </section>
  );
}
