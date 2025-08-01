import React, { useState } from 'react';
import './BottomNav.css';
import MenuDrawer from './MenuDrawer';
import { useLocation, useNavigate } from 'react-router-dom';
import { showNotAvailableToast } from './showNotAvailableToast';

const navItems = [
  { label: 'Home', icon: '🏠', route: '/home' },
  { label: 'Explore', icon: '🔍', route: '/explore' },
  { label: 'Upload', icon: '⬆️', route: '/upload' },
  { label: 'Settings', icon: '⚙️', route: '/settings' },
  { label: 'Menu', icon: <span style={{fontSize:'2rem',lineHeight:1}}>&#9776;</span>, isMenu: true },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (item) => {
    if (item.isMenu) {
      setMenuOpen(true);
    } else if (item.label === 'Upload') {
      showNotAvailableToast();
    } else if (item.label === 'Explore') {
      navigate('/explore');
    } else {
      navigate(item.route);
    }
  };

  return (
    <>
      <nav
        className="BottomNav"
        role="navigation"
        aria-label="Bottom Navigation"
      >
        <div className="BottomNav-grid">
          {navItems.map(item => {
            const isActive = item.route && location.pathname.startsWith(item.route);
            return (
              <button
                key={item.label}
                className={`BottomNav-item${isActive ? ' active' : ''}${item.isMenu ? ' BottomNav-menu' : ''}`}
                onClick={() => handleNavClick(item)}
                aria-label={item.label}
                type="button"
                tabIndex={0}
              >
                <span className="BottomNav-icon">{item.icon}</span>
                <span className="BottomNav-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default BottomNav;
