import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, FileText, Briefcase, TrendingUp, Shield } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
              Our Tax Services
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive tax solutions for individuals and businesses in Bangladesh
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Individual Tax Return */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg"
          >
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Individual Tax Return</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Salaried employees
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Professionals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                NRBs (Non-Resident Bangladeshis)
              </li>
            </ul>
          </motion.div>

          {/* Business Tax Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg"
          >
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Tax Services</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Proprietorship
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Partnership firms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Financial statements review
              </li>
            </ul>
          </motion.div>

          {/* Specialized Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg"
          >
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Specialized Services</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Freelancer income tax
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Investment & asset disclosure
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Tax certificate support
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 shadow-2xl text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-cyan-50 text-lg mb-8">
            Contact our experts for personalized tax consultation
          </p>
          <button className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            Get Free Consultation
          </button>
        </motion.div>
      </div>

      <footer className="relative mt-20 bg-white/20 backdrop-blur-xl border-t border-white/30 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-700">
            © 2026 InTaxBD. All rights reserved. Professional Tax Advisory
            Services.
          </p>
        </div>
      </footer>
    </div>
  );
};