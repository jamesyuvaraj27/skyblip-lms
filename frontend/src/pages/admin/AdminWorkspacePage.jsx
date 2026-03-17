import React from 'react';
import { Link } from 'react-router-dom';

const sectionContent = {
  users: {
    eyebrow: 'User operations',
    title: 'Users and access control',
    subtitle: 'Approve instructors, inspect activity, and keep permissions aligned with reality.',
    searchPlaceholder: 'Search learners, instructors, roles...',
    actions: [
      { to: '/admin/dashboard', label: 'Back to dashboard', primary: false },
      { to: '/admin/reports', label: 'Open audit logs', primary: true }
    ],
    tags: ['Role review queue', 'Access audits', 'Account health'],
    stats: [
      {
        key: 'review',
        label: 'Needs review',
        value: 18,
        helper: 'Accounts blocked on manual action',
        tone: 'warning'
      },
      {
        key: 'admins',
        label: 'Admins online',
        value: 4,
        helper: 'Staff active in the last hour',
        tone: 'primary'
      },
      {
        key: 'logins',
        label: 'Login success',
        value: 98,
        suffix: '%',
        helper: 'Across the last 24 hours',
        tone: 'success'
      }
    ],
    rowsTitle: 'Priority queue',
    rowsSubtitle: 'Highest-signal account tasks first.',
    rows: [
      {
        title: 'Rhea Menon',
        description: 'Instructor request - missing compliance document',
        meta: 'Review now',
        tone: 'warning'
      },
      {
        title: 'Bulk import batch #42',
        description: '11 learners could not be matched to courses',
        meta: 'Resolve mapping',
        tone: 'info'
      },
      {
        title: 'Admin access review',
        description: 'Quarterly verification for 3 elevated accounts',
        meta: 'Due today',
        tone: 'primary'
      }
    ],
    notesTitle: 'Guardrails',
    notesSubtitle: 'Checks admins usually run before approving access.',
    notes: [
      {
        title: 'Role escalation',
        body: 'Any new admin seat should require secondary verification and activity logging.',
        tone: 'primary'
      },
      {
        title: 'Dormant instructors',
        body: 'Disable publishing rights if no teaching activity is detected for 90 days.',
        tone: 'warning'
      },
      {
        title: 'Learner privacy',
        body: 'Profile exports should stay limited to support and compliance workflows.',
        tone: 'info'
      }
    ]
  },
  courses: {
    eyebrow: 'Course operations',
    title: 'Course catalog control',
    subtitle: 'Watch course quality, publishing readiness, and learner demand from one workspace.',
    searchPlaceholder: 'Search courses, categories, instructors...',
    actions: [
      { to: '/admin/dashboard', label: 'Back to dashboard', primary: false },
      { to: '/admin/users', label: 'Review instructors', primary: true }
    ],
    tags: ['Publishing queue', 'Quality checks', 'Enrollment pacing'],
    stats: [
      {
        key: 'drafts',
        label: 'Draft courses',
        value: 12,
        helper: 'Still waiting for final content review',
        tone: 'warning'
      },
      {
        key: 'live',
        label: 'Live courses',
        value: 48,
        helper: 'Currently visible to learners',
        tone: 'info'
      },
      {
        key: 'quality',
        label: 'Quality pass rate',
        value: 91,
        suffix: '%',
        helper: 'Latest moderation cycle',
        tone: 'success'
      }
    ],
    rowsTitle: 'Publishing queue',
    rowsSubtitle: 'Items that need course-level admin action.',
    rows: [
      {
        title: 'React interview prep',
        description: 'Ready for publish but missing pricing review',
        meta: 'Pricing check',
        tone: 'warning'
      },
      {
        title: 'Operating systems lab',
        description: 'Learner demand spiked 24% this week',
        meta: 'Scale mentors',
        tone: 'success'
      },
      {
        title: 'UI systems masterclass',
        description: 'Thumbnail and summary do not match new syllabus',
        meta: 'Content sync',
        tone: 'info'
      }
    ],
    notesTitle: 'Quality signals',
    notesSubtitle: 'What the course team should watch this week.',
    notes: [
      {
        title: 'Drop-off pattern',
        body: 'Module 2 completion dips sharply in two cohorts and may need a lesson split.',
        tone: 'warning'
      },
      {
        title: 'High performer',
        body: 'Full-Stack Foundations keeps both strong ratings and repeat enrollments.',
        tone: 'success'
      },
      {
        title: 'Catalog hygiene',
        body: 'Archive duplicate drafts before the next marketing push lands.',
        tone: 'primary'
      }
    ]
  },
  reports: {
    eyebrow: 'Reporting',
    title: 'Reports and audits',
    subtitle: 'Generate operational summaries, spot regressions, and keep the platform accountable.',
    searchPlaceholder: 'Search reports, exports, audit events...',
    actions: [
      { to: '/admin/dashboard', label: 'Back to dashboard', primary: false },
      { to: '/admin/settings', label: 'Check report settings', primary: true }
    ],
    tags: ['Export health', 'Weekly summaries', 'Audit trail'],
    stats: [
      {
        key: 'exports',
        label: 'Reports generated',
        value: 26,
        helper: 'Successful exports this week',
        tone: 'info'
      },
      {
        key: 'lag',
        label: 'Pipeline lag',
        value: 7,
        suffix: ' mins',
        helper: 'Current data freshness window',
        tone: 'warning'
      },
      {
        key: 'coverage',
        label: 'Audit coverage',
        value: 100,
        suffix: '%',
        helper: 'Critical admin actions logged',
        tone: 'success'
      }
    ],
    rowsTitle: 'Recent exports',
    rowsSubtitle: 'Latest reporting tasks pushed by admins.',
    rows: [
      {
        title: 'Weekly enrollment report',
        description: 'Downloaded by Ops team with cohort segmentation',
        meta: 'Completed',
        tone: 'success'
      },
      {
        title: 'Refund audit',
        description: 'Awaiting finance sign-off for March batch',
        meta: 'Pending',
        tone: 'warning'
      },
      {
        title: 'Problem attempt summary',
        description: 'Shared with curriculum team for content planning',
        meta: 'Delivered',
        tone: 'info'
      }
    ],
    notesTitle: 'Reporting reminders',
    notesSubtitle: 'Keep the data useful and traceable.',
    notes: [
      {
        title: 'Retention lens',
        body: 'Pair enrollment numbers with completion and support load before declaring growth healthy.',
        tone: 'primary'
      },
      {
        title: 'PII hygiene',
        body: 'Exports for external review should always remove personal identifiers.',
        tone: 'warning'
      },
      {
        title: 'Operational follow-through',
        body: 'Every red metric should map to an owner and a due date, not just a chart.',
        tone: 'info'
      }
    ]
  },
  settings: {
    eyebrow: 'System settings',
    title: 'Platform settings',
    subtitle: 'Tune defaults, backup posture, and admin-side controls without leaving the workspace.',
    searchPlaceholder: 'Search settings, policies, backups...',
    actions: [
      { to: '/admin/dashboard', label: 'Back to dashboard', primary: false },
      { to: '/admin/reports', label: 'Inspect reports', primary: true }
    ],
    tags: ['Policy defaults', 'Backup posture', 'Notifications'],
    stats: [
      {
        key: 'backups',
        label: 'Backup success',
        value: 100,
        suffix: '%',
        helper: 'Last 14 scheduled snapshots',
        tone: 'success'
      },
      {
        key: 'alerts',
        label: 'Active alert rules',
        value: 11,
        helper: 'Platform monitors configured',
        tone: 'info'
      },
      {
        key: 'changes',
        label: 'Pending config changes',
        value: 3,
        helper: 'Awaiting admin confirmation',
        tone: 'warning'
      }
    ],
    rowsTitle: 'Configuration tasks',
    rowsSubtitle: 'Settings items that usually need human confirmation.',
    rows: [
      {
        title: 'Session timeout policy',
        description: 'Security team requested a tighter admin inactivity window',
        meta: 'Needs decision',
        tone: 'warning'
      },
      {
        title: 'Notification digest',
        description: 'Weekly ops digest is ready for a cleaner subject template',
        meta: 'Low effort',
        tone: 'info'
      },
      {
        title: 'Brand assets',
        description: 'New homepage campaign art uploaded and ready for review',
        meta: 'Approve',
        tone: 'primary'
      }
    ],
    notesTitle: 'Recommended defaults',
    notesSubtitle: 'Baseline rules that keep admin operations safer.',
    notes: [
      {
        title: 'Least privilege',
        body: 'Keep publishing, refund, and role escalation permissions separated where possible.',
        tone: 'primary'
      },
      {
        title: 'Recovery drills',
        body: 'Run backup restore tests on a schedule, not only after something fails.',
        tone: 'warning'
      },
      {
        title: 'Noise control',
        body: 'Alerting should focus on actionable regressions instead of flooding admins with low-signal pings.',
        tone: 'info'
      }
    ]
  }
};

const AdminWorkspacePage = ({ section }) => {
  const content = sectionContent[section] ?? sectionContent.users;

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero">
        <div className="dashboard-hero__left">
          <p className="dashboard-hero__eyebrow">{content.eyebrow}</p>
          <h2 className="dashboard-hero__title">{content.title}</h2>
          <p className="muted dashboard-hero__subtitle">{content.subtitle}</p>
          <div className="dashboard-hero__actions" role="group" aria-label={`${content.title} actions`}>
            {content.actions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`btn ${action.primary ? 'btn--primary' : 'btn--ghost'} btn--small`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-hero__right">
          <div className="dashboard-hero__search">
            <label className="dashboard-hero__search-label" htmlFor={`adminSectionSearch-${section}`}>
              Search
            </label>
            <input
              id={`adminSectionSearch-${section}`}
              type="search"
              placeholder={content.searchPlaceholder}
              className="dashboard-input"
              autoComplete="off"
            />
          </div>
          <div className="dashboard-pills">
            {content.tags.map((tag) => (
              <span key={tag} className="pill pill--filter">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid--3 dashboard-kpis" aria-label={`${content.title} metrics`}>
        {content.stats.map((stat) => (
          <div key={stat.key} className={`card dashboard-kpi dashboard-kpi--${stat.tone}`}>
            <div className="dashboard-kpi__top">
              <p className="stat-label">{stat.label}</p>
              <span className={`dashboard-chip dashboard-chip--${stat.tone}`} aria-hidden="true" />
            </div>
            <p className="metric">
              {stat.value}
              {stat.suffix ?? ''}
            </p>
            <p className="muted">{stat.helper}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>{content.rowsTitle}</h3>
              <p className="muted">{content.rowsSubtitle}</p>
            </div>
          </div>
          <ul className="dashboard-rows" aria-label={content.rowsTitle}>
            {content.rows.map((row) => (
              <li key={row.title} className="dashboard-row">
                <span className={`dot dot--${row.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{row.title}</p>
                  <p className="muted">{row.description}</p>
                </div>
                <span className="dashboard-row__meta muted">{row.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>{content.notesTitle}</h3>
              <p className="muted">{content.notesSubtitle}</p>
            </div>
          </div>
          <div className="dashboard-announcements">
            {content.notes.map((note) => (
              <div key={note.title} className={`dashboard-note dashboard-note--${note.tone}`}>
                <p className="dashboard-note__title">{note.title}</p>
                <p className="muted">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminWorkspacePage;
