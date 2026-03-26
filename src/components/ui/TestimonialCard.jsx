import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Quote */}
      <div className="mb-8">
        <svg
          className="w-12 h-12 text-accent/30 mx-auto mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-white leading-relaxed italic">
          "{testimonial.text}"
        </p>
      </div>

      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/50">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gold Ring Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-accent -m-1 animate-pulse" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-600'}
          />
        ))}
      </div>

      {/* Name & Title */}
      <div>
        <h4 className="font-playfair text-lg font-semibold text-white">
          {testimonial.name}
        </h4>
        <p className="text-sm text-gray-400">{testimonial.title}</p>
      </div>
    </motion.div>
  );
}
