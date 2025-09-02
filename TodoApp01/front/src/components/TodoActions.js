import React from 'react';
import './TodoActions.css';

const TodoActions = ({ onClearCompleted, onClearAll, todoStats, loading }) => {
  const handleClearCompleted = async () => {
    if (todoStats.completed === 0) {
      alert('没有已完成的任务可以清除');
      return;
    }

    if (window.confirm(`确定要清除所有 ${todoStats.completed} 个已完成的任务吗？`)) {
      try {
        await onClearCompleted();
      } catch (error) {
        alert('清除已完成任务失败: ' + error.message);
      }
    }
  };

  const handleClearAll = async () => {
    if (todoStats.total === 0) {
      alert('没有任务可以清除');
      return;
    }

    if (window.confirm(`确定要清除所有 ${todoStats.total} 个任务吗？此操作不可撤销！`)) {
      try {
        await onClearAll();
      } catch (error) {
        alert('清除所有任务失败: ' + error.message);
      }
    }
  };

  return (
    <div className="todo-actions">
      <div className="todo-actions__header">
        <h3>批量操作</h3>
        <span className="todo-actions__subtitle">
          管理您的待办事项
        </span>
      </div>

      <div className="todo-actions__buttons">
        <button
          className="todo-actions__button todo-actions__button--warning"
          onClick={handleClearCompleted}
          disabled={loading || todoStats.completed === 0}
          title={`清除 ${todoStats.completed} 个已完成任务`}
        >
          <span className="todo-actions__button-icon">🗑️</span>
          <span className="todo-actions__button-text">
            清除已完成
            {todoStats.completed > 0 && (
              <span className="todo-actions__button-count">
                ({todoStats.completed})
              </span>
            )}
          </span>
        </button>

        <button
          className="todo-actions__button todo-actions__button--danger"
          onClick={handleClearAll}
          disabled={loading || todoStats.total === 0}
          title={`清除所有 ${todoStats.total} 个任务`}
        >
          <span className="todo-actions__button-icon">💀</span>
          <span className="todo-actions__button-text">
            清除全部
            {todoStats.total > 0 && (
              <span className="todo-actions__button-count">
                ({todoStats.total})
              </span>
            )}
          </span>
        </button>
      </div>

      {loading && (
        <div className="todo-actions__loading">
          <div className="loading-spinner-small"></div>
          <span>操作进行中...</span>
        </div>
      )}
    </div>
  );
};

export default TodoActions;