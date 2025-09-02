import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('发送请求:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('收到响应:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('响应错误:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API服务类
class TodoAPI {
  /**
   * 获取待办事项列表
   * @param {string} filterType - 过滤类型: 'all', 'active', 'completed'
   * @returns {Promise} 待办事项列表
   */
  static async getTodos(filterType = 'all') {
    try {
      const response = await api.get('/todos', {
        params: { filter_type: filterType }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 创建新的待办事项
   * @param {Object} todoData - 待办事项数据
   * @param {string} todoData.title - 标题
   * @param {string} todoData.description - 描述（可选）
   * @returns {Promise} 创建的待办事项
   */
  static async createTodo(todoData) {
    try {
      const response = await api.post('/todos', todoData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 获取单个待办事项
   * @param {number} id - 待办事项ID
   * @returns {Promise} 待办事项详情
   */
  static async getTodo(id) {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 更新待办事项
   * @param {number} id - 待办事项ID
   * @param {Object} updateData - 更新数据
   * @returns {Promise} 更新后的待办事项
   */
  static async updateTodo(id, updateData) {
    try {
      const response = await api.put(`/todos/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 切换待办事项完成状态
   * @param {number} id - 待办事项ID
   * @returns {Promise} 更新后的待办事项
   */
  static async toggleTodo(id) {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 删除待办事项
   * @param {number} id - 待办事项ID
   * @returns {Promise} 删除结果
   */
  static async deleteTodo(id) {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 批量删除已完成的待办事项
   * @returns {Promise} 删除结果
   */
  static async clearCompleted() {
    try {
      const response = await api.delete('/todos/batch/completed');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 清除所有待办事项
   * @returns {Promise} 删除结果
   */
  static async clearAll() {
    try {
      const response = await api.delete('/todos/batch/all');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 统一错误处理
   * @param {Error} error - 错误对象
   * @returns {Error} 处理后的错误
   */
  static handleError(error) {
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      const message = data?.error?.message || data?.message || `HTTP ${status} 错误`;
      return new Error(message);
    } else if (error.request) {
      // 网络错误
      return new Error('网络连接失败，请检查服务器是否运行');
    } else {
      // 其他错误
      return new Error(error.message || '未知错误');
    }
  }
}

export default TodoAPI;