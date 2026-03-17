import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth.js';
import { useStudentPrefs } from '../../context/useStudentPrefs.js';
import './Settings.css';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { prefs, updatePrefs, resetPrefs, themeOptions } = useStudentPrefs();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('appearance');

  const [courseReminders, setCourseReminders] = useState(user?.courseReminders ?? true);
  const [problemAlerts, setProblemAlerts] = useState(user?.problemAlerts ?? true);
  const [quizEmails, setQuizEmails] = useState(user?.quizEmails ?? false);

  const updatePassword = (event) => {
    event.preventDefault();
    setMessage('');

    if (!currentPassword || !newPassword) {
      setMessage('Both password fields are required.');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('New password must have at least 6 characters.');
      return;
    }

    setMessage('Password updated successfully (mock).');
    setCurrentPassword('');
    setNewPassword('');
  };

  const saveNotifications = () => {
    updateProfile({ courseReminders, problemAlerts, quizEmails });
    setMessage('Notification preferences saved.');
  };

  const saveAppearance = () => {
    setMessage('Appearance preferences saved.');
  };

  const saveCompilerPreferences = () => {
    setMessage('Compiler defaults saved.');
  };

  return (
    <div className="settings-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Personalization</p>
          <h2 className="mycourses-hero__title">Student Settings</h2>
          <p className="muted mycourses-hero__subtitle">
            Manage security, communication, appearance, and coding workspace defaults for a cleaner
            LMS experience.
          </p>
        </div>
        <div className="mycourses-hero__right">
          <div className="dashboard-pills" role="group" aria-label="Settings tabs">
            <button
              type="button"
              className={`pill pill--filter ${tab === 'appearance' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('appearance')}
            >
              Appearance
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'notifications' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('notifications')}
            >
              Notifications
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'compiler' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('compiler')}
            >
              Compiler
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'security' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('security')}
            >
              Security
            </button>
            <button
              type="button"
              className={`pill pill--filter ${tab === 'account' ? 'problem-tab--active' : ''}`}
              onClick={() => setTab('account')}
            >
              Account
            </button>
          </div>
        </div>
      </header>

      <div className="settings-layout">
        {tab === 'appearance' && (
          <section className="card settings-card">
            <h3>Theme and readability</h3>
            <p className="muted">
              Choose a visual mode and reading density that fits your long practice sessions.
            </p>

            <label>
              Theme
              <select
                className="mycourses-select"
                value={prefs.theme}
                onChange={(event) => updatePrefs({ theme: event.target.value })}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Font scale
              <select
                className="mycourses-select"
                value={String(prefs.fontScale)}
                onChange={(event) => updatePrefs({ fontScale: Number(event.target.value) })}
              >
                <option value="90">Small (90%)</option>
                <option value="100">Normal (100%)</option>
                <option value="110">Large (110%)</option>
                <option value="120">Extra Large (120%)</option>
              </select>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={prefs.readableMode}
                onChange={(event) => updatePrefs({ readableMode: event.target.checked })}
              />
              Readable mode
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={prefs.compactMode}
                onChange={(event) => updatePrefs({ compactMode: event.target.checked })}
              />
              Compact layout
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="button" onClick={saveAppearance}>
                Save appearance
              </button>
              <button className="btn btn--ghost btn--small" type="button" onClick={resetPrefs}>
                Reset defaults
              </button>
            </div>
          </section>
        )}

        {tab === 'notifications' && (
          <section className="card settings-card">
            <h3>Notification preferences</h3>
            <p className="muted">Choose which reminders and alerts should reach you.</p>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={courseReminders}
                onChange={(event) => setCourseReminders(event.target.checked)}
              />
              Course reminders
            </label>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={problemAlerts}
                onChange={(event) => setProblemAlerts(event.target.checked)}
              />
              New problem recommendations
            </label>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={quizEmails}
                onChange={(event) => setQuizEmails(event.target.checked)}
              />
              Quiz result emails
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="button" onClick={saveNotifications}>
                Save notifications
              </button>
            </div>
          </section>
        )}

        {tab === 'compiler' && (
          <section className="card settings-card">
            <h3>Compiler defaults</h3>
            <p className="muted">Set your default coding workspace behavior for practice sessions.</p>

            <label>
              Default language
              <select
                className="mycourses-select"
                value={prefs.defaultLanguage}
                onChange={(event) => updatePrefs({ defaultLanguage: event.target.value })}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={prefs.autoRunTests}
                onChange={(event) => updatePrefs({ autoRunTests: event.target.checked })}
              />
              Auto-run sample tests after code changes
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={prefs.showLineNumbers}
                onChange={(event) => updatePrefs({ showLineNumbers: event.target.checked })}
              />
              Show line numbers in editor
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={prefs.showCompilerHints}
                onChange={(event) => updatePrefs({ showCompilerHints: event.target.checked })}
              />
              Show compiler hints and diagnostics
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="button" onClick={saveCompilerPreferences}>
                Save compiler defaults
              </button>
            </div>
          </section>
        )}

        {tab === 'security' && (
          <form className="card settings-card" onSubmit={updatePassword}>
            <h3>Password and security</h3>
            <p className="muted">In production this would trigger secure backend password rotation.</p>

            <label>
              Current password
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
              />
            </label>

            <label>
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </label>

            <div className="settings-actions">
              <button className="btn btn--primary btn--small" type="submit">
                Update password
              </button>
              <span className="pill pill--filter">2FA support planned</span>
            </div>
          </form>
        )}

        {tab === 'account' && (
          <section className="card settings-card">
            <h3>Account operations</h3>
            <p className="muted">Manage export, sessions, and profile visibility controls.</p>

            <ul className="mycourses-checklist" aria-label="Account actions">
              <li className="mycourses-check">
                <span className="dot dot--info" aria-hidden="true" />
                <div>
                  <strong>Download learning data</strong>
                  <p className="muted">Export progress, submissions, and quiz scores.</p>
                </div>
              </li>
              <li className="mycourses-check">
                <span className="dot dot--warning" aria-hidden="true" />
                <div>
                  <strong>Sign out from all devices</strong>
                  <p className="muted">Revoke all active sessions except this browser.</p>
                </div>
              </li>
              <li className="mycourses-check">
                <span className="dot dot--success" aria-hidden="true" />
                <div>
                  <strong>Profile visibility controls</strong>
                  <p className="muted">Choose what appears in leaderboards and discussions.</p>
                </div>
              </li>
            </ul>

            <div className="settings-actions">
              <button className="btn btn--ghost btn--small" type="button" onClick={() => setMessage('Export started')}>
                Export data
              </button>
              <button className="btn btn--primary btn--small" type="button" onClick={() => setMessage('Account settings saved')}>
                Save account settings
              </button>
            </div>
          </section>
        )}

        <aside className="card dashboard-panel settings-side">
          <div className="dashboard-panel__header">
            <div>
              <h3>Recommendations</h3>
              <p className="muted">Defaults that usually improve completion rates.</p>
            </div>
          </div>

          <div className="dashboard-announcements">
            <div className="dashboard-note dashboard-note--success">
              <p className="dashboard-note__title">Keep reminders enabled</p>
              <p className="muted">Daily nudges make streak retention easier.</p>
            </div>
            <div className="dashboard-note dashboard-note--info">
              <p className="dashboard-note__title">Use readable mode</p>
              <p className="muted">Long coding sessions are easier with higher line spacing.</p>
            </div>
            <div className="dashboard-note dashboard-note--warning">
              <p className="dashboard-note__title">Run tests before submit</p>
              <p className="muted">Quick sample runs reduce avoidable compile errors.</p>
            </div>
          </div>

          <div className="settings-preview card">
            <p className="stat-label">Current profile</p>
            <p className="settings-preview__theme">Theme: {themeOptions.find((item) => item.value === prefs.theme)?.label}</p>
            <p className="muted">Font: {prefs.fontScale}% | Language: {prefs.defaultLanguage}</p>
          </div>
        </aside>
      </div>

      {message && <p className="muted settings-message">{message}</p>}
    </div>
  );
};

export default Settings;
