// src/components/sections/home/InductionCTA.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function InductionCTA() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile(); // check once on mount
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const handleJoinClick = () => {
    if (isMobile) {
      document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/join");
    }
  };

  return (
    <section className="section">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-8 shadow-glow">
          <div
            aria-hidden
            className="absolute -inset-1 bg-glow blur-2xl opacity-40"
          />
          <div className="relative">
            <h2 className="headline text-3xl sm:text-4xl">Ready to Join?</h2>
            <p className="mt-3 text-muted max-w-2xl">
              Inductions for second-year students are opening soon. Secure your
              spot, choose your track, and start building with Flux.
            </p>
            <div className="mt-6">
              <Button
                onClick={handleJoinClick}
                className="bg-primary text-black hover:brightness-110"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
