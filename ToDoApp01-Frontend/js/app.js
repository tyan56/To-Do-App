// 待办事项应用主文件
class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = {
      search: '',
      priority: '',
      status: '',
      date: ''
    };
    this.currentSort = 'date';
    this.editingId = null;
    
    this.init();
  }

  // 初始化应用
  init() {
    this.loadTodos();
    this.bindEvents();
    this.render();
    this.updateStats();
  }

  // 绑定事件监听器
  bindEvents() {
    // 添加任务表单
    document.getElementById('todo-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });

    // 搜索功能
    document.getElementById('search-task').addEventListener('input', (e) => {
      this.currentFilter.search = e.target.value.toLowerCase();
      this.render();
    });

    // 筛选功能
    document.getElementById('filter-priority').addEventListener('change', (e) => {
      this.currentFilter.priority = e.target.value;
      this.render();
    });

    document.getElementById('filter-status').addEventListener('change', (e) => {
      this.currentFilter.status = e.target.value;
      this.render();
    });

    document.getElementById('filter-date').addEventListener('change', (e) => {
      this.currentFilter.date = e.target.value;
      this.render();
    });

    // 清除筛选
    document.getElementById('clear-filters').addEventListener('click', () => {
      this.clearFilters();
    });

    // 排序功能
    document.getElementById('sort-by-date').addEventListener('click', () => {
      this.setSort('date');
    });

    document.getElementById('sort-by-priority').addEventListener('click', () => {
      this.setSort('priority');
    });

    // 模态框事件
    document.getElementById('close-modal').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('edit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEdit();
    });

    // 点击模态框背景关闭
    document.getElementById('edit-modal').addEventListener('click', (e) => {
      if (e.target.id === 'edit-modal') {
        this.closeModal();
      }
    });
  }

  // 添加新任务
  addTodo() {
    const taskInput = document.getElementById('new-task');
    const prioritySelect = document.getElementById('new-priority');
    const dateInput = document.getElementById('new-date');

    const task = taskInput.value.trim();
    const priority = prioritySelect.value;
    const date = dateInput.value;

    if (!task) {
      this.showNotification('请输入任务内容', 'error');
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      text: task,
      priority: priority,
      date: date,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.unshift(newTodo);
    this.saveTodos();
    this.render();
    this.updateStats();

    // 清空表单
    taskInput.value = '';
    prioritySelect.value = 'medium';
    dateInput.value = '';

    this.showNotification('任务添加成功', 'success');
  }

  // 删除任务
  deleteTodo(id) {
    if (confirm('确定要删除这个任务吗？')) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
      this.render();
      this.updateStats();
      this.showNotification('任务已删除', 'success');
    }
  }

  // 切换任务完成状态
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
      this.updateStats();
    }
  }

  // 编辑任务
  editTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      this.editingId = id;
      document.getElementById('edit-task').value = todo.text;
      document.getElementById('edit-priority').value = todo.priority;
      document.getElementById('edit-date').value = todo.date;
      document.getElementById('edit-modal').style.display = 'flex';
    }
  }

  // 保存编辑
  saveEdit() {
    if (!this.editingId) return;

    const todo = this.todos.find(t => t.id === this.editingId);
    if (todo) {
      todo.text = document.getElementById('edit-task').value.trim();
      todo.priority = document.getElementById('edit-priority').value;
      todo.date = document.getElementById('edit-date').value;

      if (!todo.text) {
        this.showNotification('任务内容不能为空', 'error');
        return;
      }

      this.saveTodos();
      this.render();
      this.closeModal();
      this.showNotification('任务更新成功', 'success');
    }
  }

  // 关闭模态框
  closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    this.editingId = null;
  }

  // 设置排序方式
  setSort(sortType) {
    this.currentSort = sortType;
    
    // 更新按钮状态
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`sort-by-${sortType}`).classList.add('active');
    
    this.render();
  }

  // 清除筛选
  clearFilters() {
    this.currentFilter = {
      search: '',
      priority: '',
      status: '',
      date: ''
    };

    document.getElementById('search-task').value = '';
    document.getElementById('filter-priority').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-date').value = '';

    this.render();
  }

  // 获取筛选后的任务列表
  getFilteredTodos() {
    let filtered = [...this.todos];

    // 搜索筛选
    if (this.currentFilter.search) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(this.currentFilter.search)
      );
    }

    // 优先级筛选
    if (this.currentFilter.priority) {
      filtered = filtered.filter(todo => 
        todo.priority === this.currentFilter.priority
      );
    }

    // 状态筛选
    if (this.currentFilter.status) {
      if (this.currentFilter.status === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
      } else if (this.currentFilter.status === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      }
    }

    // 日期筛选
    if (this.currentFilter.date) {
      filtered = filtered.filter(todo => todo.date === this.currentFilter.date);
    }

    return filtered;
  }

  // 排序任务列表
  sortTodos(todos) {
    return todos.sort((a, b) => {
      if (this.currentSort === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        // 按日期排序，未设置日期的排在最后
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      }
    });
  }

  // 渲染任务列表
  render() {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    
    const filteredTodos = this.getFilteredTodos();
    const sortedTodos = this.sortTodos(filteredTodos);

    if (sortedTodos.length === 0) {
      todoList.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    todoList.innerHTML = sortedTodos.map(todo => this.createTodoHTML(todo)).join('');
  }

  // 创建任务HTML
  createTodoHTML(todo) {
    const priorityClass = todo.priority;
    const completedClass = todo.completed ? 'completed' : '';
    const dateDisplay = todo.date ? this.formatDate(todo.date) : '无截止日期';
    const priorityText = { high: '高', medium: '中', low: '低' }[todo.priority];

    return `
      <div class="todo-item ${completedClass} ${priorityClass}-priority" data-id="${todo.id}">
        <div class="todo-content">
          <p class="todo-text">${this.escapeHtml(todo.text)}</p>
          <div class="todo-meta">
            <span class="todo-priority ${priorityClass}">${priorityText}</span>
            <span class="todo-date">📅 ${dateDisplay}</span>
            <span class="todo-created">创建于 ${this.formatDate(todo.createdAt)}</span>
          </div>
        </div>
        <div class="todo-actions">
          <button class="action-btn toggle-btn ${todo.completed ? 'completed' : ''}" 
                  onclick="app.toggleTodo('${todo.id}')">
            ${todo.completed ? '✓ 已完成' : '○ 未完成'}
          </button>
          <button class="action-btn edit-btn" onclick="app.editTodo('${todo.id}')">
            ✏️ 编辑
          </button>
          <button class="action-btn delete-btn" onclick="app.deleteTodo('${todo.id}')">
            🗑️ 删除
          </button>
        </div>
      </div>
    `;
  }

  // 更新统计信息
  updateStats() {
    const total = this.todos.length;
    const active = this.todos.filter(t => !t.completed).length;
    const completed = this.todos.filter(t => t.completed).length;
    const highPriority = this.todos.filter(t => t.priority === 'high' && !t.completed).length;

    document.getElementById('total-tasks').textContent = total;
    document.getElementById('active-tasks').textContent = active;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('high-priority-tasks').textContent = highPriority;
  }

  // 保存到本地存储
  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // 从本地存储加载
  loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  }

  // 格式化日期
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '明天';
    } else if (diffDays === -1) {
      return '昨天';
    } else if (diffDays > 0) {
      return `${diffDays}天后`;
    } else {
      return `${Math.abs(diffDays)}天前`;
    }
  }

  // HTML转义
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 显示通知
  showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });

    // 设置背景色
    const colors = {
      success: '#38a169',
      error: '#e53e3e',
      warning: '#ed8936',
      info: '#3182ce'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // 添加到页面
    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // 自动移除
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // 导出数据
  exportData() {
    const data = {
      todos: this.todos,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showNotification('数据导出成功', 'success');
  }

  // 导入数据
  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.todos && Array.isArray(data.todos)) {
          this.todos = data.todos;
          this.saveTodos();
          this.render();
          this.updateStats();
          this.showNotification('数据导入成功', 'success');
        } else {
          throw new Error('无效的数据格式');
        }
      } catch (error) {
        this.showNotification('导入失败：数据格式错误', 'error');
      }
    };
    reader.readAsText(file);
  }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new TodoApp();
});

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter 快速添加任务
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const taskInput = document.getElementById('new-task');
    if (document.activeElement === taskInput) {
      document.getElementById('todo-form').dispatchEvent(new Event('submit'));
    }
  }
  
  // Escape 关闭模态框
  if (e.key === 'Escape') {
    const modal = document.getElementById('edit-modal');
    if (modal.style.display === 'flex') {
      app.closeModal();
    }
  }
});

// 添加一些示例数据（仅在首次加载时）
if (!localStorage.getItem('todos')) {
  const sampleTodos = [
    {
      id: '1',
      text: '完成项目文档',
      priority: 'high',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      text: '学习新的JavaScript特性',
      priority: 'medium',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      text: '整理工作台',
      priority: 'low',
      date: '',
      completed: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  localStorage.setItem('todos', JSON.stringify(sampleTodos));
}
