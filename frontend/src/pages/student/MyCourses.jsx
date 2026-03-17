import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  certificates,
  getContinueCourse,
  recommendedTracks,
  studentCourses,
  studentSnapshot
} from './studentData.js';
import './MyCourses.css';

const MyCourses = () => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('progress-desc');

  const stats = useMemo(() => {
    const active = studentCourses.length;
    const avg =
      active > 0
        ? Math.round(
            studentCourses.reduce(
              (sum, item) => sum + Math.round((item.completedLessons / Math.max(item.totalLessons, 1)) * 100),
              0
            ) / active
          )
        : 0;
    const inProgress = studentCourses.filter(
      (course) => course.completedLessons > 0 && course.completedLessons < course.totalLessons
    ).length;
    const completed = studentCourses.filter((course) => course.completedLessons >= course.totalLessons).length;

    return { active, avg, inProgress, completed };
  }, []);

  const continueCourse = useMemo(() => getContinueCourse(), []);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = studentCourses.filter((course) => {
      const progressPercent = Math.round((course.completedLessons / Math.max(course.totalLessons, 1)) * 100);
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.track.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'inprogress' && progressPercent > 0 && progressPercent < 100) ||
        (statusFilter === 'notstarted' && progressPercent === 0) ||
        (statusFilter === 'completed' && progressPercent >= 100);

      const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter;

      return matchesQuery && matchesStatus && matchesLevel;
    });

    const sorted = [...list].sort((a, b) => {
      const aProgress = Math.round((a.completedLessons / Math.max(a.totalLessons, 1)) * 100);
      const bProgress = Math.round((b.completedLessons / Math.max(b.totalLessons, 1)) * 100);
      if (sortBy === 'progress-asc') return aProgress - bProgress;
      if (sortBy === 'duration-asc') return a.durationHours - b.durationHours;
      if (sortBy === 'duration-desc') return b.durationHours - a.durationHours;
      return bProgress - aProgress;
    });

    return sorted;
  }, [levelFilter, query, sortBy, statusFilter]);

  return (
    <div className="my-courses-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Learning paths</p>
          <h2 className="mycourses-hero__title">My Courses</h2>
          <p className="muted mycourses-hero__subtitle">
            Structured like modern LMS platforms: module-based progression, practical tasks, and clear
            completion tracking.
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
                placeholder="Search title, track, or instructor"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="statusFilter">
                Status
              </label>
              <select
                id="statusFilter"
                className="mycourses-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All</option>
                <option value="inprogress">In progress</option>
                <option value="notstarted">Not started</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="levelFilter">
                Level
              </label>
              <select
                id="levelFilter"
                className="mycourses-select"
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value)}
              >
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="dashboard-hero__search">
              <label className="dashboard-hero__search-label" htmlFor="sortBy">
                Sort
              </label>
              <select
                id="sortBy"
                className="mycourses-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="progress-desc">Progress high to low</option>
                <option value="progress-asc">Progress low to high</option>
                <option value="duration-desc">Duration long to short</option>
                <option value="duration-asc">Duration short to long</option>
              </select>
            </div>
          </div>

          <div className="dashboard-pills">
            <span className="pill pill--filter">Outcome-based modules</span>
            <span className="pill pill--filter">Certificates</span>
            <span className="pill pill--filter">Problem-linked lessons</span>
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
          <p className="muted">Across frontend and problem-solving tracks.</p>
        </div>

        <div className="card dashboard-kpi dashboard-kpi--success">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Average progress</p>
            <span className="dashboard-chip dashboard-chip--success" aria-hidden="true" />
          </div>
          <p className="metric">{stats.avg}%</p>
          <p className="muted">Measured by completed lessons.</p>
        </div>

        <div className="card dashboard-kpi dashboard-kpi--primary">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Completed tracks</p>
            <span className="dashboard-chip dashboard-chip--primary" aria-hidden="true" />
          </div>
          <p className="metric">{stats.completed}</p>
          <p className="muted">{stats.inProgress} currently in progress.</p>
        </div>
      </section>

      <section className="mycourses-grid">
        <div className="mycourses-cardlist">
          <article className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Continue learning</h3>
                <p className="muted">Resume your highest-priority module.</p>
              </div>
              <span className="muted">Last activity: {continueCourse?.lastActivity}</span>
            </div>

            {continueCourse ? (
              <div className="course-card--wide">
                <div>
                  <p className="course-card__title">{continueCourse.title}</p>
                  <p className="muted">Next up: {continueCourse.nextLessonTitle}</p>

                  <div className="course-card__meta-row">
                    <span className="pill pill--filter">{continueCourse.level}</span>
                    <span className="pill pill--filter">{continueCourse.durationHours} hrs</span>
                    <span className="pill pill--filter">{continueCourse.totalLessons} lessons</span>
                    <span className="pill pill--filter">{continueCourse.projects} projects</span>
                  </div>

                  <div className="course-progress">
                    <div className="course-progress__top">
                      <span>Progress</span>
                      <span className="muted">
                        {Math.round(
                          (continueCourse.completedLessons / Math.max(continueCourse.totalLessons, 1)) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="course-progress__bar" aria-label="Continue course progress bar">
                      <div
                        className="course-progress__fill"
                        style={{
                          width: `${Math.round(
                            (continueCourse.completedLessons / Math.max(continueCourse.totalLessons, 1)) * 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="course-card__side">
                  <Link to={`/student/courses/${continueCourse.id}`} className="btn btn--primary btn--small">
                    Open workspace
                  </Link>
                  <Link to="/student/problems" className="btn btn--ghost btn--small">
                    Solve linked problem
                  </Link>
                </div>
              </div>
            ) : (
              <p className="muted">No active course found.</p>
            )}
          </article>

          <article className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>All enrolled courses</h3>
                <p className="muted">Detailed cards with module progress and outcomes.</p>
              </div>
              <span className="muted">{filteredCourses.length} shown</span>
            </div>

            <div className="grid grid--3 dashboard-cards">
              {filteredCourses.map((course) => {
                const progressPercent = Math.round(
                  (course.completedLessons / Math.max(course.totalLessons, 1)) * 100
                );

                return (
                  <article key={course.id} className="card course-card">
                    <div className="course-thumb course-thumb--gradient">
                      <div className="course-thumb__inner">
                        <p className="stat-label">{course.track}</p>
                        <h4>{course.shortTitle}</h4>
                      </div>
                    </div>

                    <h3>{course.title}</h3>
                    <p className="muted">{course.description}</p>

                    <div className="course-card__meta-row">
                      <span className="pill pill--filter">{course.level}</span>
                      <span className="pill pill--filter">{course.instructor}</span>
                      <span className="pill pill--filter">{course.rating} rating</span>
                    </div>

                    <div className="course-progress">
                      <div className="course-progress__top">
                        <span>
                          {course.completedLessons} / {course.totalLessons} lessons
                        </span>
                        <span className="muted">{progressPercent}%</span>
                      </div>
                      <div className="course-progress__bar" aria-label={`${course.title} progress bar`}>
                        <div className="course-progress__fill" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>

                    <p className="muted course-card__next">Next: {course.nextLessonTitle}</p>

                    <div className="course-card__actions">
                      <Link to={`/student/courses/${course.id}`} className="btn btn--primary btn--small">
                        Continue
                      </Link>
                      <button className="btn btn--ghost btn--small" type="button">
                        Syllabus
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="card course-empty">
                <h3>No matching course</h3>
                <p className="muted">Try changing filters or search terms.</p>
              </div>
            )}
          </article>
        </div>

        <aside className="mycourses-side">
          <section className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Certification tracker</h3>
                <p className="muted">Keep an eye on completion requirements.</p>
              </div>
            </div>

            <div className="mycourses-certs">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="mycourses-cert-card">
                  <div className="mycourses-cert-card__top">
                    <strong>{certificate.title}</strong>
                    <span className="pill pill--filter">{certificate.status}</span>
                  </div>
                  <p className="muted">{certificate.requirement}</p>
                  <div className="course-progress__bar" aria-label={`${certificate.title} completion`}>
                    <div className="course-progress__fill" style={{ width: `${certificate.progressPercent}%` }} />
                  </div>
                  <p className="muted">{certificate.progressPercent}% complete</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Suggested next tracks</h3>
                <p className="muted">Based on your learning behavior.</p>
              </div>
            </div>

            <ul className="mycourses-checklist" aria-label="Recommended tracks">
              {recommendedTracks.map((track) => (
                <li key={track.id} className="mycourses-check">
                  <span className="dot dot--info" aria-hidden="true" />
                  <div>
                    <strong>{track.title}</strong>
                    <p className="muted">{track.reason}</p>
                    <div className="course-card__meta-row">
                      <span className="pill pill--filter">{track.level}</span>
                      <span className="pill pill--filter">{track.duration}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="dashboard-panel__footer">
              <Link to="/student/dashboard" className="btn btn--ghost btn--small">
                Back to dashboard
              </Link>
              <Link to="/student/problems" className="btn btn--primary btn--small">
                Continue streak ({studentSnapshot.streakDays}d)
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
};

export default MyCourses;
