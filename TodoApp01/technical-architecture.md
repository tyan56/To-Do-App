# 待办事项应用技术架构文档

## 项目概述

本项目是一个现代化的待办事项管理应用，采用前后端分离架构，提供完整的任务管理功能。

## 技术栈

### 前端技术栈
- **框架**: React 18+
- **语言**: JavaScript/TypeScript
- **样式**: CSS3 (原生CSS，现代化设计)
- **状态管理**: React Hooks (useState, useEffect)
- **HTTP客户端**: Axios/Fetch API
- **构建工具**: Create React App / Vite

### 后端技术栈
- **框架**: FastAPI
- **语言**: Python 3.8+
- **数据库**: SQLite
- **ORM**: SQLAlchemy
- **数据验证**: Pydantic
- **CORS**: FastAPI CORS中间件

### 开发工具
- **版本控制**: Git
- **API文档**: FastAPI自动生成的Swagger UI
- **依赖管理**: npm (前端) + pip/poetry (后端)

## 项目结构

```
TodoApp01/
├── backend/                 # 后端目录
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI应用入口
│   │   ├── models.py       # 数据模型
│   │   ├── schemas.py      # Pydantic模式
│   │   ├── crud.py         # 数据库操作
│   │   ├── database.py     # 数据库配置
│   │   └── api/
│   │       ├── __init__.py
│   │       └── todos.py    # 待办事项API路由
│   ├── requirements.txt    # Python依赖
│   └── alembic/           # 数据库迁移 (可选)
├── front/                  # 前端目录
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoList.js
│   │   │   ├── TodoItem.js
│   │   │   └── TodoFilter.js
│   │   ├── services/
│   │   │   └── api.js      # API调用封装
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md              # 项目总体说明
```

## 数据库设计

### 表结构设计

```sql
-- 创建待办事项表
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_created_at ON todos(created_at);

-- 插入示例数据
INSERT INTO todos (title, description, completed) VALUES
('学习React', '完成React基础教程', FALSE),
('完成项目', '完成待办事项应用开发', FALSE),
('代码review', '检查代码质量', TRUE);
```

### 数据模型说明

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | 唯一标识符 |
| title | VARCHAR(255) | NOT NULL | 待办事项标题 |
| description | TEXT | NULL | 待办事项详细描述 |
| completed | BOOLEAN | NOT NULL, DEFAULT FALSE | 完成状态 |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新时间 |

## API接口设计

### 基础信息
- **Base URL**: `http://localhost:8000`
- **Content-Type**: `application/json`
- **响应格式**: JSON

### 接口列表

#### 1. 获取所有待办事项
```http
GET /api/todos
```

**查询参数:**
- `filter` (可选): `all` | `active` | `completed` - 过滤条件

**响应示例:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "学习React",
            "description": "完成React基础教程",
            "completed": false,
            "created_at": "2024-01-01T10:00:00Z",
            "updated_at": "2024-01-01T10:00:00Z"
        }
    ],
    "total": 1
}
```

#### 2. 创建新待办事项
```http
POST /api/todos
```

**请求体:**
```json
{
    "title": "新任务",
    "description": "任务描述"
}
```

**响应示例:**
```json
{
    "success": true,
    "data": {
        "id": 2,
        "title": "新任务",
        "description": "任务描述",
        "completed": false,
        "created_at": "2024-01-01T11:00:00Z",
        "updated_at": "2024-01-01T11:00:00Z"
    }
}
```

#### 3. 更新待办事项
```http
PUT /api/todos/{todo_id}
```

**请求体:**
```json
{
    "title": "更新的标题",
    "description": "更新的描述",
    "completed": true
}
```

**响应示例:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "更新的标题",
        "description": "更新的描述",
        "completed": true,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-01T12:00:00Z"
    }
}
```

#### 4. 标记待办事项完成状态
```http
PATCH /api/todos/{todo_id}/toggle
```

**响应示例:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "completed": true
    }
}
```

#### 5. 删除单个待办事项
```http
DELETE /api/todos/{todo_id}
```

**响应示例:**
```json
{
    "success": true,
    "message": "待办事项已删除"
}
```

#### 6. 批量删除已完成待办事项
```http
DELETE /api/todos/batch/completed
```

**响应示例:**
```json
{
    "success": true,
    "message": "已删除3个已完成的待办事项",
    "deleted_count": 3
}
```

#### 7. 清除所有待办事项
```http
DELETE /api/todos/batch/all
```

**响应示例:**
```json
{
    "success": true,
    "message": "已删除所有待办事项",
    "deleted_count": 5
}
```

### 错误响应格式

```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "输入数据验证失败",
        "details": {
            "title": ["标题不能为空"]
        }
    }
}
```

### HTTP状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 422 | 数据验证失败 |
| 500 | 服务器内部错误 |

## 前端架构设计

### 组件结构

```
App
├── TodoForm           # 添加待办事项表单
├── TodoFilter         # 过滤条件组件
├── TodoList           # 待办事项列表
│   └── TodoItem       # 单个待办事项
└── TodoActions        # 底部操作按钮
```

### 状态管理

```javascript
// 主要状态结构
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### API服务封装

```javascript
// services/api.js
class TodoAPI {
    static baseURL = 'http://localhost:8000/api';
    
    static async getTodos(filter = 'all') { /* ... */ }
    static async createTodo(todoData) { /* ... */ }
    static async updateTodo(id, todoData) { /* ... */ }
    static async deleteTodo(id) { /* ... */ }
    static async toggleTodo(id) { /* ... */ }
    static async clearCompleted() { /* ... */ }
    static async clearAll() { /* ... */ }
}
```

## 样式设计规范

### 设计原则
- 现代简洁的设计风格
- 响应式布局
- 优秀的用户体验
- 一致的视觉风格

### 布局规范
- 主容器最大宽度: 800px
- 居中对齐
- 合理的内边距和外边距
- 移动端友好

### 颜色方案
```css
:root {
    --primary-color: #007bff;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --border-color: #dee2e6;
}
```

### 交互效果
- 按钮悬停效果
- 列表项悬停高亮
- 平滑的过渡动画
- 加载状态提示

## 部署架构

### 开发环境
- 前端: `npm start` (端口: 3000)
- 后端: `uvicorn main:app --reload` (端口: 8000)
- 数据库: SQLite文件

### 生产环境建议
- 前端: 构建静态文件部署到CDN/静态服务器
- 后端: 使用Gunicorn + Uvicorn部署
- 数据库: 可升级到PostgreSQL/MySQL
- 反向代理: Nginx
- 容器化: Docker + Docker Compose

## 安全考虑

1. **输入验证**: 前后端双重验证
2. **XSS防护**: 输入内容转义
3. **CORS配置**: 限制跨域访问
4. **SQL注入防护**: 使用ORM参数化查询
5. **错误处理**: 不暴露敏感信息

## 性能优化

1. **前端优化**:
   - 组件懒加载
   - 状态更新优化
   - 防抖输入处理

2. **后端优化**:
   - 数据库索引
   - 响应数据精简
   - 异步处理

3. **网络优化**:
   - API响应缓存
   - 静态资源CDN
   - 数据分页

## 测试策略

1. **单元测试**: 组件和API函数测试
2. **集成测试**: API接口测试
3. **E2E测试**: 用户交互流程测试
4. **性能测试**: 响应时间和并发测试

## 开发规范

1. **代码规范**: ESLint + Prettier (前端), Black + isort (后端)
2. **提交规范**: Conventional Commits
3. **分支策略**: Git Flow
4. **代码审查**: Pull Request必须经过审查

## 后续扩展

1. **用户系统**: 添加用户认证和多用户支持
2. **分类标签**: 添加待办事项分类功能
3. **提醒功能**: 添加截止日期和提醒
4. **数据同步**: 支持多设备数据同步
5. **离线支持**: PWA支持离线使用

---

*本文档版本: v1.0*  
*最后更新: 2024年*