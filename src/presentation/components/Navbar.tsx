import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
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
            <motion.div
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
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                How It Works
              </Link>
              <Link
                to="/documents"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Documents
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
