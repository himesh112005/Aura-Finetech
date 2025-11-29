import React, { useState, useEffect } from 'react';
import './LoanCalculator.css';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(5);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Monthly interest rate
    const r = rate / 100 / 12;
    // Total number of payments
    const n = term * 12;

    let payment = 0;
    if (rate === 0) {
      payment = amount / n;
    } else {
      // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
      payment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (isNaN(payment) || !isFinite(payment)) payment = 0;

    const total = payment * n;
    const interest = total - amount;

    setMonthlyPayment(payment);
    setTotalCost(total);
    setTotalInterest(interest);
  }, [amount, rate, term]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  // Calculate percentages for the pie chart
  const principalPercent = totalCost > 0 ? (amount / totalCost) * 100 : 100;
  const interestPercent = totalCost > 0 ? (totalInterest / totalCost) * 100 : 0;
  
  // SVG Pie Chart calculation
  // Circumference of a circle with r=16 is approx 100
  const dashArray = `${interestPercent} ${100 - interestPercent}`;

  return (
    <div className="loan-container">
      <div className="loan-header">
        <div>
          <h2>Loan Calculator</h2>
          <p className="subtitle">Estimate your monthly payments and total interest costs.</p>
        </div>
      </div>

      <div className="loan-grid">
        <div className="loan-inputs card">
            <h3>Loan Details</h3>
            
            <div className="input-group">
                <label>Loan Amount</label>
                <div className="input-wrapper">
                    <span className="prefix">₹</span>
                    <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                </div>
                <input type="range" min="10000" max="5000000" step="10000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="slider" />
            </div>

            <div className="input-group">
                <label>Interest Rate (%)</label>
                <div className="input-wrapper">
                    <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} step="0.1" />
                    <span className="suffix">%</span>
                </div>
                <input type="range" min="0.1" max="20" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="slider" />
            </div>

            <div className="input-group">
                <label>Loan Term (Years)</label>
                <div className="input-wrapper">
                    <input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} />
                    <span className="suffix">Years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={term} onChange={e => setTerm(Number(e.target.value))} className="slider" />
            </div>
        </div>

        <div className="loan-results card">
            <h3>Repayment Summary</h3>
            <div className="result-main">
                <span className="label">Monthly Payment</span>
                <span className="value highlight">{formatCurrency(monthlyPayment)}</span>
            </div>
            
            <div className="result-breakdown">
                <div className="breakdown-item">
                    <span className="label">Total Principal</span>
                    <span className="value">{formatCurrency(amount)}</span>
                </div>
                <div className="breakdown-item">
                    <span className="label">Total Interest</span>
                    <span className="value warning">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="breakdown-item total">
                    <span className="label">Total Cost</span>
                    <span className="value">{formatCurrency(totalCost)}</span>
                </div>
            </div>

            {/* Simple Visualization */}
            <div className="visual-bar-container">
                <div className="visual-bar">
                    <div className="bar-segment principal" style={{ flex: amount / totalCost }} title="Principal"></div>
                    <div className="bar-segment interest" style={{ flex: totalInterest / totalCost }} title="Interest"></div>
                </div>
                <div className="visual-legend">
                    <span className="legend-item"><span className="dot principal"></span> Principal</span>
                    <span className="legend-item"><span className="dot interest"></span> Interest</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
