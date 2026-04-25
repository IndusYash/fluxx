import { useMemo } from 'react';
import React from 'react';

const ModernCountdownTimer = ({ timeLeft }) => {
  const countdownDisplay = useMemo(() => ({
    days: String(timeLeft.days).padStart(2, '0'),
    hours: String(timeLeft.hours).padStart(2, '0'),
    minutes: String(timeLeft.minutes).padStart(2, '0'),
    seconds: String(timeLeft.seconds).padStart(2, '0')
  }), [timeLeft]);

  return (
    <>
      <style>{`
  .modern-countdown-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .countdown-label-text {
    font-size: clamp(0.85rem, 1.6vw, 1.1rem);
    font-weight: 600;
    color: #E5FFFB; /* ⬅ Icy white */
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  .countdown-units {
    display: flex;
    align-items: center;
    gap: clamp(0.8rem, 2vw, 1.25rem);
  }

  .countdown-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
    background: rgba(150, 255, 245, 0.05);
    border: 1.5px solid rgba(150, 255, 245, 0.25);
    border-radius: 12px;
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
  }

  .countdown-box::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, 
      rgba(229, 255, 251, 0.25), 
      rgba(154, 245, 255, 0.4),
      rgba(229, 255, 251, 0.25)
    );
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .countdown-box:hover::before {
    opacity: 1;
  }

  .countdown-box:hover {
    transform: translateY(-2px);
    border-color: rgba(150, 255, 245, 0.45);
    box-shadow: 
      0 0 14px rgba(150, 255, 245, 0.25),
      0 6px 24px rgba(0, 0, 0, 0.4);
  }

  .countdown-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    background: linear-gradient(135deg, #E5FFFB 0%, #6CFFF7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    text-shadow:
      0 0 12px rgba(150, 255, 245, 0.35),
      0 0 22px rgba(150, 255, 245, 0.45);
  }

  .countdown-unit-label {
    font-size: clamp(0.6rem, 1.3vw, 0.85rem);
    font-weight: 500;
    color: #E5FFFB;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  .countdown-separator {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 300;
    color: #9AF5FF; /* soft cyan */
    opacity: 0.7;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
  .countdown-units {
    gap: 0.5rem;
  }
  .countdown-box {
    padding: 0.6rem 0.9rem; /* Not too big on small phones */
  }
}
`}</style>


      <div className="modern-countdown-container">
        <div className="countdown-label-text font-extrabold">Registrations closing in</div>
        
        <div className="countdown-units">
          <div className="countdown-box">
            <div className="countdown-number">{countdownDisplay.days}</div>
            <div className="countdown-unit-label">Days</div>
          </div>

          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-number">{countdownDisplay.hours}</div>
            <div className="countdown-unit-label">Hours</div>
          </div>

          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-number">{countdownDisplay.minutes}</div>
            <div className="countdown-unit-label">Minutes</div>
          </div>

          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-number">{countdownDisplay.seconds}</div>
            <div className="countdown-unit-label">Seconds</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernCountdownTimer;
