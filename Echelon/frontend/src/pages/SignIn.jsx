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

          {/* Social Login Buttons */}
          <div className="social-login-group">
            {/* Google Button */}
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

            {/* Discord Button */}
            <button
              type="button"
              onClick={() => console.log('Discord login')}
              className="social-button discord-button"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3671C18.7975 3.6559 17.147 3.27191 15.4545 3.09991C15.4294 3.09651 15.4043 3.10347 15.3926 3.12026C15.2282 3.41033 15.0352 3.82814 14.9069 4.12658C13.1253 3.84737 11.3626 3.84737 9.61885 4.12658C9.49055 3.82031 9.2918 3.41033 9.12733 3.12026C9.11564 3.1028 9.09055 3.09584 9.06545 3.09991C7.37282 3.27191 5.722 3.66564 4.20273 4.3671C4.19101 4.3719 4.18929 4.3841 4.19547 4.39494C2.61071 6.76711 2.17854 9.06174 2.3635 11.3127C2.36464 11.3287 2.37564 11.3429 2.38823 11.3472C3.99062 12.6751 5.56233 13.4157 7.10882 13.8575C7.12588 13.8627 7.14496 13.8573 7.15408 13.8423C7.55101 13.265 7.89915 12.6565 8.18578 12.0157C8.20074 11.9851 8.18982 11.9565 8.16385 11.9512C7.79035 11.8655 7.43625 11.7524 7.09353 11.6085C7.06692 11.5968 7.06692 11.5635 7.09004 11.5518C7.15399 11.5156 7.2181 11.4776 7.28221 11.4395C7.29283 11.4339 7.30471 11.4339 7.31532 11.4395C9.60547 12.5651 12.1498 12.5651 14.425 11.4395C14.4357 11.4339 14.4476 11.4339 14.4582 11.4395C14.5224 11.4776 14.5865 11.5156 14.6504 11.5518C14.6769 11.5635 14.6769 11.5968 14.6503 11.6085C14.3076 11.7555 13.954 11.8686 13.5804 11.9512C13.5545 11.9565 13.5436 11.9851 13.5585 12.0157C13.8451 12.6565 14.1932 13.265 14.5902 13.8423C14.5993 13.8573 14.6184 13.8627 14.6355 13.8575C16.1909 13.4157 17.7626 12.6751 19.365 11.3472C19.3776 11.3429 19.3886 11.3297 19.3898 11.3127C19.5923 8.64936 19.0211 6.40951 17.5853 4.39494C17.5795 4.3841 17.5778 4.3719 17.5895 4.3671Z"/>
              </svg>
              Log In With Discord
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={() => console.log('Apple login')}
              className="social-button apple-button"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.61-2.53 3.44l-.87.5z"/>
              </svg>
              Log In With Apple
            </button>
          </div>

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