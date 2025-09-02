// src/components/home/ContactPreview.tsx
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import { Mail, MapPin, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ContactPreview() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("flux@mmmut.ac.in");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <SectionWrapper
      title="Get in Touch"
      description="Have questions, ideas, or just want to say hi? We'd love to hear from you."
      cta={
        <SectionCTA
          to="/contact"
          label="Go to Contact Page →"
          variant="primary"
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        
        {/* Contact Info with Enhanced Design */}
        <div className="space-y-6">
          {/* Email Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background/80 to-primary/10 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            {/* Animated background glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating icon */}
            <div className="relative mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Mail className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/20 animate-ping opacity-0 group-hover:opacity-30" />
            </div>

            <div className="relative">
              <p className="font-bold text-xl mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Email
              </p>
              
              <div className="flex items-center gap-3 group/email">
                <a
                  href="mailto:flux@mmmut.ac.in"
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 flex-1 break-all font-medium"
                >
                  flux@mmmut.ac.in
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-200 hover:scale-110 group-hover:shadow-lg"
                  title="Copy email"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary/70 hover:text-primary" />
                  )}
                </button>
              </div>
              
              {emailCopied && (
                <div className="absolute -bottom-8 left-0 bg-green-500 text-white text-sm px-3 py-1 rounded-lg animate-in slide-in-from-bottom-2 duration-200">
                  Email copied!
                </div>
              )}
            </div>
          </div>

          {/* Location Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-secondary/5 via-background/80 to-secondary/10 border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            {/* Animated background glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating icon */}
            <div className="relative mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <MapPin className="w-6 h-6 text-secondary group-hover:text-secondary/80 transition-colors" />
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 w-12 h-12 rounded-xl bg-secondary/20 animate-ping opacity-0 group-hover:opacity-30" />
            </div>

            <div className="relative">
              <p className="font-bold text-xl mb-3 bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                Location
              </p>
              <p className="text-foreground/80 leading-relaxed font-medium">
                MMM University of Technology,<br />
                <span className="text-secondary/80">Gorakhpur, Uttar Pradesh</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Google Map */}
        <div className="relative group">
          {/* Map container with modern styling */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-transparent">
            
            {/* Overlay with click-to-open hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
              <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Click to open in Google Maps</span>
                </div>
              </div>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=26.73056,83.43333"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <iframe
                title="MMMUT Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14247.976!2d83.43333!3d26.73056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915c5f6b2b2b2b%3A0xabcdef123456789!2sMMM%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Floating location indicator */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce group-hover:animate-pulse">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Add some CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--primary), 0.1); }
          50% { box-shadow: 0 0 30px rgba(var(--primary), 0.2); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </SectionWrapper>
  );
}
