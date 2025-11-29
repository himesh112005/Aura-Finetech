import React, { useState } from 'react';
import './LearnVideos.css';

const LearnVideos: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const videos = [
    { id: 1, title: "AURA App Walkthrough", category: "Basics", duration: "3:45", thumbnail: "linear-gradient(45deg, #3b82f6, #2563eb)", views: "1.2k" },
    { id: 2, title: "How to Create a Budget", category: "Budgeting", duration: "8:20", thumbnail: "linear-gradient(45deg, #10b981, #059669)", views: "5.4k" },
    { id: 3, title: "Investing for Beginners", category: "Investing", duration: "12:15", thumbnail: "linear-gradient(45deg, #8b5cf6, #7c3aed)", views: "8.9k" },
    { id: 4, title: "Understanding Crypto Risks", category: "Investing", duration: "10:05", thumbnail: "linear-gradient(45deg, #f59e0b, #d97706)", views: "3.1k" },
    { id: 5, title: "Debt Free in 12 Months", category: "Budgeting", duration: "15:30", thumbnail: "linear-gradient(45deg, #ef4444, #dc2626)", views: "12k" },
    { id: 6, title: "Retirement Planning 101", category: "Planning", duration: "9:45", thumbnail: "linear-gradient(45deg, #ec4899, #db2777)", views: "4.5k" },
  ];

  const filteredVideos = filter === 'All' ? videos : videos.filter(v => v.category === filter);

  return (
    <div className="learn-container">
      <div className="learn-header">
        <div>
          <h2>Video Tutorials</h2>
          <p className="subtitle">Watch expert guides to level up your financial game.</p>
        </div>
        <div className="video-filters">
          {['All', 'Basics', 'Budgeting', 'Investing', 'Planning'].map(cat => (
            <button 
              key={cat} 
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail" style={{ background: video.thumbnail }}>
              <div className="play-button">▶</div>
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-info">
              <div className="video-meta">
                <span className="video-cat">{video.category}</span>
                <span className="video-views">{video.views} views</span>
              </div>
              <h3>{video.title}</h3>
              <button className="btn-watch">Watch Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnVideos;
