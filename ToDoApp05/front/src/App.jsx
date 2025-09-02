import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import { todoApi } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({ total: 0, active: 0, completed: 0 });

  // 获取待办事项列表
  const fetchTodos = async (completed = null) => {
    try {
      setLoading(true);
      const response = await todoApi.getAllTodos(completed);
      if (response.code === 200) {
        setTodos(response.data || []);
      }
    } catch (error) {
      console.error('获取待办事项失败:', error);
      alert('获取待办事项失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取统计数据
  const fetchCounts = async () => {
    try {
      const [totalRes, activeRes, completedRes] = await Promise.all([
        todoApi.countTodos(),
        todoApi.countTodos(false),
        todoApi.countTodos(true)
      ]);

      setCounts({
        total: totalRes.code === 200 ? totalRes.data : 0,
        active: activeRes.code === 200 ? activeRes.data : 0,
        completed: completedRes.code === 200 ? completedRes.data : 0
      });
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchTodos();
    fetchCounts();
  }, []);

  // 根据过滤条件获取数据
  useEffect(() => {
    let completed = null;
    if (filter === 'active') completed = false;
    else if (filter === 'completed') completed = true;
    
    fetchTodos(completed);
  }, [filter]);

  // 添加待办事项
  const handleAddTodo = async (todoData) => {
    try {
      setLoading(true);
      const response = await todoApi.createTodo(todoData);
      if (response.code === 201) {
        // 重新获取数据
        fetchTodos();
        fetchCounts();
      }
    } catch (error) {
      console.error('添加待办事项失败:', error);
      alert('添加待办事项失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 切换待办事项状态
  const handleToggleTodo = async (id) => {
    try {
      const response = await todoApi.toggleTodoStatus(id);
      if (response.code === 200) {
        // 更新本地状态
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo.id === id 
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        );
        fetchCounts();
      }
    } catch (error) {
      console.error('切换状态失败:', error);
      alert('切换状态失败，请重试');
    }
  };

  // 删除待办事项
  const handleDeleteTodo = async (id) => {
    if (!confirm('确定要删除这个待办事项吗？')) return;
    
    try {
      const response = await todoApi.deleteTodo(id);
      if (response.code === 200) {
        // 更新本地状态
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        fetchCounts();
      }
    } catch (error) {
      console.error('删除待办事项失败:', error);
      alert('删除待办事项失败，请重试');
    }
  };

  // 更新待办事项
  const handleUpdateTodo = (todo) => {
    // 这里可以实现编辑功能，暂时显示提示
    alert(`编辑功能开发中...\n待办事项: ${todo.title}`);
  };

  // 清除已完成的待办事项
  const handleClearCompleted = async () => {
    if (!confirm('确定要删除所有已完成的待办事项吗？')) return;
    
    try {
      setLoading(true);
      const response = await todoApi.deleteCompletedTodos();
      if (response.code === 200) {
        // 重新获取数据
        fetchTodos();
        fetchCounts();
      }
    } catch (error) {
      console.error('清除已完成项目失败:', error);
      alert('清除已完成项目失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 清除所有待办事项
  const handleClearAll = async () => {
    if (!confirm('确定要删除所有待办事项吗？此操作不可恢复！')) return;
    
    try {
      setLoading(true);
      const response = await todoApi.deleteAllTodos();
      if (response.code === 200) {
        // 重新获取数据
        fetchTodos();
        fetchCounts();
      }
    } catch (error) {
      console.error('清除所有项目失败:', error);
      alert('清除所有项目失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 过滤待办事项
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header />
        
        <TodoForm 
          onAddTodo={handleAddTodo}
          loading={loading}
        />
        
        <TodoFilter 
          filter={filter}
          onFilterChange={handleFilterChange}
          counts={counts}
        />
        
        <TodoList 
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
          loading={loading}
          filter={filter}
        />
        
        <TodoActions 
          onClearCompleted={handleClearCompleted}
          onClearAll={handleClearAll}
          completedCount={counts.completed}
          totalCount={counts.total}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
