import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import {
  getContinueCourse,
  recommendedTracks,
  studentActivityFeed,
  studentAnnouncements,
  studentCourses,
  studentDeadlines,
  studentSnapshot,
  weeklyLearningMinutes
} from './studentData.js';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  const continueCourse = useMemo(() => getContinueCourse(), []);

  const kpis = useMemo(
    () => [
      {
        key: 'active-courses',
        label: 'Active courses',
        value: studentSnapshot.activeCourses,
        helper: 'Across frontend and DSA tracks',
        tone: 'info'
      },
      {
        key: 'avg-progress',
        label: 'Average progress',
        value: `${Math.round(
          studentCourses.reduce(
            (sum, c) => sum + Math.round((c.completedLessons / Math.max(c.totalLessons, 1)) * 100),
            0
          ) / Math.max(studentCourses.length, 1)
        )}%`,
        helper: 'All enrolled courses',
        tone: 'success'
      },
      {
        key: 'practice-solved',
        label: 'Problems solved',
        value: studentSnapshot.solvedProblems,
        helper: `${studentSnapshot.solvedThisWeek} solved this week`,
        tone: 'primary'
      },
      {
        key: 'quiz-score',
        label: 'Average quiz score',
        value: `${studentSnapshot.averageQuizScore}%`,
        helper: `${studentSnapshot.quizzesCompleted} quizzes completed`,
        tone: 'warning'
      }
    ],
    []
  );

  const weeklyMax = useMemo(
    () => weeklyLearningMinutes.reduce((max, day) => Math.max(max, day.minutes || 0), 0) || 1,
    []
  );

  const skillMap = useMemo(
    () => [
      { skill: 'Problem Solving', score: 72 },
      { skill: 'Frontend Engineering', score: 68 },
      { skill: 'Quiz Accuracy', score: 82 },
      { skill: 'Consistency', score: 76 }
    ],
    []
  );

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero dashboard-hero--rich">
        <div className="dashboard-hero__left">
          <p className="dashboard-hero__eyebrow">Student overview</p>
          <h2 className="dashboard-hero__title">Welcome back{user?.name ? `, ${user.name}` : ''}</h2>
          <p className="muted dashboard-hero__subtitle">
            This workspace combines course progression, coding practice, quizzes, and milestones in one
            clear workflow.
          </p>

          <div className="dashboard-hero__actions" role="group" aria-label="Quick actions">
            <Link to="/student/courses" className="btn btn--primary btn--small">
              Continue learning
            </Link>
            <Link to="/student/problems" className="btn btn--ghost btn--small">
              Open compiler
            </Link>
            <Link to="/student/quiz/q1" className="btn btn--ghost btn--small">
              Start quiz
            </Link>
          </div>
        </div>

        <aside className="card dashboard-focus" aria-label="Today plan">
          <div className="dashboard-panel__header">
            <div>
              <h3>Today plan</h3>
              <p className="muted">A focused sequence to keep momentum.</p>
            </div>
            <span className="pill pill--filter">3 steps</span>
          </div>

          <ul className="dashboard-rows dashboard-plan">
            <li className="dashboard-row">
              <span className="dot dot--info" aria-hidden="true" />
              <div className="dashboard-row__main">
                <p className="dashboard-row__title">Watch next lesson</p>
                <p className="muted">{continueCourse?.nextLessonTitle ?? 'Continue selected module'}</p>
              </div>
            </li>
            <li className="dashboard-row">
              <span className="dot dot--warning" aria-hidden="true" />
              <div className="dashboard-row__main">
                <p className="dashboard-row__title">Solve one medium problem</p>
                <p className="muted">Target: 30 mins focused practice</p>
              </div>
            </li>
            <li className="dashboard-row">
              <span className="dot dot--success" aria-hidden="true" />
              <div className="dashboard-row__main">
                <p className="dashboard-row__title">Attempt checkpoint quiz</p>
                <p className="muted">Aim for 70%+ to unlock next badge</p>
              </div>
            </li>
          </ul>
        </aside>
      </header>

      <section className="grid grid--3 dashboard-kpis" aria-label="Key performance indicators">
        {kpis.map((kpi) => (
          <div key={kpi.key} className={`card dashboard-kpi dashboard-kpi--${kpi.tone}`}>
            <div className="dashboard-kpi__top">
              <p className="stat-label">{kpi.label}</p>
              <span className={`dashboard-chip dashboard-chip--${kpi.tone}`} aria-hidden="true" />
            </div>
            <p className="metric">{kpi.value}</p>
            <p className="muted">{kpi.helper}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--main">
        <div className="card dashboard-panel dashboard-panel--continue">
          <div className="dashboard-panel__header">
            <div>
              <h3>Continue learning</h3>
              <p className="muted">Resume your highest-priority course now.</p>
            </div>
            <span className="dashboard-panel__meta muted">Last activity: {continueCourse?.lastActivity}</span>
          </div>

          <div className="dashboard-continue">
            <div className="dashboard-continue__main">
              <p className="dashboard-continue__course">{continueCourse?.title}</p>
              <p className="dashboard-continue__next muted">Next up: {continueCourse?.nextLessonTitle}</p>
              <div className="course-card__meta-row">
                <span className="pill pill--filter">{continueCourse?.level}</span>
                <span className="pill pill--filter">{continueCourse?.durationHours} hrs</span>
                <span className="pill pill--filter">{continueCourse?.totalLessons} lessons</span>
              </div>
            </div>

            <div className="dashboard-continue__side">
              <div className="dashboard-progress" aria-label="Course progress">
                <div
                  className="dashboard-progress__bar"
                  style={{
                    width: `${Math.round(
                      ((continueCourse?.completedLessons ?? 0) / Math.max(continueCourse?.totalLessons ?? 1, 1)) * 100
                    )}%`
                  }}
                />
              </div>
              <div className="dashboard-continue__numbers">
                <span className="dashboard-continue__percent">
                  {Math.round(
                    ((continueCourse?.completedLessons ?? 0) / Math.max(continueCourse?.totalLessons ?? 1, 1)) * 100
                  )}%
                </span>
                <span className="muted">
                  {Math.max((continueCourse?.totalLessons ?? 0) - (continueCourse?.completedLessons ?? 0), 0)}
                  {' '}
                  lessons left
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-panel__footer">
            <Link to={`/student/courses/${continueCourse?.id ?? 1}`} className="btn btn--primary btn--small">
              Open learning workspace
            </Link>
            <Link to="/student/problems" className="btn btn--ghost btn--small">
              Practice related problems
            </Link>
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Weekly activity</h3>
              <p className="muted">Minutes learned per day.</p>
            </div>
          </div>

          <div className="dashboard-weekly" role="img" aria-label="Weekly learning minutes bar chart">
            {weeklyLearningMinutes.map((day) => (
              <div key={day.day} className="dashboard-weekly__item">
                <div
                  className="dashboard-weekly__bar"
                  style={{ height: `${Math.round((day.minutes / weeklyMax) * 100)}%` }}
                  title={`${day.day}: ${day.minutes} mins`}
                />
                <div className="dashboard-weekly__label muted">{day.day}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-skillmap" aria-label="Skill strengths">
            {skillMap.map((item) => (
              <div key={item.skill} className="dashboard-skillmap__row">
                <div className="dashboard-skillmap__meta">
                  <span>{item.skill}</span>
                  <span className="muted">{item.score}%</span>
                </div>
                <div className="dashboard-progress dashboard-progress--slim">
                  <div className="dashboard-progress__bar" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--secondary">
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Upcoming deadlines</h3>
              <p className="muted">Classes, assignments, and quizzes in one list.</p>
            </div>
            <Link className="auth-link-button" to="/student/courses">
              View calendar
            </Link>
          </div>

          <ul className="dashboard-rows" aria-label="Upcoming list">
            {studentDeadlines.map((item) => (
              <li key={item.id} className="dashboard-row">
                <span className={`dot dot--${item.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{item.title}</p>
                  <p className="muted">{item.due}</p>
                </div>
                <span className="dashboard-row__meta muted">{item.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Announcements</h3>
              <p className="muted">Latest updates from mentors and platform team.</p>
            </div>
          </div>
          <div className="dashboard-announcements">
            {studentAnnouncements.map((note) => (
              <div key={note.id} className={`dashboard-note dashboard-note--${note.tone}`}>
                <p className="dashboard-note__title">{note.title}</p>
                <p className="muted">{note.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h3>Recent activity</h3>
              <p className="muted">Your latest learning signals.</p>
            </div>
            <Link className="auth-link-button" to="/student/problems">
              Open practice
            </Link>
          </div>

          <ul className="dashboard-rows" aria-label="Recent activity list">
            {studentActivityFeed.map((item) => (
              <li key={item.id} className="dashboard-row">
                <span className={`dot dot--${item.tone}`} aria-hidden="true" />
                <div className="dashboard-row__main">
                  <p className="dashboard-row__title">{item.title}</p>
                  <p className="muted">{item.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dashboard-recommendations" aria-label="Recommended tracks">
        <div className="dashboard-panel__header">
          <div>
            <h3>Recommended next tracks</h3>
            <p className="muted">Inspired by your current progress and learning goals.</p>
          </div>
          <Link className="auth-link-button" to="/student/courses">
            Browse all tracks
          </Link>
        </div>

        <div className="grid grid--3">
          {recommendedTracks.map((track) => (
            <article key={track.id} className="card dashboard-track-card">
              <span className="pill pill--filter">{track.level}</span>
              <h3>{track.title}</h3>
              <p className="muted">{track.reason}</p>
              <div className="dashboard-track-card__footer">
                <span className="pill pill--filter">{track.duration}</span>
                <button type="button" className="btn btn--ghost btn--small">
                  Preview
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
