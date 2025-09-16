import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = '加载中...' }) => {
  const sizeClasses = {
    small: 'loading-spinner-sm',
    medium: 'loading-spinner',
    large: 'loading-spinner-lg'
  };

  return (
    <div className="loading-container">
      <span className={sizeClasses[size]}></span>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;

