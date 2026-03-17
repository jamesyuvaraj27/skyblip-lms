import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="student-shell">
      <aside className="student-sidebar">
        <div className="student-sidebar__brand">Skyblip LMS</div>
        <nav className="student-sidebar__nav">
          <NavLink to="/student/dashboard">Dashboard</NavLink>
          <NavLink to="/student/courses">My Courses</NavLink>
          <NavLink to="/student/problems">Practice</NavLink>
          <NavLink to="/student/quiz/q1">Quiz</NavLink>
          <NavLink to="/student/profile">Profile</NavLink>
          <NavLink to="/student/settings">Settings</NavLink>
        </nav>
      </aside>
      <div className="student-main">
        <header className="student-topbar">
          <div className="student-topbar__title">Student Dashboard</div>
          <div className="student-topbar__user">
            <span>{user?.name}</span>
            <button className="btn btn--ghost btn--small" onClick={handleLogout}>
              Logout
            </button>
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

