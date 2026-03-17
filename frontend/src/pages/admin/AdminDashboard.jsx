import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const adminStats = {
  kpis: [
    {
      key: 'learners',
      label: 'Active learners',
      value: '1,284',
      helper: 'Students active across the last 7 days',
      tone: 'info'
    },
    {
      key: 'approvals',
      label: 'Pending approvals',
      value: 14,
      helper: 'Instructor applications waiting for review',
      tone: 'warning'
    },
    {
      key: 'completion',
      label: 'Avg. completion',
      value: 72,
      suffix: '%',
      helper: 'Across live courses this month',
      tone: 'success'
    },
    {
      key: 'tickets',
      label: 'Open support tickets',
      value: 9,
      helper: 'Priority issues still assigned to ops',
      tone: 'primary'
    }
  ],
  spotlight: {
    title: 'Instructor onboarding is the current bottleneck',
    body: 'Five requests are marked urgent and two still need compliance documents.',
    progressPercent: 68,
    meta: 'Review SLA met this week'
  },
  trend: [
    { day: 'Mon', value: 24 },
    { day: 'Tue', value: 28 },
    { day: 'Wed', value: 31 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 34 },
    { day: 'Sat', value: 18 },
    { day: 'Sun', value: 22 }
  ],
  health: [
    {
      title: 'Platform uptime',
      body: '99.96% over the last 30 days with no learner-facing outage today.',
      tone: 'success'
    },
    {
      title: 'Assessment pipeline',
      body: 'Two quiz evaluation jobs are waiting for manual retry.',
      tone: 'warning'
    },
    {
      title: 'Content moderation',
      body: 'One newly uploaded course module was flagged for policy review.',
      tone: 'info'
    }
  ],
  approvals: [
    {
      title: 'Rhea Menon',
      when: 'Applied 2 hours ago',
      meta: 'Frontend instructor - missing PAN document',
      tone: 'warning'
    },
    {
      title: 'Akash Patel',
      when: 'Applied today',
      meta: 'DSA mentor - background check complete',
      tone: 'success'
    },
    {
      title: 'Naina George',
      when: 'Queued since yesterday',
      meta: 'UI/UX coach - awaiting sample lesson review',
      tone: 'info'
    }
  ],
  courses: [
    {
      title: 'Full-Stack Foundations',
      owner: 'Team Web',
      learners: 314,
      completion: 81
    },
    {
      title: 'Data Structures Sprint',
      owner: 'Team Algorithms',
      learners: 286,
      completion: 74
    },
    {
      title: 'Aptitude Crash Course',
      owner: 'Prep Cell',
      learners: 198,
      completion: 67
    }
  ],
  activity: [
    {
      title: 'Role updated for 3 instructors',
      when: '15 mins ago',
      meta: 'Access control',
      tone: 'primary'
    },
    {
      title: 'Refund request escalated',
      when: '48 mins ago',
      meta: 'Billing queue',
      tone: 'warning'
    },
    {
      title: 'Weekly report exported',
      when: '1 hour ago',
      meta: 'Reports',
      tone: 'info'
    }
  ]
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const trendMax = adminStats.trend.reduce((max, item) => Math.max(max, item.value), 1);

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero">
        <div className="dashboard-hero__left">
          <p className="dashboard-hero__eyebrow">Admin overview</p>
          <h2 className="dashboard-hero__title">
            System control{user?.name ? `, ${user.name}` : ''}.
          </h2>
          <p className="muted dashboard-hero__subtitle">
            Review approvals, track platform health, and keep the learning operation moving from one
            place.
          </p>
          <div className="dashboard-hero__actions" role="group" aria-label="Admin quick actions">
            <Link to="/admin/users" className="btn btn--primary btn--small">
              Review users
            </Link>
            <Link to="/admin/courses" className="btn btn--ghost btn--small">
              Audit courses
            </Link>
            <Link to="/admin/reports" className="btn btn--ghost btn--small">
              Open reports
            </Link>
          </div>
        </div>

        <div className="dashboard-hero__right">
          <div className="dashboard-hero__search">
            <label className="dashboard-hero__search-label" htmlFor="adminDashboardSearch">
              Search
            </label>
            <input
              id="adminDashboardSearch"
              type="search"
              placeholder="Search users, courses, reports..."
              className="dashboard-input"
              autoComplete="off"
            />
          </div>
          <div className="dashboard-pills">
            <span className="pill pill--filter">Role-aware access</span>
            <span className="pill pill--filter">Ops-first summary</span>
            <span className="pill pill--filter">Static demo data</span>
          </div>
        </div>
      </header>

      <section className="grid grid--3 dashboard-kpis" aria-label="Admin key performance indicators">
        {adminStats.kpis.map((kpi) => (
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
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Platform health</h3>
              <p className="muted">What needs review before the next cohort opens.</p>
            </div>
            <span className="dashboard-panel__meta muted">Updated 5 mins ago</span>
          </div>

          <div className="dashboard-continue admin-spotlight">
            <div className="dashboard-continue__main">
              <p className="dashboard-continue__course">{adminStats.spotlight.title}</p>
              <p className="dashboard-continue__next muted">{adminStats.spotlight.body}</p>
            </div>
            <div className="dashboard-continue__side">
              <div className="dashboard-progress" aria-label="Weekly review completion">
                <div
                  className="dashboard-progress__bar admin-progress__bar"
                  style={{ width: `${adminStats.spotlight.progressPercent}%` }}
                />
              </div>
              <div className="dashboard-continue__numbers">
                <span className="dashboard-continue__percent">
                  {adminStats.spotlight.progressPercent}%
                </span>
                <span className="muted">{adminStats.spotlight.meta}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-announcements">
            {adminStats.health.map((item) => (
              <div key={item.title} className={`dashboard-note dashboard-note--${item.tone}`}>
                <p className="dashboard-note__title">{item.title}</p>
                <p className="muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Weekly enrollments</h3>
              <p className="muted">New learner accounts approved per day.</p>
            </div>
          </div>

          <div className="dashboard-weekly" role="img" aria-label="Weekly enrollments bar chart">
            {adminStats.trend.map((item) => (
              <div key={item.day} className="dashboard-weekly__item">
                <div
                  className="dashboard-weekly__bar admin-weekly__bar"
                  style={{ height: `${Math.round((item.value / trendMax) * 100)}%` }}
                  title={`${item.day}: ${item.value} enrollments`}
                />
                <div className="dashboard-row__title">{item.value}</div>
                <div className="dashboard-weekly__label muted">{item.day}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--secondary">
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Approval queue</h3>
              <p className="muted">People and records waiting for admin action.</p>
            </div>
            <Link className="auth-link-button" to="/admin/users">
              Open queue
            </Link>
          </div>
          <ul className="dashboard-rows" aria-label="Approval queue">
            {adminStats.approvals.map((item) => (
              <li key={item.title} className="dashboard-row">
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
              <h3>Top courses</h3>
              <p className="muted">Live courses with the strongest completion.</p>
            </div>
          </div>
          <div className="admin-course-list">
            {adminStats.courses.map((course) => (
              <div key={course.title} className="admin-course-item">
                <div className="admin-course-item__header">
                  <div>
                    <p className="dashboard-row__title">{course.title}</p>
                    <p className="muted">
                      {course.owner} - {course.learners} learners
                    </p>
                  </div>
                  <span className="pill pill--filter">{course.completion}% complete</span>
                </div>
                <div className="admin-progress-track" aria-label={`${course.title} completion`}>
                  <div
                    className="admin-progress-fill"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Recent admin activity</h3>
              <p className="muted">Latest actions taken across the platform.</p>
            </div>
            <Link className="auth-link-button" to="/admin/reports">
              View logs
            </Link>
          </div>
          <ul className="dashboard-rows" aria-label="Recent admin activity">
            {adminStats.activity.map((item) => (
              <li key={item.title} className="dashboard-row">
                <span className={`dot dot--${item.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{item.title}</p>
                  <p className="muted">{item.meta}</p>
                </div>
                <span className="dashboard-row__meta muted">{item.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
