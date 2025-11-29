import React, { useState } from 'react';
import { chatWithGemini } from '../services/ai';
import './Home.css';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // AI Demo State
  const [demoInput, setDemoInput] = useState('');
  const [demoResponse, setDemoResponse] = useState<string | null>(null);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setWaitlistStatus('success');
      // Reset after 3 seconds
      setTimeout(() => {
        setWaitlistStatus('idle');
        setEmail('');
      }, 5000);
    }, 1500);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    
    setIsDemoLoading(true);
    try {
        const response = await chatWithGemini(demoInput);
        setDemoResponse(response);
    } catch (error) {
        setDemoResponse("AURA is currently calibrating. Please try again later.");
    } finally {
        setIsDemoLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-sparkles"></i>
            <span>The Future of Personal Finance</span>
          </div>
          <h1 className="hero-title">
            Your Money, <span className="gradient-text">Alive</span>
            <br />& Adapting
          </h1>
          <p className="hero-subtitle">
            AURA is not an app. It's a living financial organism that senses your rhythms, 
            predicts your needs, and reshapes itself around your unique life — every single day.
          </p>
          <div className="hero-cta">
            <a href="#waitlist" className="btn btn-primary btn-large">
              <span>Start Your Financial Evolution</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a 
              href="#ai-demo" 
              className="btn btn-outline btn-large"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <i className="fas fa-play"></i>
              <span>Live Intelligence Demo</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Waitlist Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">$2.4M</span>
              <span className="stat-label">Saved for Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">97%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="genome-card-preview">
            <div className="genome-status">
              Currently a <span className="highlight">'Cautious Opportunist'</span> with strong saving habits.
            </div>
            <div className="genome-art-container">
              <div className="genome-gradient-blob"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="ai-demo-section" id="ai-demo">
        <div className="container">
            <div className="section-header centered">
                <span className="section-tag">Experience AURA</span>
                <h2>Ask Your <span className="gradient-text">Financial Brain</span></h2>
                <p>Try a live interaction with AURA's core intelligence engine.</p>
            </div>
            
            <div className="demo-terminal">
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <div className="terminal-title">AURA_CORE_V1.0</div>
                </div>
                <div className="terminal-window">
                    {demoResponse ? (
                        <div className="terminal-response">
                            <div className="ai-label">AURA:</div>
                            <p>{demoResponse}</p>
                            <button className="btn-reset-demo" onClick={() => { setDemoResponse(null); setDemoInput(''); }}>Ask Another Question</button>
                        </div>
                    ) : (
                        <div className="terminal-prompt">
                            <div className="ai-label">AURA:</div>
                            <p>I am ready. Ask me about budgeting, investing, or financial habits.</p>
                        </div>
                    )}
                </div>
                {!demoResponse && (
                    <form className="terminal-input-area" onSubmit={handleDemoSubmit}>
                        <span className="prompt-char">&gt;</span>
                        <input 
                            type="text" 
                            value={demoInput}
                            onChange={(e) => setDemoInput(e.target.value)}
                            placeholder="e.g., How can I save $500 this month?"
                            disabled={isDemoLoading}
                        />
                        <button type="submit" disabled={isDemoLoading || !demoInput.trim()}>
                            {isDemoLoading ? 'Processing...' : 'Analyze'}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section" id="problem">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">The Problem</span>
            <h2>Traditional Finance is <span className="strike-through">Dead</span></h2>
            <p>Budgeting apps treat you like a spreadsheet. Credit scores reduce you to a number.</p>
          </div>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon dead"><i className="fas fa-table"></i></div>
              <h3>Static Budgets</h3>
              <p>Fixed categories that don't adapt to your real life.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon dead"><i className="fas fa-robot"></i></div>
              <h3>Generic Advice</h3>
              <p>One-size-fits-all tips that ignore your unique psychology.</p>
            </div>
             <div className="problem-card">
                <div className="problem-icon dead"><i className="fas fa-bell"></i></div>
                <h3>Alert Fatigue</h3>
                <p>Endless notifications that mean nothing and change nothing</p>
            </div>
            <div className="problem-card">
                <div className="problem-icon dead"><i className="fas fa-eye-slash"></i></div>
                <h3>Hidden Leaks</h3>
                <p>Subscriptions, fees, and micro-drains that silently steal your wealth</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
            <div className="section-header centered">
                <span className="section-tag">How It Works</span>
                <h2>From Chaos to <span className="gradient-text">Clarity</span></h2>
                <p>Four steps to transform your financial life forever</p>
            </div>
            <div className="steps-container">
                <div className="step">
                    <div className="step-number">01</div>
                    <div className="step-icon"><i className="fas fa-link"></i></div>
                    <h3>Connect Your Life</h3>
                    <p>Link your accounts, calendars, and preferences. AURA begins learning your unique patterns instantly.</p>
                </div>
                <div className="step">
                    <div className="step-number">02</div>
                    <div className="step-icon"><i className="fas fa-dna"></i></div>
                    <h3>Genome Genesis</h3>
                    <p>Within 7 days, your Financial Behavior Genome takes shape — a living map of your money psychology.</p>
                </div>
                <div className="step">
                    <div className="step-number">03</div>
                    <div className="step-icon"><i className="fas fa-brain"></i></div>
                    <h3>Adaptive Intelligence</h3>
                    <p>AURA begins predicting, protecting, and optimizing — silently working 24/7 to improve your financial health.</p>
                </div>
                <div className="step">
                    <div className="step-number">04</div>
                    <div className="step-icon"><i className="fas fa-chart-line"></i></div>
                    <h3>Continuous Evolution</h3>
                    <p>Your genome evolves daily. Every transaction teaches AURA something new about helping you thrive.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Financial Genome Section */}
      <section className="genome-section" id="genome">
        <div className="container">
            <div className="genome-content">
                <div className="section-header centered">
                    <span className="section-tag">Your Financial DNA</span>
                    <h2>The Genome That <span className="gradient-text">Knows You</span></h2>
                    <p>Traditional apps see transactions. AURA sees the human behind them.</p>
                </div>
                
                <div className="genome-visual-center">
                  <img 
                    src="https://media.istockphoto.com/id/2188060332/photo/digital-dna-strand-representation-in-blue-with-particle-effects.webp?a=1&b=1&s=612x612&w=0&k=20&c=Gu5ZWAHfhVHuBuOrDrGAIgYa_292dN7unqHdzUlOTHg=" 
                    alt="Financial Genome DNA" 
                    className="dna-spinner"
                  />
                </div>

                <div className="genome-traits">
                    <div className="trait">
                        <div className="trait-icon"><i className="fas fa-clock"></i></div>
                        <div className="trait-info">
                            <h4>Cashflow-Timing DNA</h4>
                            <p>AURA learns exactly when money flows in and out of your life, predicting shortfalls before they happen.</p>
                        </div>
                    </div>
                    <div className="trait">
                        <div className="trait-icon"><i className="fas fa-heart"></i></div>
                        <div className="trait-info">
                            <h4>Emotional Spending Patterns</h4>
                            <p>By analyzing context, AURA identifies stress-spending and dopamine-chasing, helping you pause before you pay.</p>
                        </div>
                    </div>
                    <div className="trait">
                        <div className="trait-icon"><i className="fas fa-dice"></i></div>
                        <div className="trait-info">
                            <h4>Risk Fingerprint</h4>
                            <p>Your unique tolerance for financial uncertainty is mapped, tailoring investment advice to your true comfort zone.</p>
                        </div>
                    </div>
                     <div className="trait">
                        <div className="trait-icon"><i className="fas fa-users"></i></div>
                        <div className="trait-info">
                            <h4>Social Influence Factor</h4>
                            <p>Understand how your social circle impacts your spending habits and reclaim your financial independence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="container">
            <div className="section-header centered">
                <span className="section-tag">Simple Pricing</span>
                <h2>Invest in Your <span className="gradient-text">Financial Freedom</span></h2>
                <p>Start free. Upgrade when AURA proves its value.</p>
            </div>
            <div className="pricing-grid">
                <div className="pricing-card">
                    <div className="pricing-header">
                        <h3>Explorer</h3>
                        <p>Perfect for getting started</p>
                    </div>
                    <div className="pricing-amount">
                        <span className="currency">$</span>
                        <span className="price">0</span>
                        <span className="period">/forever</span>
                    </div>
                    <ul className="pricing-features">
                        <li><i className="fas fa-check"></i> Basic Financial Genome</li>
                        <li><i className="fas fa-check"></i> 3-Day Income Predictions</li>
                    </ul>
                    <button className="btn btn-outline" onClick={() => onNavigate('signin')}>Start Free</button>
                </div>
                <div className="pricing-card featured">
                    <div className="popular-badge">Most Popular</div>
                    <div className="pricing-header">
                        <h3>Evolve</h3>
                        <p>For serious financial growth</p>
                    </div>
                    <div className="pricing-amount">
                        <span className="currency">$</span>
                        <span className="price">12</span>
                        <span className="period">/month</span>
                    </div>
                    <ul className="pricing-features">
                        <li><i className="fas fa-check"></i> Full Financial Genome</li>
                        <li><i className="fas fa-check"></i> 30-Day Income Radar</li>
                        <li><i className="fas fa-check"></i> Complete Spend Shield</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => onNavigate('signin')}>Start 14-Day Trial</button>
                </div>
            </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="waitlist-section" id="waitlist">
        <div className="container">
          <div className="waitlist-content">
            <div className="section-header centered">
              <span className="section-tag">Join the Revolution</span>
              <h2>Be Among the First to <span className="gradient-text">Evolve</span></h2>
            </div>
            {waitlistStatus === 'success' ? (
              <div className="success-message" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid #10b981', marginTop: '2rem' }}>
                <h3 style={{ color: '#10b981', marginBottom: '0.5rem', fontSize: '1.5rem' }}>You're on the list! 🚀</h3>
                <p style={{ color: '#e2e8f0' }}>We'll notify you at <strong>{email}</strong> when AURA is ready.</p>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={waitlistStatus === 'submitting'}
                  />
                  <button type="submit" className="btn btn-primary" disabled={waitlistStatus === 'submitting'}>
                    {waitlistStatus === 'submitting' ? (
                      <span>Joining...</span>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
