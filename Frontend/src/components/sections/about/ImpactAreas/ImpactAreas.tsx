import React, { useRef, useState } from 'react';
import hackathonImg from '@/assets/images/hackathon.webp';
import expertImg from '@/assets/images/expert.webp';
import networkingImg from '@/assets/images/networking-event.webp';
import aiSummitImg from '@/assets/images/ai-summit.webp';

// --- Card Component ---
interface ImpactCardProps {
  title: string;
  description: string;
  index: number;
  imageUrl: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ title, description, index, imageUrl, icon, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-[420px] sm:h-[440px] md:h-[460px] rounded-2xl shadow-lg shadow-white/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/20 active:shadow-inner active:shadow-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-full rounded-xl flex flex-col justify-end p-5 sm:p-6 text-left overflow-hidden bg-black/95">
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${isActive ? 'border-white/80' : 'border-transparent group-hover:border-white/40'}`} />
      
        <div className="relative z-10">
          {isActive && (
            <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white">
              {icon}
            </div>
          )}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{title}</h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main ImpactAreas Section ---
const ImpactAreas: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const impactData = [
    {
      title: 'Impact on Students',
      description: 'Empowering students through hands-on learning, real-world projects, and industry exposure.',
      imageUrl: hackathonImg,
      icon: ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v3.5A2.5 2.5 0 0014.5 20h-5A2.5 2.5 0 007 17.5V14" /></svg>),
    },
    {
      title: 'Impact on Faculty',
      description: 'Creating avenues for mentorship, research collaboration, and professional growth.',
      imageUrl: expertImg,
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
    },
    {
      title: 'Impact on Industry',
      description: 'Building a strong bridge between academia and industry for real-world innovation.',
      imageUrl: networkingImg,
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>),
    },
    {
      title: 'Impact on Research',
      description: 'Catalyzing ideation, innovation, and interdisciplinary research excellence.',
      imageUrl: aiSummitImg,
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>),
    },
  ];

  return (
      <section className="relative py-20 lg:py-32 bg-[#020202] text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            Our <span className="text-white">Impact Areas</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4 text-center">
            FLUX acts as a catalyst for ideation, innovation, and interdisciplinary interaction.
          </p>
          <div className="relative mt-6 mx-auto w-32 sm:w-48 h-1 bg-gray-800 rounded-full">
            <div className="absolute top-0 left-0 h-full w-full rounded-full bg-white"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-10 lg:gap-y-16 max-w-6xl mx-auto">
          {impactData.map((area, index) => (
            <ImpactCard 
              key={index} 
              {...area} 
              index={index} 
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactAreas;
