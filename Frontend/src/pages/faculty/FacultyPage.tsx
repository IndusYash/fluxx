import React, { useEffect, useRef, useState } from 'react';
import FacultyCard from './FacultyCard';
import { facultyData } from './facultyData';

// Custom hook to detect when element is in viewport
function useOnScreen(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
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
  return (
    <>
      <style>
        {`
          @keyframes floatX {
            0%, 100% { transform: translateX(0) translateY(0); }
            33% { transform: translateX(30px) translateY(-20px); }
            66% { transform: translateX(-30px) translateY(20px); }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40px) translateX(15px); }
          }
          @keyframes drift {
            0% { transform: translateX(-100px) translateY(0); }
            100% { transform: translateX(100vw) translateY(-50px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-floatX {
            animation: floatX 8s ease-in-out infinite;
          }
          .animate-floatY {
            animation: floatY 6s ease-in-out infinite;
          }
          .animate-drift {
            animation: drift 15s linear infinite;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          /* Custom scroll animation classes for top-to-bottom effect */
          .card-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .card-visible {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        `}
      </style>
      
      {/* Pure black background */}
      <div className="min-h-screen relative overflow-hidden bg-black">
        
        {/* Reduced Particles for Better Performance */}
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          {/* FloatX particles - reduced to 15 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`floatX-${i}`}
              className="absolute rounded-full bg-green-400/30 animate-floatX"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}

          {/* FloatY particles - reduced to 15 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`floatY-${i}`}
              className="absolute rounded-full bg-emerald-400/25 animate-floatY"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}

          {/* Drift particles - reduced to 8 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`drift-${i}`}
              className="absolute rounded-full bg-teal-400/20 animate-drift"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
              }}
            />
          ))}

          {/* Simple float particles - reduced to 20 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`float-${i}`}
              className="absolute rounded-full bg-green-300/15 animate-float"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* ✅ HEADER SECTION ✅ */}
        <div className="relative z-10 text-center pt-6 pb-8 px-4 md:px-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 
                           font-display font-black mb-4 md:mb-6 
                           bg-gradient-to-r from-gray-200 via-green-400 via-blue-400 via-purple-400 via-green-400 to-gray-200 
                           bg-clip-text text-transparent bg-[length:400%_400%]
                           leading-tight tracking-wide px-2 animate-pulse">
              FACULTY <span className="bg-gradient-to-r from-green-400 via-emerald-400 via-teal-400 to-green-400 
                                     bg-clip-text text-transparent bg-[length:200%_200%] animate-bounce">
                COORDINATORS
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl lg:text-2xl xl:text-3xl 
                          leading-relaxed mb-6 
                          max-w-sm md:max-w-3xl lg:max-w-4xl mx-auto font-sans px-4">
              Meet our distinguished faculty coordinators who are experts in their respective fields
            </p>
            
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-6">
              <div className="w-16 h-0.5 md:w-24 md:h-1 lg:w-32 lg:h-1 
                              bg-gradient-to-r from-transparent via-green-400 via-blue-400 to-transparent 
                              rounded-full animate-pulse"></div>
              <div className="relative">
                <div className="w-4 h-4 md:w-5 md:h-5 
                                bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 
                                rounded-full shadow-lg animate-spin"></div>
                <div className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 
                                bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                                rounded-full animate-ping opacity-60"></div>
              </div>
              <div className="w-16 h-0.5 md:w-24 md:h-1 lg:w-32 lg:h-1 
                              bg-gradient-to-r from-transparent via-blue-400 via-green-400 to-transparent 
                              rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Faculty Cards Grid with Top-to-Bottom Scroll Animation */}
        <div className="relative z-10 px-6 md:px-8 lg:px-10 pb-16 md:pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 lg:space-y-16">
            {facultyData.map((faculty, index) => {
              const ref = useRef<HTMLDivElement>(null);
              const isVisible = useOnScreen(ref);
              
              return (
                <div
                  key={faculty.id}
                  ref={ref}
                  className={isVisible ? 'card-visible' : 'card-hidden'}
                  style={{ 
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms' 
                  }}
                >
                  <FacultyCard faculty={faculty} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyPage;
