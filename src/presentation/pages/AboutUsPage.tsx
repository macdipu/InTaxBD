import { motion } from 'framer-motion';
import { Award, Users, Target, Shield, Mail, Phone, MapPin } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-700 bg-clip-text text-transparent">
              About InTaxBD
            </span>
          </h1>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Company Overview</h2>
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Values</h3>
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Commitment</h3>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Certified Tax Consultants</h3>
              <p className="text-gray-600">Our team consists of qualified CA (Chartered Accountants) and tax professionals with extensive experience in Bangladesh tax laws.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Qualifications</h3>
              <p className="text-gray-600">All our consultants are registered with ICAB and maintain the highest standards of professional conduct and expertise.</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-2" />
              <div className="font-semibold">Phone</div>
              <div>+880 1234-567890</div>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-2" />
              <div className="font-semibold">Email</div>
              <div>info@intaxbd.com</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-2" />
              <div className="font-semibold">Address</div>
              <div>Dhaka, Bangladesh</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};