import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { useAuthSync } from './hooks/useAuthSync';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login/Login';
import Button from './components/common/Button/Button';
import { routes } from './routes';
import './styles/global.scss';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

  const AppRoutes = () => {
  return useRoutes(routes);
};

const App: React.FC = () => {
  useAuthSync()
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
};

export default App;
