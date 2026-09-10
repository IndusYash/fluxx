import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";

// Main contact page
function Contact() {
  return (
    <div className="relative min-h-screen px-4 sm:px-8 lg:px-20 flex flex-col items-center py-8"
         style={{
            background: "linear-gradient(135deg, #10141b 0%, #102a32 70%, #20557e 100%)",
            color: "#f3f4f6"
         }}>
      {/* Animated SVG Background */}
      <MovingShapes />
      {/* Page Heading */}
      <header className="w-full max-w-3xl mx-auto text-center mb-10 animate-fade-up relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#cdfbef]">
          Contact FLUX
        </h1>
        <h2 className="text-xl md:text-2xl text-[#43f0af] font-semibold mb-4">
          Let's Connect and Build Together
        </h2>
        <p className="text-base text-blue-100">
          Reach out for collaborations, event details, or any queries—FLUX is always open to new ideas!
        </p>
      </header>
      {/* Contact Details Section */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
        <ContactCard
          icon={<SiGmail className="h-8 w-8 text-[#43f0af]" />}
          heading="Email"
          value="flux@mmmut.ac.in"
          link="mailto:flux@mmmut.ac.in"
          buttonText="Send Email"
          glowColor="#43f0af"
        />
        <ContactCard
          icon={<FaWhatsapp className="h-8 w-8 text-[#40a780]" />}
          heading="WhatsApp"
          value="FLUX Community"
          link="https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t"
          buttonText="Join Group"
          glowColor="#40a780"
        />
        <ContactCard
          icon={<FaInstagram className="h-8 w-8 text-[#ea38a1]" />}
          heading="Instagram"
          value="@flux.mmmut"
          link="https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2"
          buttonText="Follow"
          glowColor="#ea38a1"
        />
        <ContactCard
          icon={<FaLinkedin className="h-8 w-8 text-[#4d8ed7]" />}
          heading="LinkedIn"
          value="FLUX (MMMUT)"
          link="https://www.linkedin.com/company/flux-mmm/"
          buttonText="Visit"
          glowColor="#4d8ed7"
        />
      </section>
      {/* Location */}
      <section className="w-full max-w-2xl mx-auto mb-12 text-center relative z-10">
        <h3 className="text-lg font-bold text-[#43f0af] mb-2">Location</h3>
        <div className="text-base text-blue-100 mb-2">
          CSED, MMMUT, Tech District, Gorakhpur, U.P.
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=CSED+MMMUT+Tech+District+Gorakhpur+UP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm inline-block bg-[#182c36] text-[#43f0af] border border-[#22e7ae] px-4 py-2 rounded transition hover:bg-[#273956] hover:border-[#cdfbef] mt-1"
        >
          View on Google Maps
        </a>
      </section>
      {/* Tagline */}
      <section className="w-full max-w-xl mx-auto relative z-10">
        <div className="py-8 text-center bg-[#19223a]/50 rounded-xl border border-[#2a3a4d]">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#43f0af]">
            Making Tomorrow's Technology, Today
          </h3>
          <p className="text-base text-blue-100">
            From hackathons to contests, workshops to mentoring, FLUX is your community for innovation and impact.
          </p>
        </div>
      </section>
      {/* Animation Keyframes */}
      <style>{`
        .animate-fade-up {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp .8s cubic-bezier(.33,1,.68,1) forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: none; }
        }
        .hover-glow {
          transition: box-shadow .3s, border-color .3s, transform .3s;
        }
      `}</style>
    </div>
  );
}

function ContactCard({ icon, heading, value, link, buttonText, glowColor }) {
  return (
    <div
      className="bg-[#202944] rounded-xl p-6 shadow border border-[#243156] flex flex-col items-center justify-center hover-glow group"
      style={{
        boxShadow: "0 0 0 transparent",
      }}
      onMouseOver={e => {
        e.currentTarget.style.boxShadow = `0 0 22px 0 ${glowColor}77`;
        e.currentTarget.style.borderColor = glowColor;
        e.currentTarget.style.transform = "translateY(-5px) scale(1.04)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = "0 0 0 transparent";
        e.currentTarget.style.borderColor = "#243156";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div className="mb-3">{icon}</div>
      <div className="font-medium text-lg mb-1">{heading}</div>
      <div className="text-blue-100 mb-2">{value}</div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-4 py-2 rounded bg-[#162128] text-[#43f0af] border border-[#43f0af] text-xs font-semibold hover:bg-[#233b2e]/80 hover:text-white hover:border-[#cdfbef] transition"
      >
        {buttonText}
      </a>
    </div>
  );
}

// Moving SVG shapes for background animation (orbit, pulse, float)
function MovingShapes() {
  return (
    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      {/* Orbiting circles */}
      <circle cx="15%" cy="30%" r="32" fill="#4d8ed724">
        <animateTransform attributeName="transform" type="rotate" from="0 15 15" to="360 15 15" dur="12s" repeatCount="indefinite" />
      </circle>
      <circle cx="70%" cy="18%" r="20" fill="#ea38a122">
        <animateTransform attributeName="transform" type="rotate" from="0 70 30" to="360 70 30" dur="10s" repeatCount="indefinite" />
      </circle>
      <rect x="10%" y="76%" width="22" height="22" rx="7" fill="#43f0af22">
        <animate attributeName="x" values="10%;20%;10%" dur="9s" repeatCount="indefinite" />
      </rect>
      <rect x="80%" y="60%" width="38" height="38" rx="11" fill="#40a78022">
        <animate attributeName="y" values="60%;73%;66%;60%" dur="13s" repeatCount="indefinite" />
      </rect>
      {/* Pulsing central ellipse */}
      <ellipse cx="52%" cy="57%" rx="55" ry="35" fill="#cdfbef16">
        <animate attributeName="rx" values="55;40;55" dur="11s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#cdfbef16;#43f0af10;#cdfbef16" dur="11s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export default Contact;
