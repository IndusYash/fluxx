import React from 'react';
import { motion } from 'framer-motion';
import  type { HOD } from '@/types';
import { Linkedin, Twitter, Mail, Phone, ExternalLink } from 'lucide-react';

interface HODHeroProps {
  hod: HOD;
}

const HODHero: React.FC<HODHeroProps> = React.memo(({ hod }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const socialIcons = [
    ...(hod.socialLinks.linkedin ? [{ icon: Linkedin, href: hod.socialLinks.linkedin, label: 'LinkedIn' }] : []),
    ...(hod.socialLinks.twitter ? [{ icon: Twitter, href: hod.socialLinks.twitter, label: 'Twitter' }] : []),
    ...(hod.socialLinks.researchGate ? [{ icon: ExternalLink, href: hod.socialLinks.researchGate, label: 'ResearchGate' }] : []),
    { icon: Mail, href: `mailto:${hod.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${hod.phone.replace(/[^\d+]/g, '')}`, label: 'Phone' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden rounded-2xl shadow-lg mb-12 border border-white/10 bg-white/5 dark:bg-white/5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div className="space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants} className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300">
                Head of Department
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Meet Our Department Head
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-lg font-medium text-gray-200">{hod.department}</span>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              {hod.message}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="pt-4"
            >
              <h3 className="text-xl font-semibold text-white mb-3">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {hod.specialties.map((specialty, index) => (
                  <motion.span
                    key={specialty}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {specialty}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-4"
            >
              {socialIcons.map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-200 hover:text-blue-400 transition-colors duration-200" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateX(${(mousePosition.y - 200) / 20}deg) rotateY(${(mousePosition.x - 200) / 20}deg)`
                  : 'perspective(1000px) rotateX(0) rotateY(0)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <img
                src={hod.image}
                alt={hod.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{hod.name}</h3>
                  <p className="text-blue-200">{hod.position}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

HODHero.displayName = 'HODHero';

export default HODHero;
