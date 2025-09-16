import React, { useState, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoForm from './TodoForm';
import FilterBar from './FilterBar';
import TodoList from './TodoList';
import ActionBar from './ActionBar';
import LoadingSpinner from './LoadingSpinner';
import { FILTER_STATUS } from '../utils/constants';

const TodoApp = () => {
  const {
    todos,
    loading,
    error,
    filter,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    clearAll,
    changeFilter,
    refreshTodos
  } = useTodos();

  // 使用本地存储保存筛选状态
  const [savedFilter, setSavedFilter] = useLocalStorage('todo-filter', FILTER_STATUS.ALL);

  // 消息状态
  const [message, setMessage] = useState({ type: '', text: '' });

  // 显示消息
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // 初始化时恢复保存的筛选状态
  useEffect(() => {
    if (savedFilter !== filter) {
      changeFilter(savedFilter);
    }
  }, [savedFilter, filter, changeFilter]);

  // 保存筛选状态到本地存储
  const handleFilterChange = (newFilter) => {
    changeFilter(newFilter);
    setSavedFilter(newFilter);
  };

  // 处理添加任务
  const handleAddTodo = async (todoData) => {
    try {
      await addTodo(todoData);
      showMessage('success', '任务添加成功！');
    } catch (err) {
      showMessage('error', err.message || '添加任务失败');
    }
  };

  // 处理更新任务
  const handleUpdateTodo = async (id, updates) => {
    try {
      await updateTodo(id, updates);
      if (updates.completed !== undefined) {
        const action = updates.completed ? '完成' : '取消完成';
        showMessage('success', `任务已${action}！`);
      } else {
        showMessage('success', '任务更新成功！');
      }
    } catch (err) {
      showMessage('error', err.message || '更新任务失败');
    }
  };

  // 处理删除任务
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      showMessage('success', '任务删除成功！');
    } catch (err) {
      showMessage('error', err.message || '删除任务失败');
    }
  };

  // 处理清除已完成任务
  const handleClearCompleted = async () => {
    try {
      const response = await clearCompleted();
      showMessage('success', response.message || '已完成任务清除成功！');
    } catch (err) {
      showMessage('error', err.message || '清除已完成任务失败');
    }
  };

  // 处理清空所有任务
  const handleClearAll = async () => {
    try {
      const response = await clearAll();
      showMessage('success', response.message || '所有任务清空成功！');
    } catch (err) {
      showMessage('error', err.message || '清空所有任务失败');
    }
  };

  // 处理错误重试
  const handleRetry = () => {
    refreshTodos();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📋 待办事项管理</h1>
      
      {/* 消息提示 */}
      {message.text && (
        <div className={`${message.type}-message`}>
          {message.text}
        </div>
      )}
      
      {/* 错误提示 */}
      {error && (
        <div className="error-message">
          <strong>错误：</strong>{error}
          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleRetry}
            style={{ marginLeft: '10px' }}
          >
            重试
          </button>
        </div>
      )}
      
      {/* 添加任务表单 */}
      <TodoForm 
        onAddTodo={handleAddTodo}
        loading={loading}
      />
      
      {/* 筛选栏 */}
      <FilterBar
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        stats={stats}
      />
      
      {/* 任务列表 */}
      <TodoList
        todos={todos}
        loading={loading}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
      />
      
      {/* 操作栏 */}
      <ActionBar
        stats={stats}
        onClearCompleted={handleClearCompleted}
        onClearAll={handleClearAll}
        loading={loading}
      />
      
      {/* 全局加载状态 */}
      {loading && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <LoadingSpinner size="large" text="处理中..." />
        </div>
      )}
    </div>
  );
};

export default TodoApp;

