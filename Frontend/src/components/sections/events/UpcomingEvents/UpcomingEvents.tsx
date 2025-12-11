import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Lightbulb, Award } from 'lucide-react';
import dimitrios from '@/assets/images/dimitrios.png';
import ideathon from '@/assets/images/ideathon.jpg';
import atalFdp from '@/assets/images/atalFdp.jpeg';
const RAW_API_BASE = (import.meta.env as any).VITE_API_BASE_URL ?? (import.meta.env as any).VITE_API_BASE ?? '/api';
const API_BASE = (RAW_API_BASE || '/api').replace(/\/+$/, ''); // remove trailing slash

export interface UpcomingEventsSectionProps {}

export interface EventProps {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  location?: string;
  attendees?: number;
  category: 'Tech' | 'Design' | 'Business' | 'Innovation';
  prize?: string;
  featured?: boolean;
}

const events: EventProps[] = [
  {
    id: 1,
    title: 'ATAL Faculty Development Programme',
    date: 'January 19-24, 2026',
    description:
      "Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability",
    imageUrl: atalFdp,
    isUpcoming: true,
    location: 'MMMUT Gorakhpur (Online Mode)',
    attendees: 300,
    category: 'Innovation',
    prize: '',
    featured: true,
  },
  {
    id: 2,
    title: 'IDEATHON 2025',
    date: 'December 10-19, 2025',
    description:
      "Join innovators, coders, and thinkers to brainstorm, build, and showcase groundbreaking solutions. Unleash your ideas, collaborate with peers, and be part of a game- changing experience!",
    imageUrl: ideathon,
    isUpcoming: true,
    location: 'CESD, MMMUT, Gorakhpur',
    attendees: 1000,
    category: 'Tech',
    prize: '',
    featured: true,
  }
];

const BigWhiteBulb = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered
            ? [
                '0 0 30px rgba(255, 255, 255, 0.3)',
                '0 0 60px rgba(255, 255, 255, 0.5)',
                '0 0 90px rgba(255, 255, 255, 0.4)',
                '0 0 30px rgba(255, 255, 255, 0.3)'
              ]
            : ['0 0 15px rgba(255, 255, 255, 0.1)']
        }}
        transition={{
          duration: isHovered ? 2.5 : 0.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-white border-2 border-white/40 flex items-center justify-center overflow-hidden shadow-lg"
        animate={{
          borderColor: isHovered
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(255, 255, 255, 0.4)',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(248, 250, 252, 0.9))'
            : 'linear-gradient(135deg, rgb(243, 244, 246), rgb(255, 255, 255))'
        }}
        transition={{ duration: 0.4 }}
      >
        {isHovered && [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 10) * 35,
              y: Math.sin((i * Math.PI * 2) / 10) * 35,
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
            }}
          />
        ))}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
          }}
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : 0.2,
            scale: isHovered ? [1, 1.3, 1] : 1
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        <motion.div
          animate={{
            color: isHovered ? '#ffffff' : '#6b7280',
            filter: isHovered
              ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))'
              : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))'
          }}
          transition={{ duration: 0.3 }}
        >
          <Lightbulb className="w-10 h-10 relative z-10" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isHovered ? 0.7 : 0.3
          }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/60 rounded-full"
              style={{
                width: '1px',
                height: `${14 + i * 3}px`,
                transform: `rotate(${i * 45}deg)`
              }}
              animate={{
                boxShadow: isHovered
                  ? `0 0 6px rgba(255, 255, 255, 0.8)`
                  : '0 0 2px rgba(255, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-white/30 rounded-full blur-sm"
        animate={{
          scaleX: isHovered ? [1, 1.8, 1] : 1,
          opacity: isHovered ? [0.3, 0.7, 0.3] : 0.2
        }}
        transition={{
          duration: 2.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

const EventCard = ({ event, index, showRegister }: { event: EventProps; index: number; showRegister?: boolean }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Registration modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech': return 'from-blue-500 to-cyan-400';
      case 'Innovation': return 'from-purple-500 to-pink-400';
      case 'Design': return 'from-orange-500 to-yellow-400';
      case 'Business': return 'from-green-500 to-emerald-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  // Client-side validation
  const validateForm = () => {
    if (!name.trim() || !branch.trim() || !year.trim() || !rollNo.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Please enter a valid phone number (digits only).');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name,
          branch,
          year,
          rollNo,
          phone,
          email
        })
      });
      if (!res.ok) {
        let data: any = null;
        try {
          data = await res.json();
        } catch (_) {
          data = null;
        }
        let message = data?.message || data?.error || null;
        if (!message) {
          if (res.status === 409) {
            message = 'It looks like this entry already exists for this event.';
          } else if (res.status === 400 || res.status === 422) {
            message = 'Invalid submission. Please check your form fields and try again.';
          } else if (res.status >= 500) {
            message = 'Server error. Please try again later.';
          } else {
            message = `Request failed with status ${res.status}.`;
          }
        }
        throw new Error(message);
      }
      setSuccessMessage('Registration successful! We will contact you via email or phone.');
      setName('');
      setBranch('');
      setYear('');
      setRollNo('');
      setPhone('');
      setEmail('');
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage('');
      }, 1500);
    } catch (err: any) {
      let friendly = 'Registration failed. Please try again.';
      if (err instanceof TypeError || /Failed to fetch/i.test(String(err.message || ''))) {
        friendly = 'Unable to connect to the server. Please check your network or try again later.';
      } else if (err.message) {
        friendly = err.message;
      }
      setErrorMessage(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(74, 222, 128, 0.15)'
        }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-green-500/20 shadow-xl"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            background: isHovered 
              ? 'linear-gradient(45deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.2), rgba(74, 222, 128, 0.3))' 
              : 'transparent'
          }}
          transition={{ duration: 0.5 }}
          style={{ padding: '2px' }}
        >
          <div className="h-full w-full bg-gradient-to-br from-gray-900/95 to-gray-800/90 rounded-3xl" />
        </motion.div>
        <div className="relative z-10 p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              className="relative group/image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[2/3] w-full max-w-xs bg-black mx-auto">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  animate={{
                    opacity: isHovered ? 0.8 : 0.4
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(event.category)} shadow-lg`}>
                    {event.category}
                  </span>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg flex items-center gap-1">
                      <Award size={12} />
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.h3
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight"
                animate={isHovered ? {
                  backgroundPosition: ['0%', '100%', '0%']
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {event.title}
              </motion.h3>

              {/* Description (conditional) */}
              {event.id === 1 ? (
                // ATAL Faculty Development Programme details
                <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                  {event.description}
                </div>
              ) : (
                <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                  {event.description}
                </div>
              )}
              {/* View Detail button for Ideathon */}
              {event.title?.toLowerCase().includes('ideathon') && (
                <button
                  onClick={() => navigate('/ideathon')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg mt-2"
                >
                  View Detail
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {showRegister && (
                <div className="pt-2">
                  {event.id === 1 ? (
                    <button
                      onClick={() => navigate('/events/fdp')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                  whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                >
                  <Calendar className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                    <p className="text-green-300 font-semibold">{event.date}</p>
                  </div>
                </motion.div>
                {event.location && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                  >
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                      <p className="text-blue-300 font-semibold">{event.location}</p>
                    </div>
                  </motion.div>
                )}
                {event.attendees && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20"
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                  >
                    <Users className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Expected</p>
                      <p className="text-purple-300 font-semibold">{event.attendees}+ Attendees</p>
                    </div>
                  </motion.div>
                )}
                {event.prize && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
                    whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.15)' }}
                  >
                    <Award className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Prize Pool</p>
                      <p className="text-yellow-300 font-semibold">{event.prize}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full"
              style={{
                left: `${30 + i * 25}%`,
                top: `${40 + (i % 2) * 30}%`,
              }}
              animate={{
                y: isHovered ? [-5, -10, -5] : [0, -3, 0],
                opacity: isHovered ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
                scale: isHovered ? [1, 1.5, 1] : [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
            <motion.form
              className="relative z-10 w-full max-w-lg bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              onSubmit={submitRegistration}
            >
              <h3 className="text-xl font-bold mb-3">Register for: <span className="font-semibold text-green-300">{event.title}</span></h3>
              <p className="text-sm text-gray-400 mb-4">Fill the form and submit. We'll save your info for this event.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Roll No." value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {errorMessage && <p className="text-sm text-red-400 mt-3">{errorMessage}</p>}
              {successMessage && <p className="text-sm text-green-300 mt-3">{successMessage}</p>}
              <div className="mt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                  {loading ? 'Registering...' : 'Submit'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const UpcomingEvents: React.FC<UpcomingEventsSectionProps> = () => {
  const upcomingEvents = events.filter(event => event.isUpcoming);
  return (
    <section className="py-20 px-4 relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-8 mb-6">
            <BigWhiteBulb />
            <motion.div 
              className="relative cursor-pointer"
              initial={{ filter: "blur(8px)", opacity: 0.3 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ 
                duration: 2,
                delay: 0.8,
                ease: "easeOut"
              }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-extrabold relative z-10 transition-all duration-500"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  color: '#e5e7eb',
                  textShadow: '0 0 2px rgba(156, 163, 175, 0.5)'
                }}
                whileHover={{
                  color: '#ffffff',
                  textShadow: `
                    0 0 5px rgba(74, 222, 128, 0.6),
                    0 0 10px rgba(74, 222, 128, 0.4),
                    0 0 15px rgba(74, 222, 128, 0.3),
                    0 0 20px rgba(34, 197, 94, 0.2),
                    0 0 30px rgba(34, 197, 94, 0.1)
                  `,
                  transition: { duration: 0.3 }
                }}
              >
                Upcoming Events
              </motion.h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '150px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-4 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-400/50"
          />
        </motion.div>
        <div className="space-y-16">
          <AnimatePresence>
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id ?? index} event={event} index={index} showRegister={index === 0} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
