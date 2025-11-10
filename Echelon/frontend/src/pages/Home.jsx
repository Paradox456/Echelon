import React, { useState } from 'react';
import { CheckCircle, Target, TrendingUp, Flame, BarChart3, LogIn } from 'lucide-react';
import SignIn from './SignIn';
import './Home.css';

export default function Home({ onNavigateToSignUp }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleBackFromSignIn = () => {
    setShowLogin(false);
  };

  if (showLogin) {
    return <SignIn onNavigateToSignUp={onNavigateToSignUp} onBack={handleBackFromSignIn} />;
  }

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
            E
          </div>
          <div>
            <h1 className="glow-pulse" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Echelon</h1>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>AI Productivity</p>
          </div>
        </div>
        <button 
          onClick={() => setShowLogin(true)}
          style={{ padding: '0.5rem 1.5rem', background: 'linear-gradient(to right, #14b8a6, #06b6d4)', border: 'none', borderRadius: '0.5rem', color: 'white', fontWeight: '500', cursor: 'pointer', boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <LogIn size={16} />
          Sign In
        </button>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 className="glow-pulse" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
              Your AI-Powered Productivity Partner
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '2rem' }}>
              Track habits, manage tasks, and achieve your goals with intelligent insights and personalized recommendations.
            </p>

          </div>

          {/* Dashboard Preview */}
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '1rem', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'white' }}>Dashboard Preview</h3>
              <span style={{ fontSize: '0.875rem', color: '#22d3ee', backgroundColor: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>Demo</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#000000', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <CheckCircle size={24} color="#22c55e" />
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'white' }}>12</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Tasks Completed</div>
              </div>

              <div style={{ backgroundColor: '#000000', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(249, 115, 22, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Flame size={24} color="#fb923c" />
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'white' }}>24</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Day Streak</div>
              </div>

              <div style={{ backgroundColor: '#000000', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(236, 72, 153, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <TrendingUp size={24} color="#ec4899" />
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'white' }}>5</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Active Goals</div>
              </div>

              <div style={{ backgroundColor: '#000000', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <BarChart3 size={24} color="#3b82f6" />
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'white' }}>89%</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Completion Rate</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#000000', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', margin: '0 0 0.75rem 0' }}>
                <Target className="glow-pulse" size={20} />
                Today's Focus
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                  Morning workout completed
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                  <div className="glow-pulse" style={{ width: '8px', height: '8px', backgroundColor: '#06b6d4', borderRadius: '50%' }}></div>
                  Review project proposal
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                  <div className="glow-pulse" style={{ width: '8px', height: '8px', backgroundColor: '#14b8a6', borderRadius: '50%' }}></div>
                  Read for 30 minutes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <CheckCircle size={40} color="#22c55e" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white', margin: '0 0 0.5rem 0' }}>Task Management</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Organize and complete tasks efficiently</p>
          </div>

          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <Flame size={40} color="#fb923c" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white', margin: '0 0 0.5rem 0' }}>Habit Tracking</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Build streaks and maintain consistency</p>
          </div>

          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <TrendingUp size={40} color="#ec4899" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white', margin: '0 0 0.5rem 0' }}>Goal Setting</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Track progress toward your objectives</p>
          </div>

          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <BarChart3 size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white', margin: '0 0 0.5rem 0' }}>Analytics</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Gain insights from your data</p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
            <div className="glow-pulse" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>10K+</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Active Users</div>
          </div>
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
            <div className="glow-pulse" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>500K+</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Tasks Completed</div>
          </div>
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#22c55e' }}>1M+</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Habits Tracked</div>
          </div>
          <div style={{ backgroundColor: '#0d1b2a', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fb923c' }}>98%</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}