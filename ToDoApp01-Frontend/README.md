# 待办事项应用 (Todo App)

一个功能完整的原生HTML、CSS、JavaScript待办事项管理应用，支持任务管理、分类筛选、数据持久化等功能。

## 🚀 功能特性

### 核心功能模块

1. **任务管理**
   - ✅ 添加新任务
   - ✅ 编辑任务内容
   - ✅ 删除任务
   - ✅ 标记完成/未完成
   - ✅ 设置优先级（高/中/低）
   - ✅ 设置截止日期

2. **分类管理**
   - ✅ 按优先级筛选（高/中/低）
   - ✅ 按状态筛选（已完成/未完成）
   - ✅ 按日期筛选
   - ✅ 多条件组合筛选

3. **数据持久化**
   - ✅ 使用localStorage保存数据
   - ✅ 页面刷新后数据不丢失
   - ✅ 自动加载保存的任务

4. **响应式设计**
   - ✅ 完美适配PC端
   - ✅ 移动端友好界面
   - ✅ 平板端优化布局

5. **搜索过滤**
   - ✅ 实时搜索任务内容
   - ✅ 快速查找功能
   - ✅ 清除筛选条件

### 高级功能

- 📊 **统计面板** - 显示总任务数、未完成任务、已完成任务、高优先级任务
- 🔄 **排序功能** - 支持按日期和优先级排序
- 🎨 **现代化UI** - 美观的界面设计和流畅的动画效果
- ⌨️ **键盘快捷键** - 支持Ctrl+Enter快速添加任务，Escape关闭模态框
- 🔔 **通知系统** - 操作反馈提示
- 📱 **移动端优化** - 触摸友好的交互设计

## 📁 项目结构

```
ToDoApp01/
├── index.html          # 主页面文件
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── app.js          # 应用逻辑文件
└── README.md           # 项目说明文档
```

## 🛠️ 技术栈

- **HTML5** - 语义化标签，无障碍访问
- **CSS3** - 现代CSS特性，响应式设计，CSS变量
- **JavaScript ES6+** - 类语法，模块化编程，本地存储API

## 🎯 核心功能实现

### 1. 任务管理
```javascript
// 添加任务
addTodo() {
  const newTodo = {
    id: Date.now().toString(),
    text: task,
    priority: priority,
    date: date,
    completed: false,
    createdAt: new Date().toISOString()
  };
  this.todos.unshift(newTodo);
}
```

### 2. 数据持久化
```javascript
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
```

### 3. 筛选和搜索
```javascript
// 多条件筛选
getFilteredTodos() {
  let filtered = [...this.todos];
  
  if (this.currentFilter.search) {
    filtered = filtered.filter(todo => 
      todo.text.toLowerCase().includes(this.currentFilter.search)
    );
  }
  
  if (this.currentFilter.priority) {
    filtered = filtered.filter(todo => 
      todo.priority === this.currentFilter.priority
    );
  }
  
  return filtered;
}
```

## 🎨 界面设计

### 设计特色
- **现代化风格** - 简洁清爽的界面设计
- **科技感配色** - 蓝色主题配合渐变效果
- **卡片式布局** - 清晰的信息层次
- **微交互** - 悬停效果和过渡动画

### 响应式断点
- **桌面端**: > 768px
- **平板端**: 768px - 1024px  
- **手机端**: < 768px

## 🚀 快速开始

### 1. 下载项目
```bash
git clone [项目地址]
cd ToDoApp01
```

### 2. 打开应用
直接在浏览器中打开 `index.html` 文件即可使用。

### 3. 开始使用
- 在输入框中输入任务内容
- 选择优先级和截止日期
- 点击"添加任务"按钮
- 使用搜索和筛选功能管理任务

## 📱 使用说明

### 添加任务
1. 在顶部表单中输入任务内容
2. 选择优先级（高/中/低）
3. 设置截止日期（可选）
4. 点击"添加任务"按钮

### 管理任务
- **完成/未完成**: 点击任务右侧的完成按钮
- **编辑任务**: 点击"编辑"按钮修改任务内容
- **删除任务**: 点击"删除"按钮移除任务

### 筛选和搜索
- **搜索**: 在搜索框中输入关键词
- **筛选**: 使用优先级、状态、日期筛选器
- **排序**: 点击"按日期"或"按优先级"按钮
- **清除**: 点击"清除筛选"重置所有筛选条件

## 🔧 自定义配置

### 修改主题颜色
在 `css/style.css` 文件中的 `:root` 选择器内修改CSS变量：

```css
:root {
  --primary-color: #3182ce;    /* 主色调 */
  --success-color: #38a169;    /* 成功色 */
  --warning-color: #ed8936;    /* 警告色 */
  --danger-color: #e53e3e;     /* 危险色 */
}
```

### 添加新功能
在 `js/app.js` 文件中的 `TodoApp` 类内添加新方法：

```javascript
// 示例：添加任务分类功能
addCategory(categoryName) {
  // 实现分类逻辑
}
```

## 🌟 特色功能

### 智能日期显示
- 今天/明天/昨天
- X天后/X天前
- 自动计算相对时间

### 优先级可视化
- 高优先级：红色标识
- 中优先级：橙色标识  
- 低优先级：绿色标识

### 统计面板
实时显示：
- 总任务数
- 未完成任务数
- 已完成任务数
- 高优先级任务数

## 🔮 未来规划

- [ ] 任务分类标签
- [ ] 任务提醒功能
- [ ] 数据导入/导出
- [ ] 主题切换
- [ ] 多语言支持
- [ ] PWA支持
- [ ] 云端同步

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**注意**: 这是一个纯前端应用，所有数据都保存在浏览器的localStorage中。如需数据备份，建议定期导出数据。
