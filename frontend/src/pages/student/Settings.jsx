import React, { useState } from 'react';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('security');
  const [courseReminders, setCourseReminders] = useState(true);
  const [problemAlerts, setProblemAlerts] = useState(true);
  const [quizEmails, setQuizEmails] = useState(false);
  const [readableMode, setReadableMode] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [fontScale, setFontScale] = useState('100');

  const updatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    // Local password update - no backend call
    if (!currentPassword || !newPassword) {
      setMessage('Both fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters');
      return;
    }
    // Simulate password update
    setMessage('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="settings-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Settings</p>
          <h2 className="mycourses-hero__title">Settings</h2>
          <p className="muted mycourses-hero__subtitle">
            Security, notifications, and accessibility — built like a real LMS settings center.
          </p>
        </div>
        <div className="mycourses-hero__right">
          <div className="dashboard-pills" role="group" aria-label="Settings tabs">
            <button
              type="button"
              className={`pill pill--filter ${tab === 'security' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('security')}
              aria-pressed={tab === 'security'}
            >
              Security
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'notifications' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('notifications')}
              aria-pressed={tab === 'notifications'}
            >
              Notifications
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'accessibility' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('accessibility')}
              aria-pressed={tab === 'accessibility'}
            >
              Accessibility
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'account' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('account')}
              aria-pressed={tab === 'account'}
            >
              Account
            </button>
          </div>
        </div>
      </header>

      <div className="settings-layout">
        {tab === 'security' && (
          <form className="card settings-card" onSubmit={updatePassword}>
            <h3>Password & security</h3>
            <p className="muted">
              In a real LMS, this would use hashed passwords + session invalidation across devices.
            </p>
            <label>
              Current password
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </label>

            <label>
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="submit">
                Update password
              </button>
              <span className="pill pill--filter">2FA · Coming soon</span>
            </div>
            {message && <p className="muted">{message}</p>}
          </form>
        )}

        {tab === 'notifications' && (
          <div className="card settings-card">
            <h3>Notifications</h3>
            <p className="muted">
              These match what production LMS apps ship: reminders, alerts, and result emails.
            </p>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={courseReminders}
                onChange={(e) => setCourseReminders(e.target.checked)}
              />
              Course reminders
            </label>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={problemAlerts}
                onChange={(e) => setProblemAlerts(e.target.checked)}
              />
              New problem alerts
            </label>
            <label className="settings-toggle">
              <input type="checkbox" checked={quizEmails} onChange={(e) => setQuizEmails(e.target.checked)} />
              Quiz result emails
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="button" onClick={() => setMessage('Preferences saved')}>
                Save preferences
              </button>
              <button
                className="btn btn--ghost btn--small"
                type="button"
                onClick={() => {
                  setCourseReminders(true);
                  setProblemAlerts(true);
                  setQuizEmails(false);
                  setMessage('Reset to recommended defaults');
                }}
              >
                Reset
              </button>
            </div>
            {message && <p className="muted">{message}</p>}
          </div>
        )}

        {tab === 'accessibility' && (
          <div className="card settings-card">
            <h3>Accessibility & readability</h3>
            <p className="muted">
              Built for comfort — larger text, clean spacing, and distraction controls.
            </p>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={readableMode}
                onChange={(e) => setReadableMode(e.target.checked)}
              />
              Readable mode (recommended)
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
              />
              Compact layout
            </label>

            <label>
              Font size
              <select className="mycourses-select" value={fontScale} onChange={(e) => setFontScale(e.target.value)}>
                <option value="90">Small (90%)</option>
                <option value="100">Normal (100%)</option>
                <option value="110">Large (110%)</option>
                <option value="120">Extra Large (120%)</option>
              </select>
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="button" onClick={() => setMessage('Accessibility saved')}>
                Save
              </button>
              <span className={`pill ${readableMode ? 'pill--success' : 'pill--filter'}`}>
                {readableMode ? 'Readable on' : 'Readable off'}
              </span>
            </div>
            {message && <p className="muted">{message}</p>}
          </div>
        )}

        {tab === 'account' && (
          <div className="card settings-card">
            <h3>Account</h3>
            <p className="muted">
              In production: download data, manage devices, and delete account with confirmations.
            </p>

            <ul className="mycourses-checklist" aria-label="Account actions">
              <li className="mycourses-check">
                <span className="dot dot--info" aria-hidden="true" />
                <div>
                  <strong>Download learning data</strong>
                  <p className="muted">Exports your progress, submissions, and quiz history.</p>
                </div>
              </li>
              <li className="mycourses-check">
                <span className="dot dot--warning" aria-hidden="true" />
                <div>
                  <strong>Sign out of other devices</strong>
                  <p className="muted">Ends sessions on other browsers/phones.</p>
                </div>
              </li>
              <li className="mycourses-check">
                <span className="dot dot--success" aria-hidden="true" />
                <div>
                  <strong>Privacy controls</strong>
                  <p className="muted">Choose what appears on leaderboards.</p>
                </div>
              </li>
            </ul>

            <div className="settings-actions">
              <button className="btn btn--ghost btn--small" type="button" onClick={() => setMessage('Export started')}>
                Export data
              </button>
              <button className="btn btn--primary btn--small" type="button" onClick={() => setMessage('Saved')}>
                Save
              </button>
            </div>
            {message && <p className="muted">{message}</p>}
          </div>
        )}

        <div className="card dashboard-panel settings-side">
          <div className="dashboard-panel__header">
            <div>
              <h3>Recommended</h3>
              <p className="muted">Best-practice defaults for LMS learners.</p>
            </div>
          </div>
          <div className="dashboard-announcements">
            <div className="dashboard-note dashboard-note--success">
              <p className="dashboard-note__title">Enable reminders</p>
              <p className="muted">Daily nudges help keep streak and course completion high.</p>
            </div>
            <div className="dashboard-note dashboard-note--info">
              <p className="dashboard-note__title">Readable mode</p>
              <p className="muted">Better contrast + spacing for long study sessions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

