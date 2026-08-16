import React from 'react';
import { Mail, Linkedin, Globe } from 'lucide-react';
import { FacultyMember } from './facultyData';
import { motion } from 'framer-motion';

interface FacultyCardProps {
  faculty: FacultyMember;
  idx?: number;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty, idx = 0 }) => {
  // Accent colors based on whether it's HOD or Coordinator
  const isHOD = faculty.id === 100 || faculty.id === 101;
  const accentColor = isHOD ? '#00FFC6' : '#a78bfa';
  const shadowColor = isHOD ? 'rgba(0, 255, 198, 0.15)' : 'rgba(167, 139, 250, 0.15)';
  const borderColorHover = isHOD ? 'rgba(0, 255, 198, 0.4)' : 'rgba(167, 139, 250, 0.4)';

  // Helper function to render metrics based on faculty ID
  const renderMetrics = () => {
    // UNDER GUIDANCE (Both: Saini + Rakesh)
    if (faculty.id === 100 || faculty.id === 101) {
      return (
        <>
          {faculty.teachingExperienceUG && <MetricItem value={`${faculty.teachingExperienceUG}+`} label="UG Years" color={accentColor} />}
          {faculty.teachingExperiencePG && <MetricItem value={`${faculty.teachingExperiencePG}+`} label="PG Years" color={accentColor} />}
          {faculty.seminarsOrganised && <MetricItem value={`${faculty.seminarsOrganised}+`} label="Seminars Org" color={accentColor} />}
          {faculty.seminarsAttended && <MetricItem value={`${faculty.seminarsAttended}+`} label="Seminars Att" color={accentColor} />}
          {faculty.mtechSupervised && <MetricItem value={`${faculty.mtechSupervised}+`} label="M.Tech" color={accentColor} />}
          {faculty.phdSupervised && <MetricItem value={`${faculty.phdSupervised}+`} label="Ph.D" color={accentColor} />}
        </>
      );
    }

    // FACULTY COORDINATORS (existing logic)
    switch (faculty.id) {
      case 1:
        return (
          <>
            {faculty.articles && <MetricItem value={faculty.articles} label="Articles" color={accentColor} />}
            {faculty.citations && <MetricItem value={faculty.citations} label="Citations" color={accentColor} />}
            {faculty.experience && <MetricItem value={`${faculty.experience}+`} label="Years" color={accentColor} />}
            {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" color={accentColor} />}
            {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" color={accentColor} />}
          </>
        );

      case 2:
        return (
          <>
            {faculty.patents && <MetricItem value={faculty.patents} label="Patents" color={accentColor} />}
            {faculty.citations && <MetricItem value={faculty.citations} label="Citations" color={accentColor} />}
            {faculty.projectPublications && <MetricItem value={faculty.projectPublicications} label="Projects" color={accentColor} />}
            {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" color={accentColor} />}
            {faculty.internationalPublications && <MetricItem value={faculty.internationalPublications} label="Intl Pubs" color={accentColor} />}
          </>
        );

      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <>
            {faculty.citations && <MetricItem value={faculty.citations} label="Citations" color={accentColor} />}
            {faculty.patents && <MetricItem value={faculty.patents} label="Patents" color={accentColor} />}
            {faculty.internationalConferences && <MetricItem value={faculty.internationalConferences} label="Intl Conf" color={accentColor} />}
            {faculty.internationalPublications && <MetricItem value={faculty.internationalPublications} label="Intl Pubs" color={accentColor} />}
            {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" color={accentColor} />}
            {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" color={accentColor} />}
            {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" color={accentColor} />}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (idx % 10) * 0.1 }}
      className="group relative flex w-full"
    >
      <div 
        className="w-full bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-white/10"
        style={{
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = borderColorHover;
          e.currentTarget.style.boxShadow = `0 20px 50px ${shadowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
        }}
      >
        
        {/* Subtle Top Glow Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

        {/* Content Layer */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-white h-full relative z-10">
          
          {/* Profile Section */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            
            {/* Profile Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500">
              <img 
                src={faculty.profileImage} 
                alt={faculty.name}
                className="w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>

            {/* Social Links */}
            <div className="flex flex-row md:flex-col gap-3">
              {faculty.linkedinUrl && (
                <SocialLink href={faculty.linkedinUrl} icon={<Linkedin size={18} />} color={accentColor} />
              )}
              {faculty.websiteUrl && (
                <SocialLink href={faculty.websiteUrl} icon={<Globe size={18} />} color={accentColor} />
              )}
              {faculty.googleScholarUrl && (
                <SocialLink 
                  href={faculty.googleScholarUrl} 
                  icon={
                    <div className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]">
                      G
                    </div>
                  } 
                  color={accentColor}
                />
              )}
              <SocialLink href={`mailto:${faculty.email}`} icon={<Mail size={18} />} color={accentColor} />
            </div>
          </div>

          {/* Faculty Information */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            
            {/* Header Info */}
            <div className="flex-shrink-0 mb-6">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                {faculty.name}
              </h3>
              <div className="text-sm md:text-base font-semibold tracking-wider uppercase mb-2" style={{ color: accentColor }}>
                {faculty.title}
              </div>
              <p className="text-white/60 text-xs md:text-sm tracking-wider uppercase mb-4">
                {faculty.department}
              </p>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                {faculty.description}
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex-1 flex flex-col justify-center mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {renderMetrics()}
              </div>
            </div>

            {/* Specialization Tags */}
            <div className="flex-shrink-0 border-t border-white/5 pt-5">
              <div className="flex flex-wrap gap-2 justify-start">
                {faculty.specialization.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${accentColor}20`;
                      e.currentTarget.style.borderColor = `${accentColor}50`;
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#d1d5db';
                    }}
                  >
                    {skill.length > 20 ? skill.substring(0, 18) + '...' : skill}
                  </span>
                ))}
                {faculty.specialization.length > 4 && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db' }}>
                    +{faculty.specialization.length - 4}
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper Components
const MetricItem: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div className="text-left group/metric">
    <div className="text-2xl md:text-3xl font-bold mb-1 transition-transform origin-left group-hover/metric:scale-110" style={{ color: color }}>
      {value}
    </div>
    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">
      {label}
    </div>
  </div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; color: string }> = ({ href, icon, color }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1"
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = `${color}20`;
      e.currentTarget.style.borderColor = `${color}50`;
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.boxShadow = `0 10px 20px ${color}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      e.currentTarget.style.color = 'inherit';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div className="text-gray-400 transition-colors">
      {icon}
    </div>
  </a>
);

export default FacultyCard;
