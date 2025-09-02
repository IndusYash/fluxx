import MobileNavbar from "./MobileNavbar";

// Page components reused as sections
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about/AboutPage";
import FacultyPage from "@/pages/faculty/FacultyPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import Application from "@/pages/induction/Application";

// Add a type for props
interface MobileLayoutProps {
  isMobile: boolean;
}

export default function MobileLayout({ isMobile }: MobileLayoutProps) {
  return (
    <div className="relative">
      <MobileNavbar className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md h-16" />
      <section id="home" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <HomePage isMobile={isMobile} />
      </section>
      <section id="about" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <AboutPage isMobile={isMobile} />
      </section>
      <section id="faculty" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <FacultyPage isMobile={isMobile} />
      </section>
      <section id="events" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <EventsPage isMobile={isMobile} />
      </section>
      <section id="team" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <TeamPage isMobile={isMobile} />
      </section>
      <section id="contact" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <ContactPage isMobile={isMobile} />
      </section>
      <section id="join" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <Application isMobile={isMobile} />
      </section>
    </div>
  );
}
