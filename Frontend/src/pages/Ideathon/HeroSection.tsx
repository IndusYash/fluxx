import "./Ideathon.css";
import CircuitTraceBackground from "../../components/ui/CircuitTraceBackground";

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
      <CircuitTraceBackground />
    </section>
  );
};

export default HeroSection;