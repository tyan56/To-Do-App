import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Todo API 服务
export const todoApi = {
  // 获取所有待办事项
  getAllTodos: (completed = null) => {
    const params = {};
    if (completed !== null) {
      params.completed = completed;
    }
    return api.get('/todos', { params });
  },

  // 根据ID获取待办事项
  getTodoById: (id) => {
    return api.get(`/todos/${id}`);
  },

  // 创建待办事项
  createTodo: (todoData) => {
    return api.post('/todos', todoData);
  },

  // 更新待办事项
  updateTodo: (id, todoData) => {
    return api.put(`/todos/${id}`, todoData);
  },

  // 切换待办事项状态
  toggleTodoStatus: (id) => {
    return api.patch(`/todos/${id}/toggle`);
  },

  // 删除待办事项
  deleteTodo: (id) => {
    return api.delete(`/todos/${id}`);
  },

  // 删除已完成的待办事项
  deleteCompletedTodos: () => {
    return api.delete('/todos/completed');
  },

  // 删除所有待办事项
  deleteAllTodos: () => {
    return api.delete('/todos/all');
  },

  // 搜索待办事项
  searchTodos: (title) => {
    return api.get('/todos/search', { params: { title } });
  },

  // 根据优先级获取待办事项
  getTodosByPriority: (priority) => {
    return api.get(`/todos/priority/${priority}`);
  },

  // 获取即将到期的待办事项
  getUpcomingTodos: (dueDate) => {
    return api.get('/todos/upcoming', { params: { dueDate } });
  },

  // 统计待办事项数量
  countTodos: (completed = null) => {
    const params = {};
    if (completed !== null) {
      params.completed = completed;
    }
    return api.get('/todos/count', { params });
  },
};

// 健康检查API
export const healthApi = {
  checkHealth: () => {
    return api.get('/health');
  },
};

export default api;
