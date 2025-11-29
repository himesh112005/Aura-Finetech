import React from 'react';
import './LearnBasics.css';

const LearnBasics: React.FC = () => {
  const modules = [
    {
      id: 1,
      title: "The 50/30/20 Rule",
      desc: "Master the golden rule of budgeting: Needs, Wants, and Savings.",
      icon: "📊",
      readTime: "5 min",
      progress: 100,
      status: "Completed"
    },
    {
      id: 2,
      title: "Emergency Funds 101",
      desc: "Why you need one, how much to save, and where to keep it.",
      icon: "🛡️",
      readTime: "4 min",
      progress: 60,
      status: "In Progress"
    },
    {
      id: 3,
      title: "Understanding Credit Scores",
      desc: "What factors impact your score and how to improve it fast.",
      icon: "💳",
      readTime: "7 min",
      progress: 0,
      status: "Start"
    },
    {
      id: 4,
      title: "Compound Interest Magic",
      desc: "How time in the market beats timing the market.",
      icon: "📈",
      readTime: "6 min",
      progress: 0,
      status: "Start"
    },
    {
      id: 5,
      title: "Debt Repayment Strategies",
      desc: "Snowball vs. Avalanche: Which method is right for you?",
      icon: "⛄",
      readTime: "8 min",
      progress: 0,
      status: "Start"
    },
    {
      id: 6,
      title: "Tax Basics for Freelancers",
      desc: "Navigating deductions, estimated payments, and forms.",
      icon: "📝",
      readTime: "10 min",
      progress: 0,
      status: "Start"
    }
  ];

  return (
    <div className="learn-container">
      <div className="learn-header">
        <div>
          <h2>Financial Basics</h2>
          <p className="subtitle">Build a solid foundation for your financial future.</p>
        </div>
        <div className="progress-overview">
          <span className="progress-label">Course Progress</span>
          <div className="progress-bar-main">
            <div className="fill" style={{ width: '25%' }}></div>
          </div>
          <span className="progress-text">25% Completed</span>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map(module => (
          <div key={module.id} className={`module-card ${module.status === 'Completed' ? 'completed' : ''}`}>
            <div className="module-icon">{module.icon}</div>
            <div className="module-content">
              <div className="module-meta">
                <span className="read-time">⏱ {module.readTime}</span>
                {module.status === 'Completed' && <span className="badge-done">✓ Done</span>}
              </div>
              <h3>{module.title}</h3>
              <p>{module.desc}</p>
              
              <div className="module-footer">
                {module.status !== 'Start' && (
                  <div className="mini-progress">
                    <div className="mini-fill" style={{ width: `${module.progress}%` }}></div>
                  </div>
                )}
                <button className={`btn-module ${module.status === 'Completed' ? 'btn-outline' : 'btn-primary'}`}>
                  {module.status === 'Completed' ? 'Review' : module.status === 'In Progress' ? 'Continue' : 'Start Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnBasics;
