import React, { useState, useEffect } from 'react';
import { getGeminiInsights, AIInsight } from '../services/ai';
import './DashboardOverview.css';

const DashboardOverview: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  // Mock financial data that changes based on timeframe
  const getFinancialContext = (tf: 'week' | 'month') => ({
    timeframe: tf,
    balance: 24562,
    income: tf === 'week' ? 1200 : 5400,
    spending: tf === 'week' ? 850 : 3200,
    topCategories: tf === 'week' ? ['Dining', 'Transport'] : ['Rent', 'Groceries', 'Dining'],
    recentSpike: tf === 'week' ? "Friday Night +40%" : "Weekend Travel +15%",
    riskScore: tf === 'week' ? "Low" : "Moderate"
  });

  const fetchAI = async () => {
    setLoading(true);
    const context = getFinancialContext(timeframe);
    const aiData = await getGeminiInsights(context);
    setInsights(aiData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAI();
  }, [timeframe]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Financial Behavior Genome</h2>
          <p className="subtitle">Alex's Financial Genome</p>
        </div>
        <div className="controls">
          <button 
            className={`control-btn ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            This Week
          </button>
          <button 
            className={`control-btn ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="dashboard-layout">
        {/* Left Main Content */}
        <div className="main-content">
          {/* Genome Card */}
          <div className="card genome-card">
            <div className="card-header">
              <h3>Alex's Financial Genome</h3>
              <p>Currently a <span style={{color: '#38bdf8', fontWeight: 'bold'}}>{timeframe === 'week' ? 'Impulsive Spender' : 'Cautious Opportunist'}</span> based on recent activity.</p>
            </div>
            <div className="genome-visual-container">
              <div className={`genome-art ${timeframe}`}>
                <div className="wave w1"></div>
                <div className="wave w2"></div>
                <div className="wave w3"></div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="sub-grid">
            <div className="card trigger-card">
              <h3>Your Spending Triggers</h3>
              <p>Emotional spending cues based on time and category.</p>
              <div className="mini-chart line-chart">
                {/* Dynamic SVG Chart */}
                <svg viewBox="0 0 100 50" className="chart-svg">
                  <path 
                    d={timeframe === 'week' 
                      ? "M0,40 Q25,10 50,30 T100,20" 
                      : "M0,30 Q25,40 50,20 T100,35"} 
                    fill="none" 
                    stroke="#f472b6" 
                    strokeWidth="2" 
                  />
                  <circle cx="50" cy={timeframe === 'week' ? "30" : "20"} r="3" fill="#38bdf8" />
                </svg>
                <div className="chart-label">
                  {timeframe === 'week' ? 'High stress detected on Tuesday' : 'Weekend social spikes detected'}
                </div>
              </div>
            </div>
            <div className="card risk-card">
              <h3>Risk Profile</h3>
              <p>Tolerance based on savings and spending volatility.</p>
              <div className="mini-chart radar-chart">
                 {/* Simple CSS Radar/Gauge representation */}
                 <div className="risk-gauge">
                    <div className="gauge-bg"></div>
                    <div 
                      className="gauge-fill" 
                      style={{ 
                        width: timeframe === 'week' ? '30%' : '65%',
                        background: timeframe === 'week' ? '#34d399' : '#facc15'
                      }}
                    ></div>
                 </div>
                 <div className="risk-label">
                    {timeframe === 'week' ? 'Conservative (Low Risk)' : 'Moderate (Growth Focus)'}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right AI Sidebar */}
        <div className="ai-sidebar">
          <div className="ai-header">
            <span className="ai-icon">✨</span>
            <h3>AI Coach</h3>
            <button className="refresh-btn" onClick={fetchAI} disabled={loading}>↻</button>
          </div>
          
          <div className="ai-cards-container">
            {loading ? (
              <div className="ai-loading">
                <div className="pulse"></div>
                <p>Analyzing financial DNA...</p>
              </div>
            ) : (
              insights.map((insight, index) => (
                <div key={index} className={`ai-card ${insight.type}`}>
                  <h4>{insight.title}</h4>
                  <p>{insight.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
