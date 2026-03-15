import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="landing__nav">
      <div className="landing__logo">Skyblip LMS</div>
      <nav className="landing__nav-links">
        <a href="#how-it-works">How it works</a>
        <a href="#practice">Practice</a>
        <a href="#roles">For who?</a>
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

