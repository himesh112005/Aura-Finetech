import React, { useState, useEffect } from 'react';
import './BudgetPlanner.css';

interface Category {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
}

const BudgetPlanner: React.FC = () => {
  // Initial state with realistic INR values
  const [categories, setCategories] = useState<Category[]>(
    [
      { id: '1', name: 'Housing', allocated: 15000, spent: 15000, icon: '🏠', color: '#38bdf8' },
      { id: '2', name: 'Food & Dining', allocated: 8000, spent: 4500, icon: '🍔', color: '#f472b6' },
      { id: '3', name: 'Transportation', allocated: 5000, spent: 1200, icon: '🚗', color: '#fbbf24' },
      { id: '4', name: 'Entertainment', allocated: 3000, spent: 2800, icon: '🎬', color: '#a78bfa' },
      { id: '5', name: 'Shopping', allocated: 2000, spent: 2500, icon: '🛍️', color: '#f87171' },
      { id: '6', name: 'Travel', allocated: 10000, spent: 1500, icon: '✈️', color: '#10b981' },
    ]
  );

  const [salary, setSalary] = useState<number>(50000);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit state
  const [editSalary, setEditSalary] = useState<number>(50000);
  const [editCategories, setEditCategories] = useState<Category[]>([]);

  const [newExpense, setNewExpense] = useState({ categoryId: '', amount: '' });
  const [aiInsight, setAiInsight] = useState<string>("");

  const totalAllocated = categories.reduce((acc, cat) => acc + cat.allocated, 0);
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const percentSpent = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  // Dynamic AI Insight based on current state
  useEffect(() => {
    const overBudget = categories.filter(c => c.spent > c.allocated);
    if (overBudget.length > 0) {
      const item = overBudget[0];
      setAiInsight(`You've exceeded your ${item.name} budget by Rs ${item.spent - item.allocated}. Consider reducing spending in other categories to balance it out.`);
    } else if (percentSpent > 90) {
      setAiInsight("You are very close to your total budget limit for the month. Proceed with caution.");
    } else if (remaining > 0) {
      setAiInsight(`You are on track! You have Rs ${remaining.toLocaleString()} left to spend this month.`);
    } else {
      setAiInsight("Budget limit reached.");
    }
  }, [categories, percentSpent, remaining]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.categoryId || !newExpense.amount) return;

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) return;

    setCategories(categories.map(cat => 
      cat.id === newExpense.categoryId 
        ? { ...cat, spent: cat.spent + amount }
        : cat
    ));
    setNewExpense({ categoryId: '', amount: '' });
  };

  const startEditing = () => {
    setEditSalary(salary);
    setEditCategories(JSON.parse(JSON.stringify(categories)));
    setIsEditing(true);
  };

  const saveBudget = () => {
    setSalary(editSalary);
    setCategories(editCategories);
    setIsEditing(false);
  };

  const updateEditCategory = (id: string, amount: number) => {
    setEditCategories(editCategories.map(cat => 
      cat.id === id ? { ...cat, allocated: amount } : cat
    ));
  };

  return (
    <div className="budget-container">
      {isEditing ? (
        <div className="edit-budget-overlay">
          <div className="edit-budget-card">
            <h3>Edit Monthly Budget</h3>
            
            <div className="form-group">
              <label>Monthly Income (Salary)</label>
              <input 
                type="number" 
                value={editSalary} 
                onChange={(e) => setEditSalary(parseFloat(e.target.value) || 0)}
                className="salary-input"
              />
            </div>

            <div className="edit-categories">
              <h4>Category Allocations</h4>
              {editCategories.map(cat => (
                <div key={cat.id} className="edit-cat-row">
                  <div className="cat-label">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <input 
                    type="number" 
                    value={cat.allocated} 
                    onChange={(e) => updateEditCategory(cat.id, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>

            <div className="edit-summary">
               <p>Total Allocated: Rs {editCategories.reduce((acc, c) => acc + c.allocated, 0).toLocaleString()}</p>
               <p className={editSalary - editCategories.reduce((acc, c) => acc + c.allocated, 0) < 0 ? 'negative' : 'positive'}>
                 Unallocated: Rs {(editSalary - editCategories.reduce((acc, c) => acc + c.allocated, 0)).toLocaleString()}
               </p>
            </div>

            <div className="edit-actions">
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveBudget}>Save Changes</button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="budget-header">
        <div>
          <h2>Budget Planning & Tracking</h2>
          <p className="subtitle">Manage your monthly spending limits.</p>
        </div>
        <button className="btn-primary-outline" onClick={startEditing}>Edit Budget</button>
      </div>

      {/* Summary Cards */}
      <div className="budget-summary">
        <div className="summary-card income">
          <span className="label">Monthly Income</span>
          <div className="value">Rs {salary.toLocaleString()}</div>
        </div>
        <div className="summary-card total">
          <span className="label">Total Budget</span>
          <div className="value">Rs {totalAllocated.toLocaleString()}</div>
        </div>
        <div className="summary-card spent">
          <span className="label">Total Spent</span>
          <div className="value">Rs {totalSpent.toLocaleString()}</div>
          <div className="progress-mini">
            <div className="fill" style={{ width: `${Math.min(percentSpent, 100)}%` }}></div>
          </div>
        </div>
        <div className="summary-card remaining">
          <span className="label">Remaining</span>
          <div className={`value ${remaining < 0 ? 'negative' : 'positive'}`}>
            Rs {remaining.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="budget-content">
        {/* Categories List */}
        <div className="categories-section">
          <h3>Categories</h3>
          <div className="categories-list">
            {categories.map(cat => {
              const percent = cat.allocated > 0 ? (cat.spent / cat.allocated) * 100 : 0;
              const isOver = cat.spent > cat.allocated;
              
              return (
                <div key={cat.id} className="category-item">
                  <div className="cat-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div className="cat-details">
                    <div className="cat-header">
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-amount">
                        <span className={isOver ? 'danger' : ''}>Rs {cat.spent.toLocaleString()}</span> / Rs {cat.allocated.toLocaleString()}
                      </span>
                    </div>
                    <div className="cat-progress-bg">
                      <div 
                        className={`cat-progress-fill ${isOver ? 'over' : ''}`}
                        style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: isOver ? '#ef4444' : cat.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Add Expense */}
        <div className="add-expense-section">
          <div className="expense-card">
            <h3>Quick Add Expense</h3>
            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newExpense.categoryId}
                  onChange={(e) => setNewExpense({...newExpense, categoryId: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount (Rs)</label>
                <input 
                  type="number" 
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="0.00"
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <button type="submit" className="btn-add-expense">Add Expense</button>
            </form>
          </div>

          {/* AI Insight */}
          <div className="budget-ai-card">
            <div className="ai-icon">🤖</div>
            <div className="ai-text">
              <h4>AI Insight</h4>
              <p>{aiInsight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
