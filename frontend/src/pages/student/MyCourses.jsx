import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/useAuth.js';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const items = useMemo(
    () => [
      {
        id: 1,
        courseId: 1,
        courseTitle: 'JavaScript Fundamentals',
        thumbnail: 'https://via.placeholder.com/600x240?text=JavaScript',
        progressPercent: 75,
        level: 'Beginner',
        durationHours: 12,
        lessons: 18,
        lastActivity: 'Yesterday',
        nextUp: 'Functions · Scope & Hoisting'
      },
      {
        id: 2,
        courseId: 2,
        courseTitle: 'Data Structures & Algorithms',
        thumbnail: 'https://via.placeholder.com/600x240?text=DSA',
        progressPercent: 45,
        level: 'Intermediate',
        durationHours: 20,
        lessons: 26,
        lastActivity: 'Today',
        nextUp: 'Stacks · Balanced Parentheses'
      },
      {
        id: 3,
        courseId: 3,
        courseTitle: 'React Advanced Patterns',
        thumbnail: 'https://via.placeholder.com/600x240?text=React',
        progressPercent: 30,
        level: 'Advanced',
        durationHours: 10,
        lessons: 14,
        lastActivity: '2 days ago',
        nextUp: 'Performance · Memoization'
      }
    ],
    []
  );

  const stats = useMemo(() => {
    const active = items.length;
    const avg = active
      ? Math.round(items.reduce((sum, c) => sum + (c.progressPercent || 0), 0) / active)
      : 0;
    const inProgress = items.filter((c) => (c.progressPercent || 0) > 0 && (c.progressPercent || 0) < 100)
      .length;
    const completed = items.filter((c) => (c.progressPercent || 0) >= 100).length;
    return { active, avg, inProgress, completed };
  }, [items]);

  const continueCourse = useMemo(() => {
    const sorted = [...items].sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0));
    return sorted[0] || null;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((c) => {
      const matchesQuery = !q || c.courseTitle.toLowerCase().includes(q);
      const p = c.progressPercent || 0;
      const matchesFilter =
        filter === 'all' ||
        (filter === 'inprogress' && p > 0 && p < 100) ||
        (filter === 'notstarted' && p === 0) ||
        (filter === 'completed' && p >= 100);
      return matchesQuery && matchesFilter;
    });
  }, [items, query, filter]);

  return (
    <div className="my-courses-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">My learning</p>
          <h2 className="mycourses-hero__title">
            My Courses{user?.name ? ` · ${user.name}` : ''}
          </h2>
          <p className="muted mycourses-hero__subtitle">
            Manage active enrollments, resume lessons, and stay on track with a clear next-step plan.
          </p>
        </div>

        <div className="mycourses-hero__right">
          <div className="mycourses-toolbar">
            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="courseSearch">
                Search
              </label>
              <input
                id="courseSearch"
                type="search"
                className="dashboard-input"
                placeholder="Search by course title…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="courseFilter">
                Filter
              </label>
              <select
                id="courseFilter"
                className="mycourses-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="inprogress">In progress</option>
                <option value="notstarted">Not started</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="dashboard-pills">
            <span className="pill pill--filter">Progress tracking</span>
            <span className="pill pill--filter">Resume where you left</span>
            <span className="pill pill--filter">Next lesson highlighted</span>
          </div>
        </div>
      </header>

      <section className="grid grid--3 mycourses-stats" aria-label="Course summary stats">
        <div className="card dashboard-kpi dashboard-kpi--info">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Active courses</p>
            <span className="dashboard-chip dashboard-chip--info" aria-hidden="true" />
          </div>
          <p className="metric">{stats.active}</p>
          <p className="muted">Current enrollments in your dashboard.</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--success">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Average progress</p>
            <span className="dashboard-chip dashboard-chip--success" aria-hidden="true" />
          </div>
          <p className="metric">{stats.avg}%</p>
          <p className="muted">Across all your courses.</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--primary">
          <div className="dashboard-kpi__top">
            <p className="stat-label">In progress</p>
            <span className="dashboard-chip dashboard-chip--primary" aria-hidden="true" />
          </div>
          <p className="metric">{stats.inProgress}</p>
          <p className="muted">Courses you started and can resume today.</p>
        </div>
      </section>

      <section className="mycourses-grid">
        <div className="mycourses-cardlist">
          <div className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Continue learning</h3>
                <p className="muted">Your best next course based on progress.</p>
              </div>
              {continueCourse && (
                <span className="muted">Last activity: {continueCourse.lastActivity}</span>
              )}
            </div>

            {continueCourse ? (
              <div className="course-card--wide">
                <div>
                  <p className="course-card__title">{continueCourse.courseTitle}</p>
                  <p className="muted">Next up: {continueCourse.nextUp}</p>
                  <div className="course-card__meta-row">
                    <span className="pill pill--filter">{continueCourse.level}</span>
                    <span className="pill pill--filter">{continueCourse.lessons} lessons</span>
                    <span className="pill pill--filter">{continueCourse.durationHours} hrs</span>
                  </div>
                  <div className="course-progress">
                    <div className="course-progress__top">
                      <span>Progress</span>
                      <span className="muted">{continueCourse.progressPercent}%</span>
                    </div>
                    <div className="course-progress__bar" aria-label="Continue course progress bar">
                      <div
                        className="course-progress__fill"
                        style={{ width: `${continueCourse.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="course-card__side">
                  <Link
                    to={`/student/courses/${continueCourse.courseId}`}
                    className="btn btn--primary btn--small"
                  >
                    Resume course
                  </Link>
                  <button className="btn btn--ghost btn--small" type="button">
                    View syllabus
                  </button>
                </div>
              </div>
            ) : (
              <p className="muted">No courses yet.</p>
            )}
          </div>

          <div className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>All courses</h3>
                <p className="muted">Search and filter your enrollments.</p>
              </div>
              <span className="muted">{filtered.length} shown</span>
            </div>

            <div className="grid grid--3 dashboard-cards">
              {filtered.map((item) => (
                <div key={item.id} className="card course-card">
                  {item.thumbnail && (
                    <div className="course-thumb">
                      <img src={item.thumbnail} alt={item.courseTitle} />
                    </div>
                  )}
                  <h3>{item.courseTitle}</h3>
                  <p className="muted">Self‑paced with lessons, practice, and a final quiz.</p>
                  <div className="course-card__meta-row">
                    <span className="pill pill--filter">{item.level}</span>
                    <span className="pill pill--filter">{item.lessons} lessons</span>
                    <span className="pill pill--filter">{item.durationHours} hrs</span>
                  </div>
                  <div className="course-progress">
                    <div className="course-progress__top">
                      <span>Progress</span>
                      <span className="muted">{item.progressPercent}%</span>
                    </div>
                    <div className="course-progress__bar" aria-label={`${item.courseTitle} progress bar`}>
                      <div
                        className="course-progress__fill"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <p className="muted" style={{ marginTop: '0.6rem' }}>
                    Next up: {item.nextUp}
                  </p>
                  <div className="course-card__actions">
                    <Link
                      to={`/student/courses/${item.courseId}`}
                      className="btn btn--primary btn--small"
                    >
                      Continue
                    </Link>
                    <button className="btn btn--ghost btn--small" type="button">
                      Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="card course-empty">
                <h3>No matches</h3>
                <p className="muted">Try a different search text or switch the filter.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Next steps</h3>
              <p className="muted">What a real LMS expects you to do.</p>
            </div>
          </div>

          <ul className="mycourses-checklist" aria-label="Next steps checklist">
            <li className="mycourses-check">
              <span className="dot dot--info" aria-hidden="true" />
              <div>
                <strong>Resume one lesson</strong>
                <p className="muted">Finish the next lesson and take quick notes.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--primary" aria-hidden="true" />
              <div>
                <strong>Practice immediately</strong>
                <p className="muted">Solve 1–2 problems to lock the concept.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--warning" aria-hidden="true" />
              <div>
                <strong>Attempt the quiz</strong>
                <p className="muted">Quiz scores feed into your progress and mastery.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--success" aria-hidden="true" />
              <div>
                <strong>Keep your streak alive</strong>
                <p className="muted">One small activity daily beats long breaks.</p>
              </div>
            </li>
          </ul>

          <div className="dashboard-panel__footer">
            <Link to="/student/dashboard" className="btn btn--ghost btn--small">
              Back to dashboard
            </Link>
            <Link to="/student/problems" className="btn btn--primary btn--small">
              Open practice
            </Link>
          </div>
        </aside>
      </section>

      {items.length === 0 && (
          <div className="card course-empty">
            <h3>No courses yet</h3>
            <p className="muted">
              In a full build, this page would connect to the public course catalog. For now, use
              the seeded demo enrollment.
            </p>
          </div>
      )}
    </div>
  );
};

export default MyCourses;

