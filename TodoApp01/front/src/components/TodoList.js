import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, loading, onToggle, onDelete, onUpdate }) => {
  if (loading) {
    return (
      <div className="todo-list">
        <div className="todo-list__loading">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="todo-list__empty">
          <div className="empty-icon">📝</div>
          <h3>暂无待办事项</h3>
          <p>添加一个新任务开始使用吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h2>待办事项列表</h2>
        <span className="todo-list__count">
          共 {todos.length} 项任务
        </span>
      </div>
      
      <div className="todo-list__items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;