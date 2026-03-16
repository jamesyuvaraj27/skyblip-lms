import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Mock lessons data
const mockLessonsData = {
  1: {
    id: 1,
    title: 'What Are Variables?',
    content: 'Variables are containers for storing data values. In JavaScript, you can declare variables using let, const, or var keywords. Variables help you store and manage data throughout your program.',
    videoUrl: 'https://via.placeholder.com/640x480?text=Lesson+1+Video'
  },
  2: {
    id: 2,
    title: 'Working with Arrays',
    content: 'Arrays are used to store multiple values in a single variable. They are useful for grouping data of the same type. You can access elements using their index (0-based).',
    videoUrl: 'https://via.placeholder.com/640x480?text=Lesson+2+Video'
  },
  3: {
    id: 3,
    title: 'Functions and Scope',
    content: 'Functions are reusable blocks of code. They help you organize your code and make it more maintainable. Understanding scope is important for managing variable accessibility.',
    videoUrl: 'https://via.placeholder.com/640x480?text=Lesson+3+Video'
  }
};

// Mock course data
const mockCoursesData = {
  1: {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming from scratch.',
    modules: [
      {
        id: 1,
        title: 'Module 1: Getting Started',
        lessons: [
          { id: 1, title: 'What Are Variables?' },
          { id: 2, title: 'Working with Arrays' }
        ]
      },
      {
        id: 2,
        title: 'Module 2: Advanced Topics',
        lessons: [
          { id: 3, title: 'Functions and Scope' }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: 'Data Structures & Algorithms',
    description: 'Master DSA concepts for coding interviews.',
    modules: [
      {
        id: 3,
        title: 'Module 1: Basics',
        lessons: [
          { id: 4, title: 'What is Big O?' }
        ]
      }
    ]
  }
};

const LessonDetail = ({ lessonId }) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    // Mock fetch - no backend call
    const mockLesson = mockLessonsData[lessonId] || mockLessonsData[1];
    setLesson(mockLesson);
  }, [lessonId]);

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
  const { token } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Mock fetch - no backend call
    const mockCourse = mockCoursesData[courseId] || mockCoursesData[1];
    setCourse(mockCourse);
  }, [courseId, token]);

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
                <LessonDetail lessonId={firstLessonId} />
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
                  <LessonDetail lessonId={lessonId} />
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

