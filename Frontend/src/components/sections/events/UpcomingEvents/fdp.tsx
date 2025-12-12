import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ArrowLeft, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import satvikImg from '@/assets/images/SatvikSir.jpg';
import shantanuImg from '@/assets/images/shantanu.jpg';
import rakeshImg from '@/assets/images/RakeshSir.jpg';
import satyaImg from '@/assets/images/SatyaSir.jpeg';
import shwetImg from '@/assets/images/shwetSir.jpeg';

const FDPDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects (faster, snappier) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.7, 0.35],
            y: scrollY * 0.08,
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.12, 1, 1.12],
            opacity: [0.35, 0.7, 0.35],
            y: -scrollY * 0.08,
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.18, 1],
            rotate: [0, 140, 280],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-800/50 hover:from-gray-700/80 hover:to-gray-700/50 rounded-full text-gray-300 hover:text-white transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 shadow-lg backdrop-blur-sm"
          whileHover={{ x: -6, scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
          className="mb-8 relative"
        >
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent mb-4 relative">
            ATAL Faculty Development Programme
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold leading-relaxed">
            Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability
          </p>
        </motion.div>

        {/* Event Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.32, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div
            className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-150 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.45, ease: 'linear' }}
            >
              <Calendar className="w-7 h-7 text-green-400 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date</p>
              <p className="text-green-300 font-bold text-lg">January 19-24, 2026</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-150 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.35, ease: 'linear' }}
            >
              <MapPin className="w-7 h-7 text-blue-400 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Mode</p>
              <p className="text-blue-300 font-bold text-lg">Online</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.09, duration: 0.34, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 backdrop-blur-sm"
        >
          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.22, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-orange-300">6</p>
            <p className="text-sm text-gray-400">Days Program</p>
          </motion.div>

          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.22, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-cyan-300">8</p>
            <p className="text-sm text-gray-400">Key Topics</p>
          </motion.div>

          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/20"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.22, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Target className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-pink-300">5</p>
            <p className="text-sm text-gray-400">Objectives</p>
          </motion.div>

          <motion.div
            className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.22, type: 'spring', stiffness: 300, damping: 20 }}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.32, ease: 'easeOut' }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-green-500/10 backdrop-blur-sm group"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
              About the Programme
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">
              This AICTE Training and Learning (ATAL) Academy sponsored Faculty Development Programme, organized by the
              Department of Computer Science & Engineering at MMMUT Gorakhpur, offers a comprehensive exploration of
              mechanistic interpretability, a cutting-edge area of AI research focused on understanding the computational
              mechanisms and internal representations learned by neural networks.
            </p>
          </motion.div>

          {/* Key Topics */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
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
                'Ethics, explainability, and responsible AI governance',
              ].map((topic, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 p-3 rounded-lg">
                  <span className="text-blue-400 mt-1 text-xl font-bold">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
              Programme Objectives
            </h3>
            <ul className="space-y-3">
              {[
                'Gain mathematical clarity on core mechanistic interpretability concepts',
                'Learn practical tools and methods to analyze neural networks at different levels',
                "Understand interpretability's role in AI safety and value alignment",
                'Explore emerging trends in interpretability for large models, RL, and vision',
                'Recognize ethical and governance issues linked to interpretability',
              ].map((objective, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 p-3 rounded-lg">
                  <span className="text-purple-400 mt-1 text-xl font-bold">✓</span>
                  <span className="text-base">{objective}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-yellow-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
              Eligibility & Guidelines
            </h3>
            <ul className="space-y-3">
              {[
                {
                  text: 'Faculty members, research scholars, and PG scholars of AICTE-approved institutions',
                  highlight: false,
                },
                { text: 'Industry personnel are eligible to apply', highlight: false },
                { text: 'NO CHARGE for registration, course, and certification', highlight: true },
                { text: 'Certificates will be issued to participants registered on ATAL Portal', highlight: false },
                { text: 'Selection is based on a first-come, first-served basis', highlight: false },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 p-3 rounded-lg">
                  <span className="text-yellow-400 mt-1 text-xl font-bold">→</span>
                  <span
                    className={`text-base ${
                      item.highlight
                        ? 'font-bold text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded'
                        : ''
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Registration Process (now ABOVE coordinators & organisers) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span className="w-1.5 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
              Registration Process
            </h3>

            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Visit ATAL Portal',
                  description:
                    'Access the official AICTE ATAL Academy portal and navigate to the registration page. New users must click on "Sign Up Now" to begin the registration process.',
                },
                {
                  step: '2',
                  title: 'Create Account',
                  description:
                    'Select your role as "Participant" and complete the registration form with accurate details including full name, institutional email address, contact number, institution name, department, and create a secure password.',
                },
                {
                  step: '3',
                  title: 'Email Verification',
                  description:
                    'Check your registered email inbox for a verification link sent by ATAL Academy. Click on the verification link to activate your account before proceeding further.',
                },
                {
                  step: '4',
                  title: 'Complete Profile Information',
                  description:
                    'Log in to your verified account and complete all mandatory fields in your profile including personal information, educational qualifications, professional background, and institutional details.',
                },
                {
                  step: '5',
                  title: 'Programme Registration',
                  description:
                    'Navigate to the FDP section, select "ATAL Online" as the programme type, choose the appropriate month (January 2026) and mode (Online), then select this specific FDP programme and submit your application.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-lg bg-gray-900/50 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 border border-gray-600/50 flex items-center justify-center">
                      <span className="text-gray-300 font-bold text-lg">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-900/60 border border-gray-700/40">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Important Note:</strong> Ensure all information provided is accurate and
                complete. Certificates of completion will be issued exclusively to participants who have successfully
                registered through the official ATAL Portal and meet all attendance requirements.
              </p>
            </div>
          </motion.div>

          {/* Coordinators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.32, ease: 'easeOut' }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-pink-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-pink-400 to-rose-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
              Programme Coordinators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  img: rakeshImg,
                  role: 'Convener',
                  name: 'Dr. Rakesh Kumar',
                  title: 'Professor & HOD, CSE',
                  email: 'rkcs@mmmut.ac.in',
                },
                {
                  img: satyaImg,
                  role: 'Coordinator',
                  name: 'Dr. Satya Prakash Yadav',
                  title: 'Associate Professor, CSE',
                  email: 'spycs@mmmut.ac.in',
                },
                {
                  img: shwetImg,
                  role: 'Co-Coordinator',
                  name: 'Dr. Shwet Ketu',
                  title: 'Assistant Professor, CSE',
                  email: 'skcse@mmmut.ac.in',
                },
              ].map((coord, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl p-5 border border-pink-500/20 hover:border-pink-400/40 flex flex-col items-center text-center group cursor-pointer"
                  whileHover={{ scale: 1.06, y: -6 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={coord.img}
                      alt={coord.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-pink-500/30 mb-4 shadow-lg shadow-pink-500/20 group-hover:border-pink-400/60"
                    />
                  </motion.div>
                  <p className="text-pink-400 font-bold mb-2 text-sm uppercase tracking-wider">
                    {coord.role}
                  </p>
                  <p className="text-white font-bold text-lg mb-1">{coord.name}</p>
                  <p className="text-sm text-gray-400 mb-2">{coord.title}</p>
                  <motion.p
                    className="text-xs text-pink-300/70 hover:text-pink-300 transition-colors px-3 py-1 bg-pink-500/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {coord.email}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Organisers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-150 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span
                className="w-1.5 h-8 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"
                whileHover={{ scaleY: 1.12 }}
                transition={{ duration: 0.18 }}
              />
              Organisers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  img: satvikImg,
                  name: 'Dr. Satvik Vats',
                  title: 'Assistant Professor, CSED, MMMUT Gorakhpur',
                },
                {
                  img: shantanuImg,
                  name: 'Dr. Shantanu Shahi',
                  title: 'Assistant Professor, CSED, MMMUT Gorakhpur',
                },
              ].map((organiser, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-150 group cursor-pointer"
                  whileHover={{ scale: 1.03, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={organiser.img}
                      alt={organiser.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/20 group-hover:border-indigo-400/60"
                    />
                  </motion.div>
                  <div>
                    <p className="text-white font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">
                      {organiser.name}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {organiser.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78 }}
            className="flex justify-center pt-8 pb-12"
          >
            <motion.a
              href="https://atalacademy.aicte.gov.in/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-lg rounded-lg font-semibold shadow-lg border border-green-500/30 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <BookOpen className="w-5 h-5" />
              <span>Register on ATAL Portal</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FDPDetailsPage;
