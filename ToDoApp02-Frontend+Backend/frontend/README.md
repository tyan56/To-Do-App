# Todo App Frontend

一个基于 React 的现代化待办事项管理应用前端，提供直观的用户界面和流畅的用户体验。

## 🚀 功能特性

- ✅ **完整的任务管理** - 创建、编辑、删除、标记完成
- 🔍 **智能筛选** - 全部、已完成、未完成任务筛选
- 📊 **实时统计** - 任务总数、完成情况统计
- 🎨 **现代UI设计** - 响应式设计，支持移动端
- 💾 **本地存储** - 筛选状态本地保存
- ⚡ **实时更新** - 与后端API实时同步
- 🛡️ **错误处理** - 完善的错误提示和重试机制
- 📱 **响应式布局** - 适配各种屏幕尺寸

## 🛠️ 技术栈

- **框架**: React 18.2.0
- **构建工具**: Create React App
- **样式**: CSS3 + CSS Variables
- **状态管理**: React Hooks
- **HTTP客户端**: Fetch API
- **本地存储**: localStorage

## 📁 项目结构

```
frontend/
├── public/
│   └── index.html              # HTML模板
├── src/
│   ├── components/             # React组件
│   │   ├── TodoApp.js         # 主应用组件
│   │   ├── TodoForm.js        # 添加任务表单
│   │   ├── TodoList.js        # 任务列表
│   │   ├── TodoItem.js        # 单个任务项
│   │   ├── FilterBar.js       # 筛选栏
│   │   ├── ActionBar.js       # 操作栏
│   │   └── LoadingSpinner.js  # 加载动画
│   ├── hooks/                 # 自定义Hooks
│   │   ├── useTodos.js        # 任务状态管理
│   │   └── useLocalStorage.js # 本地存储Hook
│   ├── services/              # API服务
│   │   └── api.js            # API封装
│   ├── styles/               # 样式文件
│   │   ├── main.css         # 主样式
│   │   └── components.css   # 组件样式
│   ├── utils/               # 工具函数
│   │   ├── constants.js     # 常量定义
│   │   └── helpers.js       # 辅助函数
│   ├── App.js              # 根组件
│   └── index.js            # 应用入口
├── package.json            # 项目配置
├── .env.example           # 环境变量示例
└── README.md             # 项目文档
```

## 🚀 快速开始

### 1. 环境要求

- Node.js 16.0+
- npm 或 yarn

### 2. 安装依赖

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 或使用yarn
yarn install
```

### 3. 环境配置

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑环境变量（可选）
# REACT_APP_API_URL=http://localhost:8000/api/v1
```

### 4. 启动开发服务器

```bash
# 启动开发服务器
npm start

# 或使用yarn
yarn start
```

应用将在 http://localhost:3000 启动

### 5. 构建生产版本

```bash
# 构建生产版本
npm run build

# 或使用yarn
yarn build
```

## 🎨 界面预览

### 主要功能

1. **添加任务**
   - 任务标题（必填）
   - 任务描述（可选）
   - 实时验证

2. **任务管理**
   - 标记完成/未完成
   - 编辑任务内容
   - 删除任务
   - 批量操作

3. **筛选功能**
   - 全部任务
   - 未完成任务
   - 已完成任务

4. **统计信息**
   - 任务总数
   - 已完成数量
   - 待完成数量

## 🔧 组件说明

### TodoApp (主应用组件)
- 应用的主要容器组件
- 管理全局状态和消息提示
- 协调各个子组件的工作

### TodoForm (任务表单)
- 添加新任务的表单
- 输入验证和错误处理
- 支持标题和描述输入

### TodoList (任务列表)
- 显示任务列表
- 处理空状态和加载状态
- 渲染TodoItem组件

### TodoItem (任务项)
- 单个任务的显示和操作
- 支持内联编辑
- 完成状态切换

### FilterBar (筛选栏)
- 任务状态筛选
- 统计信息显示
- 筛选状态持久化

### ActionBar (操作栏)
- 批量删除操作
- 清除已完成任务
- 清空所有任务

## 🎯 核心功能实现

### 状态管理

使用自定义Hook `useTodos` 管理应用状态：

```javascript
const {
  todos,           // 当前显示的任务列表
  loading,         // 加载状态
  error,           // 错误信息
  filter,          // 当前筛选状态
  stats,           // 统计信息
  addTodo,         // 添加任务
  updateTodo,      // 更新任务
  deleteTodo,      // 删除任务
  clearCompleted,  // 清除已完成
  clearAll         // 清空全部
} = useTodos();
```

### API集成

通过 `api.js` 服务封装与后端通信：

```javascript
// 获取任务列表
const response = await todoApi.getTodos(status, page, limit);

// 创建任务
const newTodo = await todoApi.createTodo(todoData);

// 更新任务
const updatedTodo = await todoApi.updateTodo(id, updates);

// 删除任务
await todoApi.deleteTodo(id);
```

### 本地存储

使用 `useLocalStorage` Hook 持久化用户偏好：

```javascript
const [savedFilter, setSavedFilter] = useLocalStorage('todo-filter', 'all');
```

## 🎨 样式设计

### 设计原则
- **现代简洁**: 采用扁平化设计风格
- **响应式**: 支持移动端和桌面端
- **可访问性**: 符合WCAG 2.1标准
- **一致性**: 统一的颜色、字体、间距规范

### 颜色方案
- **主色调**: 蓝色系 (#3b82f6)
- **成功色**: 绿色系 (#10b981)
- **警告色**: 橙色系 (#f59e0b)
- **危险色**: 红色系 (#ef4444)
- **中性色**: 灰色系 (#6b7280)

### 响应式断点
- **移动端**: < 480px
- **平板端**: 480px - 768px
- **桌面端**: > 768px

## 🔌 API接口

### 基础配置
- **Base URL**: `http://localhost:8000/api/v1`
- **Content-Type**: `application/json`

### 主要接口

#### 获取任务列表
```javascript
GET /todos?status=all&page=1&limit=50
```

#### 创建任务
```javascript
POST /todos
{
  "title": "任务标题",
  "description": "任务描述"
}
```

#### 更新任务
```javascript
PUT /todos/{id}
{
  "title": "新标题",
  "completed": true
}
```

#### 删除任务
```javascript
DELETE /todos/{id}
```

## 🧪 测试

### 运行测试

```bash
# 运行测试
npm test

# 或使用yarn
yarn test
```

### 测试覆盖

- 组件渲染测试
- 用户交互测试
- API调用测试
- 错误处理测试

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### 部署到服务器

```bash
# 使用serve部署
npx serve -s build

# 或使用nginx
# 将build目录内容复制到nginx的html目录
```

### Docker部署

```dockerfile
# Dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 开发

### 代码规范

- 使用ESLint进行代码检查
- 遵循React最佳实践
- 组件命名使用PascalCase
- 文件名使用PascalCase

### 添加新功能

1. 在 `src/components/` 中创建新组件
2. 在 `src/hooks/` 中添加自定义Hook
3. 在 `src/services/` 中扩展API服务
4. 在 `src/styles/` 中添加样式
5. 更新文档

### 调试技巧

- 使用React Developer Tools
- 检查Network面板查看API请求
- 使用Console查看错误信息
- 利用React的严格模式检测问题

## 📱 移动端支持

- 响应式设计适配各种屏幕
- 触摸友好的交互设计
- 移动端优化的按钮大小
- 支持手势操作

## 🔒 安全考虑

- 输入数据验证
- XSS攻击防护
- CSRF保护
- 安全的API调用

## 📈 性能优化

- React.memo减少重渲染
- useCallback优化函数引用
- 虚拟滚动处理大量数据
- 图片懒加载
- 代码分割

## 🐛 常见问题

### Q: 应用无法连接到后端API？
A: 检查后端服务是否启动，确认API URL配置正确。

### Q: 任务状态没有实时更新？
A: 检查网络连接，确认API调用是否成功。

### Q: 移动端显示异常？
A: 检查CSS媒体查询，确认响应式样式正确。

## 📝 更新日志

### v1.0.0 (2024-01-15)
- ✨ 初始版本发布
- ✅ 完整的任务管理功能
- 🔍 任务筛选和统计
- 🎨 现代化UI设计
- 📱 响应式布局
- 💾 本地存储支持

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如果您遇到任何问题或有任何建议，请：

1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue
3. 联系开发团队

---

**开发团队** | **最后更新**: 2024-01-15

