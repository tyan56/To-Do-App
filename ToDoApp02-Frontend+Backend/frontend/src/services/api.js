const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }
  
  async getTodos(status = 'all', page = 1, limit = 50) {
    return this.request(`/todos?status=${status}&page=${page}&limit=${limit}`);
  }
  
  async createTodo(todoData) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }
  
  async updateTodo(id, updates) {
    return this.request(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
  
  async deleteTodo(id) {
    return this.request(`/todos/${id}`, {
      method: 'DELETE',
    });
  }
  
  async clearCompleted() {
    return this.request('/todos/completed', {
      method: 'DELETE',
    });
  }
  
  async clearAll() {
    return this.request('/todos/all', {
      method: 'DELETE',
    });
  }
}

export const todoApi = new ApiService(API_BASE_URL);

