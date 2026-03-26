import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label, isUrgent }) => (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-16 h-20 md:w-20 md:h-24 border ${
          isUrgent ? 'border-red-500/50' : 'border-accent/50'
        } bg-surface flex items-center justify-center overflow-hidden`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`font-playfair text-3xl md:text-4xl font-semibold ${
              isUrgent ? 'text-red-500' : 'text-white'
            }`}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
      <span className="mt-2 text-xs text-gray-400 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <div className="flex items-start gap-3 md:gap-6">
      <TimeBox value={timeLeft.days} label="Days" isUrgent={false} />
      <span className={`font-playfair text-3xl md:text-4xl mt-4 md:mt-6 ${isUrgent ? 'text-red-500' : 'text-accent'}`}>
        :
      </span>
      <TimeBox value={timeLeft.hours} label="Hours" isUrgent={isUrgent} />
      <span className={`font-playfair text-3xl md:text-4xl mt-4 md:mt-6 ${isUrgent ? 'text-red-500' : 'text-accent'}`}>
        :
      </span>
      <TimeBox value={timeLeft.minutes} label="Minutes" isUrgent={isUrgent} />
      <span className={`font-playfair text-3xl md:text-4xl mt-4 md:mt-6 ${isUrgent ? 'text-red-500' : 'text-accent'}`}>
        :
      </span>
      <TimeBox value={timeLeft.seconds} label="Seconds" isUrgent={isUrgent} />
    </div>
  );
}
