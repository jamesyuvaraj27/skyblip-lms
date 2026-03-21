import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './LandingPage.css';

const workflow = [
  {
    step: '01',
    title: 'Map the learner baseline',
    text: 'Learners begin with a quick diagnostic. Skyblip turns the result into a focused, realistic path.'
  },
  {
    step: '02',
    title: 'Learn in short guided sprints',
    text: 'Each module combines video, notes, and one practical checkpoint before moving forward.'
  },
  {
    step: '03',
    title: 'Practice in compiler workspace',
    text: 'Concepts immediately move into coding drills with test-case feedback and compile diagnostics.'
  },
  {
    step: '04',
    title: 'Review outcomes and next targets',
    text: 'Dashboards summarize progress, weak areas, and next milestones so momentum never stalls.'
  }
];

const capabilities = [
  {
    title: 'Structured Learning Paths',
    text: 'Module based progression with weekly targets, completion checkpoints, and streak support.'
  },
  {
    title: 'Coding Practice Workspace',
    text: 'Problem statements, starter templates, test cases, and run or submit flow in one place.'
  },
  {
    title: 'Quiz and Revision Engine',
    text: 'Timed assessments with review mode, explanations, and pass threshold tracking.'
  },
  {
    title: 'Student Performance Insights',
    text: 'Visual snapshots for solved problems, quiz scores, and consistency trends.'
  }
];

const outcomes = [
  {
    audience: 'Students',
    points: ['Clear daily direction', 'Hands-on coding confidence', 'Visible progress and milestones']
  },
  {
    audience: 'Bootcamps and Colleges',
    points: ['Cohort level tracking', 'Unified course and practice flow', 'Higher completion consistency']
  },
  {
    audience: 'Mentors',
    points: ['Fast gap detection', 'Targeted intervention planning', 'Transparent learner journey']
  }
];

const testimonials = [
  {
    quote:
      'The shift from watching to doing is immediate. Learners stop passive scrolling and start active solving.',
    name: 'Ritika Menon',
    role: 'Frontend Mentor'
  },
  {
    quote:
      'The workflow feels like a real interview prep environment instead of disconnected content pages.',
    name: 'Arjun Vyas',
    role: 'Placement Coordinator'
  },
  {
    quote:
      'I can track my weak topics weekly and fix them with guided practice instead of guessing what to study.',
    name: 'Saurabh K',
    role: 'Student'
  }
];

const faqs = [
  {
    q: 'Can students use Skyblip without mentor support?',
    a: 'Yes. The default learning path, practice flow, and weekly goals work independently for self-paced learners.'
  },
  {
    q: 'Is coding practice connected to course modules?',
    a: 'Yes. Every module can route to related problem sets so concepts are reinforced with immediate application.'
  },
  {
    q: 'Do quizzes support review and explanation mode?',
    a: 'Yes. After submission, learners can review answers with explanations and identify improvement areas.'
  },
  {
    q: 'Can this front-end be connected to a backend later?',
    a: 'Yes. The routing and page structure are production-ready and can be wired to APIs incrementally.'
  }
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing__backdrop" aria-hidden="true" />

      <Navbar />

      <main className="landing__content">
        <section className="landing__hero" id="hero">
          <div className="landing__hero-copy">
            <p className="landing__eyebrow">Build job-ready learning momentum</p>
            <h1>
              A modern LMS where learners
              <span className="landing__accent"> watch, practice, and improve </span>
              in one continuous loop.
            </h1>
            <p className="landing__subtitle">
              Skyblip combines guided courses, coding workspace, quiz assessments, and progress intelligence
              into a focused student experience designed for daily execution.
            </p>
            <div className="landing__hero-actions">
              <button className="btn btn--primary" onClick={() => navigate('/register')}>
                Start learning now
              </button>
              <button className="btn btn--ghost" onClick={() => navigate('/login')}>
                Explore demo workspace
              </button>
            </div>
            <div className="landing__hero-metrics">
              <span>48k+ learning sessions completed</span>
              <span>200+ coding challenges mapped</span>
              <span>Weekly progress and streak visibility</span>
            </div>
          </div>

          <aside className="landing__hero-panel">
            <div className="landing__panel-head">
              <p className="stat-label">Live Path Snapshot</p>
              <span className="pill pill--success">On track</span>
            </div>
            <h3>Frontend + DSA Sprint</h3>
            <p className="muted">Today target: 1 lesson, 1 medium problem, 1 quiz checkpoint.</p>

            <div className="landing__panel-progress">
              <div className="landing__panel-progress-row">
                <span>Module completion</span>
                <span>67%</span>
              </div>
              <div className="landing__panel-progress-track">
                <div className="landing__panel-progress-fill" />
              </div>
            </div>

            <ul className="landing__panel-list">
              <li>
                <strong>Next lesson:</strong> Monotonic stack patterns
              </li>
              <li>
                <strong>Practice queue:</strong> 3 medium, 1 hard
              </li>
              <li>
                <strong>Quiz deadline:</strong> Today 7:30 PM
              </li>
            </ul>
          </aside>
        </section>

        <section className="landing__section" id="how-it-works">
          <div className="landing__section-header">
            <h2>How Skyblip Learning Flow Works</h2>
            <p>
              Inspired by top LMS patterns, rebuilt as a tighter student-first journey with less noise and
              stronger execution loops.
            </p>
          </div>

          <div className="landing__workflow-grid">
            {workflow.map((item) => (
              <article key={item.step} className="landing__workflow-card">
                <span className="landing__step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__section landing__platform" id="practice">
          <div className="landing__section-header">
            <h2>What Students Actually Use Daily</h2>
            <p>
              Every surface is designed for action: learn, solve, evaluate, and repeat without switching
              tools.
            </p>
          </div>

          <div className="landing__platform-layout">
            <div className="landing__platform-highlight">
              <h3>One workspace. No context switching.</h3>
              <p>
                Course modules, compiler runs, and quiz reports live in one interface so learners stay in
                rhythm.
              </p>
              <ul>
                <li>Course content with linked coding drills</li>
                <li>Compiler diagnostics with test-case feedback</li>
                <li>Result analysis and improvement prompts</li>
                <li>Settings for theme, readability, and coding defaults</li>
              </ul>
            </div>

            <div className="landing__platform-cards">
              {capabilities.map((item) => (
                <article key={item.title} className="landing__capability-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing__section" id="roles">
          <div className="landing__section-header">
            <h2>Outcomes for Every Learning Stakeholder</h2>
            <p>
              While the product is student-centric, it also gives institutions and mentors a reliable operating
              view.
            </p>
          </div>

          <div className="landing__outcomes-grid">
            {outcomes.map((item) => (
              <article key={item.audience} className="landing__outcome-card">
                <span className="badge badge--role">{item.audience}</span>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__section landing__proof">
          <div className="landing__section-header">
            <h2>What Users Say</h2>
            <p>Feedback from mentors and learners using practical, outcomes-driven course formats.</p>
          </div>

          <div className="landing__testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="landing__testimonial-card">
                <p className="landing__quote">"{item.quote}"</p>
                <p className="landing__person">{item.name}</p>
                <p className="muted">{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__section landing__faq">
          <div className="landing__section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions teams ask before rolling out a practical LMS environment.</p>
          </div>

          <div className="landing__faq-grid">
            {faqs.map((item) => (
              <article key={item.q} className="landing__faq-card">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__section landing__cta">
          <div className="landing__cta-inner">
            <h2>Ready to Launch a Real Student Learning Experience?</h2>
            <p>
              Start with the learner flow now. Connect backend services later without redesigning the front-end
              journey.
            </p>
            <div className="landing__hero-actions">
              <button className="btn btn--primary" onClick={() => navigate('/register')}>
                Create student account
              </button>
              <button className="btn btn--ghost" onClick={() => navigate('/login')}>
                Open login demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <span>Copyright {new Date().getFullYear()} Skyblip LMS</span>
        <div className="landing__footer-links">
          <a href="#hero">Hero</a>
          <a href="#how-it-works">Workflow</a>
          <a href="#practice">Platform</a>
          <a href="#roles">Outcomes</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
