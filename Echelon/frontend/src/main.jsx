import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Add this import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* Render App instead of Dashboard */}
  </React.StrictMode>
);


