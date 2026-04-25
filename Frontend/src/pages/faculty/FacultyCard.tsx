import React from 'react';
import { Mail, Linkedin, Globe } from 'lucide-react';
import { FacultyMember } from './facultyData';

interface FacultyCardProps {
  faculty: FacultyMember;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  // Helper function to render metrics based on faculty ID
  const renderMetrics = () => {
  // UNDER GUIDANCE (Both: Saini + Rakesh)
  if (faculty.id === 100 || faculty.id === 101) {
    return (
      <>
        {faculty.teachingExperienceUG && (
          <MetricItem value={`${faculty.teachingExperienceUG}+`} label="UG Years" />
        )}
        {faculty.teachingExperiencePG && (
          <MetricItem value={`${faculty.teachingExperiencePG}+`} label="PG Years" />
        )}
        {faculty.seminarsOrganised && (
          <MetricItem value={`${faculty.seminarsOrganised}+`} label="Seminars Org" />
        )}
        {faculty.seminarsAttended && (
          <MetricItem value={`${faculty.seminarsAttended}+`} label="Seminars Att" />
        )}
        {faculty.mtechSupervised && (
          <MetricItem value={`${faculty.mtechSupervised}+`} label="M.Tech" />
        )}
        {faculty.phdSupervised && (
          <MetricItem value={`${faculty.phdSupervised}+`} label="Ph.D" />
        )}
      </>
    );
  }

  // FACULTY COORDINATORS (existing logic)
  switch (faculty.id) {
    case 1:
      return (
        <>
          {faculty.articles && <MetricItem value={faculty.articles} label="Articles" />}
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.experience && <MetricItem value={`${faculty.experience}+`} label="Years" />}
          {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" />}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
        </>
      );

    case 2:
      return (
        <>
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.projectPublications && <MetricItem value={faculty.projectPublicications} label="Projects" />}
          {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" />}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
        </>
      );

    case 3:
      return (
        <>
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.internationalConferences && (
            <MetricItem value={faculty.internationalConferences} label="Intl Conf" />
          )}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
          {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" />}
           {faculty.booksPublished && <MetricItem value={faculty.booksPublished} label="Books" />}
        </>
      );

      case 4:
      return (
        <>
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.internationalConferences && (
            <MetricItem value={faculty.internationalConferences} label="Intl Conf" />
          )}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
          {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" />}
        </>
      );
      case 5:
      return (
        <>
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.internationalConferences && (
            <MetricItem value={faculty.internationalConferences} label="Intl Conf" />
          )}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
          {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" />}
        </>
      );
      case 6:
      return (
        <>
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.internationalConferences && (
            <MetricItem value={faculty.internationalConferences} label="Intl Conf" />
          )}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
          {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" />}
        </>
      );
      case 7:
      return (
        <>
          {faculty.citations && <MetricItem value={faculty.citations} label="Citations" />}
          {faculty.patents && <MetricItem value={faculty.patents} label="Patents" />}
          {faculty.internationalConferences && (
            <MetricItem value={faculty.internationalConferences} label="Intl Conf" />
          )}
          {faculty.internationalPublications && (
            <MetricItem value={faculty.internationalPublications} label="Intl Pubs" />
          )}
          {faculty.organisations && <MetricItem value={faculty.organisations} label="Orgs" />}
          {faculty.review && <MetricItem value={`${faculty.review}+`} label="Reviews" />}
        </>
      );

    default:
      return null;
  }
};


  return (
    <div className="relative w-full h-full
                    bg-gradient-to-br from-gray-900 via-gray-950 to-black
                    rounded-3xl p-6 md:p-8 
                    border-2 border-green-400/40
                    transition-all duration-500 ease-out 
                    hover:transform hover:scale-[1.02] 
                    hover:-translate-y-2
                    hover:shadow-2xl hover:shadow-green-400/20
                    hover:border-green-400/60
                    cursor-pointer group
                    backdrop-blur-sm
                    flex flex-col">
      
      {/* Content Layer */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-white h-full">
        
        {/* Profile Section */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          
          {/* Profile Image */}
          <div className="relative group/image mb-4">
            <img 
              src={faculty.profileImage} 
              alt={faculty.name}
              className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
                         rounded-2xl border-3 border-green-400/60 
                         object-cover transition-all duration-300 
                         group-hover:scale-105 group-hover:border-green-300/80
                         shadow-lg contrast-110 saturate-110"
            />
            
            {/* Status indicator */}
            <div className="absolute -bottom-2 -right-2 
                            w-6 h-6 md:w-7 md:h-7 
                            rounded-full border-3 border-white 
                            bg-gradient-to-r from-green-400 to-emerald-500
                            shadow-lg">
              <div className="absolute inset-[2px] rounded-full 
                              bg-gradient-to-r from-white/90 to-green-100/90
                              animate-pulse"></div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-row md:flex-col gap-3">
            {faculty.linkedinUrl && (
              <SocialLink href={faculty.linkedinUrl} icon={<Linkedin size={16} />} />
            )}
            
            {faculty.websiteUrl && (
              <SocialLink href={faculty.websiteUrl} icon={<Globe size={16} />} />
            )}
            
            {faculty.googleScholarUrl && (
              <SocialLink 
                href={faculty.googleScholarUrl} 
                icon={
                  <div className="w-4 h-4 bg-gray-300 group-hover/link:bg-green-200 
                                  transition-colors duration-300 rounded-sm text-xs 
                                  flex items-center justify-center font-bold text-black">
                    G
                  </div>
                } 
              />
            )}
            
            <SocialLink href={`mailto:${faculty.email}`} icon={<Mail size={16} />} />
          </div>
        </div>

        {/* Faculty Information - Using flex-1 and flex column with justify-between */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          
          {/* Header Info */}
          <div className="flex-shrink-0 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 
                           text-gray-100 leading-tight
                           group-hover:text-green-100 transition-colors duration-300">
              {faculty.name}
            </h3>
            <div className="text-lg md:text-xl font-semibold mb-2 
                            text-green-400 group-hover:text-green-300 transition-colors duration-300">
              {faculty.title}
            </div>
            <p className="text-gray-400 text-sm md:text-base mb-3 
                          group-hover:text-gray-300 transition-colors duration-300">
              {faculty.department}
            </p>
            
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3
                          group-hover:text-gray-400 transition-colors duration-300">
              {faculty.description}
            </p>
          </div>

          {/* Middle section that grows to fill space */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {renderMetrics()}
            </div>
          </div>

          {/* Bottom section - Specialization Tags (consistent for all) */}
          <div className="flex-shrink-0">
            <div className="flex flex-wrap gap-2 justify-start">
              {faculty.specialization.slice(0, 3).map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-green-400/15 to-emerald-400/10 
                             backdrop-blur-sm border border-green-400/30 
                             px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium 
                             transition-all duration-300 hover:bg-green-400/25 
                             text-gray-300 hover:text-green-200 
                             hover:border-green-300/60 flex-shrink-0"
                >
                  {skill.length > 15 ? skill.substring(0, 13) + '...' : skill}
                </span>
              ))}
              {faculty.specialization.length > 3 && (
                <span className="bg-gradient-to-r from-green-400/15 to-emerald-400/10 
                                 backdrop-blur-sm border border-green-400/30 
                                 px-3 py-1.5 rounded-xl text-xs md:text-sm 
                                 font-medium text-gray-300 flex-shrink-0">
                  +{faculty.specialization.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center group/metric">
    <div className="text-xl md:text-2xl font-bold 
                    text-green-400 group-hover:text-green-300 transition-colors duration-300 
                    group-hover/metric:scale-110 transition-transform duration-300">
      {value}
    </div>
    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
      {label}
    </div>
  </div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 bg-green-400/15 backdrop-blur-sm border border-green-400/40 
               rounded-xl transition-all duration-300 
               hover:bg-green-400/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-400/40
               hover:border-green-300/70 group/link
               hover:scale-110"
  >
    <div className="text-gray-300 group-hover/link:text-green-200 transition-colors duration-300">
      {icon}
    </div>
  </a>
);

export default FacultyCard;
