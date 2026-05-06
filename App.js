import React, { useState } from "react";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [jobRole, setJobRole] = useState("");

  const handleReset = () => setAnalysis(null);

  return (
    <div className="app">
      {!analysis ? (
        <UploadPage onResult={setAnalysis} onJobRole={setJobRole} />
      ) : (
        <ResultPage analysis={analysis} jobRole={jobRole} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
