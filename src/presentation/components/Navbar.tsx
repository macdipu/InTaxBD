import { motion } from 'framer-motion';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../shared/assets/logo.png';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#documents', label: 'Documents' },
    { href: '#faq', label: 'FAQ' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-2xl px-4 sm:px-8 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onClick={closeMenu}
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg">
                <img src={logo} alt="InTaxBD" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                InTaxBD
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="https://wa.me/01717170575?text=We%20provide%20professional%20tax%20advisory%20services%20covering%20income%20tax%2C%20VAT%2C%20compliance%2C%20and%20return%20filing%20for%20individuals%20and%20businesses.%20I%20would%20be%20glad%20to%20discuss%20how%20I%20can%20support%20your%20tax%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden lg:inline">WhatsApp</span>
              </motion.a>
              <motion.a
                href="tel:01717170575"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call Now</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden mt-4"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1 p-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="text-gray-800 hover:text-primary font-medium transition-all duration-200 py-3 px-4 rounded-xl hover:bg-primary/10 active:bg-primary/15"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mx-4"></div>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-2 p-4">
                  <motion.a
                    href="https://wa.me/01717170575?text=We%20provide%20professional%20tax%20advisory%20services%20covering%20income%20tax%2C%20VAT%2C%20compliance%2C%20and%20return%20filing%20for%20individuals%20and%20businesses.%20I%20would%20be%20glad%20to%20discuss%20how%20I%20can%20support%20your%20tax%20requirements."
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2"
                    onClick={closeMenu}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </motion.a>
                  <motion.a
                    href="tel:01717170575"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2"
                    onClick={closeMenu}
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
