import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header centered">
          <span className="section-tag">Core Features</span>
          <h2>12 Revolutionary <span className="gradient-text">Capabilities</span></h2>
          <p>Each feature is designed to work in harmony, creating a symphony of financial intelligence</p>
        </div>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card featured">
            <div className="feature-icon"><i className="fas fa-dna"></i></div>
            <h3>Financial Behavior Genome</h3>
            <p>A unique genetic profile that evolves daily based on micro-transactions, emotional cues, social influences, and risk fingerprints.</p>
            <div className="feature-visual genome-visual">
              <div className="dna-strand">
                <div className="helix"></div>
                <div className="helix delay"></div>
              </div>
            </div>
            <a href="#" className="feature-link">Explore <i className="fas fa-arrow-right"></i></a>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-radar"></i></div>
            <h3>Income Instability Radar</h3>
            <p>Predict income fluctuations using calendar patterns, geography, demand cycles, and personal productivity trends.</p>
            <a href="#" className="feature-link">Explore <i className="fas fa-arrow-right"></i></a>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-shield-heart"></i></div>
            <h3>Emotion-Aware Spend Shield</h3>
            <p>Detects emotional spending through patterns and intervenes with micro-nudges and dopamine-friendly alternatives.</p>
            <a href="#" className="feature-link">Explore <i className="fas fa-arrow-right"></i></a>
          </div>

          {/* Feature 6 */}
          <div className="feature-card featured">
            <div className="feature-icon"><i className="fas fa-crystal-ball"></i></div>
            <h3>Future-Self Simulation</h3>
            <p>See 7 alternative futures based on current habits and discover how small tweaks rewrite your entire financial destiny.</p>
            <div className="feature-visual futures-visual">
              <div className="future-paths">
                <div className="path optimistic"></div>
                <div className="path neutral"></div>
                <div className="path chaotic"></div>
              </div>
            </div>
            <a href="#" className="feature-link">Explore <i className="fas fa-arrow-right"></i></a>
          </div>
          
          {/* Additional features would go here... */}
        </div>
      </div>
    </section>
  );
};

export default Features;
