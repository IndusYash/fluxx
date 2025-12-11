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
        zIndex: 0,
      }}
    >
     <div
  className="hyperspeed-bg"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  }}
>


        <Hyperspeed effectOptions={hyperspeedPresets.six} />
      </div>
    </section>
  );
};

export default HeroSection;