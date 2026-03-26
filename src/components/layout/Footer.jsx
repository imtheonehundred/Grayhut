import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '#featured' },
      { name: 'Best Sellers', href: '#featured' },
      { name: 'For Him', href: '#categories' },
      { name: 'For Her', href: '#categories' },
      { name: 'Gift Sets', href: '#' },
    ],
    company: [
      { name: 'Our Story', href: '#about' },
      { name: 'Craftmanship', href: '#about' },
      { name: 'Press', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    support: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Track Order', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer id="footer" className="bg-primary border-t border-white/5">
      {/* Gold Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mb-6"
            >
              <span className="font-playfair text-2xl font-semibold tracking-wider">
                <span className="gold-text">NOIR</span>
                <span className="text-white"> ESSENCE</span>
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Crafting extraordinary fragrances since 1895. Each scent is a masterpiece,
              meticulously curated from the world's finest ingredients.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <MapPin size={16} />
                <span>123 Luxury Avenue, Paris, France</span>
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Phone size={16} />
                <span>+33 1 23 45 67 89</span>
              </a>
              <a href="mailto:concierge@noiressence.com" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Mail size={16} />
                <span>concierge@noiressence.com</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
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
              © {currentYear} NOIR ESSENCE. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-4 text-gray-500 text-xs tracking-wider">
              <span>VISA</span>
              <span>•</span>
              <span>MASTERCARD</span>
              <span>•</span>
              <span>AMEX</span>
              <span>•</span>
              <span>PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
