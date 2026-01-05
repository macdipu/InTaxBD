import { motion } from 'framer-motion';
import { Phone, FileText, Calculator, CheckCircle, Send, Headphones } from 'lucide-react';

export const HowItWorksPage = () => {
  const steps = [
    {
      icon: Phone,
      title: 'Initial Contact',
      description: 'Phone / WhatsApp / Form',
      step: '01'
    },
    {
      icon: FileText,
      title: 'Document Submission',
      description: 'WhatsApp / Email',
      step: '02'
    },
    {
      icon: Calculator,
      title: 'Review & Calculation',
      description: 'Tax calculation & review',
      step: '03'
    },
    {
      icon: CheckCircle,
      title: 'Client Confirmation',
      description: 'Approval from client',
      step: '04'
    },
    {
      icon: Send,
      title: 'Return Submission',
      description: 'Submit to NBR',
      step: '05'
    },
    {
      icon: Headphones,
      title: 'Post-Filing Support',
      description: 'Ongoing assistance',
      step: '06'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Simple, secure, and hassle-free tax filing process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg text-center relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg mt-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 shadow-2xl text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Tax Filing?
          </h2>
          <p className="text-cyan-50 text-lg mb-8">
            Get started with our expert tax consultants today
          </p>
          <button className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            Book Free Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
};