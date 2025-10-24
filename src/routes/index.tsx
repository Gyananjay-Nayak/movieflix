import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import MoviesCategory from '../pages/MoviesCategory/MoviesCategory';
import Favorites from '../pages/Favorites/Favorites';
import SearchResults from '../pages/SearchResults/SearchResults';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
       <Home/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/movies/:category',
    element: (
      <ProtectedRoute>
       <MoviesCategory/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
       <Favorites/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: (
      <ProtectedRoute>
       <SearchResults/>
      </ProtectedRoute>
    ),
  },
];
