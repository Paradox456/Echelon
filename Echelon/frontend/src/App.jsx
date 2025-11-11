import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle browser back button
  useEffect(() => {
    // Push initial state
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

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState({ page: 'home' }, '');
  };

  return (
    <>
      {currentPage === 'home' && (
        <Home onNavigateToSignUp={handleNavigateToSignUp} />
      )}
      {currentPage === 'signup' && (
        <SignUp onNavigateToHome={handleNavigateToHome} />
      )}
    </>
  );
}

export default App;
