import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  Target, 
  GraduationCap, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
          { name: 'Manage PLOs', path: '/admin/plos', icon: <Target size={20} /> },
          { name: 'Manage Courses', path: '/admin/courses', icon: <BookOpen size={20} /> },
          { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
        ];
      case 'faculty':
        return [
          { name: 'Dashboard', path: '/faculty', icon: <LayoutDashboard size={20} /> },
          { name: 'Manage CLOs', path: '/faculty/clos', icon: <Target size={20} /> },
          { name: 'CLO-PLO Mapping', path: '/faculty/mapping', icon: <FileText size={20} /> },
          { name: 'Assessments', path: '/faculty/assessments', icon: <BookOpen size={20} /> },
          { name: 'Reports', path: '/faculty/reports', icon: <FileText size={20} /> },
        ];
      case 'student':
        return [
          { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
          { name: 'My Courses', path: '/student/courses', icon: <BookOpen size={20} /> },
          { name: 'Performance', path: '/student/performance', icon: <GraduationCap size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar" style={{
      width: '250px',
      height: '100vh',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--spacing-md)'
    }}>
      <div className="sidebar-header" style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '1.2rem' }}>LOM System</h2>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{role ? role.toUpperCase() : 'GUEST'}</span>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: 'var(--spacing-sm)' }}>
              <NavLink 
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  gap: '10px'
                })}
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: 'none'
        }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
