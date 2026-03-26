import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryCard({ category, index = 0 }) {
  const { lang } = useLanguage();
  const name = lang === 'ar' ? category.name : (category.nameEn || category.name);

  // Map category slug to route
  const getCategoryLink = (slug) => {
    switch(slug) {
      case 'makeup': return '/makeup';
      case 'skincare': return '/category/skincare';
      case 'hair': return '/category/hair';
      case 'fragrance': return '/category/fragrance';
      case 'body': return '/category/body';
      default: return '/';
    }
  };

  return (
    <Link to={getCategoryLink(category.slug)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative h-[400px] overflow-hidden cursor-pointer"
      >
        {/* Background Image */}
        <motion.img
          src={category.image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          {/* Gold Line Above */}
          <motion.div
            className="w-12 h-[2px] bg-accent mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          />

          {/* Category Name */}
          <h3 className="font-playfair text-3xl md:text-4xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm tracking-wide mb-6 max-w-xs">
            {category.description}
          </p>

          {/* Gold Line Below */}
          <motion.div
            className="w-12 h-[2px] bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          />
        </div>

        {/* Gold Border */}
        <div
          className={`absolute inset-0 border-2 border-accent/0 group-hover:border-accent/40 transition-all duration-500 pointer-events-none`}
        />

        {/* Corner Accents */}
        <div className="absolute top-4 start-4 w-8 h-8 border-t-2 border-s-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500" />
        <div className="absolute top-4 end-4 w-8 h-8 border-t-2 border-e-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500" />
        <div className="absolute bottom-4 start-4 w-8 h-8 border-b-2 border-s-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500" />
        <div className="absolute bottom-4 end-4 w-8 h-8 border-b-2 border-e-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500" />
      </motion.div>
    </Link>
  );
}
