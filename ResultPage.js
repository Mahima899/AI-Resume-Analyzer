import React from "react";
import ScoreCard from "../components/ScoreCard";
import ScoreBar from "../components/ScoreBar";
import "./ResultPage.css";

function ResultPage({ analysis, jobRole, onReset }) {
  const {
    overallScore, scores, strengths, weaknesses,
    suggestions, missingKeywords, summary, jobMatch,
  } = analysis;

  const getColor = (score) => {
    if (score >= 75) return "var(--green)";
    if (score >= 50) return "var(--yellow)";
    return "var(--red)";
  };

  const getLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  return (
    <div className="result-page">
      {/* Header */}
      <header className="result-header">
        <div className="logo">
          <span>⚡</span>
          <span>ResumeAI</span>
        </div>
        <button className="back-btn" onClick={onReset}>← Analyse Another</button>
      </header>

      <main className="result-main">
        <div className="top-row">
          {/* Overall Score */}
          <div className="overall-card">
            <p className="card-label">Overall Score</p>
            <div
              className="big-score"
              style={{ color: getColor(overallScore) }}
            >
              {overallScore}
              <span className="score-max">/100</span>
            </div>
            <p className="score-label" style={{ color: getColor(overallScore) }}>
              {getLabel(overallScore)}
            </p>
            <div className="job-match-row">
              <span className="match-label">Job Match:</span>
              <span className="match-value" style={{ color: getColor(jobMatch) }}>
                {jobMatch}%
              </span>
              <span className="job-role-badge">{jobRole}</span>
            </div>
            <p className="summary-text">{summary}</p>
          </div>

          {/* Score Breakdown */}
          <div className="breakdown-card">
            <p className="card-label">Score Breakdown</p>
            <div className="score-bars">
              <ScoreBar label="Skills" score={scores.skills} color={getColor(scores.skills)} />
              <ScoreBar label="Experience" score={scores.experience} color={getColor(scores.experience)} />
              <ScoreBar label="Format" score={scores.format} color={getColor(scores.format)} />
              <ScoreBar label="ATS Compatibility" score={scores.atsCompatibility} color={getColor(scores.atsCompatibility)} />
            </div>
          </div>
        </div>

        <div className="cards-row">
          <ScoreCard title="💪 Strengths" items={strengths} type="success" />
          <ScoreCard title="⚠️ Weaknesses" items={weaknesses} type="warning" />
          <ScoreCard title="🔑 Missing Keywords" items={missingKeywords} type="info" />
        </div>

        {/* Suggestions */}
        <div className="suggestions-card">
          <p className="card-label">🎯 AI Suggestions to Improve</p>
          <div className="suggestions-grid">
            {suggestions.map((s, i) => (
              <div key={i} className="suggestion-item">
                <span className="suggestion-num">{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultPage;
