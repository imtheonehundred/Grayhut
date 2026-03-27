import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const { lang, dir, toggleLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinksAr = [
    { name: 'الرئيسية', to: '/' },
    { name: 'المكياج', to: '/makeup' },
    { name: 'العناية بالبشرة', to: '/category/skincare' },
    { name: 'الشعر', to: '/category/hair' },
    { name: 'العطور', to: '/category/fragrance' },
  ];

  const navLinksEn = [
    { name: 'Home', to: '/' },
    { name: 'Makeup', to: '/makeup' },
    { name: 'Skincare', to: '/category/skincare' },
    { name: 'Hair', to: '/category/hair' },
    { name: 'Fragrance', to: '/category/fragrance' },
  ];

  const navLinks = lang === 'ar' ? navLinksAr : navLinksEn;

  const isActive = (to) => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(to);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-background/90 backdrop-blur-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`flex items-center justify-between h-16 sm:h-20 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Left Links - Desktop */}
            <div className={`hidden lg:flex items-center gap-6 xl:gap-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`text-xs xl:text-sm tracking-widest uppercase transition-colors duration-300 relative group whitespace-nowrap ${
                    isActive(link.to) ? 'text-accent' : 'text-gray-300 hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 start-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full`} />
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider">
                  <span className="gold-text">Gray</span>
                  <span className="text-white">Hut</span>
                </span>
              </Link>
            </motion.div>

            {/* Right Links - Desktop */}
            <div className={`hidden lg:flex items-center gap-6 xl:gap-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`text-xs xl:text-sm tracking-widest uppercase transition-colors duration-300 relative group whitespace-nowrap ${
                    isActive(link.to) ? 'text-accent' : 'text-gray-300 hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 start-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full`} />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <button className="p-2 text-gray-300 hover:text-accent transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-300 hover:text-accent transition-colors relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -end-1 w-5 h-5 bg-accent text-primary text-xs font-semibold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 text-gray-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-lg"
          >
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className={`absolute top-6 end-6 z-50 text-white p-2 hover:text-accent transition-colors ${dir === 'rtl' ? 'end-auto start-6' : ''}`}
            >
              <X size={28} />
            </button>

            {/* Menu Content - Centered */}
            <div className="relative h-full flex flex-col items-center justify-center px-6">
              {/* Navigation Links */}
              <nav className="flex flex-col items-center justify-center gap-5 sm:gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className="font-playfair text-xl sm:text-2xl md:text-3xl text-white hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language Toggle */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                onClick={toggleLanguage}
                className="mt-10 sm:mt-12 flex items-center gap-2 text-accent text-base sm:text-lg"
              >
                <Globe size={20} />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
