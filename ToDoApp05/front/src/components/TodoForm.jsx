import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('请输入待办事项标题');
      return;
    }

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      priority: parseInt(priority),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };

    onAddTodo(todoData);
    
    // 清空表单
    setTitle('');
    setDescription('');
    setPriority(0);
    setDueDate('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group title-group">
          <input
            type="text"
            placeholder="输入新的待办事项..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
            disabled={loading}
            maxLength={255}
          />
        </div>
        <button 
          type="submit" 
          className="add-button"
          disabled={loading || !title.trim()}
        >
          {loading ? '添加中...' : '添加'}
        </button>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <textarea
            placeholder="描述（可选）..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="todo-textarea"
            disabled={loading}
            rows="2"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
            disabled={loading}
          >
            <option value={0}>优先级：低</option>
            <option value={1}>优先级：中</option>
            <option value={2}>优先级：高</option>
          </select>
        </div>
        
        <div className="form-group">
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="due-date-input"
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
