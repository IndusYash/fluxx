import React from 'react';
import { HeroSection } from "../../components/sections/about";
import { aboutPageData } from '../../utils/constants/aboutData';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaUsers, FaChalkboardTeacher, FaCode, FaTrophy } from 'react-icons/fa';
import vcImage from '@/assets/images/jpsaini.webp';

const About: React.FC = () => {
  const whatWeDo = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Hackathons & Competitions",
      description: "Ideathon and other coding challenges where students build innovative solutions to real-world problems.",
      color: "#4ade80"
    },
    {
      icon: <FaChalkboardTeacher className="text-3xl" />,
      title: "Expert Sessions & Workshops",
      description: "Industry experts and researchers share insights on AI, emerging tech, and career development.",
      color: "#6CFFF7"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Research & Innovation",
      description: "Supporting faculty and students in research projects, publications, and patent applications.",
      color: "#FFD700"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Faculty Development",
      description: "Organizing programs like ATAL FDP to enhance teaching methodologies and research capabilities.",
      color: "#E4405F"
    }
  ];

  const stats = [
    { number: "40+", label: "Active Members" },
    { number: "5+", label: "Events Annually" },
    { number: "100+", label: "Research Papers Submitted" },
    { number: "500+", label: "Workshop Participants" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection {...aboutPageData.hero} />
      
      {/* Main Content */}
      <main className="relative">
        {/* What We Do Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Terminal-style header */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4 font-mono text-sm text-gray-500">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-2">about@flux:~$</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono">
                <span className="text-[#4ade80]">$</span> cat what_we_do.txt
              </h2>
              <p className="text-gray-400 mt-4 text-lg max-w-3xl">
                FLUX is the research and innovation hub of MMMUT's Computer Science Department. 
                We organize hackathons, expert sessions, and research initiatives that bridge 
                academia and industry.
              </p>
            </div>

            {/* Grid of activities */}
            <div className="grid md:grid-cols-2 gap-8">
              {whatWeDo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg bg-black/50 group-hover:scale-110 transition-transform"
                      style={{ color: item.color, borderColor: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Patron Section - VC Message */}
        <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900/20 to-black">
          <div className="max-w-6xl mx-auto">
            {/* Terminal header */}
            <div className="mb-8 font-mono text-sm text-gray-500">
              <span className="text-[#4ade80]">flux@mmmut</span>:<span className="text-[#6CFFF7]">~</span>$ cat patron_message.txt
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* VC Info */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#4ade80]/30">
                      <img 
                        src={vcImage} 
                        alt="Prof. J. P. Saini" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Prof. J. P. Saini
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Hon'ble Vice Chancellor, MMMUT Gorakhpur
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-4 top-0 text-[#4ade80] text-5xl opacity-20">"</div>
                      <div className="relative pl-4 border-l-2 border-[#4ade80]/30">
                        <p className="text-gray-300 text-lg leading-relaxed italic">
                          FLUX represents our commitment to fostering innovation and research excellence, creating leaders who will drive technological advancement and meaningful societal impact.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 font-mono">
                      <span className="text-[#4ade80]">[✓]</span>
                      <span>Under the guidance of Vice Chancellor</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-y border-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#4ade80] mb-2 font-mono">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section - Simplified */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="font-mono text-sm text-gray-500 mb-4">
                <span className="text-[#4ade80]">flux@mmmut</span>:<span className="text-[#6CFFF7]">~</span>$ cat mission.txt
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-[#4ade80]">Mission</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900/30 to-black border border-gray-800 rounded-lg p-6"
              >
                <div className="text-[#4ade80] text-2xl mb-3">
                  <FaRocket />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Innovate</h3>
                <p className="text-gray-400 text-sm">
                  Foster innovation through hackathons, workshops, and research projects that solve real-world problems.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-900/30 to-black border border-gray-800 rounded-lg p-6"
              >
                <div className="text-[#6CFFF7] text-2xl mb-3">
                  <FaUsers />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Collaborate</h3>
                <p className="text-gray-400 text-sm">
                  Connect students, faculty, and industry experts to create meaningful partnerships and learning opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900/30 to-black border border-gray-800 rounded-lg p-6"
              >
                <div className="text-[#FFD700] text-2xl mb-3">
                  <FaTrophy />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Excel</h3>
                <p className="text-gray-400 text-sm">
                  Strive for excellence in research publications, competitions, and technical skill development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to <span className="text-[#4ade80]">Join Us?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Be part of MMMUT's premier tech community. Participate in hackathons, 
                attend expert sessions, and collaborate on cutting-edge research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/events"
                  className="px-8 py-3 bg-[#4ade80] text-black font-semibold rounded-lg hover:bg-[#3dbd6f] transition-colors"
                >
                  Explore Events
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 border border-[#4ade80] text-[#4ade80] font-semibold rounded-lg hover:bg-[#4ade80]/10 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
