import React, { useRef } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import ParticlesContainer from '../common/Particles';

// --- Card Component ---
interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  keyBenefits: string[];
  index: number;
  imageUrl: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ icon, title, description, keyBenefits, index, imageUrl }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1200px', transitionDelay: `${index * 100}ms` }}
      className={`group transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
    >
      {/* Responsive height adjustments for mobile */}
      <div className="relative w-full h-[380px] sm:h-[400px] md:h-[420px] lg:h-[380px] rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-400/70 active:shadow-inner active:shadow-green-600/60 transition-shadow duration-300">
        
        {/* --- FRONT FACE --- */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-1 [backface-visibility:hidden]">
          <div className="relative w-full h-full rounded-xl flex flex-col justify-end p-4 sm:p-6 text-left overflow-hidden bg-black/95">
            <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-emerald-900/20 to-transparent" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-green-400" />
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{title}</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-1 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full h-full rounded-xl bg-black/95 backdrop-blur-lg p-4 sm:p-6 md:p-8 flex flex-col justify-center border-2 border-green-400/40 overflow-hidden">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-black/80 text-xl sm:text-2xl md:text-3xl text-green-400 ring-2 ring-green-400/50">
                {icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-green-400">Key Outcomes</h4>
            </div>
            
            {/* Scrollable container for mobile */}
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-2 sm:space-y-3">
                {keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main ImpactAreas Section ---
const ImpactAreas: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  const impactData = [
    {
      title: 'Impact on Students',
      description: 'Fostering hands-on learning and real-world experience.',
      icon: ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v3.5A2.5 2.5 0 0014.5 20h-5A2.5 2.5 0 007 17.5V14" /></svg>),
      keyBenefits: ['Gain hands-on project experience.', 'Access to in-house and global internships.', 'Develop skills in emerging technologies.', 'Showcase innovation in competitions.', 'Build a strong professional network.'],
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1770&q=80',
    },
    {
      title: 'Impact on Faculty',
      description: 'Creating avenues for mentorship and collaboration.',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
      keyBenefits: ['Encourage a research-driven culture.', 'Facilitate interdisciplinary collaboration.', 'Connect with industry and academic experts.', 'Mentor the next generation of innovators.', 'Identify promising student research talent.'],
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1770&q=80',
    },
    {
      title: 'Impact on Industry',
      description: 'Building a bridge between academia and industry.',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>),
      keyBenefits: ['Access a pool of skilled student talent.', 'Collaborate on innovative startup ideas.', 'Gain fresh perspectives on industry challenges.', 'Shape curriculum through expert talks.', 'Source solutions from hackathon projects.'],
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1770&q=80',
    },
    {
      title: 'Impact on Research',
      description: 'Acting as a catalyst for ideation and innovation.',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>),
      keyBenefits: ['Host student-led technical conferences.', 'Drive publication of research papers.', 'Incubate novel project ideas.', 'Foster interdisciplinary problem-solving.', 'Create a pipeline for graduate-level research.'],
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1770&q=80',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      {/* Pure black background for particles */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      <ParticlesContainer />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            Our <span className="text-green-400">Impact Areas</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
            FLUX acts as a catalyst for ideation, innovation, and interdisciplinary interaction.
          </p>
          {/* Simple green underline */}
          <div className="relative mt-6 mx-auto w-32 sm:w-48 h-1 bg-gray-800 rounded-full">
            <div className="absolute top-0 left-0 h-full w-full rounded-full bg-green-400"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-10 lg:gap-y-16 max-w-6xl mx-auto">
          {impactData.map((area, index) => (
            <ImpactCard key={index} {...area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactAreas;
