import React, { useMemo } from 'react';
import { useAuth } from '../../context/useAuth.js';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  useAuth();
  const items = useMemo(
    () => [
      {
        id: 1,
        courseId: 1,
        courseTitle: 'JavaScript Fundamentals',
        thumbnail: 'https://via.placeholder.com/300x150?text=JavaScript',
        progressPercent: 75
      },
      {
        id: 2,
        courseId: 2,
        courseTitle: 'Data Structures & Algorithms',
        thumbnail: 'https://via.placeholder.com/300x150?text=DSA',
        progressPercent: 45
      },
      {
        id: 3,
        courseId: 3,
        courseTitle: 'React Advanced Patterns',
        thumbnail: 'https://via.placeholder.com/300x150?text=React',
        progressPercent: 30
      }
    ],
    []
  );

  return (
    <div className="my-courses-page">
      <header className="dashboard-header">
        <div>
          <h2>My Courses</h2>
          <p className="muted">
            All the structured learning paths you&apos;re part of – with visual progress rings.
          </p>
        </div>
      </header>
      <div className="grid grid--3 dashboard-cards">
        {items.map((item) => (
          <div key={item.id} className="card course-card">
            {item.thumbnail && (
              <div className="course-thumb">
                <img src={item.thumbnail} alt={item.courseTitle} />
              </div>
            )}
            <h3>{item.courseTitle}</h3>
            <p className="muted">Self‑paced with hands‑on problems and a final quiz.</p>
            <div className="course-card__meta">
              <div className="progress-ring">
                <span>{item.progressPercent}%</span>
              </div>
              <div className="course-card__meta-text">
                <p>Course progress</p>
                <p className="muted">Complete lessons and problems to move this forward.</p>
              </div>
            </div>
            <div className="course-card__actions">
              <Link
                to={`/student/courses/${item.courseId}`}
                className="btn btn--primary btn--small"
              >
                Continue course
              </Link>
              <button className="btn btn--ghost btn--small" type="button">
                View syllabus
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card course-empty">
            <h3>No courses yet</h3>
            <p className="muted">
              In a full build, this page would connect to the public course catalog. For now, use
              the seeded demo enrollment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

