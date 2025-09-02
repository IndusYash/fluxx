import MobileNavbar from "./MobileNavbar"; // the scroll-aware nav we built earlier

// Page components reused as sections
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about/AboutPage";
import FacultyPage from "@/pages/faculty/FacultyPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import Application from "@/pages/induction/Application";

export default function MobileLayout() {
  return (
    <div className="relative">
      <MobileNavbar className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md h-16" />
      <section id="home" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <HomePage />
      </section>
      <section id="about" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <AboutPage />
      </section>
      <section id="faculty" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <FacultyPage />
      </section>
      <section id="events" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <EventsPage />
      </section>
      <section id="team" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <TeamPage />
      </section>
      <section id="contact" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <ContactPage />
      </section>
      <section id="application" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <Application />
      </section>
    </div>
  );
}
