import React from "react";
import "./ScoreCard.css";

function ScoreCard({ title, items, type }) {
  const colorMap = {
    success: "var(--green)",
    warning: "var(--yellow)",
    info: "var(--accent)",
  };

  const bgMap = {
    success: "rgba(74, 222, 128, 0.08)",
    warning: "rgba(250, 204, 21, 0.08)",
    info: "rgba(124, 106, 255, 0.08)",
  };

  return (
    <div className="score-card" style={{ borderColor: colorMap[type] + "44" }}>
      <p className="card-label" style={{ color: colorMap[type] }}>{title}</p>
      <ul className="items-list">
        {items?.map((item, i) => (
          <li key={i} className="item" style={{ background: bgMap[type] }}>
            <span className="dot" style={{ background: colorMap[type] }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreCard;
