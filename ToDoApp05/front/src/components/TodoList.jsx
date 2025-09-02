import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onUpdate, loading, filter }) => {
  if (loading) {
    return (
      <div className="todo-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    const emptyMessages = {
      all: '还没有待办事项，开始添加第一个任务吧！',
      active: '没有未完成的任务，太棒了！',
      completed: '还没有完成的任务'
    };
    
    return (
      <div className="todo-list">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p className="empty-message">{emptyMessages[filter]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
