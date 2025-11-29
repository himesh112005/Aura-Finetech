import React, { useState } from 'react';
import './GhostMode.css';

interface Alert {
  id: number;
  type: 'subscription' | 'fee' | 'general';
  severity: 'high' | 'medium' | 'resolved';
  title: string;
  description: string;
  recommendation?: string;
  actions?: string[];
}

const GhostMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const alerts: Alert[] = [
    {
      id: 1,
      type: 'subscription',
      severity: 'high',
      title: 'Unexpected Subscription Charge',
      description: 'Spotify: Price increased after free trial.',
      recommendation: 'AI Recommendation: Cancel subscription or review new terms.',
      actions: ['Ignore', 'Review']
    },
    {
      id: 2,
      type: 'fee',
      severity: 'medium',
      title: 'Unusually High Service Fee',
      description: 'Bank of America: ₹250 ATM fee detected.',
      recommendation: 'AI Recommendation: Use an in-network ATM to avoid this fee.',
      actions: ['Ignore', 'Details']
    },
    {
      id: 3,
      type: 'subscription',
      severity: 'resolved',
      title: 'Duplicate Charge Resolved',
      description: 'Netflix: Refund of ₹649 processed successfully.'
    }
  ];

  const filteredAlerts = activeTab === 'All' 
    ? alerts 
    : activeTab === 'Fees' 
      ? alerts.filter(a => a.type === 'fee')
      : alerts.filter(a => a.type === 'subscription');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <span style={{ color: '#ef4444', fontSize: '1.5rem' }}>!</span>;
      case 'medium': return <span style={{ color: '#eab308', fontSize: '1.5rem' }}>⚠️</span>;
      case 'resolved': return <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#eab308';
      case 'resolved': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const stats = [
    { label: 'Anomalies Detected', value: '12', sub: '+2 this week', color: '#f59e0b' },
    { label: 'Hidden Fees Found', value: '3', sub: '+₹950 saved', color: '#ef4444' },
    { label: 'Dark Patterns Flagged', value: '1', sub: '+1 this month', color: '#8b5cf6' },
    { label: 'Potential Savings', value: '₹3,500', sub: '+₹1,200', color: '#10b981' }
  ];

  return (
    <div style={{ color: '#e2e8f0', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>👻</span> Ghost Mode Monitoring
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Your finances, silently protected.</p>
      </div>

      {/* Main Status Card */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '2rem',
        border: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '50%',
          border: '2px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px'
        }}>
          <span style={{ fontSize: '2.5rem' }}>🛡️</span>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#10b981' }}>Status: All Clear</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#94a3b8' }}>Real-time protection active. No critical threats detected.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f8fafc', marginBottom: '0.25rem' }}>{stat.value}</div>
            <div style={{ color: stat.color, fontSize: '0.85rem', fontWeight: '500' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Alerts & Insights</h3>
          <div style={{ display: 'flex', gap: '0.5rem', background: '#1e293b', padding: '4px', borderRadius: '8px' }}>
            {['All', 'Fees', 'Subscriptions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#38bdf8' : 'transparent',
                  color: activeTab === tab ? '#0f172a' : '#94a3b8',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredAlerts.map(alert => (
            <div key={alert.id} style={{ 
              background: '#1e293b', 
              borderRadius: '12px', 
              padding: '1.5rem',
              borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
              display: 'flex',
              gap: '1.5rem'
            }}>
              <div style={{ 
                minWidth: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: `${getSeverityColor(alert.severity)}20`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {getSeverityIcon(alert.severity)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>{alert.title}</h4>
                  {alert.severity === 'resolved' && (
                    <span style={{ 
                      background: 'rgba(16, 185, 129, 0.2)', 
                      color: '#10b981', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Resolved
                    </span>
                  )}
                </div>
                
                <p style={{ margin: '0 0 0.5rem 0', color: '#cbd5e1' }}>{alert.description}</p>
                
                {alert.recommendation && (
                  <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {alert.recommendation}
                  </p>
                )}

                {alert.actions && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {alert.actions.map((action, idx) => (
                      <button key={idx} style={{
                        background: idx === 1 ? '#38bdf8' : 'transparent',
                        color: idx === 1 ? '#0f172a' : '#94a3b8',
                        border: idx === 1 ? 'none' : '1px solid #475569',
                        padding: '6px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GhostMode;
