import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '../services/api';
import { FILTER_STATUS } from '../utils/constants';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(FILTER_STATUS.ALL);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  
  // 获取待办事项列表
  const fetchTodos = useCallback(async (status = filter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await todoApi.getTodos(status);
      setTodos(response.todos);
      setStats({
        total: response.total,
        completed: response.completed_count,
        pending: response.pending_count
      });
    } catch (err) {
      setError(err.message);
      console.error('获取待办事项失败:', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  
  // 添加待办事项
  const addTodo = useCallback(async (todoData) => {
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1
      }));
      return newTodo;
    } catch (err) {
      setError(err.message);
      console.error('添加待办事项失败:', err);
      throw err;
    }
  }, []);
  
  // 更新待办事项
  const updateTodo = useCallback(async (id, updates) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      
      // 更新统计信息
      if (updates.completed !== undefined) {
        setStats(prev => {
          const oldTodo = todos.find(t => t.id === id);
          if (!oldTodo) return prev;
          
          const wasCompleted = oldTodo.completed;
          const isCompleted = updates.completed;
          
          if (wasCompleted && !isCompleted) {
            return {
              ...prev,
              completed: prev.completed - 1,
              pending: prev.pending + 1
            };
          } else if (!wasCompleted && isCompleted) {
            return {
              ...prev,
              completed: prev.completed + 1,
              pending: prev.pending - 1
            };
          }
          return prev;
        });
      }
      
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      console.error('更新待办事项失败:', err);
      throw err;
    }
  }, [todos]);
  
  // 删除待办事项
  const deleteTodo = useCallback(async (id) => {
    try {
      await todoApi.deleteTodo(id);
      const deletedTodo = todos.find(t => t.id === id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      
      // 更新统计信息
      if (deletedTodo) {
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          completed: deletedTodo.completed ? prev.completed - 1 : prev.completed,
          pending: !deletedTodo.completed ? prev.pending - 1 : prev.pending
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error('删除待办事项失败:', err);
      throw err;
    }
  }, [todos]);
  
  // 清除已完成事项
  const clearCompleted = useCallback(async () => {
    try {
      const response = await todoApi.clearCompleted();
      setTodos(prev => prev.filter(todo => !todo.completed));
      setStats(prev => ({
        ...prev,
        total: prev.total - prev.completed,
        completed: 0
      }));
      return response;
    } catch (err) {
      setError(err.message);
      console.error('清除已完成事项失败:', err);
      throw err;
    }
  }, []);
  
  // 清空所有事项
  const clearAll = useCallback(async () => {
    try {
      const response = await todoApi.clearAll();
      setTodos([]);
      setStats({
        total: 0,
        completed: 0,
        pending: 0
      });
      return response;
    } catch (err) {
      setError(err.message);
      console.error('清空所有事项失败:', err);
      throw err;
    }
  }, []);
  
  // 切换筛选状态
  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);
  
  // 根据筛选状态获取显示的任务列表
  const getFilteredTodos = useCallback(() => {
    switch (filter) {
      case FILTER_STATUS.COMPLETED:
        return todos.filter(todo => todo.completed);
      case FILTER_STATUS.PENDING:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  // 初始化加载
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  
  return {
    todos: getFilteredTodos(),
    allTodos: todos,
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
    refreshTodos: fetchTodos
  };
};

