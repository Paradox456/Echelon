import React, { useState } from 'react';
import './SignUp.css';

export default function SignUp({ onNavigateToHome }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation: min 8 chars, at least 1 uppercase, 1 number
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter and one number');
      return;
    }

    console.log('Account created successfully:', { fullName, email, password });
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  const handleBack = () => {
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  return (
    <div className="signup-container" style={{ minHeight: '100vh', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '550px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
            E
          </div>
          <div>
            <h1 className="glow-pulse" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Echelon</h1>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>AI Productivity</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '1rem', padding: '2rem' }}>
          {/* Error Message */}
          {error && (
            <div style={{ backgroundColor: '#3a1e1e', border: '1px solid #ef4444', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#fca5a5', margin: 0, fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#ffffff', marginBottom: '0.5rem' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#000000', border: '1px solid #334155', borderRadius: '0.5rem', color: 'white', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#ffffff', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#000000', border: '1px solid #334155', borderRadius: '0.5rem', color: 'white', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#ffffff', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#000000', border: '1px solid #334155', borderRadius: '0.5rem', color: 'white', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
              }}
            >
              Create Account
            </button>
          </form>

          {/* Back to home Button */}
          <button
            onClick={handleBack}
            style={{ width: '100%', padding: '0.5rem', background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer' }}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
