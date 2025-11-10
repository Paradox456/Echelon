import React from 'react';
import './SignIn.css';

export default function SignIn({ onNavigateToSignUp, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // Redirect back to home after login
    onBack();
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
        {/* Logo and Brand */}
        <div className="signin-header">
          <div className="signin-logo">E</div>
          <div>
            <h1 className="signin-brand glow-pulse">Echelon</h1>
            <p className="signin-tagline">AI Productivity</p>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="signin-form-container">
          <h2 className="signin-title">Sign In</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="signin-footer-links">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="forgot-password glow-pulse">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="signin-divider">
            <span>or</span>
          </div>

          {/* Social Login Button */}
          <button
            type="button"
            onClick={() => console.log('Google login')}
            className="social-button google-button"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log In With Google
          </button>

          {/* Sign Up Link */}
          <div className="signin-signup-section">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleGoToSignUp}
              className="signup-link glow-pulse"
            >
              Sign up
            </button>
          </div>

          {/* Back to Home Button */}
          <button
            type="button"
            onClick={onBack}
            className="back-button"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}


