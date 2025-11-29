import React, { useState } from 'react';
import './SpendShield.css';

const SpendShield: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [viewState, setViewState] = useState<'active' | 'saved' | 'proceed'>('active');

  const feelings = ['Happy', 'Stressed', 'Bored', 'Just Shopping'];

  const handleSave = () => {
    setViewState('saved');
  };

  const handleProceed = () => {
    setViewState('proceed');
  };

  const resetDemo = () => {
    setViewState('active');
    setSelectedEmotion(null);
  };

  if (viewState === 'saved') {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        background: '#1e293b', 
        padding: '3rem', 
        borderRadius: '12px', 
        color: '#e2e8f0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐷</div>
        <h2 style={{ color: '#10b981' }}>Great Decision!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          You've decided to think about it. Your savings for the laptop remain safe.
        </p>
        <button 
          onClick={resetDemo}
          style={{
            padding: '10px 20px',
            background: '#38bdf8',
            border: 'none',
            borderRadius: '6px',
            color: '#0f172a',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Reset Demo
        </button>
      </div>
    );
  }

  if (viewState === 'proceed') {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        background: '#1e293b', 
        padding: '3rem', 
        borderRadius: '12px', 
        color: '#e2e8f0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💸</div>
        <h2 style={{ color: '#ef4444' }}>Purchase Authorized</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          The Spend Shield has been lifted for 15 minutes.
        </p>
        <button 
          onClick={resetDemo}
          style={{
            padding: '10px 20px',
            background: '#38bdf8',
            border: 'none',
            borderRadius: '6px',
            color: '#0f172a',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Reset Demo
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      background: '#1e293b',
      padding: '2rem',
      borderRadius: '12px',
      color: '#e2e8f0',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span>🛡️</span> Spend Shield Active
        </h2>
      </div>
      
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1.5rem', 
        background: 'rgba(56, 189, 248, 0.1)', 
        borderRadius: '8px', 
        borderLeft: '4px solid #38bdf8' 
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#e2e8f0' }}>A moment to reflect.</h3>
        <p style={{ margin: 0, lineHeight: '1.6', color: '#cbd5e1' }}>
          Our AI senses this might be an impulsive purchase. It's late, and this is your 3rd purchase from this site this week.
        </p>
      </div>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Taking a moment...</p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '2rem', 
          margin: '1.5rem 0',
          padding: '1.5rem',
          background: '#0f172a',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🐷</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Savings Goal</div>
          </div>
          <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 'bold' }}>VS</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>💻</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Impulse Buy</div>
          </div>
        </div>

        <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
          Remember your goal to save for a new laptop? <br/>
          <span style={{ color: '#ef4444', fontWeight: 'bold' }}>This purchase would use 15% of this month's savings.</span>
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ marginBottom: '1rem', textAlign: 'center', color: '#94a3b8' }}>How are you feeling right now?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {feelings.map(feeling => (
            <button
              key={feeling}
              onClick={() => setSelectedEmotion(feeling)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedEmotion === feeling ? '2px solid #38bdf8' : '1px solid #475569',
                background: selectedEmotion === feeling ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: selectedEmotion === feeling ? '#38bdf8' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
              }}
            >
              {feeling}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '14px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#10b981',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1,
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
        >
          I'll think about it
        </button>
        <button
          onClick={handleProceed}
          style={{
            padding: '14px 24px',
            borderRadius: '8px',
            border: '1px solid #ef4444',
            background: 'transparent',
            color: '#ef4444',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1,
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
        >
          Proceed with Purchase
        </button>
      </div>
    </div>
  );
};

export default SpendShield;
