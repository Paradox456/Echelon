import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.history.pushState({ page: 'home' }, '');

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
    window.history.pushState({ page: 'signup' }, '');
  };

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
    window.history.pushState({ page: 'dashboard' }, '');
  };

  const handleNavigateToTasks = () => {
    setCurrentPage('tasks');
    window.history.pushState({ page: 'tasks' }, '');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState({ page: 'home' }, '');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {currentPage === 'home' && (
        <Home 
          onNavigateToSignUp={handleNavigateToSignUp}
          onNavigateToDashboard={handleNavigateToDashboard}
          onNavigateToTasks={handleNavigateToTasks}
        />
      )}
      {currentPage === 'signup' && (
        <SignUp onNavigateToHome={handleNavigateToHome} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onNavigateToHome={handleNavigateToHome} />
      )}
      {currentPage === 'tasks' && (
        <Tasks onNavigateToHome={handleNavigateToHome} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;