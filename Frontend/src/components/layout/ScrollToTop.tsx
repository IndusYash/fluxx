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
        "/join": "join",
        "/contact": "contact"
      };

      const sectionId = routeToSectionMap[pathname];
      
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ 
              behavior: "smooth",
              block: "start"
            });
          }
        }, 100);
      }
    } else {
      // For desktop layout (separate pages) - Handle body overflow-x: hidden
      
      // Method 1: Immediate scroll on multiple targets
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 2: RAF (RequestAnimationFrame) for better timing
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      
      // Method 3: Find the actual scrolling container
      // When body has overflow-x: hidden, sometimes a different element becomes the scroller
      setTimeout(() => {
        // Try window first
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
        
        // Try document elements
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Find any element that might be scrolling
        const scrollableElements = document.querySelectorAll('*');
        scrollableElements.forEach(element => {
          if (element.scrollTop > 0) {
            element.scrollTop = 0;
          }
        });
      }, 10);

      // Method 4: Additional timeout as final fallback
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, [pathname, isMobile]);

  return null;
}