import React from "react";
import { Mail, Linkedin, Globe } from "lucide-react";
import type { FacultyMember } from "./facultyData";

interface FacultyCardProps {
  faculty: FacultyMember;
  idx?: number;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty, idx = 0 }) => {
  const accentColor = "#E5E5E5";

  const renderMetrics = () => {
    if (faculty.id === 0 || faculty.id === 1) {
      return null;
    }

    switch (faculty.id) {
      case 4:
        return (
          <>
            {faculty.patents && (
              <MetricItem value={faculty.patents} label="Patents" color={accentColor} />
            )}
            {faculty.citations && (
              <MetricItem value={faculty.citations} label="Citations" color={accentColor} />
            )}
            {faculty.projectPublications && (
              <MetricItem
                value={faculty.projectPublications}
                label="Projects"
                color={accentColor}
              />
            )}
            {faculty.booksPublished && (
              <MetricItem
                value={faculty.booksPublished}
                label="Books"
                color={accentColor}
              />
            )}
            {faculty.internationalPublications && (
              <MetricItem
                value={faculty.internationalPublications}
                label="Intl Pubs"
                color={accentColor}
              />
            )}
          </>
        );

      case 5:
        return (
          <>
            {faculty.citations && (
              <MetricItem value={faculty.citations} label="Citations" color={accentColor} />
            )}
            {faculty.patents && (
              <MetricItem value={faculty.patents} label="Patents" color={accentColor} />
            )}
            {faculty.internationalConferences && (
              <MetricItem
                value={faculty.internationalConferences}
                label="Intl Conf"
                color={accentColor}
              />
            )}
            {faculty.internationalPublications && (
              <MetricItem
                value={faculty.internationalPublications}
                label="Intl Pubs"
                color={accentColor}
              />
            )}
            {faculty.organisations && (
              <MetricItem value={faculty.organisations} label="Orgs" color={accentColor} />
            )}
            {faculty.review && (
              <MetricItem
                value={`${faculty.review}+`}
                label="Reviews"
                color={accentColor}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="group relative flex w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

      <div
        className="card-outline relative w-full bg-white/[0.03] backdrop-blur-[12px] rounded-[2rem] p-6 md:p-8 flex flex-col transition-all duration-500 hover:translate-y-0 overflow-hidden border border-white/10 group-hover:border-white/30"
        style={{
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glass morphism top glow strip */}
        <div
          className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Content Layer */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-white h-full relative z-10">
          {/* Profile Section */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500">
              <img
                src={faculty.profileImage}
                alt={faculty.name}
                className="w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ imageRendering: "crispEdges" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
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
              <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide">
                {faculty.name}
              </h3>
              <div
                className="text-sm md:text-base font-semibold tracking-wider uppercase mb-2"
                style={{ color: accentColor }}
              >
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
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#d1d5db",
                    }}
                  >
                    {skill.length > 20 ? skill.substring(0, 18) + "..." : skill}
                  </span>
                ))}
                {faculty.specialization.length > 4 && (
                  <span
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#9ca3af",
                    }}
                  >
                    +{faculty.specialization.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Glass morphism bottom edge glow */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/0 to-transparent"
            style={{ opacity: 0.02 }}
          />
        </div>
      </div>
    </div>
  );
};

const MetricItem: React.FC<{ value: string; label: string; color: string }> = ({
  value,
  label,
  color,
}) => (
  <div className="text-left group/metric">
    <div
      className="text-2xl md:text-3xl font-bold mb-1 transition-transform origin-left group-hover/metric:scale-110"
      style={{ color: color }}
    >
      {value}
    </div>
    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">
      {label}
    </div>
  </div>
);

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  color: string;
}> = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group/social"
    style={{ color: "inherit" }}
  >
    <div
      className="absolute -inset-2 opacity-0 group-hover/social:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
      }}
    />
    <div className="text-gray-400 transition-colors group-hover/social:text-white relative z-10">
      {icon}
    </div>
  </a>
);

export default FacultyCard;
