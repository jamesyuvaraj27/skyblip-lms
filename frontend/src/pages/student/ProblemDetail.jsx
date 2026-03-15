import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProblemDetail = () => {
  const { problemId } = useParams();
  const { token, apiBase } = useAuth();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await fetch(`${apiBase}/api/problems/${problemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProblem(data);
      setCode(data.starterCode || '');
    };
    const fetchHistory = async () => {
      const res = await fetch(`${apiBase}/api/problems/${problemId}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setHistory(data);
    };
    if (token && problemId) {
      fetchProblem();
      fetchHistory();
    }
  }, [apiBase, problemId, token]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setVerdict('');
    try {
      const res = await fetch(`${apiBase}/api/problems/${problemId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code, language: 'javascript' })
      });
      const data = await res.json();
      setVerdict(data.verdict || 'Submitted');
      setHistory((prev) => [data, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  if (!problem) return <div>Loading problem...</div>;

  return (
    <div className="problem-layout">
      <section className="problem-statement">
        <h2>{problem.title}</h2>
        <p className="muted">{problem.description}</p>
        <div className="problem-meta">
          <span className={`pill pill--${problem.difficulty?.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <span className="pill pill--filter">{problem.category}</span>
        </div>
        <h4>Constraints</h4>
        <p className="muted">{problem.constraints}</p>
        <h4>Examples</h4>
        <ul>
          {problem.examples?.map((ex, idx) => (
            <li key={idx}>
              <strong>Input:</strong> {ex.input} <strong>Output:</strong> {ex.output}
            </li>
          ))}
        </ul>
      </section>
      <section className="problem-editor">
        <div className="editor-header">
          <h3>Code editor</h3>
          {verdict && <span className="pill pill--success">{verdict}</span>}
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Run & Submit'}
        </button>
        <div className="submission-history">
          <h4>Submission history</h4>
          {history.map((h) => (
            <div key={h.id} className="submission-item">
              <span>{new Date(h.createdAt).toLocaleString()}</span>
              <span className="pill pill--success">{h.verdict}</span>
            </div>
          ))}
          {history.length === 0 && <p className="muted">No submissions yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default ProblemDetail;

