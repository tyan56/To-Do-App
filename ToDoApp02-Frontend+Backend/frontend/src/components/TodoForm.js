import React, { useState, memo, useCallback } from 'react';
import { validateInput } from '../utils/helpers';

const TodoForm = memo(({ onAddTodo, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // 验证输入
    const titleError = validateInput(title, 1, 255);
    if (titleError) {
      setError(titleError);
      return;
    }

    const descriptionError = description ? validateInput(description, 1, 1000) : null;
    if (descriptionError) {
      setError(descriptionError);
      return;
    }

    try {
      setError('');
      await onAddTodo({
        title: title.trim(),
        description: description.trim() || null
      });
      
      // 清空表单
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message || '添加任务失败');
    }
  }, [title, description, onAddTodo]);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
    if (error) setError('');
  }, [error]);

  return (
    <div className="todo-form">
      <div className="todo-form-header">
        <span className="todo-form-icon">📝</span>
        <h2 className="todo-form-title">添加新任务</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-row">
          <div className="form-input-group">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                任务标题 *
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="请输入任务标题..."
                value={title}
                onChange={handleTitleChange}
                disabled={loading}
                maxLength={255}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            任务描述
          </label>
          <textarea
            id="description"
            className="input textarea"
            placeholder="请输入任务描述（可选）..."
            value={description}
            onChange={handleDescriptionChange}
            disabled={loading}
            maxLength={1000}
            rows={3}
          />
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading || !title.trim()}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                添加中...
              </>
            ) : (
              <>
                <span>➕</span>
                添加任务
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
});

TodoForm.displayName = 'TodoForm';

export default TodoForm;

