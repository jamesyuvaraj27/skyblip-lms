import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@skyblip.dev');
  const [password, setPassword] = useState('Skyblip#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'student') {
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
        <button className="auth-back-button" type="button" onClick={() => navigate('/')}>
          Back to home
        </button>

        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to continue learning, or use an admin email to open the system workspace.
        </p>

        <div className="auth-badges">
          <span>Secure demo credential pre-filled</span>
          <span>Use admin@example.com for admin demo</span>
          <span>Local role-based routing</span>
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
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <div className="auth-password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="auth-password-toggle-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.9 10.9 0 0112 5c6 0 10 7 10 7a17.2 17.2 0 01-4.2 4.9M6.5 6.5A17.5 17.5 0 002 12s4 7 10 7a11 11 0 004.2-.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="auth-password-toggle-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
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
              Student signup still starts in the learner flow. Admin preview is available from the
              login form with an admin email.
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
