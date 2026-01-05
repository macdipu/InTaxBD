import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Users, Briefcase, User } from 'lucide-react';

export const DocumentsPage = () => {
  const documentCategories = [
    {
      icon: Calendar,
      title: 'Income Period',
      items: ['1 July 2024 – 30 June 2025']
    },
    {
      icon: Users,
      title: 'For All Clients',
      items: [
        'Bank statements (Savings, FDR, DPS, Loans)',
        'Investment documents',
        'Loan & gift documents',
        'Other income details (rent, dividend, consultancy)'
      ]
    },
    {
      icon: User,
      title: 'Employees',
      items: ['Salary certificate with tax deduction details']
    },
    {
      icon: Briefcase,
      title: 'Business Owners',
      items: [
        'Income & expense statement',
        'Bank statement'
      ]
    },
    {
      icon: FileText,
      title: 'New Clients',
      items: [
        'Last year tax return',
        'TIN certificate',
        'NID & photo'
      ]
    },
    {
      icon: Download,
      title: 'Additional (If Applicable)',
      items: [
        'TDS certificates',
        'Advance tax challan',
        'Inherited property documents'
      ]
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
              Documents Required
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Prepare these documents for smooth tax filing
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 flex items-center gap-2 mx-auto">
            <Download className="w-5 h-5" />
            Download Checklist (PDF)
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Important Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Document Quality</h3>
              <p className="text-gray-600">Ensure all documents are clear, legible, and in PDF format when possible.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Submission Methods</h3>
              <p className="text-gray-600">Submit via WhatsApp, Email, or our secure client portal.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
              <p className="text-gray-600">Submit documents at least 7 days before the tax deadline for smooth processing.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Support</h3>
              <p className="text-gray-600">Our team will guide you if any additional documents are required.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};