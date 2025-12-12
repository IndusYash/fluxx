import React, { useEffect, useRef, useState } from "react";
import FacultyCard from "./FacultyCard";
import { underGuidance, facultyCoordinators } from "./facultyData";

// Optimized viewport detection hook
function useOnScreen(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => ref.current && observer.unobserve(ref.current);
  }, [ref]);

  return isIntersecting;
}

const FacultyPage: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate3d(0, 30px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translate3d(-50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInRight {
            from { opacity: 0; transform: translate3d(50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
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

          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
          .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
          .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
          .animate-gentleFloat { animation: gentleFloat 4s ease-in-out infinite; }

          .faculty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          @media (max-width: 768px) {
            .faculty-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white">
        
        {/* UNDER GUIDANCE SECTION */}
        {underGuidance.length > 0 && (
          <section className="relative z-10 text-center py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="inline-block animate-gradientFlow bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                  UNDER GUIDANCE
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Leading with excellence and inspiring with vision
              </p>

              <div className="flex justify-center flex-col gap-10">
                {underGuidance.map((faculty, index) => {
                  const ref = useRef<HTMLDivElement>(null);
                  const isVisible = useOnScreen(ref);

                  return (
                    <div
                      key={faculty.id}
                      ref={ref}
                      className={`max-w-4xl mx-auto ${
                        isVisible ? "animate-fadeInUp" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <FacultyCard faculty={faculty} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* FACULTY COORDINATORS SECTION */}
        {facultyCoordinators.length > 0 && (
          <section className="relative z-10 text-center py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="inline-block animate-gradientFlow bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                  FACULTY COORDINATORS
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Meet our distinguished faculty experts
              </p>

              <div className="faculty-grid">
                {facultyCoordinators.map((faculty, index) => {
                  const ref = useRef<HTMLDivElement>(null);
                  const isVisible = useOnScreen(ref);

                  return (
                    <div
                      key={faculty.id}
                      ref={ref}
                      className={`${
                        isVisible
                          ? index % 2 === 0
                            ? "animate-slideInLeft"
                            : "animate-slideInRight"
                          : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <FacultyCard faculty={faculty} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  );
};

export default FacultyPage;
