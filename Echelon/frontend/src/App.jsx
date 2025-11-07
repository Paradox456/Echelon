import { useState } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && (
        <Home onNavigateToSignUp={() => setCurrentPage('signup')} />
      )}
      {currentPage === 'signup' && (
        <SignUp onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </>
  );
}

export default App;