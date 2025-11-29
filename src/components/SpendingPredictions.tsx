import React, { useState, useEffect } from 'react';
import { getSpendingPredictions } from '../services/ai';
import './SpendingPredictions.css';

const SpendingPredictions: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d'>('30d');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState<'idle' | 'creating' | 'created'>('idle');

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      const data = await getSpendingPredictions(timeframe);
      setPrediction(data);
      setLoading(false);
    };
    fetchPrediction();
  }, [timeframe]);

  const handleCreateBudget = () => {
    if (!prediction) return;
    
    setBudgetStatus('creating');
    
    // Simulate API call to create budget
    setTimeout(() => {
      setBudgetStatus('created');
      
      // Reset after showing success
      setTimeout(() => {
        setBudgetStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="predict-container">
      <div className="predict-header">
        <div>
          <h2>Future Spending Predictions</h2>
          <p className="subtitle">AI-forecasted expenses based on your historical genome.</p>
        </div>
        <div className="predict-controls">
          <button 
            className={`predict-btn ${timeframe === '30d' ? 'active' : ''}`}
            onClick={() => setTimeframe('30d')}
          >
            Next 30 Days
          </button>
          <button 
            className={`predict-btn ${timeframe === '90d' ? 'active' : ''}`}
            onClick={() => setTimeframe('90d')}
          >
            Next 3 Months
          </button>
        </div>
      </div>

      <div className="predict-layout">
        {/* Main Chart Area */}
        <div className="predict-main card">
          <div className="chart-header">
            <h3>Spending Trajectory</h3>
            <span className="confidence-badge">{prediction?.confidence || '90%'} Confidence</span>
          </div>
          
          <div className="trajectory-chart">
            {/* Simplified CSS Chart */}
            <div className="chart-area">
              <div className="chart-line past"></div>
              <div className="chart-line future"></div>
              <div className="chart-point current"></div>
              <div className="chart-label past-label">Past 15 Days</div>
              <div className="chart-label current-label">Today</div>
              <div className="chart-label future-label">Future 15 Days</div>
            </div>
          </div>

          <div className="predict-stats">
            <div className="p-stat">
              <span className="label">Predicted Total</span>
              <div className="value">{loading ? '...' : prediction?.total}</div>
            </div>
            <div className="p-stat">
              <span className="label">Variance</span>
              <div className="value highlight">{loading ? '...' : prediction?.variance}</div>
            </div>
            <div className="p-stat">
              <span className="label">Risk Level</span>
              <div className="value safe">{loading ? '...' : prediction?.risk}</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="predict-sidebar">
          <div className="large-expenses card">
            <h3>Predicted Large Expenses</h3>
            <div className="expense-list">
              {loading ? (
                <p style={{color: '#94a3b8'}}>Forecasting...</p>
              ) : (
                prediction?.largeExpenses?.map((exp: any, i: number) => (
                  <div key={i} className="p-expense-item">
                    <div className="date-box">
                      <span className="day">{exp.date.split(' ')[0]}</span>
                      <span className="month">{exp.date.split(' ')[1]}</span>
                    </div>
                    <div className="exp-details">
                      <h4>{exp.title}</h4>
                      <span className="exp-type">{exp.type}</span>
                    </div>
                    <div className="exp-amount">{exp.amount}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="ai-forecast-card">
            <div className="ai-icon-large">🔮</div>
            <h3>AI Forecast</h3>
            <p>{loading ? 'Analyzing patterns...' : prediction?.forecast}</p>
            <button 
              className={`btn-action ${budgetStatus === 'created' ? 'success' : ''}`} 
              onClick={handleCreateBudget}
              disabled={budgetStatus !== 'idle' || loading}
            >
              {budgetStatus === 'idle' && 'Create "Holiday" Budget'}
              {budgetStatus === 'creating' && 'Creating Budget...'}
              {budgetStatus === 'created' && 'Budget Created ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingPredictions;
