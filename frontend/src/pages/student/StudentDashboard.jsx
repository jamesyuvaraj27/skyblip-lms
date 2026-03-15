import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const StudentDashboard = () => {
  const { token, apiBase } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(`${apiBase}/api/student/overview`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchOverview();
    }
  }, [apiBase, token]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h2>Welcome to your learning hub</h2>
          <p className="muted">
            Track everything in one view – courses, problems, quizzes and overall mastery.
          </p>
        </div>
        <div className="dashboard-pills">
          <span>🔥 Daily streak ready</span>
          <span>✅ Auto progress tracking</span>
          <span>🧪 Quiz-ready courses</span>
        </div>
      </header>

      <section className="grid grid--3 dashboard-cards">
        <div className="card card--stat">
          <p className="stat-label">Enrolled courses</p>
          <p className="metric">{stats?.enrolledCourses ?? 0}</p>
          <p className="muted">Hand‑picked paths you&apos;re actively following.</p>
        </div>
        <div className="card card--stat">
          <p className="stat-label">Average progress</p>
          <p className="metric">{stats?.avgProgress ?? 0}%</p>
          <p className="muted">Across all your active enrollments.</p>
        </div>
        <div className="card card--stat">
          <p className="stat-label">Solved problems</p>
          <p className="metric">{stats?.solvedProblems ?? 0}</p>
          <p className="muted">Coding questions you&apos;ve attempted with verdicts.</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <h3>Today&apos;s focus</h3>
          <ul className="dashboard-list">
            <li>Watch one lesson from your primary course.</li>
            <li>Attempt at least one coding problem.</li>
            <li>Review solutions from previous submissions.</li>
          </ul>
        </div>
        <div className="card dashboard-panel">
          <h3>Activity timeline</h3>
          <p className="muted">
            This demo version uses mock data – in a full MERN build, this would stream from
            submissions and quiz results collections.
          </p>
          <ul className="dashboard-timeline">
            <li>
              <span className="dot dot--success" />
              Solved <strong>Two Sum</strong> with status <strong>Accepted</strong>.
            </li>
            <li>
              <span className="dot dot--info" />
              Watched <strong>Why Arrays Matter</strong> lesson.
            </li>
            <li>
              <span className="dot dot--warning" />
              Started <strong>Arrays Basics Quiz</strong>.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;

