import React, { useEffect, useRef, useState } from 'react';
import FacultyCard from './FacultyCard';
import { facultyData } from './facultyData';

// Optimized viewport detection hook
function useOnScreen(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
}

const FacultyPage: React.FC = () => {
  // Filter faculty data
  const hodFaculty = facultyData.filter(faculty =>
    faculty.name.toLowerCase().includes('rakesh kumar') ||
    faculty.title.toLowerCase().includes('head of department') ||
    faculty.title.toLowerCase().includes('hod')
  );

  const coordinatorsFaculty = facultyData.filter(faculty =>
    !faculty.name.toLowerCase().includes('rakesh kumar') &&
    !faculty.title.toLowerCase().includes('head of department') &&
    !faculty.title.toLowerCase().includes('hod')
  );

  return (
    <>
      <style>
        {`
          /* Optimized animations with will-change for GPU acceleration */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 30px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translate3d(-50px, 0, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translate3d(50px, 0, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Stable animation classes */
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            will-change: transform, opacity;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
            will-change: transform, opacity;
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out forwards;
            will-change: transform, opacity;
          }

          .animate-gentleFloat {
            animation: gentleFloat 4s ease-in-out infinite;
            will-change: transform;
          }

          .animate-gradientFlow {
            animation: gradientFlow 8s ease-in-out infinite;
            background-size: 200% 200%;
            will-change: background-position;
          }

          /* Stable card transitions */
          .card-container {
            transition: transform 0.3s ease, opacity 0.3s ease;
            will-change: transform, opacity;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          .card-container:hover {
            transform: translateY(-5px) scale(1.02);
          }

          /* Reduced particle system for better performance */
          .particle {
            will-change: transform;
            backface-visibility: hidden;
          }

          /* Prevent layout shifts */
          .section-container {
            contain: layout style paint;
          }

          /* Two column grid for faculty coordinators */
          .faculty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Responsive breakpoints for grid */
          @media (max-width: 768px) {
            .faculty-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      
      {/* Stable background with minimal effects */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white">
        
        {/* Simplified particle system - much fewer particles */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-30">
          {/* Reduced to 8 particles only */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute particle animate-gentleFloat"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
                animationDelay: `${i * 1}s`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400/40 shadow-lg" />
            </div>
          ))}
        </div>

        {/* Stable HOD Section */}
        {hodFaculty.length > 0 && (
          <section className="section-container relative z-10 text-center py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Simplified header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="inline-block animate-gradientFlow bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                    UNDER GUIDANCE
                  </span>
                </h1>
                
                <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                  Leading with excellence and inspiring with vision
                </p>
              </div>

              {/* Stable HOD card */}
              <div className="flex justify-center">
                {hodFaculty.map((faculty, index) => {
                  const ref = useRef<HTMLDivElement>(null);
                  const isVisible = useOnScreen(ref);
                  
                  return (
                    <div 
                      key={faculty.id} 
                      ref={ref}
                      className={`card-container max-w-4xl ${
                        isVisible ? 'animate-fadeInUp' : 'opacity-0'
                      }`}
                      style={{ 
                        animationDelay: isVisible ? `${index * 200}ms` : '0ms'
                      }}
                    >
                      <FacultyCard faculty={faculty} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Stable Faculty Coordinators Section */}
        {coordinatorsFaculty.length > 0 && (
          <section className="section-container relative z-10 text-center py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Simplified header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="inline-block animate-gradientFlow bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                    FACULTY COORDINATORS
                  </span>
                </h1>
                
                <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                  Meet our distinguished faculty experts
                </p>
              </div>

              {/* Two column grid layout for faculty coordinators */}
              <div className="faculty-grid">
                {coordinatorsFaculty.map((faculty, index) => {
                  const ref = useRef<HTMLDivElement>(null);
                  const isVisible = useOnScreen(ref);
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={faculty.id} 
                      ref={ref}
                      className={`card-container ${
                        isVisible 
                          ? (isEven ? 'animate-slideInLeft' : 'animate-slideInRight')
                          : 'opacity-0'
                      }`}
                      style={{ 
                        animationDelay: isVisible ? `${index * 200}ms` : '0ms'
                      }}
                    >
                      <FacultyCard faculty={faculty} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Simple bottom spacing */}
        <div className="h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </>
  );
};

export default FacultyPage;
