import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import logo from '../../shared/assets/logo.png';

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-2xl px-8 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg">
                <img src={logo} alt="InTaxBD" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                InTaxBD
              </span>
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Pricing
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                How It Works
              </a>
              <a
                href="#documents"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Documents
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                FAQ
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="https://wa.me/01717170575?text=We%20provide%20professional%20tax%20advisory%20services%20covering%20income%20tax%2C%20VAT%2C%20compliance%2C%20and%20return%20filing%20for%20individuals%20and%20businesses.%20I%20would%20be%20glad%20to%20discuss%20how%20I%20can%20support%20your%20tax%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
              <motion.a
                href="tel:01717170575"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
