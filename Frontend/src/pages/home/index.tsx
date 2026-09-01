import Hero from "@/components/sections/home/Hero";
import Showcase from "@/components/sections/home/Showcase";
import FacultyPreview from "@/components/sections/home/FacultyPreview";
import EventsPreview from "@/components/sections/home/EventsPreview";
import GalleryPreview from "@/components/sections/home/GalleryPreview";

const BLACK_GRADIENT = "linear-gradient(135deg, #020202 0%, #0b0b0b 55%, #1b1b1b 100%)";

export default function HomePage() {
  return (
    <>
      <Hero />

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
