import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

// Import event images
import techConferenceImg from '@/assets/images/tech-conference.jpg';
import designWorkshopImg from '@/assets/images/design-workshop.jpg';
import networkingEventImg from '@/assets/images/networking-event.jpg';
import startupPitchImg from '@/assets/images/startup-pitch.jpg';
import aiSummitImg from '@/assets/images/ai-summit.jpg';
import marketingMasterclassImg from '@/assets/images/marketing-masterclass.jpg';

// Event type definition
interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  location?: string;
  attendees?: number;
}

// Sample events data with obscured dates
const events: Event[] = [
  {
    id: 1,
    title: "Hack-e-thon Series (Bi-Annual)",
    date: "20XX-12-15",
    description: "24-48 hour coding challenges focused on real-world problems.",
    imageUrl: techConferenceImg,
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 500
  },
  {
    id: 2,
    title: "Annual Research Conclave",
    date: "X024-1X-20",
    description: "Invited talks, panel discussions, and technical workshops with experts.",
    imageUrl: designWorkshopImg,
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 150
  },
  {
    id: 3,
    title: "Tech Conferences",
    date: "2024-X2-22",
    description: "Student-led conferences inviting paper submissions and presentations.",
    imageUrl: networkingEventImg,
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 200
  },
  {
    id: 4,
    title: "Workshops & Seminars",
    date: "XX24-11-10",
    description: "Skill-development sessions on tools and research methodologies.",
    imageUrl: startupPitchImg,
    isUpcoming: false,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 300
  },
  {
    id: 5,
    title: "Project Showcases & Demos",
    date: "X0X4-10-25",
    description: "Exhibiting student projects and collaborative works.",
    imageUrl: aiSummitImg,
    isUpcoming: false,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 800
  },
  {
    id: 6,
    title: "Publication Drives",
    date: "2024-1X-15",
    description: "Sessions to guide students in writing and submitting research papers.",
    imageUrl: marketingMasterclassImg,
    isUpcoming: false,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 250
  }
];

const EventsPage: React.FC = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (prefersReduced) {
              el.classList.remove('opacity-0');
              el.classList.add('opacity-100');
              observer.unobserve(el);
              return;
            }

            if (isDesktop()) {
              el.classList.remove('opacity-0');
              el.classList.add('animate-slide-up', 'opacity-100');
            } else {
              el.classList.remove('opacity-0');
              el.classList.add('opacity-100');
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('.scroll-card');
    els.forEach((el) => observer.observe(el));

    // Add animation classes to first three cards after component mounts
    setTimeout(() => {
      const firstThreeCards = document.querySelectorAll('.featured-card');
      firstThreeCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-fade-in-up');
        }, index * 200); // Stagger animation by 200ms
      });
    }, 100);

    const onResize = () => {
      // No-op: existing observer behavior handles new intersections; just keep it for future extension.
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const upcomingEvents = events.filter(event => event.isUpcoming).slice(0, 3);
  const allEvents = events;

  const formatDate = (dateString: string) => {
    if (dateString.includes('X')) {
      const [year, month, day] = dateString.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let monthName = 'XXX';
      if (!month.includes('X')) {
        const monthIndex = parseInt(month) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthName = monthNames[monthIndex];
        }
      }
      
      return `${monthName} ${day}, ${year}`;
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .featured-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        
        /* Responsive animation adjustments */
        @media (max-width: 768px) {
          .featured-card {
            transform: translateY(20px) scale(0.98);
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .featured-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* CHANGED: Complete black background */}
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section - BLACK BACKGROUND */}
        <section className="relative overflow-hidden bg-black py-8 px-4">
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Spotify-style animated bars (hidden on small screens, decorative) */}
          <div className="hidden md:absolute md:top-6 md:left-6 md:flex md:items-end md:gap-1 opacity-20" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-primary rounded-full md:animate-spotify-wave`}
                style={{
                  height: `${16 + i * 8}px`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative container mx-auto max-w-6xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-bounce-in">
              Discover Amazing
              <span className="block bg-gradient-to-r from-white to-primary bg-clip-text text-transparent animate-fade-in-left">
                Events
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-3xl mx-auto opacity-90 animate-slide-up">
              Connect, learn, and grow with industry leaders and innovators at our carefully curated events.
            </p>
          </div>
        </section>

        {/* Event Statistics Bar - BLACK BACKGROUND */}
        <section className="py-6 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center text-white">
              <div className="group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  XX+
                </div>
                <div className="text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  Events Hosted
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  XK+
                </div>
                <div className="text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  Attendees
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  1XX+
                </div>
                <div className="text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  Speakers
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  X+
                </div>
                <div className="text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  Years Running
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section - BLACK BACKGROUND */}
        <section className="py-8 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent animate-fade-in">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-right">
                Don't miss these exciting opportunities to connect and learn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 featured-card border border-gray-800`}
                >
                  <div className="relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index === 0 ? 'h-72' : 'h-56'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Event Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full md:animate-pulse-glow">
                        Upcoming
                      </span>
                    </div>
                    
                    {/* Spotify-style corner decoration */}
                    <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3 mb-2 text-xs opacity-90 text-white">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.date)}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                    <p className="text-white/90 mb-3 line-clamp-2 text-sm">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs opacity-90 text-white">
                        <Users className="w-3 h-3" />
                        {event.attendees} attendees
                      </div>
                      <Button variant="default" size="sm" className="group text-xs">
                        Register Now
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Events Section - BLACK BACKGROUND */}
        <section className="py-8 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white animate-slide-up">All Events</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
                Explore our complete collection of past and upcoming events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEvents.map((event) => (
                <div
                  key={event.id}
                  className={`group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 scroll-card opacity-0 border border-gray-800`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        event.isUpcoming 
                          ? 'bg-primary text-white animate-pulse-glow' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {event.isUpcoming ? 'Upcoming' : 'Past Event'}
                      </span>
                      {event.isUpcoming && (
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" aria-hidden="true"></div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.date)}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-3 line-clamp-2 text-sm">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        {event.attendees} attendees
                      </div>
                      <Button variant={event.isUpcoming ? "default" : "outline"} size="sm" className="group text-xs">
                        {event.isUpcoming ? 'Register' : 'View Details'}
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;
