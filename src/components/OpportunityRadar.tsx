import React, { useState, useEffect } from 'react';
import { getOpportunities } from '../services/ai';
import './OpportunityRadar.css';

const OpportunityRadar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    const data = await getOpportunities(searchQuery);
    setOpportunities(data);
    if (data.length > 0 && !selectedOpp) {
      setSelectedOpp(data[0]);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOpportunities();
  };

  return (
    <div className="opp-container">
      <div className="opp-header">
        <div>
          <h2>Your Opportunities</h2>
          <p className="subtitle">AI-powered side-hustles & investments tailored to you.</p>
        </div>
        <form className="opp-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search opportunities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="opp-layout">
        {/* List Section */}
        <div className="opp-list">
          <h3>AI Recommended</h3>
          {loading ? (
            <div className="loading-state">Scanning market...</div>
          ) : (
            opportunities.map(opp => (
              <div 
                key={opp.id} 
                className={`opp-card ${selectedOpp?.id === opp.id ? 'active' : ''}`}
                onClick={() => setSelectedOpp(opp)}
              >
                <div className="opp-card-header">
                  <h4>{opp.title}</h4>
                  <span className="opp-cat">{opp.category}</span>
                </div>
                <div className="opp-tags">
                  {opp.tags.map((tag: string, i: number) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="opp-metrics">
                  <div className="metric">
                    <span className="label">Projected Net</span>
                    <span className="val green">{opp.projectedIncome}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Effort</span>
                    <span className="val">{opp.effort}</span>
                  </div>
                </div>
                <div className="opp-actions">
                  <button className="btn-thumb up">👍</button>
                  <button className="btn-thumb down">👎</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Section */}
        {selectedOpp && (
          <div className="opp-detail">
            <div className="detail-header">
              <h3>Deep Dive</h3>
              <button className="btn-add-plan">➕ Add to Plan</button>
            </div>
            
            <div className="detail-main-card">
              <h2>{selectedOpp.title}</h2>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Required Skills</span>
                  <p>{selectedOpp.skills}</p>
                </div>
                <div className="detail-item">
                  <span className="label">Projected Income</span>
                  <p className="highlight">{selectedOpp.projectedIncome}</p>
                </div>
              </div>

              <div className="roadmap-section">
                <h4>Micro Roadmap</h4>
                <div className="roadmap-steps">
                  {selectedOpp.roadmap.map((step: string, i: number) => (
                    <div key={i} className="step-item">
                      <div className="step-check">✓</div>
                      <span>{i + 1}. {step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ai-insight-box">
                <div className="ai-label">✨ AI Insight</div>
                <p>{selectedOpp.insight}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityRadar;
