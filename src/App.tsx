import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { useAuthSync } from './hooks/useAuthSync';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login/Login';
import Button from './components/common/Button/Button';

import './styles/global.scss';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Temporary Home component
const Home: React.FC = () => {

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  };

  const { user } = useAppSelector((state) => state.auth);
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome, {user?.name}!</h1>
      {user?.picture && <img src={user.picture} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />}
      <p>Email: {user?.email}</p>
      <p>Login Type: {user?.loginType}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

const App: React.FC = () => {
  useAuthSync()
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
