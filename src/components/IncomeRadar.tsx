import React, { useState, useEffect } from 'react';
import { getIncomeForecast } from '../services/ai';
import './IncomeRadar.css';

const IncomeRadar: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d'>('30d');
  const [stream, setStream] = useState<'all' | 'freelance'>('all');
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getIncomeForecast(timeframe, stream);
      setForecast(data);
      setLoading(false);
    };
    fetchData();
  }, [timeframe, stream]);

  // Helper to render calendar days
  const renderCalendarDays = (days: number, startDay: number, type: 'oct' | 'nov') => {
    const grid = [];
    // Empty slots for start of month
    for (let i = 0; i < startDay; i++) {
      grid.push(<div key={`empty-${i}`} className="cal-day empty"></div>);
    }
    
    // Days
    for (let i = 1; i <= days; i++) {
      let status = 'stable'; // default green
      
      // Mock logic to match screenshot patterns
      if (type === 'oct') {
        if (i >= 24 && i <= 31) status = 'volatile'; // Brown/Orange
        if (i === 24) status = 'selected'; // Blue circle
      } else if (type === 'nov') {
        if (i >= 1 && i <= 5) status = 'volatile';
        if (i >= 6 && i <= 12) status = 'warning'; // Darker brown
      }

      grid.push(
        <div key={i} className={`cal-day ${status}`}>
          {i}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="radar-container">
      <div className="radar-header">
        <div>
          <h2>Income Instability Radar</h2>
          <p className="subtitle">Real-time predictions and insights into your income fluctuations.</p>
        </div>
        <div className="header-actions">
          <button 
            className={`radar-btn ${timeframe === '30d' ? 'active' : ''}`}
            onClick={() => setTimeframe(timeframe === '30d' ? '90d' : '30d')}
          >
            {timeframe === '30d' ? 'Next 30 Days' : 'Next 3 Months'} ▼
          </button>
          <button 
            className={`radar-btn ${stream === 'all' ? 'active' : ''}`}
            onClick={() => setStream(stream === 'all' ? 'freelance' : 'all')}
          >
            {stream === 'all' ? 'All Streams' : 'Freelance Only'} ▼
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="radar-stats">
        <div className="r-stat-card">
          <span className="r-label">{timeframe === '30d' ? '30-Day' : '90-Day'} Income Forecast</span>
          <div className="r-value">
            {loading ? '...' : `Rs ${forecast?.forecastAmount?.toLocaleString() || '0'}`}
          </div>
        </div>
        <div className="r-stat-card warning">
          <span className="r-label">Next Volatile Period</span>
          <div className="r-value warning-text">
            {loading ? '...' : (forecast?.volatilePeriod || 'None')}
          </div>
        </div>
        <div className="r-stat-card">
          <span className="r-label">Primary Driver</span>
          <div className="r-value" style={{ fontSize: '1.4rem' }}>
            {loading ? '...' : (forecast?.primaryDriver || 'None')}
          </div>
        </div>
      </div>

      <div className="radar-content-grid">
        {/* Left: Calendar View */}
        <div className="calendar-section card">
          <div className="calendars-row">
            {/* October */}
            <div className="month-view">
              <div className="month-header">
                <button className="nav-arrow">‹</button>
                <span>October 2024</span>
              </div>
              <div className="week-days">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="days-grid">
                {renderCalendarDays(31, 2, 'oct')}
              </div>
            </div>

            {/* November */}
            <div className="month-view">
              <div className="month-header">
                <span>November 2024</span>
                <button className="nav-arrow">›</button>
              </div>
              <div className="week-days">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="days-grid">
                {renderCalendarDays(30, 5, 'nov')}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Insights */}
        <div className="radar-sidebar">
          {/* Influencing Factors */}
          <div className="sidebar-section">
            <h3>What's Influencing Your Income?</h3>
            <div className="factor-list">
              {loading ? (
                <p style={{ color: '#94a3b8' }}>Analyzing market data...</p>
              ) : (
                forecast?.factors?.map((f: any, i: number) => (
                  <div key={i} className="factor-item">
                    <div className="factor-icon blue">{f.icon}</div>
                    <div className="factor-info">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="sidebar-section">
            <h3>AI-Powered Recommendations</h3>
            <div className="rec-list">
              {loading ? (
                <p style={{ color: '#94a3b8' }}>Generating strategies...</p>
              ) : (
                (forecast?.recommendations || []).map((rec: any, i: number) => (
                  <div key={i} className={`rec-card ${rec.type}`}>
                    <div className="rec-icon">{rec.icon}</div>
                    <div className="rec-content">
                      <h4>{rec.title}</h4>
                      <p>{rec.desc}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeRadar;
