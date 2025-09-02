import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggle = async () => {
    try {
      await onToggle(todo.id);
    } catch (error) {
      alert('状态更新失败: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个任务吗？')) {
      try {
        await onDelete(todo.id);
      } catch (error) {
        alert('删除任务失败: ' + error.message);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('任务标题不能为空');
      return;
    }

    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: todo.completed
      });
      setIsEditing(false);
    } catch (error) {
      alert('更新任务失败: ' + error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      {isEditing ? (
        <div className="todo-item__edit-form">
          <input
            type="text"
            className="todo-item__edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="任务标题"
            maxLength={255}
          />
          <textarea
            className="todo-item__edit-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="任务描述（可选）"
            rows={2}
          />
          <div className="todo-item__edit-actions">
            <button 
              className="todo-item__button todo-item__button--save"
              onClick={handleSave}
              disabled={loading}
            >
              保存
            </button>
            <button 
              className="todo-item__button todo-item__button--cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-item__content">
            <div className="todo-item__header">
              <label className="todo-item__checkbox-label">
                <input
                  type="checkbox"
                  className="todo-item__checkbox"
                  checked={todo.completed}
                  onChange={handleToggle}
                  disabled={loading}
                />
                <span className="todo-item__checkmark"></span>
              </label>
              <h3 className="todo-item__title">{todo.title}</h3>
            </div>
            
            {todo.description && (
              <p className="todo-item__description">{todo.description}</p>
            )}
            
            <div className="todo-item__meta">
              <span className="todo-item__date">
                创建于: {formatDate(todo.created_at)}
              </span>
              {todo.updated_at !== todo.created_at && (
                <span className="todo-item__date">
                  更新于: {formatDate(todo.updated_at)}
                </span>
              )}
            </div>
          </div>

          <div className="todo-item__actions">
            <button
              className="todo-item__button todo-item__button--edit"
              onClick={handleEdit}
              disabled={loading}
              title="编辑"
            >
              ✏️
            </button>
            <button
              className="todo-item__button todo-item__button--delete"
              onClick={handleDelete}
              disabled={loading}
              title="删除"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;