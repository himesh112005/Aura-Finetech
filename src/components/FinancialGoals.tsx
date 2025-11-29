import React, { useState, useEffect } from 'react';
import { getGoalStrategy } from '../services/ai';
import './FinancialGoals.css';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
}

const FinancialGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 6500, deadline: '2025-12-31', icon: '🛡️', color: '#34d399' },
    { id: '2', name: 'New Laptop', targetAmount: 2500, currentAmount: 800, deadline: '2024-06-30', icon: '💻', color: '#38bdf8' },
    { id: '3', name: 'Dream Vacation', targetAmount: 5000, currentAmount: 1200, deadline: '2025-08-15', icon: '🏖️', color: '#f472b6' },
  ]);

  const [newGoal, setNewGoal] = useState({ name: '', target: '', deadline: '' });
  const [aiStrategy, setAiStrategy] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Sync External Accounts');

  useEffect(() => {
    const fetchStrategy = async () => {
      setLoadingAi(true);
      const strategy = await getGoalStrategy(goals);
      setAiStrategy(strategy);
      setLoadingAi(false);
    };
    fetchStrategy();
  }, [goals]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.target),
      currentAmount: 0,
      deadline: newGoal.deadline,
      icon: '🎯',
      color: '#a78bfa'
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ name: '', target: '', deadline: '' });
  };

  const handleSync = () => {
    setSyncStatus('Syncing...');
    setTimeout(() => {
      setSyncStatus('Synced ✓');
      setTimeout(() => setSyncStatus('Sync External Accounts'), 2000);
    }, 1500);
  };

  const handleApplyRule = () => {
    alert("Auto-save rule applied! We'll automatically transfer savings when you spend less on dining.");
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <div>
          <h2>Financial Goals Setup</h2>
          <p className="subtitle">Define your dreams and let AI help you reach them.</p>
        </div>
        <button className="btn-primary-outline" onClick={handleSync} disabled={syncStatus !== 'Sync External Accounts'}>
          {syncStatus}
        </button>
      </div>

      <div className="goals-layout">
        {/* Goals List */}
        <div className="goals-list-section">
          {goals.map(goal => {
            const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-icon" style={{ background: `${goal.color}20` }}>{goal.icon}</div>
                <div className="goal-info">
                  <div className="goal-top">
                    <h3>{goal.name}</h3>
                    <span className="goal-amount">Rs {goal.currentAmount.toLocaleString()} / Rs {goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="goal-progress-bg">
                    <div className="goal-progress-fill" style={{ width: `${percent}%`, background: goal.color }}></div>
                  </div>
                  <div className="goal-meta">
                    <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                    <span className="percent-text">{percent.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Goal Form */}
          <div className="add-goal-card">
            <h3>Create New Goal</h3>
            <form onSubmit={handleAddGoal} className="add-goal-form">
              <input 
                type="text" 
                placeholder="Goal Name (e.g., New Car)" 
                value={newGoal.name}
                onChange={e => setNewGoal({...newGoal, name: e.target.value})}
                required
              />
              <div className="form-row">
                <input 
                  type="number" 
                  placeholder="Target Amount (Rs)" 
                  value={newGoal.target}
                  onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                  required
                />
                <input 
                  type="date" 
                  value={newGoal.deadline}
                  onChange={e => setNewGoal({...newGoal, deadline: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn-add-goal">Start Goal</button>
            </form>
          </div>
        </div>

        {/* AI Strategy Sidebar */}
        <div className="goals-sidebar">
          <div className="ai-strategy-card">
            <div className="ai-header-small">
              <span className="sparkle">✨</span> AI Strategy
            </div>
            {loadingAi ? (
              <div style={{ padding: '1rem', color: '#94a3b8' }}>Analyzing goals...</div>
            ) : (
              <>
                <h4>{aiStrategy?.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: aiStrategy?.message }}></p>
                <div className="strategy-action">
                  <button className="btn-ai-action" onClick={handleApplyRule}>Apply Auto-Save Rule</button>
                </div>
              </>
            )}
          </div>

          <div className="milestone-card">
            <h4>Next Milestone</h4>
            <div className="milestone-visual">
              <div className="trophy">🏆</div>
              <p>{aiStrategy?.milestone?.title}</p>
            </div>
            <p className="milestone-desc">{aiStrategy?.milestone?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoals;
