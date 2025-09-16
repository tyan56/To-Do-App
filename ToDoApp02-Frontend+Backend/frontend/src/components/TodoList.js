import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, loading, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="todo-list">
        <div className="todo-list-header">
          <h2 className="todo-list-title">任务列表</h2>
          <span className="todo-count">加载中...</span>
        </div>
        <div className="loading-container">
          <span className="loading-spinner"></span>
          <span className="loading-text">正在加载任务...</span>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="todo-list-header">
          <h2 className="todo-list-title">任务列表</h2>
          <span className="todo-count">0 个任务</span>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">暂无任务</h3>
          <p className="empty-state-description">
            点击上方"添加新任务"开始创建您的第一个任务吧！
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h2 className="todo-list-title">任务列表</h2>
        <span className="todo-count">{todos.length} 个任务</span>
      </div>
      <div className="todo-list-content">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

