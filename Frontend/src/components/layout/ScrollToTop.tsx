import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset the main window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // can use "smooth" if you want
    });

    // Optional: reset any scrollable container too
    const appRoot = document.querySelector(".min-h-dvh");
    if (appRoot) {
      appRoot.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
