import Hyperspeed from '../../components/Hyperspeed';
import { hyperspeedPresets } from '../../components/HyperspeedPresets';

const HeroSection = () => {
  return (
    <section style={{ 
      width: '100%', 
      height: 'calc(100vh - 60px)',
      position: 'relative',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <Hyperspeed 
        effectOptions={{
          ...hyperspeedPresets.one,
          fov: 140,
          fovSpeedUp: 170,
          roadWidth: 30,
          islandWidth: 0.5,
          lanesPerRoad: 4,
          totalSideLightSticks: 15,
          lightPairsPerRoadWay: 30,
          lightStickHeight: [1.5, 2.5],
          carShiftX: [-2.0, 2.0],
          carLightsLength: [400 * 0.1, 400 * 0.5],
          carLightsRadius: [0.08, 0.2],
          movingAwaySpeed: [80, 120],
          movingCloserSpeed: [-150, -200],
          shoulderLinesWidthPercentage: 0.02,
          brokenLinesWidthPercentage: 0.05,
        }} 
      />
    </section>
  );
};

export default HeroSection;
