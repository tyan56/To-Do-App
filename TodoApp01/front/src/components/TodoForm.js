import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('请输入任务标题');
      return;
    }

    try {
      await onAddTodo({
        title: title.trim(),
        description: description.trim()
      });
      
      // 清空表单
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('添加任务失败: ' + error.message);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__input-group">
        <input
          type="text"
          className="todo-form__input"
          placeholder="输入新任务..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          maxLength={255}
        />
        <button 
          type="submit" 
          className="todo-form__button"
          disabled={loading || !title.trim()}
        >
          {loading ? '添加中...' : '添加'}
        </button>
      </div>
      
      <textarea
        className="todo-form__textarea"
        placeholder="任务描述（可选）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        rows={2}
      />
    </form>
  );
};

export default TodoForm;