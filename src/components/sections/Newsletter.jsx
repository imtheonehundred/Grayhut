import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function Newsletter() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setIsError(true);
      return;
    }

    setIsError(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 border border-accent/30 mb-8"
          >
            <Mail size={28} className="text-accent" />
          </motion.div>

          {/* Label */}
          <p className="text-accent tracking-[0.3em] uppercase text-sm mb-4">
            {lang === 'ar' ? 'ابق على اطلاع' : 'Stay Connected'}
          </p>

          {/* Title */}
          <h2 className="section-title text-white mb-6">
            {t('newsletterTitle', lang)}
          </h2>

          {/* Gold Line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <div className="w-3 h-3 border border-accent rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            {t('newsletterSubtitle', lang)}
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
              <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder', lang)}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsError(false);
                    }}
                    className={`w-full px-6 py-5 bg-surface border ${
                      isError
                        ? 'border-red-500'
                        : 'border-white/10 focus:border-accent'
                    } text-white placeholder-gray-500 focus:outline-none transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  />
                  {isError && (
                    <p className={`absolute -bottom-6 ${lang === 'ar' ? 'right-0' : 'left-0'} text-red-500 text-xs`}>
                      {lang === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address'}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  {t('subscribe', lang)}
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <CheckCircle size={48} className="text-green-500" />
              <p className="text-white font-playfair text-xl">
                {lang === 'ar' ? 'مرحباً بك في النادي الخاص!' : 'Welcome to the Inner Circle!'}
              </p>
              <p className="text-gray-400 text-sm">
                {lang === 'ar' ? 'تفضل بزيارة بريدك الإلكتروني لهدية الترحيب' : 'Check your inbox for a special welcome gift'}
              </p>
            </motion.div>
          )}

          {/* Privacy Note */}
          <p className="text-gray-600 text-xs mt-8">
            {lang === 'ar' ? 'بالاشتراك، أنت توافق على سياسة الخصوصية. يمكنك إلغاء الاشتراك في أي وقت.' : 'By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
