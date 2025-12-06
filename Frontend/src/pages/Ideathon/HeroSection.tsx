import Hyperspeed from "../../components/Hyperspeed";
import { hyperspeedPresets } from "../../components/HyperSpeedPresets";
import "./Ideathon.css";

const HeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100svh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="hyperspeed-bg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          // Base oversize (desktop)
          width: "160vw",
          height: "140vh",

          pointerEvents: "none",
          zIndex: 1,
          backfaceVisibility: "hidden",
        }}
      >
        <Hyperspeed effectOptions={hyperspeedPresets.six} />
      </div>
    </section>
  );
};

export default HeroSection;
