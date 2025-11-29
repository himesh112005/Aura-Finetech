import React, { useState, useEffect } from 'react';
import { generateContent } from '../services/geminiService';
import './SimulateFutures.css';

const SimulateFutures: React.FC = () => {
  const [savings, setSavings] = useState(10000);
  const [sideHustle, setSideHustle] = useState(5000);
  const [debtRepayment, setDebtRepayment] = useState(6000);
  const [selectedScenario, setSelectedScenario] = useState('Current Path');
  const [projectedValue, setProjectedValue] = useState(10000000);
  
  // AI State
  const [aiInsight, setAiInsight] = useState("Increasing your monthly savings by just ₹2,000 could lead to retiring 2 years earlier in the 'Optimistic' future.");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Simple simulation logic
  useEffect(() => {
    const base = 1000000; // Starting amount
    const monthlyContribution = savings + sideHustle - (debtRepayment * 0.5); // Simplified net positive
    const years = 30;
    let rate = 0.07; // Default 7%

    if (selectedScenario === 'Optimistic') rate = 0.10;
    if (selectedScenario === 'Steady Growth') rate = 0.05;
    if (selectedScenario === 'Aggressive Investor') rate = 0.12;
    if (selectedScenario === 'Chaotic') rate = 0.03;

    // Future Value formula: FV = P * ((1 + r)^n - 1) / r
    // Simplified for monthly contributions over years
    const months = years * 12;
    const monthlyRate = rate / 12;
    
    const futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) + (base * Math.pow(1 + rate, years));
    
    setProjectedValue(Math.round(futureValue));
  }, [savings, sideHustle, debtRepayment, selectedScenario]);

  const getAiInsight = async () => {
    setIsAiLoading(true);
    const prompt = `I am simulating my financial future. 
    My monthly savings: ₹${savings}. 
    Side hustle income: ₹${sideHustle}. 
    Debt repayment: ₹${debtRepayment}. 
    Selected Scenario: ${selectedScenario}.
    
    Provide a single, short, impactful sentence (max 25 words) giving a specific tip or observation about how I can improve my net worth based on these numbers.`;

    const response = await generateContent(prompt);
    setAiInsight(response);
    setIsAiLoading(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short"
    }).format(val);
  };

  const scenarios = [
    'Current Path',
    'Optimistic',
    'Steady Growth',
    'Aggressive Investor',
    'Chaotic'
  ];

  // Generate simple chart data points
  const generateChartPoints = () => {
    const points = [];
    const width = 100;
    for (let i = 0; i <= 6; i++) {
      const x = (i / 6) * width;
      // Create a curve based on the projected value relative to a max scale
      const progress = i / 6;
      const curve = Math.pow(progress, 2); // Exponential growth curve
      const y = 100 - (curve * 80 + 10); // Invert Y for SVG (0 is top)
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h2>Simulate Your Financial Journey</h2>
        <p>See how small tweaks in your financial behavior can significantly rewrite your financial destiny.</p>
      </div>

      <div className="sim-grid">
        {/* Left Column: Chart */}
        <div className="sim-card chart-card">
          <div className="chart-header">
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Projected Net Worth Over 30 Years</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38bdf8' }}>
              {formatCurrency(projectedValue)}
            </div>
            <div style={{ color: '#10b981', fontSize: '0.9rem' }}>
              {selectedScenario} {projectedValue > 10000000 ? '+High Growth' : '+Steady'}
            </div>
          </div>

          {/* Simple SVG Chart */}
          <div className="chart-visual">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="main-chart">
              {/* Background Grid Lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              
              {/* The Line */}
              <polyline
                points={generateChartPoints()}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Area under curve (optional gradient effect simulated) */}
              <polygon
                points={`0,100 ${generateChartPoints()} 100,100`}
                fill="rgba(56, 189, 248, 0.1)"
              />
            </svg>
            
            {/* X-Axis Labels */}
            <div className="x-axis-labels">
              <span>Today</span>
              <span>5 Yrs</span>
              <span>10 Yrs</span>
              <span>15 Yrs</span>
              <span>20 Yrs</span>
              <span>25 Yrs</span>
              <span>30 Yrs</span>
            </div>
          </div>

          {/* Scenarios */}
          <div className="scenarios-list">
            <h4>Financial Scenarios</h4>
            <div className="scenario-chips">
              {scenarios.map(scenario => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`chip ${selectedScenario === scenario ? 'active' : ''}`}
                >
                  {scenario}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="sim-sidebar">
          <div className="sim-card controls-card">
            <h3>Adjust Your Habits</h3>
            <p className="card-desc">Modify your financial variables to see their real-time impact on your future.</p>
            
            <div className="control-group">
              {/* Slider 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label>Monthly Savings</label>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>₹{savings}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="1000" 
                  value={savings} 
                  onChange={(e) => setSavings(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8' }}
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label>Side Hustle Income</label>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>₹{sideHustle}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000" 
                  value={sideHustle} 
                  onChange={(e) => setSideHustle(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }}
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label>Debt Repayment</label>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>₹{debtRepayment}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000" 
                  value={debtRepayment} 
                  onChange={(e) => setDebtRepayment(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ef4444' }}
                />
              </div>
            </div>
          </div>

          {/* AI Insight Card */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(30, 41, 59, 0.5) 100%)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(56, 189, 248, 0.3)' 
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>💡</div>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, color: '#38bdf8' }}>AI-Powered Insight</h4>
                  <button 
                    onClick={getAiInsight}
                    disabled={isAiLoading}
                    style={{
                      background: 'transparent',
                      border: '1px solid #38bdf8',
                      color: '#38bdf8',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isAiLoading ? 'Analyzing...' : 'Refresh'}
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: '#cbd5e1', minHeight: '40px' }}>
                  {aiInsight}
                </p>
                <button 
                  onClick={() => {
                    setSavings(prev => prev + 2000);
                    setSelectedScenario('Optimistic');
                  }}
                  style={{
                    marginTop: '1rem',
                    backgroundColor: '#38bdf8',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    fontWeight: 'medium',
                    transition: 'background-color 0.3s'
                  }}
                >
                  Set 'Optimistic' as a Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulateFutures;
