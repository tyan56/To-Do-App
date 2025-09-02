import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const priorityLabels = ['低', '中', '高'];
  const priorityColors = ['#28a745', '#ffc107', '#dc3545'];
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <div className="todo-title-section">
            <button
              className={`toggle-button ${todo.completed ? 'completed' : ''}`}
              onClick={() => onToggle(todo.id)}
              title={todo.completed ? '标记为未完成' : '标记为已完成'}
            >
              {todo.completed ? '✓' : '○'}
            </button>
            <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </h3>
            {todo.priority > 0 && (
              <span 
                className="priority-badge"
                style={{ backgroundColor: priorityColors[todo.priority] }}
              >
                {priorityLabels[todo.priority]}
              </span>
            )}
          </div>
          <div className="todo-actions">
            <button
              className="action-button edit-button"
              onClick={() => onUpdate(todo)}
              title="编辑"
            >
              ✏️
            </button>
            <button
              className="action-button delete-button"
              onClick={() => onDelete(todo.id)}
              title="删除"
            >
              🗑️
            </button>
          </div>
        </div>
        
        {todo.description && (
          <p className={`todo-description ${todo.completed ? 'completed' : ''}`}>
            {todo.description}
          </p>
        )}
        
        <div className="todo-meta">
          {todo.dueDate && (
            <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
              📅 {formatDate(todo.dueDate)}
              {isOverdue() && <span className="overdue-label">已逾期</span>}
            </span>
          )}
          <span className="created-date">
            📝 {formatDate(todo.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
