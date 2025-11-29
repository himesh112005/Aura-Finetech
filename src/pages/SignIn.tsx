import React, { useState } from 'react';
import './SignIn.css';

interface SignInProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication delay
    setTimeout(() => {
      // Allow any valid-looking input for demo purposes
      if (email && password.length >= 6) {
        onLogin();
      } else {
        setError('Invalid credentials. Password must be at least 6 characters.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <div className="logo-icon large">
            <i className="fas fa-dna"></i>
          </div>
          <h2>Welcome Back</h2>
          <p>Access your financial genome</p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" className="btn-signin" disabled={isLoading}>
            {isLoading ? <span className="loader"></span> : 'Sign In'}
          </button>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Join Waitlist</a></p>
          <p className="demo-hint">Hint: Use any email & password (min 6 chars)</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
