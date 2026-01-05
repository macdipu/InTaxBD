import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/ui/CustomCursor';
import { Navbar } from '../components/Navbar';
import { PricingTable } from '../components/PricingTable';
import { CheckCircle, Users, Award, FileText, MessageCircle } from 'lucide-react';

export const HomePage = () => {
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CustomCursor />

      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100"
        />
      </div>

      <Navbar />

      <main className="relative pt-32 pb-20">
        <section id="home" className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                Expert Tax Advisory
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Services in Bangladesh
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Simplify your tax compliance with professional guidance. We offer
              transparent, affordable tax return services for individuals and
              businesses across all income levels.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/40 backdrop-blur-xl border border-white/30 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            id="services"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {[
              {
                icon: CheckCircle,
                title: '100% Compliance',
                description: 'Guaranteed tax law adherence',
              },
              {
                icon: Users,
                title: '500+ Clients',
                description: 'Trusted by professionals',
              },
              {
                icon: Award,
                title: 'Expert Team',
                description: 'Certified tax consultants',
              },
              {
                icon: FileText,
                title: 'Fast Processing',
                description: 'Returns filed within 48 hours',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="pricing">
          <PricingTable />
        </section>

        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 mt-20"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 shadow-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-cyan-50 text-lg mb-8">
              Let our experts handle your tax returns professionally and
              efficiently.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
            >
              Contact Us Today
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer className="relative mt-20 bg-white/20 backdrop-blur-xl border-t border-white/30 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-700">
            © 2026 InTaxBD. All rights reserved. Professional Tax Advisory
            Services.
          </p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/8801234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
};