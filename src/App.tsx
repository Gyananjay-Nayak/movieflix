import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { useAuthSync } from './hooks/useAuthSync';
import { routes } from './routes';
import './styles/global.scss';


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
