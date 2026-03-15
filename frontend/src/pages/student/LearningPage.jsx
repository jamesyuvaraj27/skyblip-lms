import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const LessonDetail = ({ lessonId, apiBase, token }) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await fetch(`${apiBase}/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setLesson(data);
    };
    if (lessonId) fetchLesson();
  }, [apiBase, lessonId, token]);

  if (!lesson) return <div>Select a lesson to start learning.</div>;

  return (
    <div className="lesson-pane">
      <h3>{lesson.title}</h3>
      {lesson.videoUrl && (
        <video className="lesson-video" src={lesson.videoUrl} controls controlsList="nodownload" />
      )}
      <p className="muted">{lesson.content}</p>
    </div>
  );
};

const LearningPage = () => {
  const { courseId } = useParams();
  const { token, apiBase } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`${apiBase}/api/courses/${courseId}/learning`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCourse(data);
    };
    if (token && courseId) fetchCourse();
  }, [apiBase, courseId, token]);

  if (!course) return <div>Loading course...</div>;

  const firstLessonId =
    course.modules?.[0]?.lessons && course.modules[0].lessons[0]
      ? course.modules[0].lessons[0].id
      : null;

  return (
    <div className="learning-layout">
      <aside className="learning-sidebar">
        <h2>{course.title}</h2>
        <p className="muted">{course.description}</p>
        <div className="learning-tags">
          <span>🎥 Video-first</span>
          <span>🧩 Linked problems</span>
          <span>📝 Notes-friendly layout</span>
        </div>
        <div className="modules">
          {course.modules?.map((mod) => (
            <div key={mod.id} className="module">
              <h4>{mod.title}</h4>
              <ul>
                {mod.lessons?.map((lesson) => (
                  <li key={lesson.id}>
                    <Link to={`lesson/${lesson.id}`}>{lesson.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <section className="learning-main">
        <Routes>
          <Route
            path="/"
            element={
              firstLessonId ? (
                <LessonDetail lessonId={firstLessonId} apiBase={apiBase} token={token} />
              ) : (
                <div>No lessons configured for this course yet.</div>
              )
            }
          />
          <Route
            path="lesson/:lessonId"
            element={
              <LessonRouteWrapper>
                {(lessonId) => (
                  <LessonDetail lessonId={lessonId} apiBase={apiBase} token={token} />
                )}
              </LessonRouteWrapper>
            }
          />
        </Routes>
      </section>
    </div>
  );
};

const LessonRouteWrapper = ({ children }) => {
  const { lessonId } = useParams();
  return children(lessonId);
};

export default LearningPage;

