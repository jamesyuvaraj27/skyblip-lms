import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/useAuth.js';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() => user);
  const [bio, setBio] = useState(() => user?.bio || '');
  const [name, setName] = useState(() => user?.name || '');
  const [goal, setGoal] = useState(() => user?.goal || 'job');
  const [studyTime, setStudyTime] = useState(() => user?.studyTime || 'evening');
  const [notifications, setNotifications] = useState(() => user?.notifications ?? true);
  const [saving, setSaving] = useState(false);

  const stats = useMemo(
    () => ({
      courses: 3,
      practiceSolved: 12,
      quizzesTaken: 2,
      streakDays: 5
    }),
    []
  );

  const achievements = useMemo(
    () => [
      { title: 'First Course Started', body: 'You enrolled and completed your first lesson.', tone: 'info' },
      { title: 'Streak Builder', body: 'Maintained a 5-day learning streak.', tone: 'warning' },
      { title: 'Problem Solver', body: 'Solved 10+ practice problems.', tone: 'success' }
    ],
    []
  );

  const saveProfile = async () => {
    setSaving(true);
    try {
      // Local save - no backend call
      const updatedProfile = { ...profile, name, bio, goal, studyTime, notifications };
      setProfile(updatedProfile);
      // Update localStorage
      localStorage.setItem('skyblip_user', JSON.stringify(updatedProfile));
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="profile-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Profile</p>
          <h2 className="mycourses-hero__title">Your learner profile</h2>
          <p className="muted mycourses-hero__subtitle">
            Your identity across courses, practice, quizzes, and leaderboards — designed like a real
            LMS profile page.
          </p>
        </div>
        <div className="mycourses-hero__right">
          <div className="dashboard-pills">
            <span className="pill pill--filter">Public snapshot</span>
            <span className="pill pill--filter">Preferences</span>
            <span className="pill pill--filter">Achievements</span>
          </div>
        </div>
      </header>

      <section className="grid grid--3 mycourses-stats" aria-label="Profile stats">
        <div className="card dashboard-kpi dashboard-kpi--info">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Courses</p>
            <span className="dashboard-chip dashboard-chip--info" aria-hidden="true" />
          </div>
          <p className="metric">{stats.courses}</p>
          <p className="muted">Active enrollments</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--success">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Solved</p>
            <span className="dashboard-chip dashboard-chip--success" aria-hidden="true" />
          </div>
          <p className="metric">{stats.practiceSolved}</p>
          <p className="muted">Practice problems</p>
        </div>
        <div className="card dashboard-kpi dashboard-kpi--warning">
          <div className="dashboard-kpi__top">
            <p className="stat-label">Streak</p>
            <span className="dashboard-chip dashboard-chip--warning" aria-hidden="true" />
          </div>
          <p className="metric">{stats.streakDays} days</p>
          <p className="muted">Keep it alive daily</p>
        </div>
      </section>

      <div className="profile-layout">
        <div className="card profile-card">
          <h3>Account details</h3>
          <p className="muted">Update your name, bio, and learning preferences.</p>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Eg. MERN learner focusing on DSA and system design."
            />
          </label>

          <div className="profile-preferences">
            <label>
              Learning goal
              <select className="mycourses-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="job">Job prep</option>
                <option value="college">College</option>
                <option value="skill">Skill upgrade</option>
              </select>
            </label>

            <label>
              Preferred study time
              <select
                className="mycourses-select"
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
              >
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              Smart reminders
            </label>
          </div>

          <button className="btn btn--primary btn--small" onClick={saveProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>

        <div className="profile-right">
          <div className="card profile-summary">
            <h3>Public snapshot</h3>
            <p className="muted">
              This is how you appear on leaderboards, course discussions, and certificates.
            </p>
            <div className="profile-avatar">{profile.name?.charAt(0) || 'S'}</div>
            <p className="profile-name">{profile.name}</p>
            <p className="profile-email">{profile.email}</p>
            <p className="muted">{profile.bio || 'No bio added yet.'}</p>
            <div className="course-card__meta-row" style={{ justifyContent: 'center' }}>
              <span className="pill pill--filter">{goal === 'job' ? 'Job prep' : goal}</span>
              <span className="pill pill--filter">{studyTime}</span>
              <span className={`pill ${notifications ? 'pill--success' : 'pill--filter'}`}>
                {notifications ? 'Reminders on' : 'Reminders off'}
              </span>
            </div>
          </div>

          <div className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Achievements</h3>
                <p className="muted">Motivation + credibility in a real LMS.</p>
              </div>
            </div>
            <div className="dashboard-announcements">
              {achievements.map((a) => (
                <div key={a.title} className={`dashboard-note dashboard-note--${a.tone}`}>
                  <p className="dashboard-note__title">{a.title}</p>
                  <p className="muted">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

