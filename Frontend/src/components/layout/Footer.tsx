import { FaWhatsapp, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionWrapper from "../SectionWrapper";

export default function Footer() {
  const socialLinks = [
    {
      icon: SiGmail,
      href: "mailto:flux@mmmut.ac.in",
      color: "hover:text-red-400",
      label: "Gmail"
    },
    {
      icon: FaWhatsapp,
      href: "https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t",
      color: "hover:text-green-400",
      label: "WhatsApp"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2",
      color: "hover:text-pink-400",
      label: "Instagram"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/flux-mmm/",
      color: "hover:text-blue-400",
      label: "LinkedIn"
    }
  ];

  return (
    <SectionWrapper title="Get In Touch" background="bg-black">
      <footer className="text-white pt-16 relative overflow-hidden bg-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Row: Brand, Quick Links, and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 pb-16">
            
            {/* Brand Section */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  WebFlux
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mb-4 animate-pulse"></div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  A community of developers and tech enthusiasts building together
                  and pushing innovation forward.
                </p>
              </div>
              
              {/* Social Media Section */}
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Connect With Us
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 sm:p-3.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/30 group`}
                      title={social.label}
                    >
                      <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-6 text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Quick Links
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Our Team", href: "/team" },
                  { name: "Events", href: "/events" },
                  { name: "Faculty", href: "/faculty" },
                  { name: "Contact", href: "/contact" }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-sm sm:text-base hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-6 text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Contact
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {/* Address Card */}
                <div className="group">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10 hover:bg-gray-900/70">
                    <div className="mt-1 flex-shrink-0">
                      <FaMapMarkerAlt className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-white leading-relaxed font-medium mb-1">
                        Flux, Center of Excellence
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        Madan Mohan Malvaiya University of Technology
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        Gorakhpur, Uttar Pradesh 273010
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Email Card */}
                <a 
                  href="mailto:flux@mmmut.ac.in"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10 hover:bg-gray-900/70 group"
                >
                  <FaEnvelope className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                    flux@mmmut.ac.in
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} WebFlux. All rights reserved.
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                <span className="text-center">Built with ❤️ by WebFlux Team</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Active Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
      </footer>
    </SectionWrapper>
  );
}