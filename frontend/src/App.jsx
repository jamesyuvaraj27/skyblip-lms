import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import StudentLayout from './pages/student/StudentLayout.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import MyCourses from './pages/student/MyCourses.jsx';
import LearningPage from './pages/student/LearningPage.jsx';
import ProblemList from './pages/student/ProblemList.jsx';
import ProblemDetail from './pages/student/ProblemDetail.jsx';
import QuizPage from './pages/student/QuizPage.jsx';
import Profile from './pages/student/Profile.jsx';
import Settings from './pages/student/Settings.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './context/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="center-page">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'student') return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="courses/:courseId/*" element={<LearningPage />} />
          <Route path="problems" element={<ProblemList />} />
          <Route path="problems/:problemId" element={<ProblemDetail />} />
          <Route path="quiz/:quizId" element={<QuizPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

