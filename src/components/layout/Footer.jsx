import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function Footer() {
  const { lang, dir } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinksAr = {
    shop: [
      { name: 'جديد', href: '/#featured' },
      { name: 'الأكثر مبيعاً', href: '/#featured' },
      { name: 'المكياج', href: '/makeup' },
      { name: 'العطور', href: '/category/fragrance' },
    ],
    company: [
      { name: 'من نحن', href: '/#about' },
      { name: 'اتصل بنا', href: '/#footer' },
    ],
    support: [
      { name: 'اتصل بنا', href: '/#footer' },
      { name: 'الشحن', href: '#' },
      { name: 'الإرجاع', href: '#' },
    ],
  };

  const footerLinksEn = {
    shop: [
      { name: 'New Arrivals', href: '/#featured' },
      { name: 'Best Sellers', href: '/#featured' },
      { name: 'Makeup', href: '/makeup' },
      { name: 'Fragrance', href: '/category/fragrance' },
    ],
    company: [
      { name: 'About', href: '/#about' },
      { name: 'Contact', href: '/#footer' },
    ],
    support: [
      { name: 'Contact', href: '/#footer' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
    ],
  };

  const footerLinks = lang === 'ar' ? footerLinksAr : footerLinksEn;

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  const handleFooterNavClick = (e, href) => {
    if (href.startsWith('/#') || href === '#') {
      if (href !== '#') {
        e.preventDefault();
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer id="footer" className="bg-primary border-t border-white/5">
      {/* Gold Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 ${dir === 'rtl' ? 'text-right' : ''}`}>
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mb-6"
            >
              <Link to="/" className="inline-block">
                <span className="font-playfair text-2xl font-semibold tracking-wider">
                  <span className="gold-text">Gray</span>
                  <span className="text-white">Hut</span>
                </span>
              </Link>
            </motion.div>
            <p className={`text-gray-400 text-sm leading-relaxed mb-6 max-w-md ${dir === 'rtl' ? 'text-right' : ''}`}>
              {lang === 'ar'
                ? 'وجهتك الأولى لمستحضرات التجميل الفاخرة. نقدم لك أفضل المنتجات من أشهر الماركات العالمية.'
                : 'Your premier destination for luxury cosmetics. We offer the best products from world-renowned brands.'}
            </p>
            <div className={`space-y-3 ${dir === 'rtl' ? 'text-right' : ''}`}>
              <a href="#" className={`flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <MapPin size={16} />
                <span>{t('baghdad', lang)}</span>
              </a>
              <a href="tel:+9647701234567" className={`flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Phone size={16} />
                <span dir="ltr">+964 770 123 4567</span>
              </a>
              <a href="mailto:info@grayhut.com" className={`flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Mail size={16} />
                <span>info@grayhut.com</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">{t('shopLinks', lang)}</h4>
            <ul className={`space-y-3 ${dir === 'rtl' ? 'text-right' : ''}`}>
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">{t('companyLinks', lang)}</h4>
            <ul className={`space-y-3 ${dir === 'rtl' ? 'text-right' : ''}`}>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">{t('supportLinks', lang)}</h4>
            <ul className={`space-y-3 ${dir === 'rtl' ? 'text-right' : ''}`}>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 ${dir === 'rtl' ? 'text-right' : ''}`}>
          {/* Social Icons */}
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -3, color: '#d4af37' }}
                className="p-2 text-gray-400 transition-colors"
              >
                <social.icon size={20} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} GrayHut. {t('rights', lang)}.
          </p>

          {/* Payment Icons */}
          <div className={`flex items-center gap-4 text-gray-500 text-xs tracking-wider ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span>VISA</span>
            <span>•</span>
            <span>MASTERCARD</span>
            <span>•</span>
            <span>AMEX</span>
            <span>•</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
