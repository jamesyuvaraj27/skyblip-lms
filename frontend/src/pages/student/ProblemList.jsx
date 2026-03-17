import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const ProblemList = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const problems = useMemo(
    () => [
      { id: 1, title: 'Two Sum', category: 'Arrays', difficulty: 'Easy', acceptance: 71, points: 50 },
      { id: 2, title: 'Reverse String', category: 'Strings', difficulty: 'Easy', acceptance: 83, points: 30 },
      { id: 3, title: 'Merge Intervals', category: 'Arrays', difficulty: 'Medium', acceptance: 58, points: 120 },
      { id: 4, title: 'Longest Palindrome', category: 'Strings', difficulty: 'Medium', acceptance: 49, points: 140 },
      { id: 5, title: 'Climb Stairs', category: 'DP', difficulty: 'Easy', acceptance: 79, points: 60 },
      { id: 6, title: 'Coin Change', category: 'DP', difficulty: 'Medium', acceptance: 44, points: 160 },
      { id: 7, title: 'Word Break', category: 'DP', difficulty: 'Hard', acceptance: 31, points: 220 }
    ],
    []
  );

  const solvedSet = useMemo(() => new Set([1, 5, 2]), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesTopic = topic === 'all' || p.category.toLowerCase() === topic;
      const matchesDiff = difficulty === 'all' || p.difficulty.toLowerCase() === difficulty;
      return matchesQuery && matchesTopic && matchesDiff;
    });
  }, [problems, query, topic, difficulty]);

  const stats = useMemo(() => {
    const total = problems.length;
    const solved = problems.filter((p) => solvedSet.has(p.id)).length;
    const easy = problems.filter((p) => p.difficulty === 'Easy').length;
    const medium = problems.filter((p) => p.difficulty === 'Medium').length;
    const hard = problems.filter((p) => p.difficulty === 'Hard').length;
    return { total, solved, easy, medium, hard };
  }, [problems, solvedSet]);

  return (
    <div className="problems-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Practice</p>
          <h2 className="mycourses-hero__title">
            Practice Problems{user?.name ? ` · ${user.name}` : ''}
          </h2>
          <p className="muted mycourses-hero__subtitle">
            Topic-wise problem bank with difficulty filters, acceptance rates, and a coding editor —
            exactly how real LMS + interview platforms feel.
          </p>
        </div>

        <div className="mycourses-hero__right">
          <div className="mycourses-toolbar">
            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="problemSearch">
                Search
              </label>
              <input
                id="problemSearch"
                type="search"
                className="dashboard-input"
                placeholder="Search problems…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="diffFilter">
                Difficulty
              </label>
              <select
                id="diffFilter"
                className="mycourses-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="dashboard-pills" role="group" aria-label="Topic filters">
            <button
              type="button"
              className="pill pill--filter"
              onClick={() => setTopic('all')}
              aria-pressed={topic === 'all'}
            >
              All
            </button>
            <button
              type="button"
              className="pill pill--filter"
              onClick={() => setTopic('arrays')}
              aria-pressed={topic === 'arrays'}
            >
              Arrays
            </button>
            <button
              type="button"
              className="pill pill--filter"
              onClick={() => setTopic('strings')}
              aria-pressed={topic === 'strings'}
            >
              Strings
            </button>
            <button
              type="button"
              className="pill pill--filter"
              onClick={() => setTopic('dp')}
              aria-pressed={topic === 'dp'}
            >
              DP
            </button>
          </div>
        </div>
      </header>

      <section className="grid grid--3 mycourses-stats" aria-label="Practice stats">
        <div className="card dashboard-kpi dashboard-kpi--success">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Solved</p>
            <span className="dashboard-chip dashboard-chip--success" aria-hidden="true" />
          </div>
          <p className="metric">
            {stats.solved} / {stats.total}
          </p>
          <p className="muted">Keep a daily streak with one solve.</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--info">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Difficulty mix</p>
            <span className="dashboard-chip dashboard-chip--info" aria-hidden="true" />
          </div>
          <p className="metric">
            {stats.easy}-{stats.medium}-{stats.hard}
          </p>
          <p className="muted">Easy / Medium / Hard in your pool.</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--primary">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Shown</p>
            <span className="dashboard-chip dashboard-chip--primary" aria-hidden="true" />
          </div>
          <p className="metric">{filtered.length}</p>
          <p className="muted">Filtered by search & tags.</p>
        </div>
      </section>

      <div className="problem-table problem-table--rich">
        <div className="problem-table__head">
          <span>Title</span>
          <span>Category</span>
          <span>Difficulty</span>
          <span>Acceptance</span>
          <span>Status</span>
        </div>
        {filtered.map((p) => (
          <Link
            to={`/student/problems/${p.id}`}
            key={p.id}
            className="problem-table__row problem-link"
          >
            <span>{p.title}</span>
            <span>{p.category}</span>
            <span className={`pill pill--${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span>
            <span className="muted">{p.acceptance}%</span>
            <span className={`pill ${solvedSet.has(p.id) ? 'pill--success' : 'pill--filter'}`}>
              {solvedSet.has(p.id) ? 'Solved' : 'Not yet'}
            </span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="problem-table__row">
            <span>No matches found.</span>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemList;

