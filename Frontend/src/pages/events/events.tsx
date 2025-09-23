import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MagicBentoGrid from '@/components/ui/MagicBentoEvents';
import {
  Calendar, MapPin, Users, ArrowRight, Code, Presentation, FileText, Trophy, Lightbulb, Sparkles, Zap} from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Import event images
import techConferenceImg from '@/assets/images/tech-conference.jpg';
import designWorkshopImg from '@/assets/images/design-workshop.jpg';
import networkingEventImg from '@/assets/images/networking-event.jpg';
import fluxxgfgImg from '@/assets/images/flux-x-gfg.png';
import startupPitchImg from '@/assets/images/startup-pitch.jpg';
import aiSummitImg from '@/assets/images/ai-summit.jpg';
import marketingMasterclassImg from '@/assets/images/marketing-masterclass.jpg';

//magic bento
<MagicBentoGrid
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  location?: string;
  attendees?: number;
  category: 'Tech' | 'Design' | 'Business' | 'Research';
  prize?: string;
  featured?: boolean;
}

// Activity type definition
interface Activity {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  imageUrl: string;
  color: string;
}

// Sample events data with obscured dates
const events: Event[] = [
  {
    id: 1,
    title: "IDEATHON 2025: Innovation Unleashed",
    date: "2025-03-15",
    description: "The ultimate 48-hour innovation marathon where brilliant minds collide to solve tomorrow's challenges. Present your groundbreaking ideas and compete for glory!",
    imageUrl: fluxxgfgImg,
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 1000,
    category: "Tech",
    prize: "50,000",
    featured: true,
  },
  {
    id: 2,
    title: "Hack-e-thon Series (Bi-Annual)",
    date: "2025-12-15",
    description: "24-48 hour coding challenges focused on real-world problems. Build, innovate, and win!",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 500,
    category: "Tech",
  },
  {
    id: 3,
    title: "Annual Research Conclave",
    date: "2024-11-20",
    description: "Invited talks, panel discussions, and technical workshops with leading experts from academia and industry.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 150,
    category: "Research",
  },
  {
    id: 4,
    title: "Tech Conferences",
    date: "2024-12-22",
    description: "Student-led conferences inviting paper submissions and presentations on cutting-edge topics.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    isUpcoming: true,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 200,
    category: "Tech",
  },
  {
    id: 5,
    title: "Workshops & Seminars",
    date: "2024-11-10",
    description: "Hands-on, skill-development sessions covering tools and research methodologies for future-proof careers.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    isUpcoming: false,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 300,
    category: "Design",
  },
  {
    id: 6,
    title: "Project Showcases & Demos",
    date: "2024-10-25",
    description: "An exhibition showcasing innovative student projects and collaborative works. See what's next in tech.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    isUpcoming: false,
    location: "CSED, MMMUT, Gorakhpur",
    attendees: 800,
    category: "Business",
  },
];


// Activities data
const activities: Activity[] = [
  {
    id: 1,
    title: "Hackathons",
    description: "Intensive coding competitions where innovation meets collaboration. Solve real-world problems in 24-48 hours.",
    icon: <Code className="w-8 h-8" />,
    features: ["24-48 Hour Challenges", "Real-world Problems", "Team Collaboration", "Prize Competitions"],
    imageUrl: techConferenceImg,
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    title: "Conferences",
    description: "Professional gatherings featuring industry experts, thought leaders, and cutting-edge research presentations.",
    icon: <Presentation className="w-8 h-8" />,
    features: ["Expert Speakers", "Panel Discussions", "Networking Sessions", "Industry Insights"],
    imageUrl: designWorkshopImg,
    color: "from-green-600 to-teal-600"
  },
  {
    id: 3,
    title: "Research Paper Presentations",
    description: "Academic showcases where students and researchers present their findings and innovative solutions.",
    icon: <FileText className="w-8 h-8" />,
    features: ["Academic Research", "Peer Review", "Publication Support", "Knowledge Sharing"],
    imageUrl: networkingEventImg,
    color: "from-orange-600 to-red-600"
  }
];

const EventsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Tech' | 'Design' | 'Business' | 'Research'>('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFeaturedEvent, setShowFeaturedEvent] = useState(false);
  const [lightbulbGlow, setLightbulbGlow] = useState(false);

  const featuredEvent = events.find(event => event.featured) || events[0];
  const filteredEvents = activeCategory === 'All'
    ? events.filter(e => !e.featured)
    : events.filter(event => event.category === activeCategory && !event.featured);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoaded(true), 300);
    const timer2 = setTimeout(() => setLightbulbGlow(true), 800);
    const timer3 = setTimeout(() => setShowFeaturedEvent(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
        {/* ... hero section and featured events section */}

        {/* What We Do Section */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                We organize diverse events that foster learning, innovation, and collaboration in the tech community.
              </p>
            </div>
            {/* Pass the activities data as a prop */}
            <MagicBentoGrid activities={activities} />
          </div>
        </section>
      </div>

    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Enhanced Animations and Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes lightbulbGlow {
          0% { 
            filter: drop-shadow(0 0 0px rgba(34, 197, 94, 0));
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 60px rgba(34, 197, 94, 0.4));
            transform: scale(1.1);
          }
          100% { 
            filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 40px rgba(34, 197, 94, 0.3));
            transform: scale(1.05);
          }
        }
        @keyframes revealSlide {
          0% { 
            transform: translateY(100px) rotateX(-45deg);
            opacity: 0;
            filter: blur(10px);
          }
          100% { 
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }
        @keyframes morphReveal {
          0% { 
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
            border-radius: 50%;
          }
          50% {
            transform: scale(0.8) rotate(5deg);
            opacity: 0.7;
            border-radius: 30px;
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
            border-radius: 24px;
          }
        }
        @keyframes slideInUp {
          0% { transform: translateY(100px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes textReveal {
          0% { 
            transform: translateY(50px) rotateX(90deg);
            opacity: 0;
          }
          100% { 
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(34, 197, 94, 0.2); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-lightbulb-glow { animation: lightbulbGlow 2s ease-out forwards; }
        .animate-reveal-slide { animation: revealSlide 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-morph-reveal { animation: morphReveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-in-up { animation: slideInUp 0.8s ease-out; }
        .animate-text-reveal { animation: textReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
        
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff 25%, #22c55e 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        .card-transform {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-transform:hover {
          transform: translateY(-20px) rotateX(10deg) rotateY(-5deg) scale(1.02);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]"></div>
        </div>

        <div className={`relative container mx-auto max-w-7xl text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`mb-8 ${lightbulbGlow ? 'animate-lightbulb-glow' : ''}`}>
            <Lightbulb className="w-20 h-20 mx-auto text-green-500" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 shimmer-text">
            Step Into the Future
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
            Explore events, workshops, and conferences crafted for the innovators of tomorrow.
          </p>

          <div className="flex justify-center items-center gap-4 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
            <span className="text-green-400 font-semibold">Innovation Awaits</span>
            <Zap className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured IDEATHON Section - Completely Transformed */}
      <section className="py-20 px-4 md:px-8 relative bg-black overflow-hidden perspective-1000">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 via-black to-green-900/5"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header with Reveal Animation */}
          <div className={`text-center mb-16 ${showFeaturedEvent ? 'animate-text-reveal' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-green-500 animate-glow-pulse" />
              <span className="text-green-400 font-semibold text-lg">Featured Event</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-white to-green-400 bg-clip-text text-transparent">
              Transforming Ideas
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Main Featured Card with Morphing Reveal */}
          <div className={`transform-style-3d ${showFeaturedEvent ? 'animate-morph-reveal' : 'opacity-0 scale-0'}`}>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border-2 border-green-500/30 card-transform animate-glow-pulse">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 blur-xl"></div>

              <div className="relative z-10 flex flex-col xl:flex-row items-center gap-12 p-12">
                {/* Image Section with Advanced Animations */}
                <div className="w-full xl:w-1/2 relative group/image">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={featuredEvent.imageUrl}
                      alt={featuredEvent.title}
                      className="w-full h-96 object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>

                  {/* Floating Prize Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-green-600 text-black px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-all duration-500 animate-float">
                    <Trophy className="inline w-5 h-5 mr-2" />
                    {featuredEvent.prize}
                  </div>

                  {/* Glowing corner accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Content Section with Staggered Reveals */}
                <div className="w-full xl:w-1/2 text-center xl:text-left space-y-6">
                  {/* Category Badge */}
                  <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-full font-semibold backdrop-blur-sm ${showFeaturedEvent ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                    <Sparkles className="w-5 h-5" />
                    Innovation Marathon
                  </div>

                  {/* Title with Character Reveal */}
                  <h3 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${showFeaturedEvent ? 'animate-text-reveal' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    {featuredEvent.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-gray-300 text-lg leading-relaxed ${showFeaturedEvent ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                    {featuredEvent.description}
                  </p>

                  {/* Event Details Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 ${showFeaturedEvent ? 'animate-reveal-slide' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-3 justify-center xl:justify-start group/detail">
                      <Calendar className="w-6 h-6 text-green-500 group-hover/detail:scale-110 transition-transform" />
                      <span className="group-hover/detail:text-white transition-colors">{formatDate(featuredEvent.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center xl:justify-start group/detail">
                      <MapPin className="w-6 h-6 text-green-500 group-hover/detail:scale-110 transition-transform" />
                      <span className="group-hover/detail:text-white transition-colors">{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center xl:justify-start group/detail">
                      <Users className="w-6 h-6 text-green-500 group-hover/detail:scale-110 transition-transform" />
                      <span className="group-hover/detail:text-white transition-colors">{featuredEvent.attendees}+ innovators</span>
                    </div>
                  </div>

                  {/* CTA Button with Advanced Hover Effects */}
                  <button className={`group/cta relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-bold px-10 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 overflow-hidden ${showFeaturedEvent ? 'animate-morph-reveal' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>

                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"></div>

                    <span className="relative flex items-center gap-3">
                      <Lightbulb className="w-5 h-5 group-hover/cta:animate-pulse" />
                      Ignite Your Innovation
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/cta:translate-x-2" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* What We Do Section */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                We organize diverse events that foster learning, innovation, and collaboration in the tech community.
              </p>
            </div>
            <MagicBentoGrid activities={activities} />
          </div>
        </section>
      </div>
  );
};

export default EventsPage;