import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, Users, Zap, Brain } from "lucide-react";

// Particle System (stars in bg)
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const ParticleSystem = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(animate);
    };

    if (isActive) animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
};

// Floating blurred circles
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

// Glowing Planet Background
const PlanetBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(window.scrollY / maxScroll);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glowOpacity = 0.7 + scrollProgress * 0.3; // 0.7 → 1.0
  const glowBlur = 20 + scrollProgress * 40; // 20 → 60 px

  return (
    <div className="absolute inset-0 flex items-end justify-center bg-black overflow-hidden -z-20 pointer-events-none">
      <div className="relative flex items-end justify-center w-full">
        {/* Planet circle */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[650px] h-[325px] rounded-t-full bg-gradient-to-t from-blue-900 via-purple-900 to-transparent opacity-95"
          style={{
            boxShadow: `0 0 ${glowBlur}px ${glowBlur / 2}px rgba(130,97,255,${glowOpacity})`,
            transition: "box-shadow 0.3s ease-out",
          }}
        />
        {/* Glowing bottom highlight */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[460px] h-12 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(147,51,234,0.8), rgba(86,203,255,0.85))",
            filter: `blur(${15 + scrollProgress * 15}px)`,
            opacity: 0.6 + scrollProgress * 0.35,
            transition: "filter 0.3s, opacity 0.3s",
          }}
        />
      </div>

      {/* Twinkling stars */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8);}
          50% { opacity: 1; transform: scale(1.2);}
        }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite;}
      `}</style>
    </div>
  );
};

// EventCard component
interface EventItem {
  id: number;
  title: string;
  date: string;
  type: string;
  icon: JSX.Element;
  participants: string;
  description: string;
  iconBg: string;
  tagColor: string;
  tagBg: string;
}

const EventCard = ({
  event,
  index,
  onHover,
}: {
  event: EventItem;
  index: number;
  onHover: (e: EventItem) => void;
}) => {
  return (
    <div
      className="p-6 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 cursor-pointer"
      onMouseEnter={() => onHover(event)}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-xl ${event.iconBg}`}>{event.icon}</div>
        <div>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-sm text-gray-400">{event.date}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span
          className={`px-3 py-1 rounded-full text-xs ${event.tagColor} ${event.tagBg}`}
        >
          {event.type}
        </span>
        <span>{event.participants} participants</span>
      </div>
    </div>
  );
};

// Main Page
export default function ModernEventsPreview() {
  const [, setSelectedEvent] = useState<EventItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const events: EventItem[] = [
    {
      id: 1,
      title: "Hack-e-thon Series",
      date: "Sep 15 – 16",
      type: "Competition",
      icon: <Zap className="w-6 h-6 text-orange-400" />,
      participants: "120+",
      description:
        "24-48 hour coding challenges focused on real-world problems with cutting-edge tech stacks",
      iconBg: "bg-orange-500/20",
      tagColor: "text-orange-400",
      tagBg: "bg-orange-500/20",
    },
    {
      id: 2,
      title: "Annual Research Conclave",
      date: "Oct 20 – 22",
      type: "Conference",
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      participants: "200+",
      description:
        "Invited talks, panel discussions, and technical workshops with industry experts and researchers",
      iconBg: "bg-blue-500/20",
      tagColor: "text-blue-400",
      tagBg: "bg-blue-500/20",
    },
    {
      id: 3,
      title: "Tech Conferences",
      date: "Nov 8 – 10",
      type: "Conference",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      participants: "150+",
      description:
        "Student-led conferences with paper submissions and presentations on emerging technologies",
      iconBg: "bg-purple-500/20",
      tagColor: "text-purple-400",
      tagBg: "bg-purple-500/20",
    },
  ];

  const onHover = (event: EventItem) => {
    setSelectedEvent(event);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Layers */}
      <PlanetBackground />
      <ParticleSystem isActive={true} />
      <FloatingElements />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            Upcoming <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay in the loop with our latest workshops, meetups, and tech
            festivals designed to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold animate-pulse">
              spark your curiosity
            </span>
            .
          </p>
          <div className="mt-8">
            <a
              href="events"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition transform hover:scale-105"
            >
              🎯 View All Events →
            </a>
          </div>
        </div>

        {/* Events */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onHover={onHover}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-medium">
              More exciting events coming soon
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
