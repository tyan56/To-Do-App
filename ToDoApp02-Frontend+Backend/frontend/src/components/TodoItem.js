import React, { useState, memo, useCallback } from 'react';
import { formatDate } from '../utils/helpers';

const TodoItem = memo(({ todo, onUpdate, onDelete, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = useCallback(async () => {
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (err) {
      console.error('更新任务状态失败:', err);
    }
  }, [todo.id, todo.completed, onUpdate]);

  const handleDelete = useCallback(async () => {
    if (window.confirm('确定要删除这个任务吗？')) {
      try {
        await onDelete(todo.id);
      } catch (err) {
        console.error('删除任务失败:', err);
      }
    }
  }, [todo.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  }, [todo.title, todo.description]);

  const handleSaveEdit = useCallback(async () => {
    if (!editTitle.trim()) return;
    
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null
      });
      setIsEditing(false);
    } catch (err) {
      console.error('更新任务失败:', err);
    }
  }, [editTitle, editDescription, todo.id, onUpdate]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  }, [todo.title, todo.description]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  }, [handleSaveEdit, handleCancelEdit]);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={loading}
      />
      
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              maxLength={255}
            />
            <textarea
              className="input textarea"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="任务描述（可选）"
              maxLength={1000}
              rows={2}
            />
            <div className="edit-actions">
              <button
                className="btn btn-success btn-sm"
                onClick={handleSaveEdit}
                disabled={!editTitle.trim()}
              >
                保存
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={handleCancelEdit}
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span>创建时间: {formatDate(todo.created_at)}</span>
              {todo.updated_at !== todo.created_at && (
                <span>更新时间: {formatDate(todo.updated_at)}</span>
              )}
            </div>
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="todo-actions">
          <button
            className="todo-action-btn complete"
            onClick={handleToggleComplete}
            disabled={loading}
            title={todo.completed ? '标记为未完成' : '标记为完成'}
          >
            {todo.completed ? '↩️' : '✅'}
          </button>
          <button
            className="todo-action-btn edit"
            onClick={handleEdit}
            disabled={loading}
            title="编辑任务"
          >
            ✏️
          </button>
          <button
            className="todo-action-btn delete"
            onClick={handleDelete}
            disabled={loading}
            title="删除任务"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;

