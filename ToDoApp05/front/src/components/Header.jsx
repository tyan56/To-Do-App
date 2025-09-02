import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">📝</span>
          Todo应用
        </h1>
        <p className="header-subtitle">高效管理您的待办事项</p>
      </div>
    </header>
  );
};

export default Header;
