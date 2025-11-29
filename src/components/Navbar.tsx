import React, { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page: string, sectionId?: string) => {
    onNavigate(page);
    setIsMenuOpen(false);

    if (sectionId) {
      // Wait for navigation to complete/render
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <div className="logo-icon">
            <i className="fas fa-dna"></i>
          </div>
          <span>AURA</span>
        </a>
        
        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Features</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'how-it-works'); }}>How It Works</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'genome'); }}>Financial Genome</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'pricing'); }}>Pricing</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
        </ul>

        <div className="nav-actions desktop-only">
          <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); handleNavClick('signin'); }}>Sign In</a>
          <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'waitlist'); }}>Join Waitlist</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile/Sidebar Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <h3>Menu</h3>
          <ul className="mobile-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Features</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'how-it-works'); }}>How It Works</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'genome'); }}>Financial Genome</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'pricing'); }}>Pricing</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About Us</a></li>
            <li className="divider"></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('signin'); }}>Sign In</a></li>
          </ul>
          <div className="mobile-actions">
            <button className="btn btn-primary full-width" onClick={() => handleNavClick('signin')}>Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
