import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import Login from './pages/Login/Login';
import './styles/global.scss';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Temporary Home component
const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome, {user?.name}!</h1>
      <p>Home page will be implemented next</p>
    </div>
  );
};

const App: React.FC = () => {
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
