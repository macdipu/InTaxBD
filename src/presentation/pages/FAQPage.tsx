import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who needs to file income tax return in Bangladesh?',
      answer: 'Any individual or business whose total income exceeds the taxable threshold (currently ৳3,50,000 for individuals) must file an income tax return. This includes salaried employees, professionals, business owners, and non-resident Bangladeshis.'
    },
    {
      question: 'What happens if I file my tax return late?',
      answer: 'Late filing may result in penalties. However, we help ensure timely submission. If you miss the deadline, contact us immediately for assistance with late filing procedures.'
    },
    {
      question: 'Is online tax filing safe and secure?',
      answer: 'Yes, online filing through the NBR portal is completely secure. We use encrypted connections and follow all data protection protocols. Your information is handled with the utmost confidentiality.'
    },
    {
      question: 'Can freelancers file their tax returns?',
      answer: 'Absolutely! We specialize in freelancer tax filing. We help calculate income from various sources, deduct eligible expenses, and ensure compliance with tax laws.'
    },
    {
      question: 'Do you support NRB (Non-Resident Bangladeshi) clients?',
      answer: 'Yes, we provide comprehensive tax services for NRBs including tax return filing, investment income reporting, and compliance with Bangladesh tax regulations.'
    },
    {
      question: 'Will my personal and financial data be kept confidential?',
      answer: 'Absolutely. We are bound by professional ethics and data protection laws. Your information is encrypted, securely stored, and never shared with third parties without your consent.'
    },
    {
      question: 'What is the processing time for tax return filing?',
      answer: 'Most returns are processed and submitted within 48 hours of receiving all required documents. Complex cases may take up to 7 working days.'
    },
    {
      question: 'Do you provide post-filing support?',
      answer: 'Yes, we offer ongoing support including queries from NBR, amendment requests, and guidance for future tax years.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-700">
            Find answers to common tax-related questions
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cyan-600" />
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-cyan-50 mb-6">
            Our tax experts are here to help you with any specific queries
          </p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-shadow duration-200">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};