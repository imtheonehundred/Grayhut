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

  const navLinks = [
    { name: t('home', lang), href: '/' },
    { name: t('makeup', lang), href: '/makeup' },
    { name: t('skincare', lang), href: '/#skincare' },
    { name: t('hair', lang), href: '/#hair' },
    { name: t('fragrance', lang), href: '/#fragrance' },
    { name: t('about', lang), href: '/#about' },
    { name: t('contact', lang), href: '/#footer' },
  ];

  const isActive = (href) => {
    if (href.startsWith('/')) return location.pathname === href;
    return false;
  };

  return (
    <>
      {/* Language Toggle Bar */}
      <div className="h-8 bg-primary/50 flex items-center justify-center gap-4 text-xs border-b border-white/5">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-gray-400 hover:text-accent transition-colors"
        >
          <Globe size={14} />
          <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isActive(link.href) ? 'text-accent' : 'text-gray-300 hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full`} />
                </Link>
              ))}
            </div>

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-playfair text-2xl md:text-3xl font-semibold tracking-wider">
                  <span className="gold-text">Gray</span>
                  <span className="text-white">Hut</span>
                </span>
              </Link>
            </motion.div>

            {/* Right Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isActive(link.href) ? 'text-accent' : 'text-gray-300 hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full`} />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
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
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-semibold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />
            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-playfair text-3xl text-white hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle in mobile menu */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={toggleLanguage}
                className="mt-8 flex items-center gap-2 text-accent text-lg"
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
