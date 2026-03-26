import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { testimonials } from '../../data/products';
import TestimonialCard from '../ui/TestimonialCard';

export default function Testimonials() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Label */}
          <p className="text-accent tracking-[0.3em] uppercase text-sm mb-4">
            {t('satisfiedCustomers', lang)}
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            {t('testimonialsTitle', lang)}
          </h2>

          {/* Gold Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="relative h-[400px] md:h-[350px]"
        >
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === activeIndex}
            />
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className={`absolute ${lang === 'ar' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 ${lang === 'ar' ? '-translate-x-4 md:-translate-x-12' : 'translate-x-4 md:translate-x-12'} p-3 border border-white/10 text-gray-400 hover:text-accent hover:border-accent transition-colors`}
          >
            {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <button
            onClick={goToNext}
            className={`absolute ${lang === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 ${lang === 'ar' ? 'translate-x-4 md:translate-x-12' : '-translate-x-4 md:-translate-x-12'} p-3 border border-white/10 text-gray-400 hover:text-accent hover:border-accent transition-colors`}
          >
            {lang === 'ar' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 h-2 bg-accent'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
