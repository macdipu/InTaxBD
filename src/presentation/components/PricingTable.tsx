import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Loader2 } from 'lucide-react';
import { FeePackage } from '../domain/FeePackage';
import { fetchFeePackages } from '../data/feeRepository';

export const PricingTable = () => {
  const [packages, setPackages] = useState<FeePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchFeePackages();
        setPackages(data);
      } catch (error) {
        console.error('Failed to load fee packages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8"
        >
          <Loader2 className="w-12 h-12 text-cyan-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/30 rounded-full px-6 py-2 mb-6">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          <span className="text-sm font-semibold text-gray-700">
            Transparent Pricing
          </span>
        </div>
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
          Tax Advisory Fee Structure
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Professional tax consulting services tailored to your income bracket.
          No hidden charges, complete transparency.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-amber-400/30 to-orange-400/30 backdrop-blur-xl border-b border-white/30">
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Income Range
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Advisory Fee
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {packages.map((pkg, index) => (
                <motion.tr
                  key={pkg.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    scale: 1.01,
                  }}
                  className="cursor-pointer transition-all duration-200"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                      <span className="text-gray-800 font-semibold text-lg">
                        {pkg.incomeRange}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                      {pkg.fee}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-gray-700 text-sm">
                      {pkg.description}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border-t border-white/30 px-8 py-6"
        >
          <p className="text-sm text-gray-700 text-center">
            All fees are exclusive of VAT and government taxes. Contact us for
            custom enterprise solutions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
