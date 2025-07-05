import React from "react";
import "../styles/TeamCommission.css";

const TeamCommission = ({ levels = [], timeFrame = "all" }) => {
  if (levels.length === 0) {
    return (
      <div className="no-team-data">
        <p>No team data available.</p>
      </div>
    );
  }

  // Helper to filter details based on timeFrame
  const filterByTimeFrame = (details) => {
    if (timeFrame === "all") return details;

    const now = Date.now();
    let cutoff = 0;

    if (timeFrame === "daily") {
      cutoff = now - 24 * 60 * 60 * 1000; // last 24 hours
    } else if (timeFrame === "weekly") {
      cutoff = now - 7 * 24 * 60 * 60 * 1000; // last 7 days
    } else if (timeFrame === "monthly") {
      cutoff = now - 30 * 24 * 60 * 60 * 1000; // last 30 days
    }

    return details.filter((item) => item.timestamp >= cutoff);
  };

  return (
    <div className="team-commission-container">
      {levels.map((level, index) => {
        const filteredDetails = filterByTimeFrame(level.details || []);

        const teamCount = filteredDetails.length;

        const earned = filteredDetails.reduce((sum, item) => sum + (item.earned || 0), 0);

        return (
          <div key={index} className={`commission-card level-${index + 1}`}>
            <h4 className="level-title">Level {index + 1}</h4>
            <div className="team-count">{teamCount} Members</div>
            <div className="earned-amount">${earned.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamCommission;
