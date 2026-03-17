import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/useAuth.js';
import { studentAchievements, studentCourses, studentSnapshot } from './studentData.js';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(() => user?.name || 'Student');
  const [headline, setHeadline] = useState(() => user?.headline || 'Aspiring software engineer');
  const [bio, setBio] = useState(() => user?.bio || 'Focused on DSA, React, and interview readiness.');
  const [goal, setGoal] = useState(() => user?.goal || 'job');
  const [studyTime, setStudyTime] = useState(() => user?.studyTime || 'evening');
  const [notifications, setNotifications] = useState(() => user?.notifications ?? true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const stats = useMemo(
    () => ({
      courses: studentSnapshot.activeCourses,
      practiceSolved: studentSnapshot.solvedProblems,
      quizzesTaken: studentSnapshot.quizzesCompleted,
      streakDays: studentSnapshot.streakDays
    }),
    []
  );

  const skillMatrix = useMemo(
    () => [
      { name: 'JavaScript', score: 78 },
      { name: 'Data Structures', score: 74 },
      { name: 'Problem Solving', score: 72 },
      { name: 'Frontend System Design', score: 65 }
    ],
    []
  );

  const saveProfile = async () => {
    setSaving(true);
    setMessage('');

    try {
      updateProfile({
        name,
        headline,
        bio,
        goal,
        studyTime,
        notifications
      });
      setMessage('Profile updated successfully.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Learner identity</p>
          <h2 className="mycourses-hero__title">Student Profile</h2>
          <p className="muted mycourses-hero__subtitle">
            Manage your public learner profile, skill summary, and growth targets used across courses,
            practice, and quizzes.
          </p>
        </div>

        <div className="mycourses-hero__right">
          <div className="dashboard-pills">
            <span className="pill pill--filter">Public snapshot</span>
            <span className="pill pill--filter">Skill matrix</span>
            <span className="pill pill--filter">Achievement timeline</span>
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
          <p className="muted">Consistency score rising</p>
        </div>
      </section>

      <div className="profile-layout">
        <section className="card profile-card">
          <h3>Account and Goals</h3>
          <p className="muted">These details appear in classroom spaces and certificates.</p>

          <label>
            Full name
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>

          <label>
            Headline
            <input
              type="text"
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              placeholder="Example: React + DSA learner"
            />
          </label>

          <label>
            Bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Share your focus areas and goals."
            />
          </label>

          <div className="profile-preferences">
            <label>
              Learning goal
              <select className="mycourses-select" value={goal} onChange={(event) => setGoal(event.target.value)}>
                <option value="job">Job preparation</option>
                <option value="college">College semester support</option>
                <option value="skill">Skill upgrade</option>
              </select>
            </label>

            <label>
              Preferred study window
              <select
                className="mycourses-select"
                value={studyTime}
                onChange={(event) => setStudyTime(event.target.value)}
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
                onChange={(event) => setNotifications(event.target.checked)}
              />
              Smart reminders enabled
            </label>
          </div>

          <div className="profile-card__actions">
            <button className="btn btn--primary btn--small" onClick={saveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save profile'}
            </button>
            {message && <span className="pill pill--success">{message}</span>}
          </div>
        </section>

        <div className="profile-right">
          <section className="card profile-summary">
            <h3>Public snapshot</h3>
            <p className="muted">Visible to mentors, peers, and leaderboard widgets.</p>

            <div className="profile-avatar">{name?.charAt(0)?.toUpperCase() || 'S'}</div>
            <p className="profile-name">{name}</p>
            <p className="profile-email">{user.email}</p>
            <p className="muted">{headline}</p>
            <p className="muted">{bio}</p>

            <div className="course-card__meta-row profile-summary__tags">
              <span className="pill pill--filter">Goal: {goal}</span>
              <span className="pill pill--filter">Study: {studyTime}</span>
              <span className={`pill ${notifications ? 'pill--success' : 'pill--filter'}`}>
                {notifications ? 'Reminders on' : 'Reminders off'}
              </span>
            </div>
          </section>

          <section className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Skill matrix</h3>
                <p className="muted">Current confidence scores from your activity.</p>
              </div>
            </div>

            <div className="profile-skill-grid">
              {skillMatrix.map((skill) => (
                <div key={skill.name} className="profile-skill-row">
                  <div className="profile-skill-row__meta">
                    <span>{skill.name}</span>
                    <span className="muted">{skill.score}%</span>
                  </div>
                  <div className="course-progress__bar" aria-label={`${skill.name} score`}>
                    <div className="course-progress__fill" style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <h3>Achievement timeline</h3>
                <p className="muted">Milestones collected from courses and practice.</p>
              </div>
            </div>

            <div className="dashboard-announcements">
              {studentAchievements.map((achievement) => (
                <div key={achievement.id} className={`dashboard-note dashboard-note--${achievement.tone}`}>
                  <p className="dashboard-note__title">{achievement.title}</p>
                  <p className="muted">{achievement.body}</p>
                </div>
              ))}
            </div>

            <div className="profile-course-strip">
              {studentCourses.map((course) => (
                <span key={course.id} className="pill pill--filter">
                  {course.shortTitle}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
