import { useState, useEffect } from "react";

const resultHeaderStyle = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700;800&family=Orbitron:wght@400;700;900&display=swap');

  /* ══════════════════════════════
     TERMINAL WINDOW (Header)
  ══════════════════════════════ */
  .rh-terminal-window {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 2.5rem;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.07),
      0 24px 60px rgba(0,0,0,0.6),
      0 0 80px rgba(74,222,128,0.05);
    animation: rh-rise 0.6s cubic-bezier(0.16,1,0.3,1) both;
    font-family: 'JetBrains Mono', monospace;
  }

  @keyframes rh-rise {
    from { opacity: 0; transform: translateY(20px) scale(0.99); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Title Bar */
  .rh-title-bar {
    background: #161b22;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 0.75rem 1.2rem;
    display: flex;
    align-items: center;
  }

  .rh-traffic-lights {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-right: 1.2rem;
  }

  .rh-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: filter 0.2s;
    flex-shrink: 0;
  }
  .rh-dot:hover { filter: brightness(1.3); }
  .rh-dot.rh-red    { background: #ff5f56; box-shadow: 0 0 6px rgba(255,95,86,0.5); }
  .rh-dot.rh-yellow { background: #ffbd2e; box-shadow: 0 0 6px rgba(255,189,46,0.4); }
  .rh-dot.rh-green  { background: #27c93f; box-shadow: 0 0 6px rgba(39,201,63,0.45); }

  .rh-dot.rh-red::after    { content: '×'; }
  .rh-dot.rh-yellow::after { content: '−'; }
  .rh-dot.rh-green::after  { content: '+'; }
  .rh-dot::after {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 800;
    color: rgba(0,0,0,0.6);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .rh-dot:hover::after { opacity: 1; }

  .rh-title-label {
    flex: 1;
    text-align: center;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.05em;
    user-select: none;
  }

  .rh-live-badge {
    font-size: 0.62rem;
    color: #4ade80;
    border: 1px solid rgba(74,222,128,0.3);
    border-radius: 3px;
    padding: 0.15rem 0.5rem;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .rh-live-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 4px #4ade80;
    animation: rh-pulse 2s ease-in-out infinite;
  }

  /* Terminal Body */
  .rh-terminal-body {
    background: #0d1117;
    padding: 1.6rem 1.8rem 1.8rem;
  }

  .rh-prompt-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .rh-prompt-user   { color: #4ade80;  font-size: 0.82rem; font-weight: 600; }
  .rh-prompt-at     { color: rgba(255,255,255,0.18); font-size: 0.82rem; }
  .rh-prompt-host   { color: #38bdf8;  font-size: 0.82rem; font-weight: 600; }
  .rh-prompt-colon  { color: rgba(255,255,255,0.18); font-size: 0.82rem; }
  .rh-prompt-path   { color: #c084fc;  font-size: 0.82rem; }
  .rh-prompt-dollar { color: rgba(255,255,255,0.35); font-size: 0.82rem; margin-left: 0.2rem; }

  .rh-cmd-display { margin-bottom: 1.2rem; }

  .rh-cmd-text {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: linear-gradient(90deg, #4ade80, #22d3ee 55%, #4ade80);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rh-shimmer 3s linear infinite;
  }

  @keyframes rh-shimmer {
    from { background-position: 0% center; }
    to   { background-position: 200% center; }
  }

  .rh-blk-cursor {
    display: inline-block;
    width: 10px; height: 1.35em;
    background: #4ade80;
    vertical-align: middle;
    margin-left: 4px;
    border-radius: 1px;
    animation: rh-blink 1s step-end infinite;
  }

  @keyframes rh-blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .rh-output-banner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.65rem 0.9rem;
    background: rgba(255,255,255,0.025);
    border-left: 2px solid rgba(74,222,128,0.35);
    border-radius: 0 4px 4px 0;
    margin-bottom: 1.4rem;
  }

  .rh-hash   { color: rgba(74,222,128,0.55); font-size: 0.85rem; font-weight: 700; }
  .rh-out-text { color: rgba(255,255,255,0.5); font-size: 0.82rem; letter-spacing: 0.03em; }
  .rh-out-hl   { color: rgba(255,255,255,0.85); font-weight: 600; }

  .rh-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rh-status-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.67rem;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.07em;
  }

  .rh-status-pulse {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 5px #4ade80;
    animation: rh-pulse 2s ease-in-out infinite;
  }

  @keyframes rh-pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.45; transform: scale(0.75); }
  }

  /* ══════════════════════════════
     PODIUM — Winner Cards
  ══════════════════════════════ */
  .rh-podium-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    align-items: end;
    margin-bottom: 3.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  @media (max-width: 768px) {
    .rh-podium-grid { grid-template-columns: 1fr; align-items: stretch; }
    .rh-gold   { order: 1; }
    .rh-silver { margin-top: 0 !important; order: 2 !important; }
    .rh-bronze { order: 3; }
  }

  @media (min-width: 769px) {
    .rh-silver { margin-top: -2.5rem; order: -1; }
  }

  /* Gold — tallest */
  .rh-gold .rh-card-inner { padding: 1.8rem 1.4rem 2rem; }
  .rh-gold .rh-team-rank  { font-size: 2.3rem; }
  .rh-gold .rh-rank-bar   { height: 5px; }
  .rh-gold .rh-team-name  { font-size: 1.0rem; }

  /* Silver — medium */
  .rh-silver .rh-card-inner { padding: 1.5rem 1.4rem 1.7rem; }
  .rh-silver .rh-team-rank  { font-size: 2.1rem; }
  .rh-silver .rh-rank-bar   { height: 4px; }

  /* Bronze — shortest */
  .rh-bronze .rh-card-inner { padding: 0.85rem 1.4rem 1rem; }
  .rh-bronze .rh-team-rank  { font-size: 1.5rem; }
  .rh-bronze .rh-team-name  { font-size: 0.85rem; }
  .rh-bronze .rh-member     { font-size: 0.74rem; padding: 0.18rem 0; }
  .rh-bronze .rh-rank-bar   { height: 3px; }

  .rh-winner-card {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    cursor: default;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: rh-fadeUp 0.5s ease both;
  }
  .rh-winner-card:hover { transform: translateY(-7px); }
  .rh-gold:hover   { box-shadow: 0 16px 40px rgba(255,215,0,0.12); }
  .rh-silver:hover { box-shadow: 0 16px 40px rgba(192,192,192,0.1); }
  .rh-bronze:hover { box-shadow: 0 16px 40px rgba(205,127,50,0.1); }

  .rh-gold   { animation-delay: 0.15s; }
  .rh-silver { animation-delay: 0.05s; }
  .rh-bronze { animation-delay: 0.25s; }

  @keyframes rh-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rh-rank-bar { height: 4px; width: 100%; }
  .rh-gold   .rh-rank-bar { background: linear-gradient(90deg, #b8860b, #FFD700, #fff3a0, #FFD700, #b8860b); }
  .rh-silver .rh-rank-bar { background: linear-gradient(90deg, #666, #C0C0C0, #eee, #C0C0C0, #666); }
  .rh-bronze .rh-rank-bar { background: linear-gradient(90deg, #7a4718, #CD7F32, #e8a060, #CD7F32, #7a4718); }

  .rh-card-inner {
    background: #0d1117;
    border: 1px solid rgba(255,255,255,0.06);
    border-top: none;
    padding: 1.4rem 1.4rem 1.6rem;
    position: relative;
    overflow: hidden;
  }

  .rh-card-inner::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 70px; height: 70px;
    pointer-events: none;
    border-radius: 0 0 0 100%;
    opacity: 0.12;
  }
  .rh-gold   .rh-card-inner::after { background: #FFD700; }
  .rh-silver .rh-card-inner::after { background: #C0C0C0; }
  .rh-bronze .rh-card-inner::after { background: #CD7F32; }

  .rh-card-cmd {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.22);
    margin-bottom: 0.85rem;
    letter-spacing: 0.03em;
  }
  .rh-card-cmd .rh-g { color: #4ade80; }

  .rh-team-rank {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.1rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.35rem;
  }
  .rh-gold   .rh-team-rank { color: #FFD700; text-shadow: 0 0 24px rgba(255,215,0,0.45); }
  .rh-silver .rh-team-rank { color: #C0C0C0; text-shadow: 0 0 24px rgba(192,192,192,0.3); }
  .rh-bronze .rh-team-rank { color: #CD7F32; text-shadow: 0 0 24px rgba(205,127,50,0.35); }

  .rh-team-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.06em;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
  }

  .rh-card-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin-bottom: 1rem;
  }

  .rh-members-label {
    font-size: 0.63rem;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 0.65rem;
  }

  .rh-member {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.79rem;
    color: rgba(255,255,255,0.7);
    padding: 0.3rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s;
  }
  .rh-member:last-child { border-bottom: none; }
  .rh-member:hover { color: #fff; }

  .rh-mdot {
    width: 4px; height: 4px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .rh-gold   .rh-mdot { background: #FFD700; }
  .rh-silver .rh-mdot { background: #C0C0C0; }
  .rh-bronze .rh-mdot { background: #CD7F32; }

  /* ══════════════════════════════
     SPECIAL APPRECIATION
  ══════════════════════════════ */
  .rh-appreciation-section {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 2.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .rh-section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .rh-section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    white-space: nowrap;
  }

  .rh-section-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.08), transparent);
  }

  .rh-section-count {
    font-size: 0.67rem;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  .rh-appreciation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
    gap: 0.7rem;
  }

  .rh-appr-card {
    background: #0d1117;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 5px;
    padding: 0.9rem 1rem 0.9rem 1.15rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.25s;
    cursor: default;
    animation: rh-fadeUp 0.4s ease both;
  }

  .rh-appr-card:hover {
    border-color: rgba(255,255,255,0.16);
    transform: translateY(-3px);
  }

  .rh-appr-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #4ade80, #22d3ee);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .rh-appr-card:hover::before { opacity: 1; }

  .rh-appr-label {
    font-size: 0.62rem;
    color: #4ade80;
    opacity: 0.65;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
  }

  .rh-appr-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255,255,255,0.78);
    letter-spacing: 0.03em;
    line-height: 1.35;
  }
`;

/* ── Data ── */
const winners = [
  {
    cls: "rh-gold",
    place: "🥇",
    rank: "01",
    name: "ZenTechs",
    members: [
      "Devansh Ranjan",
      "Bhavesh Agrawal",
      "Asmit Srivastav",
      "Ashutosh Kumar Nigam",
      "Ishika Saroj",
    ],
  },
  {
    cls: "rh-silver",
    place: "🥈",
    rank: "02",
    name: "Team TRINETRA",
    members: ["Aniket Sahu", "Amit Kumar Patel", "Manish Verma"],
  },
  {
    cls: "rh-bronze",
    place: "🥉",
    rank: "03",
    name: "SpiralForge",
    members: ["Kavya Saxena", "Siddhant Singh", "Nyasi", "Pranav Sharma"],
  },
];

const appreciation = [
  "TEAM NAVTECH",
  "Team BLITZ",
  "Kavach Nexus",
  "W.I.S.E",
  "VISIONARY VANGUARDS",
  "NexSight",
  "QuadCore",
];

/* ── ResultHeader Component ── */
const ResultHeader = () => {
  const [typed, setTyped] = useState("");
  const full = "cat ./winners.txt";

  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0;
      const t = setInterval(() => {
        setTyped(full.slice(0, ++i));
        if (i === full.length) clearInterval(t);
      }, 65);
      return () => clearInterval(t);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  const timeStr = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <style>{resultHeaderStyle}</style>

      {/* ── Terminal Window Header ── */}
      <div className="rh-terminal-window">
        {/* Title Bar */}
        <div className="rh-title-bar">
          <div className="rh-traffic-lights">
            <div className="rh-dot rh-red" />
            <div className="rh-dot rh-yellow" />
            <div className="rh-dot rh-green" />
          </div>
          <div className="rh-title-label">results@ideathon2025 — bash</div>
          <div className="rh-live-badge">
            <div className="rh-live-dot" />
            LIVE
          </div>
        </div>

        {/* Body */}
        <div className="rh-terminal-body">
          {/* Prompt */}
          <div className="rh-prompt-row">
            <span className="rh-prompt-user">results</span>
            <span className="rh-prompt-at">@</span>
            <span className="rh-prompt-host">ideathon2025</span>
            <span className="rh-prompt-colon">:</span>
            <span className="rh-prompt-path">~</span>
            <span className="rh-prompt-dollar">$</span>
          </div>

          {/* Typed Command */}
          <div className="rh-cmd-display">
            <span className="rh-cmd-text">$ {typed}</span>
            {typed.length < full.length && <span className="rh-blk-cursor" />}
          </div>

          {/* Output banner */}
          <div className="rh-output-banner">
            <span className="rh-hash">#</span>
            <span className="rh-out-text">
              IDEATHON 2025 —&nbsp;
              <span className="rh-out-hl">Final Results</span>
            </span>
          </div>

          {/* Status bar */}
          <div className="rh-status-bar">
            <div className="rh-status-item">
              <div className="rh-status-pulse" />
              CONNECTED
            </div>
            <div className="rh-status-item">SESSION · IDEATHON_2025</div>
            <div className="rh-status-item">{timeStr} IST</div>
          </div>
        </div>
      </div>
      {/* ── End Terminal Window ── */}

      {/* ── Winners Podium ── */}
      <div className="rh-podium-grid">
        {winners.map((w) => (
          <div key={w.cls} className={`rh-winner-card ${w.cls}`}>
            <div className="rh-rank-bar" />
            <div className="rh-card-inner">
              <div className="rh-card-cmd">
                <span className="rh-g">▸</span> echo $PLACE_{w.rank}
              </div>
              <div className="rh-team-rank">
                {w.place} {w.rank}
              </div>
              <div className="rh-team-name">{w.name}</div>
              <div className="rh-card-divider" />
              <div className="rh-members-label">
                TEAM_MEMBERS={w.members.length}
              </div>
              {w.members.map((m) => (
                <div key={m} className="rh-member">
                  <span className="rh-mdot" />
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Special Appreciation ── */}
      <div className="rh-appreciation-section">
        <div className="rh-section-header">
          <div className="rh-section-title">Special Appreciation</div>
          <div className="rh-section-rule" />
          <div className="rh-section-count">{appreciation.length} teams</div>
        </div>

        <div className="rh-appreciation-grid">
          {appreciation.map((team, i) => (
            <div
              key={team}
              className="rh-appr-card"
              style={{ animationDelay: `${0.05 * i + 0.3}s` }}
            >
              <div className="rh-appr-label">★ RECOGNIZED</div>
              <div className="rh-appr-name">{team}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultHeader;
