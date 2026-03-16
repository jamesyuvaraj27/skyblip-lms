import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProblemList = () => {
  const { token } = useAuth();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Mock problem data - no backend call
    const mockProblems = [
      { id: 1, title: 'Two Sum', category: 'Arrays', difficulty: 'Easy' },
      { id: 2, title: 'Reverse String', category: 'Strings', difficulty: 'Easy' },
      { id: 3, title: 'Merge Intervals', category: 'Arrays', difficulty: 'Medium' },
      { id: 4, title: 'Longest Palindrome', category: 'Strings', difficulty: 'Medium' },
      { id: 5, title: 'Climb Stairs', category: 'DP', difficulty: 'Easy' },
      { id: 6, title: 'Coin Change', category: 'DP', difficulty: 'Medium' },
      { id: 7, title: 'Word Break', category: 'DP', difficulty: 'Hard' }
    ];
    setProblems(mockProblems);
  }, [token]);

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

