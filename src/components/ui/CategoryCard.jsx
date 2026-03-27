import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryCard({ category, index = 0 }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const name = lang === 'ar' ? category.name : (category.nameEn || category.name);

  const handleClick = () => {
    switch(category.slug) {
      case 'makeup': navigate('/makeup'); break;
      case 'skincare': navigate('/category/skincare'); break;
      case 'hair': navigate('/category/hair'); break;
      case 'fragrance': navigate('/category/fragrance'); break;
      case 'body': navigate('/category/body'); break;
      default: navigate('/'); break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="group relative h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <motion.img
        src={category.image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
        {/* Category Name */}
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
          {name}
        </h3>
      </div>
    </motion.div>
  );
}
