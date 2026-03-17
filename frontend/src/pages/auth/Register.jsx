import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register(name, email, password);
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
        <h1>Create your student account</h1>
        <p className="auth-subtitle">
          One profile for courses, practice problems and quizzes. No instructor/admin clutter.
        </p>

        <div className="auth-badges">
          <span>📚 Track enrolled courses</span>
          <span>🧩 Save problem history</span>
          <span>📈 See progress charts</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Eg. Aditi Sharma"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="student@college.edu"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 8 characters"
            />
          </label>

          <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-footer auth-footer--columns">
          <div>
            <p className="auth-footer-heading">Already learning here?</p>
            <p className="auth-footer-text">Log in to continue your streaks and active quizzes.</p>
          </div>
          <Link to="/login" className="btn btn--ghost btn--small">
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

