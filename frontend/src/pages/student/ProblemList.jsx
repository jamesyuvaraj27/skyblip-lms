import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentProblems, studentSnapshot } from './studentData.js';
import './ProblemList.css';

const ProblemList = () => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('points-desc');

  const stats = useMemo(() => {
    const total = studentProblems.length;
    const solved = studentProblems.filter((problem) => problem.solved).length;
    const attempted = studentProblems.filter((problem) => problem.attempted).length;
    const mediumHard = studentProblems.filter(
      (problem) => ['Medium', 'Hard'].includes(problem.difficulty)
    ).length;

    return { total, solved, attempted, mediumHard };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = studentProblems.filter((problem) => {
      const matchesQuery =
        !q ||
        problem.title.toLowerCase().includes(q) ||
        problem.category.toLowerCase().includes(q) ||
        (problem.tags ?? []).some((tag) => tag.toLowerCase().includes(q));

      const matchesTopic = topic === 'all' || problem.category.toLowerCase() === topic;
      const matchesDifficulty =
        difficulty === 'all' || problem.difficulty.toLowerCase() === difficulty;

      const problemStatus = problem.solved ? 'solved' : problem.attempted ? 'attempted' : 'new';
      const matchesStatus = status === 'all' || problemStatus === status;

      return matchesQuery && matchesTopic && matchesDifficulty && matchesStatus;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'acceptance-desc') return b.acceptance - a.acceptance;
      if (sortBy === 'acceptance-asc') return a.acceptance - b.acceptance;
      if (sortBy === 'points-asc') return a.points - b.points;
      return b.points - a.points;
    });
  }, [difficulty, query, sortBy, status, topic]);

  return (
    <div className="problems-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Coding practice</p>
          <h2 className="mycourses-hero__title">Problem Bank and Compiler</h2>
          <p className="muted mycourses-hero__subtitle">
            Built with interview-platform patterns: difficulty tags, accuracy, submissions, points,
            and one-click coding workspace.
          </p>
        </div>

        <div className="mycourses-hero__right">
          <div className="mycourses-toolbar problems-toolbar">
            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="problemSearch">
                Search
              </label>
              <input
                id="problemSearch"
                type="search"
                className="dashboard-input"
                placeholder="Search by title, tag, or topic"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="difficultyFilter">
                Difficulty
              </label>
              <select
                id="difficultyFilter"
                className="mycourses-select"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="statusFilter">
                Status
              </label>
              <select
                id="statusFilter"
                className="mycourses-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="attempted">Attempted</option>
                <option value="solved">Solved</option>
              </select>
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="sortBy">
                Sort by
              </label>
              <select
                id="sortBy"
                className="mycourses-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="points-desc">Points high to low</option>
                <option value="points-asc">Points low to high</option>
                <option value="acceptance-desc">Accuracy high to low</option>
                <option value="acceptance-asc">Accuracy low to high</option>
              </select>
            </div>
          </div>

          <div className="dashboard-pills" role="group" aria-label="Topic filters">
            <button type="button" className="pill pill--filter" onClick={() => setTopic('all')}>
              All topics
            </button>
            <button type="button" className="pill pill--filter" onClick={() => setTopic('arrays')}>
              Arrays
            </button>
            <button type="button" className="pill pill--filter" onClick={() => setTopic('strings')}>
              Strings
            </button>
            <button type="button" className="pill pill--filter" onClick={() => setTopic('dp')}>
              Dynamic Programming
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
          <p className="muted">Keep daily consistency to retain streak.</p>
        </div>

        <div className="card dashboard-kpi dashboard-kpi--info">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Attempted</p>
            <span className="dashboard-chip dashboard-chip--info" aria-hidden="true" />
          </div>
          <p className="metric">{stats.attempted}</p>
          <p className="muted">Problems where you have at least one run.</p>
        </div>

        <div className="card dashboard-kpi dashboard-kpi--warning">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Medium + Hard pool</p>
            <span className="dashboard-chip dashboard-chip--warning" aria-hidden="true" />
          </div>
          <p className="metric">{stats.mediumHard}</p>
          <p className="muted">Prioritize these for interview readiness.</p>
        </div>
      </section>

      <section className="problems-content-grid">
        <div className="problem-table problem-table--rich">
          <div className="problem-table__head">
            <span>Problem</span>
            <span>Difficulty</span>
            <span>Accuracy</span>
            <span>Submissions</span>
            <span>Points</span>
            <span>Status</span>
          </div>

          {filtered.map((problem) => {
            const statusLabel = problem.solved ? 'Solved' : problem.attempted ? 'Attempted' : 'New';
            const statusPill = problem.solved ? 'pill--success' : problem.attempted ? 'pill--warning' : 'pill--filter';

            return (
              <Link
                to={`/student/problems/${problem.id}`}
                key={problem.id}
                className="problem-table__row problem-link"
              >
                <div className="problem-table__problem">
                  <span className="problem-title">{problem.title}</span>
                  <span className="muted">{problem.category}</span>
                </div>
                <span className={`pill pill--${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                <span className="muted">{problem.acceptance}%</span>
                <span className="muted">{problem.submissions}</span>
                <span className="pill pill--filter">{problem.points}</span>
                <span className={`pill ${statusPill}`}>{statusLabel}</span>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="problem-table__row problem-table__row--empty">
              <span>No matching problems found.</span>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <aside className="card dashboard-panel problems-side">
          <div className="dashboard-panel__header">
            <div>
              <h3>Weekly challenge</h3>
              <p className="muted">Follow this sequence for balanced growth.</p>
            </div>
            <span className="pill pill--filter">Week 3</span>
          </div>

          <ul className="mycourses-checklist" aria-label="Challenge checklist">
            <li className="mycourses-check">
              <span className="dot dot--info" aria-hidden="true" />
              <div>
                <strong>2 Easy warmups</strong>
                <p className="muted">Finish within 30 minutes total.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--warning" aria-hidden="true" />
              <div>
                <strong>2 Medium drills</strong>
                <p className="muted">Use the compiler diagnostics panel for quick fixes.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--success" aria-hidden="true" />
              <div>
                <strong>1 Hard attempt</strong>
                <p className="muted">Focus on approach and dry run before coding.</p>
              </div>
            </li>
          </ul>

          <div className="dashboard-note dashboard-note--info">
            <p className="dashboard-note__title">Streak status</p>
            <p className="muted">
              {studentSnapshot.streakDays} day streak active. Solve one more problem today to preserve it.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ProblemList;
