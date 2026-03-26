import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const { lang, dir, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: 'الرئيسية', href: '/' },
    { name: 'المكياج', href: '/makeup' },
    { name: 'العناية بالبشرة', href: '/category/skincare' },
    { name: 'الشعر', href: '/category/hair' },
    { name: 'العطور', href: '/category/fragrance' },
    { name: 'من نحن', href: '/#about' },
    { name: 'اتصل بنا', href: '/#footer' },
  ];

  const navLinksEn = [
    { name: 'Home', href: '/' },
    { name: 'Makeup', href: '/makeup' },
    { name: 'Skincare', href: '/category/skincare' },
    { name: 'Hair', href: '/category/hair' },
    { name: 'Fragrance', href: '/category/fragrance' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#footer' },
  ];

  const navLinks = lang === 'ar' ? navLinksAr : navLinksEn;

  const isActive = (href) => {
    if (href.startsWith('/#')) {
      return false;
    }
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
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
        className={`fixed top-8 start-0 end-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`flex items-center justify-between h-20 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Left Links - Desktop */}
            <div className={`hidden lg:flex items-center gap-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isActive(link.href) ? 'text-accent' : 'text-gray-300 hover:text-accent'
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
                <span className="font-playfair text-2xl md:text-3xl font-semibold tracking-wider">
                  <span className="gold-text">Gray</span>
                  <span className="text-white">Hut</span>
                </span>
              </Link>
            </motion.div>

            {/* Right Links - Desktop */}
            <div className={`hidden lg:flex items-center gap-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isActive(link.href) ? 'text-accent' : 'text-gray-300 hover:text-accent'
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/90 backdrop-blur-lg"
          >
            <div className={`relative h-full flex flex-col items-center justify-center gap-6 ${dir === 'rtl' ? 'text-end' : 'text-center'}`}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-playfair text-2xl text-white hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle in mobile menu */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={toggleLanguage}
                className="mt-8 flex items-center gap-2 text-accent text-lg"
              >
                <Globe size={20} />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </motion.button>

              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 end-6 text-white p-2"
              >
                <X size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
