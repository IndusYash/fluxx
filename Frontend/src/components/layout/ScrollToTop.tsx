import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  isMobile?: boolean;
}

export default function ScrollToTop({ isMobile = false }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMobile) {
      // For mobile layout (single page with sections)
      const routeToSectionMap: { [key: string]: string } = {
        "/": "home",
        "/about": "about",
        "/faculty": "faculty",
        "/events": "events",
        "/team": "team",
        "/gallery": "gallery",
        "/join": "join",
        "/contact": "contact"
      };

      const sectionId = routeToSectionMap[pathname];
      
      if (sectionId) {
        requestAnimationFrame(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ 
              behavior: "smooth",
              block: "start"
            });
          }
        });
      }
    } else {
      // High performance instant reset for desktop page changes
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [pathname, isMobile]);

  return null;
}