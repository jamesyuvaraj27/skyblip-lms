import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import './admin.css';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/courses', label: 'Courses' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' }
];

const resolveTitle = (pathname) => {
  const current = navItems.find(({ to }) => pathname === to || pathname.startsWith(`${to}/`));
  return current?.label ?? 'Dashboard';
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="student-shell admin-shell">
      <aside className="student-sidebar admin-sidebar">
        <div className="student-sidebar__brand">Skyblip Admin</div>
        <nav className="student-sidebar__nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="student-main">
        <header className="student-topbar admin-topbar">
          <div className="student-topbar__title">{resolveTitle(location.pathname)}</div>
          <div className="student-topbar__user">
            <span className="pill pill--filter">Administrator</span>
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

export default AdminLayout;
