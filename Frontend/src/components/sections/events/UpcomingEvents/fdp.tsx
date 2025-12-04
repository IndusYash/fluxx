import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import satvikImg from '@/assets/images/SatvikSir.jpg';
import shantanuImg from '@/assets/images/ShantanuSir.jpg';
import rakeshImg from '@/assets/images/RakeshSir.jpg';
import satyaImg from '@/assets/images/SatyaSir.jpeg';
import shwetImg from '@/assets/images/shwetSir.jpeg';

const FDPDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            y: scrollY * 0.1,
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
            y: -scrollY * 0.1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-800/50 hover:from-gray-700/80 hover:to-gray-700/50 rounded-full text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 shadow-lg backdrop-blur-sm"
          whileHover={{ x: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent mb-4 relative">
            <Sparkles className="w-8 h-8 inline-block text-yellow-400 mr-2 animate-pulse" />
            ATAL Faculty Development Programme
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold leading-relaxed">
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
          <motion.div
            className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-7 h-7 text-green-400 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date</p>
              <p className="text-green-300 font-bold text-lg">January 19-24, 2026</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="w-7 h-7 text-blue-400 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Mode</p>
              <p className="text-blue-300 font-bold text-lg">Online</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="w-7 h-7 text-purple-400 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Expected</p>
              <p className="text-purple-300 font-bold text-lg">300+ Attendees</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 backdrop-blur-sm"
        >
          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20"
            whileHover={{ scale: 1.1 }}
          >
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-orange-300">6</p>
            <p className="text-sm text-gray-400">Days Program</p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20"
            whileHover={{ scale: 1.1 }}
          >
            <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-cyan-300">8</p>
            <p className="text-sm text-gray-400">Key Topics</p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/20"
            whileHover={{ scale: 1.1 }}
          >
            <Target className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-pink-300">5</p>
            <p className="text-sm text-gray-400">Objectives</p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
            whileHover={{ scale: 1.1 }}
          >
            <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-300">FREE</p>
            <p className="text-sm text-gray-400">Registration</p>
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 backdrop-blur-sm group"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              About the Programme
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">
              AICTE Training and Learning (ATAL) Academy sponsored Faculty Development Programme 
              organized by the Department of Computer Science & Engineering, MMMUT Gorakhpur. 
              This program provides a comprehensive exploration of mechanistic interpretability, 
              a key area of AI research dedicated to uncovering and understanding the underlying computational 
              mechanisms and representations learned by neural networks.
            </p>
          </motion.div>

          {/* Organisers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              Organisers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { img: satvikImg, name: 'Dr. Satvik Vats', title: 'Assistant Professor, CSED, MMMUT Gorakhpur' },
                { img: shantanuImg, name: 'Dr. Shantanu Shahi', title: 'Assistant Professor, CSED, MMMUT Gorakhpur' }
              ].map((organiser, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.03, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={organiser.img} alt={organiser.name} className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/20 group-hover:border-indigo-400/60" />
                  </motion.div>
                  <div>
                    <p className="text-white font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">{organiser.name}</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{organiser.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              Key Topics
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Core mathematical tools for AI: linear algebra, calculus, and probability',
                'Understanding deep neural networks through information theory',
                'Techniques to visualize neural activations and interpret model attributions',
                'Mechanistic understanding of transformers and attention mechanisms',
                'Bayesian and probabilistic approaches to interpreting neural models',
                'Tools for identifying circuits and structures within large language models',
                'Global and sparse explanations in interpretability',
                'Ethics, explainability, and responsible AI governance'
              ].map((topic, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 p-3 rounded-lg hover:bg-blue-500/5 transition-all duration-300 cursor-pointer group"
                  whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.span
                    className="text-blue-400 mt-1 text-xl font-bold"
                    animate={{ scale: hoveredCard === index ? 1.3 : 1 }}
                  >•</motion.span>
                  <span className="group-hover:text-blue-200">{topic}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              Programme Objectives
            </h3>
            <ul className="space-y-3">
              {[
                'Gain mathematical clarity on core mechanistic interpretability concepts',
                'Learn practical tools and methods to analyze neural networks at different levels',
                'Understand interpretability\'s role in AI safety and value alignment',
                'Explore emerging trends in interpretability for large models, RL, and vision',
                'Recognize ethical and governance issues linked to interpretability'
              ].map((objective, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 p-3 rounded-lg hover:bg-purple-500/5 transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.span
                    className="text-purple-400 mt-1 text-xl font-bold"
                    whileHover={{ scale: 1.5, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >✓</motion.span>
                  <span className="group-hover:text-purple-200 text-base">{objective}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              Eligibility & Guidelines
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'Faculty members, research scholars, and PG scholars of AICTE-approved institutions', highlight: false },
                { text: 'Industry personnel are eligible to apply', highlight: false },
                { text: 'NO CHARGE for registration, course, and certification', highlight: true },
                { text: 'Certificates will be issued to participants registered on ATAL Portal', highlight: false },
                { text: 'Selection is based on a first-come, first-served basis', highlight: false }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 p-3 rounded-lg hover:bg-yellow-500/5 transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.span
                    className="text-yellow-400 mt-1 text-xl font-bold"
                    whileHover={{ scale: 1.3, x: 5 }}
                  >→</motion.span>
                  <span className={`group-hover:text-yellow-100 text-base ${item.highlight ? 'font-bold text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded' : ''}`}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coordinators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-pink-400 to-rose-600 rounded-full"
                whileHover={{ scaleY: 1.2 }}
              ></motion.span>
              Programme Coordinators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { img: rakeshImg, role: 'Convener', name: 'Dr. Rakesh Kumar', title: 'Professor & HOD, CSE', email: 'rkcs@mmmut.ac.in' },
                { img: satyaImg, role: 'Coordinator', name: 'Dr. Satya Prakash Yadav', title: 'Associate Professor, CSE', email: 'spycs@mmmut.ac.in' },
                { img: shwetImg, role: 'Co-Coordinator', name: 'Dr. Shwet Ketu', title: 'Assistant Professor, CSE', email: 'skcse@mmmut.ac.in' }
              ].map((coord, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl p-5 border border-pink-500/20 hover:border-pink-400/40 flex flex-col items-center text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={coord.img} alt={coord.name} className="w-24 h-24 rounded-full object-cover border-4 border-pink-500/30 mb-4 shadow-lg shadow-pink-500/20 group-hover:border-pink-400/60" />
                  </motion.div>
                  <p className="text-pink-400 font-bold mb-2 text-sm uppercase tracking-wider">{coord.role}</p>
                  <p className="text-white font-bold text-lg mb-1">{coord.name}</p>
                  <p className="text-sm text-gray-400 mb-2">{coord.title}</p>
                  <motion.p
                    className="text-xs text-pink-300/70 hover:text-pink-300 transition-colors px-3 py-1 bg-pink-500/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >{coord.email}</motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center pt-8 pb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://atalacademy.aicte.gov.in/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white text-xl rounded-full font-bold shadow-2xl shadow-green-500/40 overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.span>
                <span className="relative z-10">Register on ATAL Portal</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FDPDetailsPage;
