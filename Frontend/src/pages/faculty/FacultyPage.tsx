import React, { useEffect, useRef, useState } from "react";
import FacultyCard from "./FacultyCard";
import { underGuidance, facultyCoordinators } from "./facultyData";

const FacultyPage: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [observerReady, setObserverReady] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-card-id');
            if (id) {
              setVisibleCards((prev) => new Set(prev).add(id));
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    setObserverReady(true);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const cardRef = (element: HTMLDivElement | null, id: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', id);
      observerRef.current.observe(element);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeSlideUp {
            from { 
              opacity: 0;
              transform: translateY(30px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .card-animate {
            opacity: 1;
            transform: translateY(0);
          }

          .card-animate.observer-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }

          .card-visible {
            animation: fadeSlideUp 0.7s ease-out forwards;
          }

          .gradient-text {
            background-size: 200% auto;
            animation: gradientShift 3s ease-in-out infinite;
          }

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
                <span className="inline-block gradient-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                  UNDER GUIDANCE
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Leading with excellence and inspiring with vision
              </p>

              <div className="flex justify-center flex-col gap-10">
                {underGuidance.map((faculty, index) => {
                  const cardId = `under-guidance-${faculty.id}`;
                  return (
                    <div
                      key={faculty.id}
                      ref={(el) => cardRef(el, cardId)}
                      className={`max-w-4xl mx-auto card-animate ${
                        observerReady ? 'observer-ready' : ''
                      } ${visibleCards.has(cardId) ? 'card-visible' : ''}`}
                      style={{ animationDelay: visibleCards.has(cardId) ? `${index * 0.1}s` : '0s' }}
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
                <span className="inline-block gradient-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                  FACULTY COORDINATORS
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Meet our distinguished faculty experts
              </p>

              <div className="faculty-grid">
                {facultyCoordinators.map((faculty, index) => {
                  const cardId = `coordinator-${faculty.id}`;
                  return (
                    <div
                      key={faculty.id}
                      ref={(el) => cardRef(el, cardId)}
                      className={`card-animate ${
                        observerReady ? 'observer-ready' : ''
                      } ${visibleCards.has(cardId) ? 'card-visible' : ''}`}
                      style={{ animationDelay: visibleCards.has(cardId) ? `${index * 0.08}s` : '0s' }}
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
