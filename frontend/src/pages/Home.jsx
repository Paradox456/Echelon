import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Target, TrendingUp, Flame, BarChart3, LogIn, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import SignIn from './SignIn';
import './Home.css';
import axios from 'axios';
import Dashboard from './Dashboard';
import Tasks from './Tasks';

export default function Home({ onNavigateToSignUp, onNavigateToDashboard, onNavigateToTasks }) {
  const [showLogin, setShowLogin] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! I'm Echo, your productivity buddy! 👋 How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleBackFromSignIn = () => {
    setShowLogin(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    }
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are Echo, a helpful productivity assistant. Give clear, concise, and actionable productivity advice." },
            ...messages.map(m => ({
              role: m.sender === 'bot' ? 'assistant' : 'user',
              content: m.text
            })),
            { role: 'user', content: userMessage.text }
          ],
          max_tokens: 200,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const botText = response.data.choices[0].message.content.trim();
      const botMessage = { id: messages.length + 2, text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: messages.length + 2, text: "Sorry, something went wrong 🤖", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showLogin) {
    return <SignIn onNavigateToSignUp={onNavigateToSignUp} onBack={handleBackFromSignIn} />;
  }

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 2rem', 
        borderBottom: '1px solid #1a1a1a',
        position: 'relative'
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
            E
          </div>
          <div>
            <h1 className="glow-pulse" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Echelon</h1>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>AI Productivity</p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1.5rem'
        }}>
          {['Dashboard', 'Tasks', 'Habits', 'Analytics'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'Dashboard') onNavigateToDashboard();
                if (item === 'Tasks') onNavigateToTasks();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#cbd5e1',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: Sign In */}
        <button 
          onClick={() => setShowLogin(true)}
          style={{ 
            padding: '0.5rem 1.5rem', 
            background: 'linear-gradient(to right, #14b8a6, #06b6d4)', 
            border: 'none', 
            borderRadius: '0.5rem', 
            color: 'white', 
            fontWeight: '500', 
            cursor: 'pointer', 
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem' 
          }}
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

      {/* Pricing Section */}
      <div style={{ maxWidth: '1280px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 className="glow-pulse" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          Choose Your Plan
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Free Plan */}
          <div
            style={{
              backgroundColor: '#0d1b2a',
              border: '1px solid #1e293b',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Free</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#22d3ee', fontWeight: '500' }}>$0 / month</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: '#94a3b8', textAlign: 'left' }}>
              <li>✅ Basic Task Management</li>
              <li>✅ Habit Tracking</li>
            </ul>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div
            style={{
              backgroundColor: '#0d1b2a',
              border: '2px solid #06b6d4',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)',
            }}
            className="glow-pulse"
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Pro</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#22d3ee', fontWeight: '500' }}>$14.99 / month</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: '#94a3b8', textAlign: 'left' }}>
              <li>✅ All Free Plan Features</li>
              <li>✅ AI Insights & Recommendations</li>
              <li>✅ Advanced Analytics & Reports</li>
            </ul>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(to right, #06b6d4, #14b8a6)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.6)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Subscribe
            </button>
          </div>

          {/* Enterprise Plan */}
          <div
            style={{
              backgroundColor: '#0d1b2a',
              border: '1px solid #1e293b',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Enterprise</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#22d3ee', fontWeight: '500' }}>Contact Us</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: '#94a3b8', textAlign: 'left' }}>
              <li>✅ All Pro Features</li>
              <li>✅ Team Collaboration Tools</li>
              <li>✅ Dedicated Support</li>
            </ul>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* GEICO-Style Chatbot Container */}
      <div className={`geico-chat-container ${chatOpen ? 'open' : ''} ${chatMinimized ? 'minimized' : ''}`}>
        {/* Chat Header with Echo Mascot */}
        <div className="geico-chat-header">
          <div className="chat-header-content">
            <h3>Need help? Chat with Echo! 👋</h3>
            <div className="chat-header-controls">
              <button className="chat-control-btn" onClick={() => setChatMinimized(!chatMinimized)}>
                {chatMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button className="chat-control-btn" onClick={() => setChatOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        {!chatMinimized && (
          <>
            <div className="geico-chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`geico-message ${message.sender}`}>
                  {message.sender === 'bot' && <div className="message-avatar">🤖</div>}
                  <div className="geico-message-bubble">
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="geico-message bot">
                  <div className="message-avatar">🤖</div>
                  <div className="geico-message-bubble typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="geico-chat-input-area">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="geico-chat-input"
              />
              <button
                className="geico-send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* GEICO-Style Floating Mascot Button */}
      {!chatOpen && (
        <div className="mascot-container" onClick={() => setChatOpen(true)}>
          <svg viewBox="0 0 200 200" className="mascot-svg">
            {/* Head */}
            <circle cx="100" cy="80" r="45" fill="#14b8a6" stroke="#06b6d4" strokeWidth="2"/>
            
            {/* Eyes - Big and friendly */}
            <circle cx="85" cy="70" r="10" fill="#ffffff"/>
            <circle cx="115" cy="70" r="10" fill="#ffffff"/>
            <circle cx="85" cy="70" r="6" fill="#000000" className="mascot-eye"/>
            <circle cx="115" cy="70" r="6" fill="#000000" className="mascot-eye"/>
            
            {/* Eyebrows */}
            <path d="M 75 55 Q 85 50 95 55" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 105 55 Q 115 50 125 55" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round"/>
            
            {/* Big Smile */}
            <path d="M 80 95 Q 100 115 120 95" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Body */}
            <circle cx="100" cy="150" r="40" fill="#06b6d4" stroke="#14b8a6" strokeWidth="2"/>
            
            {/* Arms */}
            <circle cx="50" cy="140" r="15" fill="#14b8a6" stroke="#06b6d4" strokeWidth="2"/>
            <circle cx="150" cy="140" r="15" fill="#14b8a6" stroke="#06b6d4" strokeWidth="2"/>
          </svg>
          <div className="mascot-label">Chat Now!</div>
        </div>
      )}
    </div>
  );
}