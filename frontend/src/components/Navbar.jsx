import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="landing__nav">
      <button type="button" className="landing__brand" onClick={() => navigate('/')}>
        <span className="landing__brand-mark">S</span>
        <span className="landing__logo">Skyblip LMS</span>
      </button>

      <nav className="landing__nav-links">
        <a href="#how-it-works">Workflow</a>
        <a href="#practice">Platform</a>
        <a href="#roles">Outcomes</a>
      </nav>

      <div className="landing__nav-cta">
        <button className="btn btn--ghost" onClick={() => navigate('/login')}>
          Log in
        </button>
        <button className="btn btn--primary" onClick={() => navigate('/register')}>
          Get started
        </button>
      </div>
    </header>
  );
};

export default Navbar;
