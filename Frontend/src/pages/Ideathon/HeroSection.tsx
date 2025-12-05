import Hyperspeed from '../../components/Hyperspeed';
import { hyperspeedPresets } from '../../components/HyperSpeedPresets';

const HeroSection = () => {
  return (
   <section style={{ 
  width: '100%',
  height: 'calc(100vh - 60px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: 0,
  padding: 0,
  overflow: 'hidden'
}}>
  <div style={{ width: '100%', height: '100%' }}>
    <Hyperspeed effectOptions={hyperspeedPresets.six} />
  </div>
</section>

  );
};

export default HeroSection;
