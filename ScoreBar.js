import React from "react";
import "./ScoreBar.css";

function ScoreBar({ label, score, color }) {
  return (
    <div className="score-bar-wrap">
      <div className="bar-header">
        <span className="bar-label">{label}</span>
        <span className="bar-score" style={{ color }}>{score}</span>
      </div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default ScoreBar;
