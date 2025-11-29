import React, { useState, useEffect } from 'react';
import './FinancialReports.css';

const FinancialReports: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // Mock data based on timeframe
  const getData = (tf: string) => {
    if (tf === 'monthly') {
      return {
        netWorth: 3500000,
        netWorthChange: 5.2,
        savingsRate: 22,
        savingsChange: 2,
        dti: 15,
        dtiChange: -1,
        creditScore: 785,
        creditChange: 0,
        chartData: [65, 70, 60, 85, 75, 90],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      };
    } else if (tf === 'quarterly') {
      return {
        netWorth: 3650000,
        netWorthChange: 8.5,
        savingsRate: 25,
        savingsChange: 5,
        dti: 14,
        dtiChange: -2,
        creditScore: 790,
        creditChange: 5,
        chartData: [75, 80, 85, 82],
        labels: ['Q1', 'Q2', 'Q3', 'Q4']
      };
    } else {
      return {
        netWorth: 4200000,
        netWorthChange: 12.4,
        savingsRate: 28,
        savingsChange: 8,
        dti: 12,
        dtiChange: -4,
        creditScore: 805,
        creditChange: 20,
        chartData: [60, 65, 70, 75, 80],
        labels: ['2020', '2021', '2022', '2023', '2024']
      };
    }
  };

  const data = getData(timeframe);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      // Simulate AI analysis fetch or use real service if needed for specific report analysis
      // For now, we'll use a timeout to simulate loading new insights
      setTimeout(() => {
        setAiAnalysis({
          health: timeframe === 'monthly' ? 'Excellent' : 'Strong Growth',
          summary: timeframe === 'monthly' 
            ? 'Your financial health is trending upwards. Your savings rate of 22% is above the recommended 20%.'
            : 'Consistent growth observed over the selected period. Debt reduction strategies are paying off.',
          trend: timeframe === 'monthly'
            ? 'Expenses dropped by 8% in "Entertainment" compared to last month.'
            : 'Investment portfolio has outperformed market average by 3%.',
          alert: timeframe === 'monthly'
            ? 'Utility bills are 12% higher than average for this season.'
            : 'Inflation impact noticeable in grocery spending, up 5% year-over-year.'
        });
        setLoading(false);
      }, 800);
    };
    fetchAnalysis();
  }, [timeframe]);

  const handleExport = () => {
    // Temporarily set document title for better PDF filename
    const originalTitle = document.title;
    document.title = `AURA_Financial_Report_${timeframe}_${new Date().toISOString().split('T')[0]}`;
    
    // Trigger browser print dialog (User selects "Save as PDF")
    window.print();
    
    // Restore title
    document.title = originalTitle;
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <div>
          <h2>Detailed Financial Reports</h2>
          <p className="subtitle">Deep dive into your financial health metrics.</p>
        </div>
        <div className="report-controls">
          <button 
            className={`report-btn ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`report-btn ${timeframe === 'quarterly' ? 'active' : ''}`}
            onClick={() => setTimeframe('quarterly')}
          >
            Quarterly
          </button>
          <button 
            className={`report-btn ${timeframe === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeframe('yearly')}
          >
            Yearly
          </button>
          <button className="btn-export" onClick={handleExport}>📥 Export PDF</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Net Worth</span>
          <div className="metric-val">Rs {data.netWorth.toLocaleString()}</div>
          <span className={`metric-trend ${data.netWorthChange >= 0 ? 'up' : 'down'}`}>
            {data.netWorthChange >= 0 ? '↑' : '↓'} {Math.abs(data.netWorthChange)}%
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Savings Rate</span>
          <div className="metric-val">{data.savingsRate}%</div>
          <span className={`metric-trend ${data.savingsChange >= 0 ? 'up' : 'down'}`}>
            {data.savingsChange >= 0 ? '↑' : '↓'} {Math.abs(data.savingsChange)}%
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Debt-to-Income</span>
          <div className="metric-val">{data.dti}%</div>
          <span className={`metric-trend ${data.dtiChange <= 0 ? 'up' : 'down'}`}>
            {data.dtiChange > 0 ? '↑' : '↓'} {Math.abs(data.dtiChange)}% (Good)
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Credit Score</span>
          <div className="metric-val">{data.creditScore}</div>
          <span className={`metric-trend ${data.creditChange === 0 ? 'flat' : data.creditChange > 0 ? 'up' : 'down'}`}>
            {data.creditChange === 0 ? '− No Change' : `${data.creditChange > 0 ? '↑' : '↓'} ${Math.abs(data.creditChange)} pts`}
          </span>
        </div>
      </div>

      <div className="reports-content">
        {/* Main Chart Area */}
        <div className="chart-section-large">
          <div className="chart-header">
            <h3>Income vs Expenses</h3>
            <div className="legend">
              <span className="dot income"></span> Income
              <span className="dot expense"></span> Expenses
            </div>
          </div>
          <div className="chart-visual-placeholder">
            {/* Simulated Bar Chart */}
            <div className="bar-chart-container">
              {data.chartData.map((h, i) => (
                <div key={i} className="chart-column">
                  <div className="bar-income" style={{ height: `${h}%` }}></div>
                  <div className="bar-expense" style={{ height: `${h * 0.7}%` }}></div>
                  <span className="col-label">{data.labels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Analysis Sidebar */}
        <div className="analysis-sidebar">
          <div className="ai-summary-card">
            <div className="ai-badge">🤖 AI Analysis</div>
            {loading ? (
              <p style={{ color: '#94a3b8' }}>Analyzing data...</p>
            ) : (
              <>
                <h3>Health Check: {aiAnalysis?.health}</h3>
                <p>{aiAnalysis?.summary}</p>
                
                <div className="insight-item">
                  <span className="insight-icon">💡</span>
                  <div className="insight-text">
                    <strong>Spending Trend</strong>
                    <p>{aiAnalysis?.trend}</p>
                  </div>
                </div>
                
                <div className="insight-item">
                  <span className="insight-icon">⚠️</span>
                  <div className="insight-text">
                    <strong>Watch Out</strong>
                    <p>{aiAnalysis?.alert}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="category-breakdown">
            <h3>Top Spending Categories</h3>
            <div className="cat-row">
              <span>Housing</span>
              <span className="cat-val">35%</span>
            </div>
            <div className="progress-line"><div className="fill" style={{width: '35%'}}></div></div>
            
            <div className="cat-row">
              <span>Food</span>
              <span className="cat-val">18%</span>
            </div>
            <div className="progress-line"><div className="fill" style={{width: '18%'}}></div></div>
            
            <div className="cat-row">
              <span>Transport</span>
              <span className="cat-val">12%</span>
            </div>
            <div className="progress-line"><div className="fill" style={{width: '12%'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
