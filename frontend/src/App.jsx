import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
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
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminWorkspacePage from './pages/admin/AdminWorkspacePage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { StudentPrefsProvider } from './context/StudentPrefsContext.jsx';
import { useAuth } from './context/useAuth.js';

const roleHome = {
  admin: '/admin/dashboard',
  student: '/student/dashboard'
};

const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="center-page">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={roleHome[user.role] ?? '/'} replace />;
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
            <ProtectedRoute role="student">
              <StudentPrefsProvider>
                <StudentLayout />
              </StudentPrefsProvider>
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

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminWorkspacePage section="users" />} />
          <Route path="courses" element={<AdminWorkspacePage section="courses" />} />
          <Route path="reports" element={<AdminWorkspacePage section="reports" />} />
          <Route path="settings" element={<AdminWorkspacePage section="settings" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

