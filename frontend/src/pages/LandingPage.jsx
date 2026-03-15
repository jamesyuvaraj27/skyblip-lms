import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing__video-layer">
        <video
          className="landing__video"
          src="/videos/bgvid1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="landing__video-overlay" />
      </div>

      <Navbar />

      <main className="landing__content">
        <section className="landing__hero" id="hero">
          <div className="hero__glass">
            <p className="eyebrow">Practice-first learning platform</p>
            <h1>
              Learn, teach & manage
              <span className="accent"> coding courses </span>
              in one flow.
            </h1>
            <p className="hero__subtitle">
              Skyblip LMS turns problem solving into a cinematic experience — live code editor,
              structured courses, MCQ quizzes and real-time progress in a single MERN-ready
              workspace.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => navigate('/login')}>
                Start solving problems
              </button>
              <button className="btn btn--ghost" onClick={() => navigate('/login')}>
                Browse courses
              </button>
            </div>
            <div className="hero__meta">
              <span>⏱ 5‑minute signup</span>
              <span>🧩 100+ practice problems</span>
              <span>📊 Role-based dashboards</span>
            </div>
          </div>
        </section>

        <section className="landing__section landing__section--glass" id="how-it-works">
          <div className="section__header">
            <h2>How the flow works</h2>
            <p>
              From first visit to enrolled learner — this path mirrors your workflow diagram while
              feeling like a real product.
            </p>
          </div>
          <div className="grid grid--3">
            <div className="card card--step">
              <span className="badge">01 · Explore</span>
              <h3>Landing & discovery</h3>
              <p>
                Visitors hit the hero, skim highlights and filter through categories of courses and
                problem sets without creating an account.
              </p>
            </div>
            <div className="card card--step">
              <span className="badge">02 · Decide</span>
              <h3>Preview problems & courses</h3>
              <p>
                Each item opens a focused preview with outcomes, sample problems and an embedded
                code snippet or video trailer.
              </p>
            </div>
            <div className="card card--step">
              <span className="badge">03 · Commit</span>
              <h3>Auth & role routing</h3>
              <p>
                When they click Enroll or Start solving, the user signs up, gets a role and is
                redirected to the right dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="landing__section" id="practice">
          <div className="section__header">
            <h2>Practice problems, courses & quizzes</h2>
            <p>
              Build the exact flows from your system map — problem editor, course player and quiz
              engine are all visualised here for your future MERN build.
            </p>
          </div>
          <div className="grid grid--2-1">
            <div className="card card--glass">
              <h3>Problem-based learning</h3>
              <p>
                Launch a GK-style problem editor with hints, constraints and live feedback. Perfect
                for coding interviews, exams or daily streaks.
              </p>
              <ul className="card__list">
                <li>Rich code editor with test cases</li>
                <li>Topic tags and difficulty filters</li>
                <li>Timed challenges and streak tracking</li>
              </ul>
            </div>
            <div className="card card--glass card--blur">
              <h3>Courses & MCQ quizzes</h3>
              <p>
                Combine video lessons, notes and MCQs into structured modules with automatic scoring
                and completion certificates.
              </p>
              <ul className="card__list">
                <li>Module-based course outline</li>
                <li>Question banks with analytics</li>
                <li>Instant pass/fail and review mode</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="landing__section landing__section--glass" id="roles">
          <div className="section__header">
            <h2>Built for every role</h2>
            <p>
              Your workflow separates Student, Instructor and Admin — this landing page speaks to
              each of them before they ever log in.
            </p>
          </div>
          <div className="grid grid--3">
            <div className="card card--role">
              <span className="badge badge--role">Students</span>
              <h3>Learn by doing</h3>
              <p>
                Track enrolled courses, attempt quizzes and solve problems, all from a clean,
                progress-driven dashboard.
              </p>
            </div>
            <div className="card card--role">
              <span className="badge badge--role">Instructors</span>
              <h3>Design learning paths</h3>
              <p>
                Create courses, upload videos, attach practice problems and see exactly where
                learners struggle.
              </p>
            </div>
            <div className="card card--role">
              <span className="badge badge--role">Admins</span>
              <h3>Control the system</h3>
              <p>
                Approve instructors, manage categories, audit results and view platform-wide health
                from a single overview.
              </p>
            </div>
          </div>
        </section>

        <section className="landing__section landing__cta">
          <div className="landing__cta-inner">
            <h2>Ready to turn this into a full MERN app?</h2>
            <p>
              This landing page is already wired with React Router — plug in your backend later
              without changing the experience users see today.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => navigate('/register')}>
                Start as student
              </button>
              <button className="btn btn--ghost" onClick={() => navigate('/login')}>
                I&apos;m an instructor
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <span>© {new Date().getFullYear()} Skyblip LMS</span>
        <div className="landing__footer-links">
          <a href="#hero">Overview</a>
          <a href="#practice">Practice</a>
          <a href="#roles">Roles</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
