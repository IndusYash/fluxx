"use client";

import { useNavigate } from "react-router-dom";
import { Calendar, Users, ArrowRight, Mic2 } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Orientation",
    date: "Coming Soon",
    type: "Event",
    participants: "200+",
    description:
      "Join us for the Flux Orientation session to learn about our community, upcoming events, and how you can get involved. Perfect for new members who want to kickstart their journey with us.",
  },
  {
    id: 2,
    title: "ByteBrawl",
    date: "Coming Soon",
    type: "Event",
    participants: "300+",
    description:
      "Get ready for ByteBrawl — a high-energy coding showdown where creativity meets code. Build, experiment, and ship cool projects in a collaborative, vibe-driven environment.",
  },
  {
    id: 3,
    title: "She Lead",
    date: "Coming Soon",
    type: "Event",
    participants: "250+",
    description:
      "An empowering leadership summit designed to inspire and connect women in tech. Join us for insightful talks, hands-on workshops, and networking with industry leaders.",
  },
];

export default function EventsPreview() {
  const navigate = useNavigate();

  const handleEventsClick = () => {
    navigate("/events");
  };

  return (
    <section className="text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white font-semibold text-sm tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
            UPCOMING <span className="text-gray-400">EVENTS</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay in the loop with our latest workshops, meetups, and tech festivals designed to spark your curiosity.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="card-outline group p-6 rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)] w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{event.type}</p>
                  <p className="text-sm text-white font-medium">{event.date}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-200 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{event.participants} participants</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleEventsClick}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            View All Events
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
