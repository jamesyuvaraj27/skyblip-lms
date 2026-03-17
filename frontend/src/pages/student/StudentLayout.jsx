import React, { useMemo } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import { useStudentPrefs } from '../../context/useStudentPrefs.js';
import { studentSnapshot } from './studentData.js';
import './StudentLayout.css';

const navItems = [
  { to: '/student/dashboard', label: 'Dashboard', helper: 'Overview and plan' },
  { to: '/student/courses', label: 'My Courses', helper: 'Modules and lessons' },
  { to: '/student/problems', label: 'Practice', helper: 'Compiler and submissions' },
  { to: '/student/quiz/q1', label: 'Quiz Center', helper: 'Assessments and reports' },
  { to: '/student/profile', label: 'Profile', helper: 'Skills and achievements' },
  { to: '/student/settings', label: 'Settings', helper: 'Theme and preferences' }
];

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const { prefs, updatePrefs, themeOptions } = useStudentPrefs();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTitle = useMemo(() => {
    const pathname = location.pathname;
    if (pathname.startsWith('/student/courses/')) return 'Learning Workspace';
    if (pathname.includes('/student/problems/')) return 'Problem Workspace';
    if (pathname.startsWith('/student/dashboard')) return 'Student Dashboard';
    if (pathname.startsWith('/student/courses')) return 'My Courses';
    if (pathname.startsWith('/student/problems')) return 'Practice Problems';
    if (pathname.startsWith('/student/quiz')) return 'Quiz Center';
    if (pathname.startsWith('/student/profile')) return 'Profile';
    if (pathname.startsWith('/student/settings')) return 'Settings';
    return 'Student Workspace';
  }, [location.pathname]);

  const currentThemeLabel =
    themeOptions.find((theme) => theme.value === prefs.theme)?.label ?? prefs.theme;

  const cycleTheme = () => {
    const index = themeOptions.findIndex((theme) => theme.value === prefs.theme);
    const next = themeOptions[(index + 1) % themeOptions.length];
    updatePrefs({ theme: next.value });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="student-shell">
      <aside className="student-sidebar">
        <div className="student-sidebar__brand-wrap">
          <div className="student-sidebar__brand">Skyblip LMS</div>
          <p className="student-sidebar__tag muted">Student workspace</p>
        </div>

        <section className="card student-sidebar__summary" aria-label="Quick summary">
          <h3>Today</h3>
          <div className="student-sidebar__metrics">
            <div>
              <p className="stat-label">Streak</p>
              <p className="student-sidebar__metric">{studentSnapshot.streakDays} days</p>
            </div>
            <div>
              <p className="stat-label">Solved this week</p>
              <p className="student-sidebar__metric">{studentSnapshot.solvedThisWeek}</p>
            </div>
          </div>
          <p className="muted">Keep your streak active with one lesson or one solved problem.</p>
        </section>

        <nav className="student-sidebar__nav" aria-label="Student navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'student-nav-link active' : 'student-nav-link'
              }
            >
              <span className="student-nav-link__title">{item.label}</span>
              <span className="student-nav-link__helper">{item.helper}</span>
            </NavLink>
          ))}
        </nav>

        <div className="student-sidebar__footer">
          <button className="btn btn--ghost btn--small" type="button" onClick={cycleTheme}>
            Theme: {currentThemeLabel}
          </button>
        </div>
      </aside>

      <div className="student-main">
        <header className="student-topbar">
          <div>
            <p className="muted student-topbar__eyebrow">Student portal</p>
            <div className="student-topbar__title">{activeTitle}</div>
          </div>

          <div className="student-topbar__actions">
            <span className="student-topbar__chip">Font {prefs.fontScale}%</span>
            <div className="student-topbar__user">
              <span>{user?.name}</span>
              <button className="btn btn--ghost btn--small" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="student-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
