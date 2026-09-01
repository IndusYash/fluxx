// src/components/home/ContactPreview.tsx
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";

export default function ContactPreview() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white font-semibold text-sm tracking-widest uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
            CONTACT <span className="text-gray-400">US</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Have questions, ideas, or just want to say hi? We'd love to hear from you.
          </p>
          <div className="mt-8">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Go to Contact Page
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card-outline p-6 rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-white mb-1">Email</p>
                  <a
                    href="mailto:flux@mmmut.ac.in"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    flux@mmmut.ac.in
                  </a>
                </div>
              </div>
            </div>

            <div className="card-outline p-6 rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-white mb-1">Location</p>
                  <p className="text-gray-300 leading-relaxed">
                    MMM University of Technology,
                    <br />
                    <span className="text-gray-400">
                      Gorakhpur, Uttar Pradesh
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative pb-8">
            <div className="card-outline relative rounded-2xl overflow-hidden bg-white/5 transition-all duration-300 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=26.73056,83.43333"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <iframe
                  title="MMMUT Location"
                  src="https://www.google.com/maps?q=26.73056,83.43333&z=15&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </a>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white text-xs text-gray-300">
              <ExternalLink size={12} className="text-white" />
              Open in Maps
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
