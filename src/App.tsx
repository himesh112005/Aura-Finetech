import { useState, useEffect } from 'react';
import MenuBar from './components/MenuBar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import SignIn from './pages/SignIn';
import DashboardOverview from './components/DashboardOverview';
import IncomeRadar from './components/IncomeRadar';
import SimulateFutures from './components/SimulateFutures';
import GhostMode from './components/GhostMode';
import OpportunityRadar from './components/OpportunityRadar';
import SpendShield from './components/SpendShield';
import BudgetPlanner from './components/BudgetPlanner';
import FinancialGoals from './components/FinancialGoals';
import FinancialReports from './components/FinancialReports';
import SpendingPredictions from './components/SpendingPredictions';
import LoanCalculator from './components/LoanCalculator';
import RetirementPlanner from './components/RetirementPlanner';
import LearnBasics from './components/LearnBasics';
import LearnVideos from './components/LearnVideos';
import AIChat from './components/AIChat';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [dashboardPage, setDashboardPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, dashboardPage]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    setDashboardPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderWebsiteContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'features':
        return <Features />;
      case 'about':
        return <About />;
      case 'signin':
        return <SignIn onLogin={handleLogin} onNavigate={setCurrentView} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  const renderDashboardContent = () => {
    switch (dashboardPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'ai-chat':
      case 'ai-assistant':
        return <AIChat />;
      case 'income-radar':
        return <IncomeRadar />;
      case 'sim-invest':
        return <SimulateFutures />;
      case 'ai-auto': 
        return <GhostMode />;
      case 'ai-recs': 
        return <OpportunityRadar />;
      case 'spend-shield': 
      case 'ai-health': 
        return <SpendShield />;
      case 'budget':
        return <BudgetPlanner />;
      case 'goals':
        return <FinancialGoals />;
      case 'reports':
        return <FinancialReports />;
      case 'ai-predict':
        return <SpendingPredictions />;
      case 'sim-loan':
        return <LoanCalculator />;
      case 'sim-retirement':
      case 'sim-retire':
        return <RetirementPlanner />;
      case 'learn-basics':
        return <LearnBasics />;
      case 'learn-videos':
      case 'learn-invest':
        return <LearnVideos />;
      default:
        return <h1>{dashboardPage.replace(/-/g, ' ').toUpperCase()}</h1>;
    }
  };

  // Check if user is trying to access dashboard without auth
  if (currentView === 'dashboard' && !isAuthenticated) {
     return <SignIn onLogin={handleLogin} onNavigate={setCurrentView} />;
  }

  if (currentView === 'dashboard' && isAuthenticated) {
    return (
      <div className="App dashboard-mode">
        <MenuBar onNavigate={setDashboardPage} onLogout={handleLogout} />
        <main style={{ 
          padding: '2rem', 
          color: '#e2e8f0', 
          minHeight: 'calc(100vh - 60px)', 
          background: '#0f172a' 
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <button 
              onClick={() => setCurrentView('home')}
              style={{ 
                background: 'transparent', 
                border: '1px solid #38bdf8', 
                color: '#38bdf8', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 500
              }}
            >
              <span>←</span> Back to Home
            </button>
          </div>
          <div style={{ 
            // Removed the background wrapper here to let DashboardOverview handle its own layout
          }}>
            {renderDashboardContent()}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App website-mode">
      {currentView !== 'signin' && <Navbar onNavigate={setCurrentView} />}
      
      <div className="content-wrapper" style={currentView === 'signin' ? { paddingTop: 0 } : {}}>
        {currentView === 'about' ? (
          <About />
        ) : (
          <>
            {renderWebsiteContent()}
            {currentView !== 'signin' && <About />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;