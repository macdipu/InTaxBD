import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from './presentation/components/ui/CustomCursor';
import { Navbar } from './presentation/components/Navbar';
import { PricingTable } from './presentation/components/PricingTable';
import { CheckCircle, Users, Award, FileText, Briefcase, Shield, Phone, Calculator, Send, Headphones, Download, Calendar, User, ChevronDown, HelpCircle, Target, Mail, MapPin, MessageCircle } from 'lucide-react';

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        <section id="services" className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                Our Tax Services
              </span>
            </h2>
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
            <h3 className="text-4xl font-bold text-white mb-4">
              Need Help Choosing the Right Service?
            </h3>
            <p className="text-cyan-50 text-lg mb-8">
              Contact our experts for personalized tax consultation
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 inline-block text-center"
            >
              Get Free Consultation
            </motion.a>
          </motion.div>
        </section>

        <PricingTable />

        <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Simple, secure, and hassle-free tax filing process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((step, index) => (
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
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Tax Filing?
            </h3>
            <p className="text-cyan-50 text-lg mb-8">
              Get started with our expert tax consultants today
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 inline-block text-center"
            >
              Book Free Consultation
            </motion.a>
          </motion.div>
        </section>

        <section id="documents" className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                Documents Required
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Prepare these documents for smooth tax filing
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 flex items-center gap-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              Download Checklist (PDF)
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((category, index) => (
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Important Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Document Quality</h4>
                <p className="text-gray-600">Ensure all documents are clear, legible, and in PDF format when possible.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Submission Methods</h4>
                <p className="text-gray-600">Submit via WhatsApp, Email, or our secure client portal.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Timeline</h4>
                <p className="text-gray-600">Submit documents at least 7 days before the tax deadline for smooth processing.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Support</h4>
                <p className="text-gray-600">Our team will guide you if any additional documents are required.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-700">
              Find answers to common tax-related questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
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
            ].map((faq, index) => (
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
            <h3 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-cyan-50 mb-6">
              Our tax experts are here to help you with any specific queries
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-shadow duration-200 inline-block text-center"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </section>

        <section id="about" className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                About InTaxBD
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Your trusted partner for professional tax advisory services in Bangladesh
            </p>
          </motion.div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Company Overview</h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              InTaxBD is a leading tax consultancy firm specializing in income tax filing and advisory services
              for individuals and businesses across Bangladesh. With years of experience and a team of certified
              tax professionals, we ensure complete compliance with NBR regulations while providing transparent
              and affordable services.
            </p>
          </motion.div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h4>
              <p className="text-gray-600">To simplify tax compliance and provide expert guidance to every taxpayer in Bangladesh</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Our Values</h4>
              <p className="text-gray-600">Integrity, transparency, confidentiality, and excellence in service delivery</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Our Commitment</h4>
              <p className="text-gray-600">100% compliance guarantee and dedicated post-filing support</p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600 mb-2">500+</div>
              <div className="text-gray-700">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600 mb-2">5+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600 mb-2">100%</div>
              <div className="text-gray-700">Compliance Rate</div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Expert Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">MD. REYAD CHOWDHURY</h4>
                <p className="text-gray-600 mb-2">CEO, InTaxBD</p>
                <p className="text-gray-600">CA Professional Level, ICAB<br />MBA & BBA (Finance, University of Dhaka)</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Certified Tax Consultants</h4>
                <p className="text-gray-600">Our team consists of qualified CA (Chartered Accountants) and tax professionals with extensive experience in Bangladesh tax laws.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Get in touch with our tax experts for personalized assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                <p className="text-gray-600 mb-8">
                  Ready to file your taxes? Contact us today for a free consultation.
                  Our experts are here to help you with all your tax needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Phone & WhatsApp</div>
                    <div className="text-gray-600">01717170575</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Email</div>
                    <div className="text-gray-600">intaxbd.ca@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Website</div>
                    <div className="text-gray-600">www.intaxbd.online</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <motion.a
                    href="tel:01717170575"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </motion.a>
                  <motion.a
                    href="https://wa.me/01717170575?text=We%20provide%20professional%20tax%20advisory%20services%20covering%20income%20tax%2C%20VAT%2C%20compliance%2C%20and%20return%20filing%20for%20individuals%20and%20businesses.%20I%20would%20be%20glad%20to%20discuss%20how%20I%20can%20support%20your%20tax%20requirements."
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Now
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Simplified */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="01717170575"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your tax needs..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        <motion.section
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
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 inline-block text-center"
            >
              Contact Us Today
            </motion.a>
          </div>
        </motion.section>
      </main>

      <footer className="relative mt-20 bg-white/20 backdrop-blur-xl border-t border-white/30 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">InTaxBD</h3>
              <p className="text-gray-600">Professional Tax Advisory Services</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
              <p className="text-gray-600">Phone: 01717170575</p>
              <p className="text-gray-600">Email: intaxbd.ca@gmail.com</p>
              <p className="text-gray-600">Website: www.intaxbd.online</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">CEO</h4>
              <p className="text-gray-600">MD. REYAD CHOWDHURY</p>
              <p className="text-gray-600">CA Professional Level, ICAB</p>
              <p className="text-gray-600">MBA & BBA (Finance, University of Dhaka)</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              © 2026 InTaxBD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
