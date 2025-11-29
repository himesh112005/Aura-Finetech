import React, { useState } from 'react';

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    radar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="M2 12h2"></path><path d="M22 12h-2"></path></svg>,
    budget: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-1.5.3-1.4.5-2.7.5-4.8 0-3.6-1.5-4.8-1.5-4.8z"></path></svg>,
    goals: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    reports: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>,
    ai: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"></path><path d="m8 6 4-4 4 4"></path><path d="M12 14a4 4 0 0 0-4-4H6a2 2 0 0 0-2 2v10h16V12a2 2 0 0 0-2-2h-2a4 4 0 0 0-4 4Z"></path></svg>,
    simulate: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 14h12"></path><path d="M6 10h12"></path><path d="M2 20h20"></path><path d="M3 4h18"></path><path d="M12 4v16"></path></svg>,
    learn: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    account: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    chevronDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>,
    chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
  };
  return <span style={{ display: 'flex', alignItems: 'center' }}>{icons[name]}</span>;
};

interface MenuBarProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onNavigate, onLogout }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    ai: false,
    simulate: false,
    learn: false,
    account: false
  });

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const MenuItem = ({ id, label, icon, hasSubmenu = false, onClick }: any) => (
    <div 
      onClick={onClick ? onClick : () => !hasSubmenu && onNavigate(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor: 'pointer',
        color: '#cbd5e1',
        transition: 'all 0.2s',
        borderRadius: '8px',
        marginBottom: '4px',
        background: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon name={icon} />
        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{label}</span>
      </div>
      {hasSubmenu && (
        <div style={{ color: '#64748b' }}>
          <Icon name={expanded[id] ? 'chevronDown' : 'chevronRight'} />
        </div>
      )}
    </div>
  );

  const SubMenuItem = ({ id, label }: any) => (
    <div 
      onClick={() => onNavigate(id)}
      style={{
        padding: '8px 16px 8px 48px',
        cursor: 'pointer',
        color: '#94a3b8',
        fontSize: '0.9rem',
        transition: 'color 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
    >
      {label}
    </div>
  );

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#1e293b',
      borderRight: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      flexShrink: 0,
      overflowY: 'auto'
    }}>
      <div style={{ padding: '24px', borderBottom: '1px solid #334155', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⚡</span> FINTECH
        </h2>
      </div>

      <div style={{ padding: '0 12px', flex: 1 }}>
        <MenuItem id="dashboard" label="Dashboard" icon="dashboard" />
        <MenuItem id="income-radar" label="Income Radar" icon="radar" />
        <MenuItem id="budget" label="Budget" icon="budget" />
        <MenuItem id="goals" label="Goals" icon="goals" />
        <MenuItem id="reports" label="Reports" icon="reports" />

        <div style={{ height: '1px', background: '#334155', margin: '12px 0' }}></div>

        <MenuItem id="ai" label="AI Insights" icon="ai" hasSubmenu onClick={() => toggle('ai')} />
        {expanded.ai && (
          <div style={{ marginBottom: '8px' }}>
            <SubMenuItem id="ai-chat" label="AI Assistant" />
            <SubMenuItem id="ai-auto" label="Ghost Mode" />
            <SubMenuItem id="ai-recs" label="Opportunity Radar" />
            <SubMenuItem id="spend-shield" label="Spend Shield" />
            <SubMenuItem id="ai-predict" label="Predictions" />
          </div>
        )}

        <MenuItem id="simulate" label="Simulate" icon="simulate" hasSubmenu onClick={() => toggle('simulate')} />
        {expanded.simulate && (
          <div style={{ marginBottom: '8px' }}>
            <SubMenuItem id="sim-invest" label="Future Simulator" />
            <SubMenuItem id="sim-loan" label="Loan Calculator" />
            <SubMenuItem id="sim-retire" label="Retirement Planner" />
          </div>
        )}

        <MenuItem id="learn" label="Learn" icon="learn" hasSubmenu onClick={() => toggle('learn')} />
        {expanded.learn && (
          <div style={{ marginBottom: '8px' }}>
            <SubMenuItem id="learn-basics" label="Financial Basics" />
            <SubMenuItem id="learn-videos" label="Video Library" />
          </div>
        )}
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid #334155' }}>
        <MenuItem id="account" label="Account" icon="account" hasSubmenu onClick={() => toggle('account')} />
        {expanded.account && (
          <div style={{ marginBottom: '8px' }}>
            <SubMenuItem id="profile" label="Profile" />
            <SubMenuItem id="settings" label="Settings" />
            <div 
              onClick={onLogout}
              style={{
                padding: '8px 16px 8px 48px',
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: '0.9rem'
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
