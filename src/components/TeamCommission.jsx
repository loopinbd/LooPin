import React from "react";
import "../styles/TeamCommission.css";

const TeamCommission = ({ levels }) => {
  return (
    <div className="team-commission-container">
      {levels.map((level, index) => (
        <div key={index} className={`commission-card level-${index + 1}`}>
          <h4 className="level-title">Level {index + 1}</h4>
          <div className="team-count">{level.teamCount} Members</div>
          <div className="earned-amount">${level.earned.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default TeamCommission;
