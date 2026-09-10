import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FDPDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-gray-300 hover:text-white transition-all duration-300"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-4">
            ATAL Faculty Development Programme
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold">
            Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability
          </p>
        </motion.div>

        {/* Event Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <Calendar className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
              <p className="text-green-300 font-semibold">January 19-24, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Mode</p>
              <p className="text-blue-300 font-semibold">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Users className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Expected</p>
              <p className="text-purple-300 font-semibold">300+ Attendees</p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-green-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded"></span>
              About the Programme
            </h3>
            <p className="text-gray-300 leading-relaxed">
              AICTE Training and Learning (ATAL) Academy sponsored Faculty Development Programme 
              organized by the Department of Computer Science & Engineering, MMMUT Gorakhpur. 
              This program provides a comprehensive exploration of mechanistic interpretability, 
              a key area of AI research dedicated to uncovering and understanding the underlying computational 
              mechanisms and representations learned by neural networks.
            </p>
          </motion.div>

          {/* Key Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded"></span>
              Key Topics
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Core mathematical tools for AI: linear algebra, calculus, and probability</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Understanding deep neural networks through information theory</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Techniques to visualize neural activations and interpret model attributions</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mechanistic understanding of transformers and attention mechanisms</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Bayesian and probabilistic approaches to interpreting neural models</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Tools for identifying circuits and structures within large language models</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Global and sparse explanations in interpretability</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>Ethics, explainability, and responsible AI governance</span>
              </li>
            </ul>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded"></span>
              Programme Objectives
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Gain mathematical clarity on core mechanistic interpretability concepts</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Learn practical tools and methods to analyze neural networks at different levels</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Understand interpretability's role in AI safety and value alignment</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Explore emerging trends in interpretability for large models, RL, and vision</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Recognize ethical and governance issues linked to interpretability</span>
              </li>
            </ul>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-yellow-500 rounded"></span>
              Eligibility & Guidelines
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 mt-1">→</span>
                <span>Faculty members, research scholars, and PG scholars of AICTE-approved institutions</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 mt-1">→</span>
                <span>Industry personnel are eligible to apply</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 mt-1">→</span>
                <span><span className="font-semibold text-yellow-300">NO CHARGE</span> for registration, course, and certification</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 mt-1">→</span>
                <span>Certificates will be issued to participants registered on ATAL Portal</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 mt-1">→</span>
                <span>Selection is based on a first-come, first-served basis</span>
              </li>
            </ul>
          </motion.div>

          {/* Coordinators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-pink-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded"></span>
              Programme Coordinators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-pink-500/10">
                <p className="text-pink-300 font-semibold mb-1">Convener</p>
                <p className="text-white font-medium">Dr. Rakesh Kumar</p>
                <p className="text-sm text-gray-400">Professor & HOD, CSE</p>
                <p className="text-xs text-gray-500 mt-1">rkcs@mmmut.ac.in</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-pink-500/10">
                <p className="text-pink-300 font-semibold mb-1">Coordinator</p>
                <p className="text-white font-medium">Dr. Satya Prakash Yadav</p>
                <p className="text-sm text-gray-400">Associate Professor, CSE</p>
                <p className="text-xs text-gray-500 mt-1">spycs@mmmut.ac.in</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-pink-500/10">
                <p className="text-pink-300 font-semibold mb-1">Co-Coordinator</p>
                <p className="text-white font-medium">Dr. Shwet Ketu</p>
                <p className="text-sm text-gray-400">Assistant Professor, CSE</p>
                <p className="text-xs text-gray-500 mt-1">skcse@mmmut.ac.in</p>
              </div>
            </div>
          </motion.div>

          {/* Registration Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center pt-4 pb-8"
          >
            <a
              href="https://www.aicteindia.org/atal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg rounded-full font-bold shadow-2xl shadow-green-500/30 transform transition-all duration-300 hover:scale-105"
            >
              Register on ATAL Portal
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FDPDetailsPage;
