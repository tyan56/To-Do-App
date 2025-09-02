import React from 'react';
import './TodoFilter.css';

const TodoFilter = ({ currentFilter, onFilterChange, todoStats }) => {
  const filters = [
    { key: 'all', label: '全部', count: todoStats.total },
    { key: 'active', label: '未完成', count: todoStats.active },
    { key: 'completed', label: '已完成', count: todoStats.completed }
  ];

  return (
    <div className="todo-filter">
      <div className="todo-filter__buttons">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`todo-filter__button ${
              currentFilter === filter.key ? 'todo-filter__button--active' : ''
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
            <span className="todo-filter__count">{filter.count}</span>
          </button>
        ))}
      </div>
      
      <div className="todo-filter__stats">
        <div className="todo-filter__stat">
          <span className="todo-filter__stat-label">总任务:</span>
          <span className="todo-filter__stat-value">{todoStats.total}</span>
        </div>
        <div className="todo-filter__stat">
          <span className="todo-filter__stat-label">完成率:</span>
          <span className="todo-filter__stat-value">
            {todoStats.total > 0 
              ? Math.round((todoStats.completed / todoStats.total) * 100)
              : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;