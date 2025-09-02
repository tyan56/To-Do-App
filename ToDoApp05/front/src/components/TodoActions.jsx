import React from 'react';
import './TodoActions.css';

const TodoActions = ({ onClearCompleted, onClearAll, completedCount, totalCount, loading }) => {
  const hasCompleted = completedCount > 0;
  const hasTodos = totalCount > 0;

  return (
    <div className="todo-actions">
      <div className="actions-info">
        <span className="todo-count">
          总计: {totalCount} 项
        </span>
        {hasCompleted && (
          <span className="completed-count">
            已完成: {completedCount} 项
          </span>
        )}
      </div>
      
      <div className="actions-buttons">
        {hasCompleted && (
          <button
            className="action-btn clear-completed-btn"
            onClick={onClearCompleted}
            disabled={loading}
          >
            🗑️ 清除已完成
          </button>
        )}
        
        {hasTodos && (
          <button
            className="action-btn clear-all-btn"
            onClick={onClearAll}
            disabled={loading}
          >
            🗑️ 清除全部
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoActions;
