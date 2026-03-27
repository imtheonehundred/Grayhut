import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryCard({ category }) {
  const { lang } = useLanguage();
  const name = lang === 'ar' ? category.name : (category.nameEn || category.name);

  const getCategoryPath = (slug) => {
    switch (slug) {
      case 'makeup': return '/makeup';
      case 'skincare': return '/category/skincare';
      case 'hair': return '/category/hair';
      case 'fragrance': return '/category/fragrance';
      case 'body': return '/category/body';
      default: return '/';
    }
  };

  return (
    <Link
      to={getCategoryPath(category.slug)}
      className="group relative block h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
          {name}
        </h3>
      </div>
    </Link>
  );
}
