import React, { useMemo } from 'react';
import { useAuth } from '../../context/useAuth.js';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const stats = useMemo(() => {
    const now = new Date();
    const pad2 = (n) => String(n).padStart(2, '0');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      kpis: [
        {
          key: 'enrolled',
          label: 'Active courses',
          value: 3,
          helper: 'Courses you’re currently learning',
          tone: 'info'
        },
        {
          key: 'progress',
          label: 'Average progress',
          value: 65,
          suffix: '%',
          helper: 'Across active enrollments',
          tone: 'success'
        },
        {
          key: 'practice',
          label: 'Practice solved',
          value: 12,
          helper: 'Problems accepted this month',
          tone: 'primary'
        },
        {
          key: 'streak',
          label: 'Learning streak',
          value: 5,
          suffix: ' days',
          helper: 'Keep it alive with one activity',
          tone: 'warning'
        }
      ],
      continueLearning: {
        courseId: 2,
        title: 'Data Structures & Algorithms',
        nextUp: 'Stacks · Balanced Parentheses',
        progressPercent: 45,
        minutesLeft: 18,
        lastSeen: `${days[now.getDay()]} ${pad2(now.getHours())}:${pad2(now.getMinutes())}`
      },
      weekly: [
        { day: 'Mon', minutes: 20 },
        { day: 'Tue', minutes: 35 },
        { day: 'Wed', minutes: 15 },
        { day: 'Thu', minutes: 40 },
        { day: 'Fri', minutes: 25 },
        { day: 'Sat', minutes: 10 },
        { day: 'Sun', minutes: 30 }
      ],
      upcoming: [
        {
          title: 'Quiz: Arrays Basics',
          when: 'Today · 7:30 PM',
          meta: '10 questions · 12 mins',
          tone: 'warning'
        },
        {
          title: 'Assignment: Two Pointers',
          when: 'Tomorrow · 6:00 PM',
          meta: '3 problems · graded',
          tone: 'primary'
        },
        {
          title: 'Live session: Big-O explained',
          when: 'Thu · 5:00 PM',
          meta: 'Join on time for Q&A',
          tone: 'info'
        }
      ],
      announcements: [
        {
          title: 'New course module released',
          body: 'DSA Module 03 is now available with 8 new lessons and 12 practice problems.',
          tone: 'success'
        },
        {
          title: 'Profile checklist',
          body: 'Add a short bio and preferred learning time to get smarter reminders.',
          tone: 'primary'
        }
      ],
      activity: [
        {
          title: 'Accepted: Two Sum',
          meta: 'Practice · Easy · 1 hr ago',
          tone: 'success'
        },
        {
          title: 'Watched: Why Arrays Matter',
          meta: 'Course · 3 hrs ago',
          tone: 'info'
        },
        {
          title: 'Started: Arrays Basics Quiz',
          meta: 'Quiz · 1 day ago',
          tone: 'warning'
        }
      ]
    };
  }, []);

  const weeklyMax = useMemo(() => {
    const list = stats?.weekly ?? [];
    return list.reduce((max, d) => Math.max(max, d.minutes || 0), 0) || 1;
  }, [stats]);

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero">
        <div className="dashboard-hero__left">
          <p className="dashboard-hero__eyebrow">Student overview</p>
          <h2 className="dashboard-hero__title">
            Welcome back{user?.name ? `, ${user.name}` : ''}.
          </h2>
          <p className="muted dashboard-hero__subtitle">
            Everything that matters today: progress, schedule, and quick actions in one clean view.
          </p>
          <div className="dashboard-hero__actions" role="group" aria-label="Quick actions">
            <Link to="/student/courses" className="btn btn--primary btn--small">
              Continue learning
            </Link>
            <Link to="/student/problems" className="btn btn--ghost btn--small">
              Start practice
            </Link>
            <Link to="/student/quiz/q1" className="btn btn--ghost btn--small">
              Take a quiz
            </Link>
          </div>
        </div>

        <div className="dashboard-hero__right">
          <div className="dashboard-hero__search">
            <label className="dashboard-hero__search-label" htmlFor="dashboardSearch">
              Search
            </label>
            <input
              id="dashboardSearch"
              type="search"
              placeholder="Search courses, lessons, problems…"
              className="dashboard-input"
              autoComplete="off"
            />
          </div>
          <div className="dashboard-pills">
            <span className="pill pill--filter">Auto progress tracking</span>
            <span className="pill pill--filter">Readable mode UI</span>
            <span className="pill pill--filter">Real-time ready</span>
          </div>
        </div>
      </header>

      <section className="grid grid--3 dashboard-kpis" aria-label="Key performance indicators">
        {(stats?.kpis ?? []).map((kpi) => (
          <div key={kpi.key} className={`card dashboard-kpi dashboard-kpi--${kpi.tone}`}>
            <div className="dashboard-kpi__top">
              <p className="stat-label">{kpi.label}</p>
              <span className={`dashboard-chip dashboard-chip--${kpi.tone}`} aria-hidden="true" />
            </div>
            <p className="metric">
              {kpi.value}
              {kpi.suffix ?? ''}
            </p>
            <p className="muted">{kpi.helper}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--main">
        <div className="card dashboard-panel dashboard-panel--continue">
          <div className="dashboard-panel__header">
            <div>
              <h3>Continue learning</h3>
              <p className="muted">Pick up right where you left off.</p>
            </div>
            <span className="dashboard-panel__meta muted">
              Last seen: {stats?.continueLearning?.lastSeen ?? '—'}
            </span>
          </div>

          <div className="dashboard-continue">
            <div className="dashboard-continue__main">
              <p className="dashboard-continue__course">{stats?.continueLearning?.title}</p>
              <p className="dashboard-continue__next muted">Next up: {stats?.continueLearning?.nextUp}</p>
            </div>
            <div className="dashboard-continue__side">
              <div className="dashboard-progress" aria-label="Course progress">
                <div
                  className="dashboard-progress__bar"
                  style={{ width: `${stats?.continueLearning?.progressPercent ?? 0}%` }}
                />
              </div>
              <div className="dashboard-continue__numbers">
                <span className="dashboard-continue__percent">
                  {stats?.continueLearning?.progressPercent ?? 0}%
                </span>
                <span className="muted">{stats?.continueLearning?.minutesLeft ?? 0} mins left today</span>
              </div>
            </div>
          </div>

          <div className="dashboard-panel__footer">
            <Link
              to={`/student/courses/${stats?.continueLearning?.courseId ?? 1}`}
              className="btn btn--primary btn--small"
            >
              Resume course
            </Link>
            <Link to="/student/courses" className="btn btn--ghost btn--small">
              View all courses
            </Link>
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Weekly activity</h3>
              <p className="muted">Minutes learned each day.</p>
            </div>
          </div>

          <div className="dashboard-weekly" role="img" aria-label="Weekly learning minutes bar chart">
            {(stats?.weekly ?? []).map((d) => (
              <div key={d.day} className="dashboard-weekly__item">
                <div
                  className="dashboard-weekly__bar"
                  style={{ height: `${Math.round((d.minutes / weeklyMax) * 100)}%` }}
                  title={`${d.day}: ${d.minutes} mins`}
                />
                <div className="dashboard-weekly__label muted">{d.day}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--secondary">
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Upcoming</h3>
              <p className="muted">Deadlines and live sessions.</p>
            </div>
            <Link className="auth-link-button" to="/student/courses">
              View schedule
            </Link>
          </div>
          <ul className="dashboard-rows" aria-label="Upcoming list">
            {(stats?.upcoming ?? []).map((item) => (
              <li key={`${item.title}-${item.when}`} className="dashboard-row">
                <span className={`dot dot--${item.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{item.title}</p>
                  <p className="muted">{item.when}</p>
                </div>
                <span className="dashboard-row__meta muted">{item.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Announcements</h3>
              <p className="muted">Updates from your learning space.</p>
            </div>
          </div>
          <div className="dashboard-announcements">
            {(stats?.announcements ?? []).map((a) => (
              <div key={a.title} className={`dashboard-note dashboard-note--${a.tone}`}>
                <p className="dashboard-note__title">{a.title}</p>
                <p className="muted">{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Recent activity</h3>
              <p className="muted">Your latest learning signals.</p>
            </div>
            <Link className="auth-link-button" to="/student/problems">
              Open practice
            </Link>
          </div>
          <ul className="dashboard-rows" aria-label="Recent activity list">
            {(stats?.activity ?? []).map((a) => (
              <li key={`${a.title}-${a.meta}`} className="dashboard-row">
                <span className={`dot dot--${a.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{a.title}</p>
                  <p className="muted">{a.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;

