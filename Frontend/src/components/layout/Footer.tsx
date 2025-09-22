import { useState } from "react";
import type { ChangeEvent } from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaArrowRight, FaCheck } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionWrapper from "../SectionWrapper";

type Testimonial = {
  text: string;
  user: string;
  img?: string;
};

// Commented out testimonials for future use
/*
const testimonials: Testimonial[] = [
  { text: "WebFlux is where I found my tribe — developers and learners who actually care about growth.", user: "@AnanyaCodes" },
  { text: "The seminars at WebFlux helped me land my first internship in tech. Highly recommend joining!", user: "@RaviDev" },
  { text: "It's not just a society, it's an ecosystem for CSE students to learn, build, and collaborate.", user: "@PriyaBuilds" },
  { text: "From hackathons to dev tasks, WebFlux keeps you challenged and inspired.", user: "@CodeWithAarav" },
  { text: "As a newbie, I felt right at home. WebFlux members are super supportive and motivating.", user: "@IshaLearns" },
  { text: "The WebFlux community turned my coding curiosity into real-world projects. Couldn't ask for more.", user: "@NeerajTech" },
]
*/

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (): void => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      setIsSubscribed(false);
      return;
    }
    setMessage("🎉 Thanks for subscribing!");
    setIsSubscribed(true);
    setEmail("");
    
    // Reset message after 3 seconds
    setTimeout(() => {
      setMessage("");
      setIsSubscribed(false);
    }, 3000);
  };

  const socialLinks = [
    {
      icon: SiGmail,
      href: "flux@mmmut.ac.in",
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Top Row: Links + Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  WebFlux
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mb-4"></div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  A community of developers and tech enthusiasts building together
                  and pushing innovation forward.
                </p>
              </div>
              
              {/* Social Linksknk */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-400/20 group`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Our Team", href: "team" },
                  { name: "Contact", href: "contact" }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm"
                    >
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">
                Resources
              </h3>
              <ul className="space-y-3">
                {["Blog", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
                  <li key={index}>
                    <a className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group text-sm">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">
                Join Our Newsletter
              </h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Stay updated with upcoming events, resources, and community highlights.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 text-white placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isSubscribed
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:from-emerald-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-emerald-400/25"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <FaCheck className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                
                {message && (
                  <div className={`text-sm p-3 rounded-lg transition-all duration-300 ${
                    isSubscribed 
                      ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} WebFlux. All rights reserved.
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="hidden sm:block">Built with ❤️ by WebFlux Team</span>
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