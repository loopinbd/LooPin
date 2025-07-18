import React, { useState, useEffect } from "react";
import "../styles/TeamCommission.css";

const TIMEFRAMES = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All Time", value: "all" },
];

const TeamCommission = ({ levels = [] }) => {
  const [timeframe, setTimeframe] = useState("all");
  const [filteredLevels, setFilteredLevels] = useState([]);

  useEffect(() => {
    // Future enhancement: apply filtering based on timeframe
    setFilteredLevels(levels);
  }, [levels, timeframe]);

  const levelData = [1, 2, 3].map((lvl) => {
    const found = filteredLevels.find((l) => Number(l.level) === lvl);
    return {
      level: lvl,
      teamCount: found?.teamCount || 0,
      earned: found?.earned || 0,
    };
  });

  const totalTeam = levelData.reduce((sum, l) => sum + l.teamCount, 0);
  const totalEarned = levelData.reduce((sum, l) => sum + l.earned, 0);

  return (
    <div className="team-commission-wrapper">
      <div className="timeframe-select">
        <label htmlFor="timeframe">Timeframe:</label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          {TIMEFRAMES.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      <div className="team-commission-container">
        {levelData.map(({ level, teamCount, earned }) => (
          <div key={level} className={`commission-card level-${level}`}>
            <h4 className="level-title">Level {level}</h4>
            <div className="team-count">{teamCount} Members</div>
            <div className="earned-amount">${Number(earned).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="total-box">
        <h4>Total</h4>
        <div className="team-count">{totalTeam} Members</div>
        <div className="earned-amount">${Number(totalEarned).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TeamCommission;
