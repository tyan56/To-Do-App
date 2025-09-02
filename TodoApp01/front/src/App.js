import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import TodoAPI from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 计算统计信息
  const todoStats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  // 加载待办事项
  const loadTodos = useCallback(async (filterType = filter) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await TodoAPI.getTodos(filterType);
      setTodos(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('加载待办事项失败:', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // 初始加载
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // 添加待办事项
  const handleAddTodo = async (todoData) => {
    setLoading(true);
    try {
      await TodoAPI.createTodo(todoData);
      await loadTodos(); // 重新加载列表
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 切换完成状态
  const handleToggleTodo = async (id) => {
    setLoading(true);
    try {
      await TodoAPI.toggleTodo(id);
      await loadTodos(); // 重新加载以保持过滤状态
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 删除待办事项
  const handleDeleteTodo = async (id) => {
    setLoading(true);
    try {
      await TodoAPI.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 更新待办事项
  const handleUpdateTodo = async (id, updateData) => {
    setLoading(true);
    try {
      await TodoAPI.updateTodo(id, updateData);
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 过滤器变化
  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    await loadTodos(newFilter);
  };

  // 清除已完成
  const handleClearCompleted = async () => {
    setLoading(true);
    try {
      await TodoAPI.clearCompleted();
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 清除全部
  const handleClearAll = async () => {
    setLoading(true);
    try {
      await TodoAPI.clearAll();
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 刷新数据
  const handleRefresh = () => {
    loadTodos();
  };

  return (
    <div className="app">
      <div className="app__container">
        {/* 头部 */}
        <header className="app__header">
          <h1 className="app__title">📝 待办事项管理</h1>
          <p className="app__subtitle">高效管理您的日常任务</p>
          <button 
            className="app__refresh"
            onClick={handleRefresh}
            disabled={loading}
            title="刷新数据"
          >
            🔄
          </button>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="app__error">
            <span className="app__error-icon">⚠️</span>
            <span className="app__error-message">{error}</span>
            <button 
              className="app__error-close"
              onClick={() => setError(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* 添加待办事项表单 */}
        <TodoForm 
          onAddTodo={handleAddTodo}
          loading={loading}
        />

        {/* 过滤器 */}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          todoStats={todoStats}
        />

        {/* 待办事项列表 */}
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />

        {/* 批量操作 */}
        <TodoActions
          onClearCompleted={handleClearCompleted}
          onClearAll={handleClearAll}
          todoStats={todoStats}
          loading={loading}
        />

        {/* 页脚 */}
        <footer className="app__footer">
          <p>© 2024 待办事项管理系统 | 让生活更有序</p>
        </footer>
      </div>
    </div>
  );
}

export default App;