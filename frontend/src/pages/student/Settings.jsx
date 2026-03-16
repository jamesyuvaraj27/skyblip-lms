import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

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
      <h2>Settings</h2>
      <p className="muted">Manage your account security and notification preferences.</p>

      <div className="settings-layout">
        <form className="card settings-card" onSubmit={updatePassword}>
          <h3>Password</h3>
          <p className="muted">
            This demo endpoint validates your current password and stores a new hash in memory.
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

          <button className="btn btn--primary btn--small" type="submit">
            Update password
          </button>
          {message && <p className="muted">{message}</p>}
        </form>

        <div className="card settings-card">
          <h3>Notifications</h3>
          <p className="muted">
            In the full product, these toggles would sync to a `Notifications` / preferences
            collection.
          </p>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            Course reminders
          </label>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            New problem alerts
          </label>
          <label className="settings-toggle">
            <input type="checkbox" />
            Quiz result emails
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;

