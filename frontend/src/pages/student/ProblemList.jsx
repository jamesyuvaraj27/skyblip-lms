import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProblemList = () => {
  const { token, apiBase } = useAuth();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch(`${apiBase}/api/problems`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProblems(data);
    };
    if (token) fetchProblems();
  }, [apiBase, token]);

  return (
    <div className="problems-page">
      <header className="dashboard-header">
        <div>
          <h2>Practice Problems</h2>
          <p className="muted">
            Interview‑style questions with constraints, examples and a live code editor.
          </p>
        </div>
        <div className="problems-filters">
          <button className="pill pill--filter">All</button>
          <button className="pill pill--filter">Arrays</button>
          <button className="pill pill--filter">Strings</button>
          <button className="pill pill--filter">DP</button>
        </div>
      </header>
      <div className="problem-table">
        <div className="problem-table__head">
          <span>Title</span>
          <span>Category</span>
          <span>Difficulty</span>
        </div>
        {problems.map((p) => (
          <Link
            to={`/student/problems/${p.id}`}
            key={p.id}
            className="problem-table__row problem-link"
          >
            <span>{p.title}</span>
            <span>{p.category}</span>
            <span className={`pill pill--${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span>
          </Link>
        ))}
        {problems.length === 0 && (
          <div className="problem-table__row">
            <span>No problems seeded yet.</span>
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemList;

