import Hero from "@/components/sections/home/Hero";
import Showcase from "@/components/sections/home/Showcase";
import FacultyPreview from "@/components/sections/home/FacultyPreview";
import EventsPreview from "@/components/sections/home/EventsPreview";
import GalleryPreview from "@/components/sections/home/GalleryPreview";
<<<<<<< HEAD
import SheLeadsPopup from "@/components/sheLeads/SheLeadsPopup";

const BLACK_GRADIENT = "linear-gradient(135deg, #020202 0%, #0b0b0b 55%, #1b1b1b 100%)";

export default function HomePage({ isMobile }: { isMobile?: boolean }) {
  return (
    <>
      <div className="relative">
        <Hero />
        <SheLeadsPopup isMobile={isMobile} />
      </div>
=======

const BLACK_GRADIENT = "linear-gradient(135deg, #020202 0%, #0b0b0b 55%, #1b1b1b 100%)";

export default function HomePage() {
  return (
    <>
      <Hero />
>>>>>>> cbd65cf59d845635320295e3f0f9cf723444567d

      <div>
        <section style={{ background: BLACK_GRADIENT }}>
          <Showcase />
        </section>

        <section style={{ background: BLACK_GRADIENT }}>
          <EventsPreview />
        </section>

        <section style={{ background: BLACK_GRADIENT }}>
          <GalleryPreview />
        </section>

        <section style={{ background: BLACK_GRADIENT }}>
          <FacultyPreview />
        </section>
      </div>
    </>
  );
}
