import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Pick up your streaks, resume unfinished lessons and continue exactly where you stopped.
        </p>

        <div className="auth-badges">
          <span>⚡ Demo student pre-filled</span>
          <span>🔐 JWT-secured session</span>
          <span>🎯 Student dashboard only</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>

          <div className="auth-form__meta">
            <label className="auth-remember">
              <input type="checkbox" defaultChecked />
              Keep me signed in
            </label>
            <button
              type="button"
              className="auth-link-button"
              onClick={() => navigate('/register')}
            >
              Forgot account?
            </button>
          </div>

          <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in to dashboard'}
          </button>
        </form>

        <div className="auth-footer auth-footer--columns">
          <div>
            <p className="auth-footer-heading">New to Skyblip?</p>
            <p className="auth-footer-text">
              You&apos;ll start as a student by default. Instructors and admins can be added later in
              backend.
            </p>
          </div>
          <button className="btn btn--ghost btn--small" onClick={() => navigate('/register')}>
            Create a free student account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

