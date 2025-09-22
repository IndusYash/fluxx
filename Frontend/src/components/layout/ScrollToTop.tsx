import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll after a tiny delay (lets React paint the new page first)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // try "smooth" if you want animation
      });
    }, 0);
  }, [pathname]);

  return null;
}
