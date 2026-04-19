import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import ReportsPage from './pages/faculty/ReportsPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ManagePLOs from './pages/admin/ManagePLOs';
import ManageCourses from './pages/admin/ManageCourses';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCLOs from './pages/faculty/ManageCLOs';
import CLOPLOMapping from './pages/faculty/CLOPLOMapping';
import Assessments from './pages/faculty/Assessments';
import StudentCourses from './pages/student/StudentCourses';
import StudentPerformance from './pages/student/StudentPerformance';
import PlaceholderPage from './components/common/PlaceholderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Layout role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="plos" element={<ManagePLOs />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Route>

        {/* Faculty Routes */}
        <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
          <Route path="/faculty" element={<Layout role="faculty" />}>
            <Route index element={<FacultyDashboard />} />
            <Route path="clos" element={<ManageCLOs />} />
            <Route path="mapping" element={<CLOPLOMapping />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<Layout role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="performance" element={<StudentPerformance />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
