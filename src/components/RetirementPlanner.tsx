import React, { useState, useMemo } from 'react';
import './RetirementPlanner.css';

const RetirementPlanner: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContrib, setMonthlyContrib] = useState(1000);
  const [returnRate, setReturnRate] = useState(7);

  const projection = useMemo(() => {
    const years = retireAge - currentAge;
    let balance = currentSavings;
    const data = [];
    
    for (let i = 0; i <= years; i++) {
        data.push({ age: currentAge + i, balance });
        balance = (balance + (monthlyContrib * 12)) * (1 + returnRate / 100);
    }
    return data;
  }, [currentAge, retireAge, currentSavings, monthlyContrib, returnRate]);

  const finalAmount = projection[projection.length - 1]?.balance || 0;
  const formatMoney = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="retire-container">
      <div className="retire-header">
        <div>
          <h2>Retirement Planner</h2>
          <p className="subtitle">Visualize your path to financial freedom.</p>
        </div>
      </div>

      <div className="retire-grid">
        <div className="retire-inputs card">
            <h3>Your Inputs</h3>
            <div className="input-row">
                <div className="input-group">
                    <label>Current Age</label>
                    <input className="std-input" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Retire Age</label>
                    <input className="std-input" type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} />
                </div>
            </div>
            <div className="input-group">
                <label>Current Savings</label>
                <div className="input-wrapper">
                    <span className="prefix">$</span>
                    <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
                </div>
            </div>
            <div className="input-group">
                <label>Monthly Contribution</label>
                <div className="input-wrapper">
                    <span className="prefix">$</span>
                    <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))} />
                </div>
                <input type="range" min="0" max="10000" step="100" value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))} className="slider" />
            </div>
            <div className="input-group">
                <label>Expected Return (%)</label>
                <div className="input-wrapper">
                    <input type="number" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} />
                    <span className="suffix">%</span>
                </div>
                <input type="range" min="1" max="15" step="0.5" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} className="slider" />
            </div>
        </div>

        <div className="retire-results card">
            <h3>Projected Nest Egg</h3>
            <div className="big-number">{formatMoney(finalAmount)}</div>
            <p className="result-sub">at age {retireAge}</p>

            <div className="chart-container">
                <div className="growth-chart">
                    {projection.filter((_, i) => i % Math.ceil(projection.length / 10) === 0 || i === projection.length - 1).map((point) => {
                        const height = (point.balance / finalAmount) * 100;
                        return (
                            <div key={point.age} className="chart-bar-wrapper">
                                <div className="chart-bar" style={{ height: `${height}%` }}></div>
                                <span className="chart-label">{point.age}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="ai-tip">
                <span className="icon">💡</span>
                <p>Increasing your contribution by <strong>$200/mo</strong> could add <strong>{formatMoney((200 * 12 * ((Math.pow(1 + returnRate/100, retireAge - currentAge) - 1) / (returnRate/100))))}</strong> to your retirement.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanner;
