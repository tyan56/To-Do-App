import React from 'react';
import './TodoFilter.css';

const TodoFilter = ({ filter, onFilterChange, counts }) => {
  const filterOptions = [
    { value: 'all', label: '全部', count: counts.total },
    { value: 'active', label: '未完成', count: counts.active },
    { value: 'completed', label: '已完成', count: counts.completed }
  ];

  return (
    <div className="todo-filter">
      <div className="filter-tabs">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`filter-tab ${filter === option.value ? 'active' : ''}`}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
            <span className="filter-count">({option.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
