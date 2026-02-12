import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import ReportsPage from './pages/faculty/ReportsPage';
import StudentDashboard from './pages/student/StudentDashboard';
import PlaceholderPage from './components/common/PlaceholderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="plos" element={<PlaceholderPage />} />
          <Route path="courses" element={<PlaceholderPage />} />
          <Route path="users" element={<PlaceholderPage />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<Layout role="faculty" />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="clos" element={<PlaceholderPage />} />
          <Route path="mapping" element={<PlaceholderPage />} />
          <Route path="assessments" element={<PlaceholderPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<Layout role="student" />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<PlaceholderPage />} />
          <Route path="performance" element={<PlaceholderPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
