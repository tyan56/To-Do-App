import React, { memo } from 'react';
import { FILTER_STATUS, FILTER_LABELS } from '../utils/constants';

const FilterBar = memo(({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { value: FILTER_STATUS.ALL, label: FILTER_LABELS[FILTER_STATUS.ALL] },
    { value: FILTER_STATUS.PENDING, label: FILTER_LABELS[FILTER_STATUS.PENDING] },
    { value: FILTER_STATUS.COMPLETED, label: FILTER_LABELS[FILTER_STATUS.COMPLETED] }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="stats-info">
        <div className="stat-item">
          <span>📊</span>
          <span>总计: <span className="stat-number">{stats.total}</span></span>
        </div>
        <div className="stat-item">
          <span>⏳</span>
          <span>待完成: <span className="stat-number">{stats.pending}</span></span>
        </div>
        <div className="stat-item">
          <span>✅</span>
          <span>已完成: <span className="stat-number">{stats.completed}</span></span>
        </div>
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;

