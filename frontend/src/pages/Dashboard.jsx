import React, { useState } from 'react';
import { CheckCircle, Target, TrendingUp, Flame, BarChart3, Plus, Brain, BarChart4, LogOut, Menu, X } from 'lucide-react';

export default function Dashboard({ onNavigateToHome }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  // Weekly data for the chart
  const weeklyData = [
    { day: 'Mon', tasks: 2, habits: 1, height: 50, x: 110 },
    { day: 'Tue', tasks: 3, habits: 2, height: 70, x: 190 },
    { day: 'Wed', tasks: 4, habits: 3, height: 90, x: 270 },
    { day: 'Thu', tasks: 0, habits: 0, height: 170, x: 350 },
    { day: 'Fri', tasks: 2, habits: 1, height: 50, x: 430 },
    { day: 'Sat', tasks: 1, habits: 1, height: 40, x: 510 },
    { day: 'Sun', tasks: 1, habits: 0, height: 30, x: 590 }
  ];

  // Mock data
  const userStats = {
    completedToday: 0,
    activeTasks: 4,
    activeGoals: 3,
    totalStreak: 17,
    tasks: [],
    habits: [
      { id: 1, name: 'Morning Exercise', emoji: '💪', streak: 7, frequency: 'daily' },
      { id: 2, name: 'Meditation', emoji: '🧘', streak: 5, frequency: 'daily' },
      { id: 3, name: 'Read for 30 minutes', emoji: '📚', streak: 3, frequency: 'daily' },
      { id: 4, name: '8 glasses of water', emoji: '💧', streak: 2, frequency: 'daily' }
    ]
  };

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const handleBarHover = (day) => {
    setHoveredDay(day);
  };

  const handleBarLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #1e293b',
        backgroundColor: '#0d1b2a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
            }}>
              E
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Echelon</h1>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>AI Productivity</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onNavigateToHome}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#ffffff',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 25px rgba(6, 182, 212, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
          }}
        >
          <LogOut size={18} />
          Home
        </button>
      </nav>

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: '64px',
        zIndex: 40,
        height: 'calc(100vh - 64px)',
        width: '250px',
        borderRight: '1px solid #1e293b',
        backgroundColor: '#0d1b2a',
        padding: '1rem',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s',
        display: 'none'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#06b6d4',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            transition: 'all 0.2s'
          }}>
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#94a3b8',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}>
            <CheckCircle size={20} />
            <span>Tasks</span>
          </a>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#94a3b8',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}>
            <Flame size={20} />
            <span>Habits</span>
          </a>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#94a3b8',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}>
            <TrendingUp size={20} />
            <span>Analytics</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #06b6d4, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to Echelon ✨
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>{dayName}</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#06b6d4';
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
            e.currentTarget.style.backgroundColor = '#1a2332';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              flexShrink: 0
            }}>
              <CheckCircle size={32} color="#22c55e" />
            </div>
            <div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff' }}>{userStats.completedToday}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Completed Today</div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#06b6d4';
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
            e.currentTarget.style.backgroundColor = '#1a2332';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              flexShrink: 0
            }}>
              <Target size={32} color="#3b82f6" />
            </div>
            <div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff' }}>{userStats.activeTasks}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Active Tasks</div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#06b6d4';
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
            e.currentTarget.style.backgroundColor = '#1a2332';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(236, 72, 153, 0.15)',
              flexShrink: 0
            }}>
              <TrendingUp size={32} color="#ec4899" />
            </div>
            <div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff' }}>{userStats.activeGoals}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Active Goals</div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#06b6d4';
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
            e.currentTarget.style.backgroundColor = '#1a2332';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(249, 115, 22, 0.15)',
              flexShrink: 0
            }}>
              <Flame size={32} color="#fb923c" />
            </div>
            <div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff' }}>{userStats.totalStreak}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Total Streak</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Today's Focus Section */}
          <section style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '1rem',
            padding: '1.75rem',
            gridColumn: '1 / 2',
            gridRow: '1 / 3',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0
              }}>
                <span style={{ marginRight: '0.75rem' }}>⏰</span>Today's Focus
              </h3>
              <a href="#" style={{
                background: 'none',
                border: 'none',
                color: '#06b6d4',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>View All</a>
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                border: '3px solid #22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#22c55e'
              }}>
                ✓
              </div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>All caught up!</h4>
              <p style={{ color: '#94a3b8', margin: 0 }}>No tasks due today</p>
              <button style={{
                padding: '0.75rem 1.75rem',
                background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                border: 'none',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <Plus size={20} />
                Add Task
              </button>
            </div>
          </section>

          {/* Habit Streaks Section */}
          <section style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '1rem',
            padding: '1.75rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Flame size={20} color="#fb923c" /> Habit Streaks
              </h3>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#06b6d4',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem'
              }}>
                <Plus size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userStats.habits.map(habit => (
                <div key={habit.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid #1e293b',
                  borderRadius: '0.75rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1e293b';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{habit.emoji}</span>
                    <div>
                      <div style={{ fontWeight: '500', color: '#ffffff' }}>{habit.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{habit.frequency}</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#fb923c',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    <Flame size={16} />
                    <span>{habit.streak}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Progress Chart */}
          <section style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '1rem',
            padding: '1.75rem'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <TrendingUp size={20} color="#a855f7" /> Weekly Progress
              </h3>
            </div>
            <div style={{ width: '100%' }}>
              <svg viewBox="0 0 700 300" style={{ height: 'auto', width: '100%' }}>
                {/* Grid Lines */}
                <line x1="80" y1="50" x2="80" y2="250" stroke="#1e293b" strokeWidth="2" />
                <line x1="80" y1="250" x2="680" y2="250" stroke="#1e293b" strokeWidth="2" />
                
                {/* Grid Background */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={`h-${i}`} x1="80" y1={50 + i * 50} x2="680" y2={50 + i * 50} stroke="#1e293b" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <line key={`v-${i}`} x1={80 + i * 100} y1="50" x2={80 + i * 100} y2="250" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                ))}

                {/* Y Axis Labels */}
                {[0, 1, 2, 3, 4].map(i => (
                  <text key={`label-${i}`} x="60" y={260 - i * 50} fontSize="14" fill="#94a3b8" textAnchor="end">
                    {i}
                  </text>
                ))}

                {/* Interactive Bars */}
                {weeklyData.map((data) => (
                  <g key={data.day} onMouseEnter={() => handleBarHover(data.day)} onMouseLeave={handleBarLeave} style={{ cursor: 'pointer' }}>
                    <rect 
                      x={data.x} 
                      y={250 - data.height} 
                      width="50" 
                      height={data.height} 
                      fill={hoveredDay === data.day ? '#06b6d4' : '#1e293b'} 
                      rx="4"
                      style={{ transition: 'all 0.2s ease' }}
                    />
                  </g>
                ))}

                {/* X Axis Labels */}
                {weeklyData.map((data) => (
                  <text 
                    key={`label-${data.day}`} 
                    x={data.x + 25} 
                    y="280" 
                    fontSize="14" 
                    fill={hoveredDay === data.day ? '#06b6d4' : '#94a3b8'} 
                    textAnchor="middle"
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    {data.day}
                  </text>
                ))}

                {/* Dynamic Tooltip */}
                {hoveredDay && weeklyData.find(d => d.day === hoveredDay) && (
                  <g style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}>
                    {weeklyData.find(d => d.day === hoveredDay).x < 350 ? (
                      <>
                        <rect x={weeklyData.find(d => d.day === hoveredDay).x - 20} y="40" width="140" height="90" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="8" />
                        <text x={weeklyData.find(d => d.day === hoveredDay).x + 50} y="65" fontSize="15" fill="#cbd5e1" textAnchor="middle" fontWeight="600">{hoveredDay}</text>
                        <text x={weeklyData.find(d => d.day === hoveredDay).x + 50} y="85" fontSize="13" fill="#06b6d4" textAnchor="middle">
                          tasks : {weeklyData.find(d => d.day === hoveredDay).tasks}
                        </text>
                        <text x={weeklyData.find(d => d.day === hoveredDay).x + 50} y="105" fontSize="13" fill="#a855f7" textAnchor="middle">
                          habits : {weeklyData.find(d => d.day === hoveredDay).habits}
                        </text>
                      </>
                    ) : (
                      <>
                        <rect x={weeklyData.find(d => d.day === hoveredDay).x - 110} y="40" width="140" height="90" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="8" />
                        <text x={weeklyData.find(d => d.day === hoveredDay).x - 40} y="65" fontSize="15" fill="#cbd5e1" textAnchor="middle" fontWeight="600">{hoveredDay}</text>
                        <text x={weeklyData.find(d => d.day === hoveredDay).x - 40} y="85" fontSize="13" fill="#06b6d4" textAnchor="middle">
                          tasks : {weeklyData.find(d => d.day === hoveredDay).tasks}
                        </text>
                        <text x={weeklyData.find(d => d.day === hoveredDay).x - 40} y="105" fontSize="13" fill="#a855f7" textAnchor="middle">
                          habits : {weeklyData.find(d => d.day === hoveredDay).habits}
                        </text>
                      </>
                    )}
                  </g>
                )}
              </svg>
            </div>
          </section>

          {/* Quick Actions */}
          <section style={{
            backgroundColor: '#1a2332',
            border: '1px solid #1e293b',
            borderRadius: '1rem',
            padding: '1.75rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>Quick Actions</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e293b',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  height: '48px',
                  width: '48px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)'
                }}>
                  <Plus size={24} color="#3b82f6" />
                </div>
                <span>New Task</span>
              </button>

              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e293b',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  height: '48px',
                  width: '48px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(168, 85, 247, 0.2)'
                }}>
                  <Target size={24} color="#a855f7" />
                </div>
                <span>Track Habit</span>
              </button>

              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e293b',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ec4899';
                e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  height: '48px',
                  width: '48px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(236, 72, 153, 0.2)'
                }}>
                  <Brain size={24} color="#ec4899" />
                </div>
                <span>AI Assistant</span>
              </button>

              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e293b',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fb923c';
                e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  height: '48px',
                  width: '48px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(249, 115, 22, 0.2)'
                }}>
                  <BarChart4 size={24} color="#fb923c" />
                </div>
                <span>View Analytics</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}