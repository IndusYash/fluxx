import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

// Main contact page
function Contact() {
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const channels = [
    {
      id: 1,
      icon: <SiGmail className="w-5 h-5" />,
      name: "Email",
      value: "flux@mmmut.ac.in",
      link: "mailto:flux@mmmut.ac.in",
      action: "CONNECT",
      color: "#4ade80"
    },
    {
      id: 2,
      icon: <FaWhatsapp className="w-5 h-5" />,
      name: "WhatsApp",
      value: "Community Group",
      link: "https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t",
      action: "JOIN",
      color: "#25D366"
    },
    {
      id: 3,
      icon: <FaInstagram className="w-5 h-5" />,
      name: "Instagram",
      value: "@flux.mmmut",
      link: "https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2",
      action: "FOLLOW",
      color: "#E4405F"
    },
    {
      id: 4,
      icon: <FaLinkedin className="w-5 h-5" />,
      name: "LinkedIn",
      value: "FLUX (MMMUT)",
      link: "https://www.linkedin.com/company/flux-mmm/",
      action: "VISIT",
      color: "#0A66C2"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-gray-100 px-4 py-12 font-mono overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{
             backgroundImage: `linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Terminal Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">contact@flux:~$</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 mb-1">
            $ ./connect.sh --interactive
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            <span className="text-gray-600">#</span> Initialize communication channels
          </p>
        </div>

        {/* Main Terminal Window */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm mb-8"
             style={{
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(74, 222, 128, 0.1)'
             }}>
          
          {/* Terminal Content */}
          <div className="p-6 md:p-8">
            {/* System Status */}
            <div className="mb-6 pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">System Status:</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-400 font-semibold">ONLINE</span>
                </span>
                <span className="text-gray-600 mx-2">|</span>
                <span className="text-gray-500">Response Time:</span>
                <span className="text-blue-400">&lt;24h</span>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="space-y-3">
              {channels.map((channel, index) => (
                <div
                  key={channel.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-black border border-gray-800 rounded-lg transition-all duration-300 hover:border-green-500/50 hover:shadow-lg cursor-pointer gap-3"
                    style={{
                      transform: selectedChannel === channel.id ? 'translateZ(0) scale(1.02)' : 'translateZ(0)',
                      boxShadow: selectedChannel === channel.id 
                        ? `0 0 20px ${channel.color}33, inset 0 0 20px ${channel.color}11`
                        : 'none'
                    }}
                    onMouseEnter={() => setSelectedChannel(channel.id)}
                    onMouseLeave={() => setSelectedChannel(null)}
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1 w-full min-w-0">
                      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <span className="text-gray-600 text-sm">[{channel.id}]</span>
                        <div className="text-green-400 transition-transform group-hover:scale-110">
                          {channel.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                          <span className="text-gray-400 font-medium text-sm md:text-base">{channel.name}</span>
                          <span className="text-gray-600 hidden md:inline">→</span>
                          <span className="text-gray-300 text-sm md:text-base truncate">{channel.value}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 text-xs font-semibold rounded border transition-all w-full md:w-auto text-center flex-shrink-0"
                      style={{
                        color: channel.color,
                        borderColor: selectedChannel === channel.id ? channel.color : 'transparent',
                        backgroundColor: selectedChannel === channel.id ? `${channel.color}15` : 'transparent'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {channel.action}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Command Prompt */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400">$</span>
                <span className="text-gray-500">Select channel:</span>
                <span className={`inline-block w-2 h-4 bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-xl p-4 md:p-6 mb-8"
             style={{
               boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(74, 222, 128, 0.1)'
             }}>
          <div className="flex items-start gap-3 md:gap-4">
            <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-gray-500 text-xs md:text-sm">Location:</span>
                <span className="text-green-400 text-xs font-semibold px-2 py-0.5 bg-green-400/10 rounded">ACTIVE</span>
              </div>
              <p className="text-gray-300 mb-3 text-sm md:text-base break-words">
                CSED, MMMUT, Tech District, Gorakhpur, U.P.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=CSED+MMMUT+Tech+District+Gorakhpur+UP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>→ View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-1">
            <span className="text-gray-600">//</span> Making Tomorrow's Technology, Today
          </p>
          <p>
            <span className="text-gray-600">//</span> From hackathons to workshops, FLUX is your community for innovation
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Contact;
