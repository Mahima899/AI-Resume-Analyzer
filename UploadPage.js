import React, { useState, useRef } from "react";
import axios from "axios";
import "./UploadPage.css";

function UploadPage({ onResult, onJobRole }) {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [inputMode, setInputMode] = useState("file"); // "file" or "text"
  const fileRef = useRef();

  const handleFile = (f) => {
    if (f && (f.type === "application/pdf" || f.type === "text/plain")) {
      setFile(f);
      setError("");
    } else {
      setError("Only PDF or TXT files allowed!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyse = async () => {
    if (inputMode === "file" && !file) return setError("Please upload a resume!");
    if (inputMode === "text" && !resumeText.trim()) return setError("Please paste your resume text!");

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (inputMode === "file") {
        formData.append("resume", file);
      } else {
        formData.append("resumeText", resumeText);
      }
      formData.append("jobRole", jobRole);

      const res = await axios.post("/api/analyse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onJobRole(jobRole);
      onResult(res.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ResumeAI</span>
        </div>
        <p className="tagline">Smart AI Analysis</p>
      </header>

      <main className="upload-main">
        <div className="hero-text">
          <h1>Analyse Your Resume<br /><span className="gradient-text">with AI Precision</span></h1>
          <p>Get instant feedback, ATS score, and improvement tips</p>
        </div>

        <div className="upload-card">
          {/* Toggle */}
          <div className="toggle-tabs">
            <button
              className={`tab ${inputMode === "file" ? "active" : ""}`}
              onClick={() => setInputMode("file")}
            >📄 Upload File</button>
            <button
              className={`tab ${inputMode === "text" ? "active" : ""}`}
              onClick={() => setInputMode("text")}
            >📝 Paste Text</button>
          </div>

          {/* Job Role */}
          <div className="field">
            <label>Target Job Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Software Engineer, Data Scientist..."
              className="input"
            />
          </div>

          {/* File Upload */}
          {inputMode === "file" ? (
            <div
              className={`dropzone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.txt"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <>
                  <div className="file-icon">✅</div>
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
                </>
              ) : (
                <>
                  <div className="upload-icon">☁️</div>
                  <p>Drag & drop your resume here</p>
                  <p className="sub">PDF or TXT • Max 5MB</p>
                </>
              )}
            </div>
          ) : (
            <textarea
              className="textarea"
              placeholder="Paste your resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={10}
            />
          )}

          {error && <p className="error">⚠️ {error}</p>}

          <button
            className="analyse-btn"
            onClick={handleAnalyse}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">
                <span className="spinner" /> Analysing with AI...
              </span>
            ) : (
              "🚀 Analyse Resume"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default UploadPage;
