import "./ResultHeader.css";

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

const ResultHeader = () => {
  const timeStr = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="rh-terminal-window">
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

        <div className="rh-terminal-body">
          <div className="rh-prompt-row">
            <span className="rh-prompt-user">results</span>
            <span className="rh-prompt-at">@</span>
            <span className="rh-prompt-host">ideathon2025</span>
            <span className="rh-prompt-colon">:</span>
            <span className="rh-prompt-path">~</span>
            <span className="rh-prompt-dollar">$</span>
          </div>

          <div className="rh-cmd-display">
            <span className="rh-cmd-text">$ cat ./winners.txt</span>
          </div>

          <div className="rh-output-banner">
            <span className="rh-hash">#</span>
            <span className="rh-out-text">
              IDEATHON 2025 —&nbsp;
              <span className="rh-out-hl">Final Results</span>
            </span>
          </div>

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
