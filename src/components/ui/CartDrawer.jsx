import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { formatPriceIQD } from '../../lib/utils';
import { v4 as uuidv4 } from 'uuid';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { addOrder } = useData();
  const { lang, dir } = useLanguage();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert(lang === 'ar' ? 'الرجاء ملء الاسم ورقم الهاتف' : 'Please fill in your name and phone');
      return;
    }

    const order = {
      id: uuidv4(),
      items: cart,
      customerInfo,
      subtotal: cartTotal,
      shipping: 0,
      total: cartTotal,
      status: 'pending',
      paymentMethod: 'cash',
      createdAt: new Date().toISOString()
    };

    addOrder(order);
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setCustomerInfo({ name: '', phone: '', address: '' });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isCheckoutOpen && setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} bottom-0 w-full max-w-md bg-primary border-${dir === 'rtl' ? 'r' : 'l'} border-white/10 z-[110] flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-playfair text-2xl font-semibold text-white">
                {isCheckoutOpen ? t('checkoutTitle', lang) : t('yourCart', lang)}
              </h2>
              <button
                onClick={() => {
                  if (isCheckoutOpen) {
                    setIsCheckoutOpen(false);
                  } else {
                    setIsCartOpen(false);
                  }
                }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Order Success */}
            {orderPlaced ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
                >
                  <Check size={40} className="text-emerald-500" />
                </motion.div>
                <h3 className="font-playfair text-2xl text-white mb-2">
                  {t('success', lang)}!
                </h3>
                <p className="text-gray-400">
                  {lang === 'ar' ? 'شكراً لك! سيتم التواصل معك قريباً' : 'Thank you! We will contact you soon.'}
                </p>
              </div>
            ) : isCheckoutOpen ? (
              /* Checkout Form */
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
                      {t('name', lang)} *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-surface border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none"
                      placeholder={lang === 'ar' ? 'اسمك' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
                      {t('phone', lang)} *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-surface border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none"
                      placeholder={lang === 'ar' ? '07712345678' : '+964 771 234 5678'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">
                      {t('address', lang)}
                    </label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      rows={3}
                      className="w-full bg-surface border border-white/10 px-4 py-3 text-white focus:border-accent/50 focus:outline-none resize-none"
                      placeholder={lang === 'ar' ? 'العنوان الكامل' : 'Full address in Baghdad'}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Cart Items */
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag size={64} className="text-gray-700 mb-4" />
                    <p className="text-gray-400 font-playfair text-xl mb-2">
                      {t('emptyCart', lang)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {lang === 'ar' ? 'اكتشف منتجاتنا الفاخرة' : 'Discover our luxury products'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 pb-6 border-b border-white/5"
                      >
                        {/* Image */}
                        <div className="w-24 h-32 bg-surface overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-gray-500 tracking-widest uppercase">
                              {item.product.brand}
                            </p>
                            <h4 className="font-playfair text-lg text-white">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                              {item.product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-gray-400 hover:text-accent transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center text-white font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-gray-400 hover:text-accent transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="gold-text font-semibold">
                              {formatPriceIQD(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="self-start p-1 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            {cart.length > 0 && !orderPlaced && (
              <div className="p-6 border-t border-white/10 bg-surface/50">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">{t('total', lang)}</span>
                  <span className="gold-text text-xl font-semibold">{formatPriceIQD(cartTotal)}</span>
                </div>

                {isCheckoutOpen ? (
                  <>
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-primary mb-3 flex items-center justify-center gap-2"
                    >
                      <Check size={18} />
                      {t('placeOrder', lang)}
                    </button>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-full py-3 text-sm text-gray-400 hover:text-accent transition-colors tracking-wider uppercase"
                    >
                      {t('continueShopping', lang)}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="w-full btn-primary mb-3 flex items-center justify-center gap-2"
                    >
                      {t('checkout', lang)}
                      <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-sm text-gray-400 hover:text-accent transition-colors tracking-wider uppercase"
                    >
                      {t('continueShopping', lang)}
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
