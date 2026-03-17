import React, { useMemo, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { getAllLessonsForCourse, getCourseById } from './studentData.js';
import './LearningPage.css';

const LessonContent = ({ course, lesson, lessonIndex, lessonCount, notes, onNotesChange }) => {
  const prevLesson = lessonIndex > 0 ? getAllLessonsForCourse(course)[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessonCount - 1 ? getAllLessonsForCourse(course)[lessonIndex + 1] : null;

  return (
    <div className="lesson-pane">
      <header className="learning-lesson-header">
        <div>
          <p className="dashboard-hero__eyebrow">Lesson</p>
          <h2>{lesson.title}</h2>
          <p className="muted">{lesson.summary}</p>
        </div>
        <div className="learning-lesson-header__meta">
          <span className="pill pill--filter">{lesson.type}</span>
          <span className="pill pill--filter">{lesson.minutes} mins</span>
          <span className={`pill ${lesson.completed ? 'pill--success' : 'pill--filter'}`}>
            {lesson.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </header>

      <div className="learning-content-grid">
        <article className="card learning-content-block">
          <h3>Lesson Brief</h3>
          <p className="muted">
            This lesson focuses on practical understanding and coding readiness. Follow the checklist,
            then solve the related problem in the workspace.
          </p>

          <video
            className="lesson-video"
            src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`}
            controls
            controlsList="nodownload"
          />

          <div className="learning-resources">
            <h4>Resources</h4>
            <ul>
              {(lesson.resources ?? []).map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </div>

          <div className="learning-nav-actions">
            {prevLesson ? (
              <Link
                className="btn btn--ghost btn--small"
                to={`/student/courses/${course.id}/lesson/${prevLesson.id}`}
              >
                Previous lesson
              </Link>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Link
                className="btn btn--primary btn--small"
                to={`/student/courses/${course.id}/lesson/${nextLesson.id}`}
              >
                Next lesson
              </Link>
            ) : (
              <Link className="btn btn--primary btn--small" to="/student/quiz/q2">
                Attempt checkpoint quiz
              </Link>
            )}
          </div>
        </article>

        <aside className="card learning-side-panel">
          <h3>Lesson Checklist</h3>
          <ul className="mycourses-checklist" aria-label="Lesson checklist">
            <li className="mycourses-check">
              <span className="dot dot--info" aria-hidden="true" />
              <div>
                <strong>Watch full lesson</strong>
                <p className="muted">Avoid skipping key examples and edge cases.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--warning" aria-hidden="true" />
              <div>
                <strong>Take quick notes</strong>
                <p className="muted">Capture one reusable template from this lesson.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--success" aria-hidden="true" />
              <div>
                <strong>Practice immediately</strong>
                <p className="muted">Solve one related problem while the concept is fresh.</p>
              </div>
            </li>
          </ul>

          <div className="learning-side-panel__actions">
            <Link className="btn btn--ghost btn--small" to="/student/problems">
              Open compiler
            </Link>
            <Link className="btn btn--primary btn--small" to="/student/quiz/q1">
              Quiz checkpoint
            </Link>
          </div>
        </aside>
      </div>

      <section className="card learning-notes">
        <div className="dashboard-panel__header">
          <div>
            <h3>My Lesson Notes</h3>
            <p className="muted">Saved locally for quick revision while practicing.</p>
          </div>
          <span className="pill pill--filter">XP reward: {lesson.xp}</span>
        </div>

        <textarea
          className="learning-notes__editor"
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Write key points, edge cases, and coding template here..."
        />
      </section>
    </div>
  );
};

const LessonRouteWrapper = ({ course, initialLesson, notesByLesson, setNotesByLesson }) => {
  const { lessonId } = useParams();
  const lessons = useMemo(() => getAllLessonsForCourse(course), [course]);
  const activeLesson = lessons.find((lesson) => lesson.id === lessonId) ?? initialLesson;
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);

  return (
    <LessonContent
      course={course}
      lesson={activeLesson}
      lessonIndex={lessonIndex < 0 ? 0 : lessonIndex}
      lessonCount={lessons.length}
      notes={notesByLesson[activeLesson.id] ?? ''}
      onNotesChange={(next) =>
        setNotesByLesson((prev) => ({
          ...prev,
          [activeLesson.id]: next
        }))
      }
    />
  );
};

const LearningPage = () => {
  const { courseId } = useParams();
  const course = useMemo(() => getCourseById(courseId) ?? getCourseById('1'), [courseId]);

  const lessons = useMemo(() => getAllLessonsForCourse(course), [course]);
  const initialLesson = lessons.find((lesson) => lesson.id === course.nextLessonId) ?? lessons[0];
  const [notesByLesson, setNotesByLesson] = useState({});

  if (!course || !initialLesson) return <div>Loading learning workspace...</div>;

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;

  return (
    <div className="learning-layout">
      <aside className="learning-sidebar">
        <div className="learning-sidebar__header">
          <p className="dashboard-hero__eyebrow">Course workspace</p>
          <h2>{course.shortTitle}</h2>
          <p className="muted">{course.description}</p>
        </div>

        <div className="learning-tags">
          <span>{course.level}</span>
          <span>{course.durationHours} hrs</span>
          <span>{course.projects} projects</span>
        </div>

        <div className="learning-progress-block">
          <div className="course-progress__top">
            <span>Overall progress</span>
            <span className="muted">
              {completedLessons}/{lessons.length} lessons
            </span>
          </div>
          <div className="course-progress__bar" aria-label="Course progress">
            <div
              className="course-progress__fill"
              style={{ width: `${Math.round((completedLessons / Math.max(lessons.length, 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="modules">
          {course.modules.map((module) => (
            <section key={module.id} className="module">
              <div className="module__header">
                <h4>{module.title}</h4>
                <span className="pill pill--filter">{module.progressPercent}%</span>
              </div>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link to={`lesson/${lesson.id}`}>
                      <span>{lesson.title}</span>
                      <span className="muted">{lesson.minutes}m</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <section className="learning-main">
        <Routes>
          <Route
            index
            element={
              <LessonContent
                course={course}
                lesson={initialLesson}
                lessonIndex={lessons.findIndex((lesson) => lesson.id === initialLesson.id)}
                lessonCount={lessons.length}
                notes={notesByLesson[initialLesson.id] ?? ''}
                onNotesChange={(next) =>
                  setNotesByLesson((prev) => ({
                    ...prev,
                    [initialLesson.id]: next
                  }))
                }
              />
            }
          />
          <Route
            path="lesson/:lessonId"
            element={
              <LessonRouteWrapper
                course={course}
                initialLesson={initialLesson}
                notesByLesson={notesByLesson}
                setNotesByLesson={setNotesByLesson}
              />
            }
          />
        </Routes>
      </section>
    </div>
  );
};

export default LearningPage;
