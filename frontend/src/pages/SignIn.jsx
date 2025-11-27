import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './SignIn.css';

export default function SignIn({ onNavigateToSignUp, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    console.log('Form submitted:', { email, password });
    onBack(); // Redirect after successful login
  };

  const handleGoToSignUp = () => {
    onBack();
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    }
  };


  return (
    <div className="signin-container">
      <div className="signin-card-wrapper">
        {/* Header */}
        <div className="signin-header">
          <div className="signin-logo">E</div>
          <div>
            <h1 className="signin-brand glow-pulse">Echelon</h1>
            <p className="signin-tagline">AI Productivity</p>
          </div>
        </div>

        {/* Form */}
        <div className="signin-form-container">
          <h2 className="signin-title">Sign In</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signin-footer-links">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="forgot-password glow-pulse">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>

          <div className="signin-divider">
            <span>or</span>
          </div>

          {/* Social Buttons */}
          <div className="social-login-group">
            <button type="button" onClick={() => console.log('Google login')} className="social-button google-button">
              Log In With Google
            </button>
            <button type="button" onClick={() => console.log('Discord login')} className="social-button discord-button">
              Log In With Discord
            </button>
            <button type="button" onClick={() => console.log('Apple login')} className="social-button apple-button">
              Log In With Apple
            </button>
          </div>

          <div className="signin-signup-section">
            Don't have an account?{' '}
            <button type="button" onClick={handleGoToSignUp} className="signup-link glow-pulse">
              Sign up
            </button>
          </div>

          <button type="button" onClick={onBack} className="back-button">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
