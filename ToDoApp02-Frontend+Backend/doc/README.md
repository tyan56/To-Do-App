# Todo App - 待办事项管理应用

一个现代化的全栈待办事项管理应用，采用 React + FastAPI + SQLite 技术栈构建。

## 🚀 项目特性

- ✅ **完整的任务管理** - 创建、编辑、删除、标记完成
- 🔍 **智能筛选** - 全部、已完成、未完成任务筛选
- 📊 **实时统计** - 任务总数、完成情况统计
- 🎨 **现代UI设计** - 响应式设计，支持移动端
- 💾 **数据持久化** - SQLite数据库存储
- ⚡ **实时同步** - 前后端实时数据同步
- 🛡️ **错误处理** - 完善的错误提示和重试机制
- 📱 **响应式布局** - 适配各种屏幕尺寸

## 🛠️ 技术栈

### 后端
- **框架**: FastAPI 0.104.1
- **数据库**: SQLite + SQLAlchemy 2.0
- **数据验证**: Pydantic 2.5
- **测试**: pytest + httpx
- **服务器**: Uvicorn

### 前端
- **框架**: React 18.2.0
- **构建工具**: Create React App
- **样式**: CSS3 + CSS Variables
- **状态管理**: React Hooks
- **HTTP客户端**: Fetch API

## 📁 项目结构

```
ToDoApp02-system/
├── backend/                 # 后端服务
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI应用入口
│   │   ├── database.py     # 数据库配置
│   │   ├── schemas.py      # Pydantic模型
│   │   ├── models/         # SQLAlchemy数据模型
│   │   │   ├── __init__.py
│   │   │   └── todo.py
│   │   └── routers/        # API路由
│   │       ├── __init__.py
│   │       └── todos.py
│   ├── tests/              # 测试文件
│   │   ├── __init__.py
│   │   └── test_todos.py
│   ├── requirements.txt    # Python依赖
│   └── README.md
├── frontend/               # 前端应用
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── hooks/         # 自定义Hooks
│   │   ├── services/      # API服务
│   │   ├── styles/        # 样式文件
│   │   ├── utils/         # 工具函数
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── docs/                   # 文档
│   └── 技术架构文档.md
├── start.bat              # Windows启动脚本
├── start.sh               # Linux/Mac启动脚本
└── README.md              # 项目文档
```

## 🚀 快速开始

### 方法一：使用启动脚本（推荐）

#### Windows
```bash
# 双击运行或在命令行执行
start.bat
```

#### Linux/Mac
```bash
# 给脚本执行权限
chmod +x start.sh

# 运行脚本
./start.sh
```

### 方法二：手动启动

#### 1. 启动后端服务

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 启动服务
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 2. 启动前端服务

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 3. 访问应用

- **前端应用**: http://localhost:3000
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs
- **ReDoc文档**: http://localhost:8000/redoc

## 📚 API接口文档

### 基础信息
- **Base URL**: `http://localhost:8000/api/v1`
- **Content-Type**: `application/json`

### 主要接口

#### 获取任务列表
```http
GET /api/v1/todos?status=all&page=1&limit=50
```

#### 创建任务
```http
POST /api/v1/todos
{
  "title": "任务标题",
  "description": "任务描述"
}
```

#### 更新任务
```http
PUT /api/v1/todos/{id}
{
  "title": "新标题",
  "completed": true
}
```

#### 删除任务
```http
DELETE /api/v1/todos/{id}
```

#### 批量删除已完成任务
```http
DELETE /api/v1/todos/completed
```

#### 清空所有任务
```http
DELETE /api/v1/todos/all
```

详细API文档请访问：http://localhost:8000/docs

## 🎨 界面功能

### 主要功能

1. **添加任务**
   - 任务标题（必填，最大255字符）
   - 任务描述（可选，最大1000字符）
   - 实时输入验证

2. **任务管理**
   - ✅ 标记完成/未完成
   - ✏️ 内联编辑任务内容
   - 🗑️ 删除任务
   - 📊 实时统计更新

3. **筛选功能**
   - 📋 全部任务
   - ⏳ 未完成任务
   - ✅ 已完成任务

4. **批量操作**
   - 🧹 清除已完成任务
   - 🗑️ 清空所有任务

5. **用户体验**
   - 💾 筛选状态本地保存
   - 🔄 自动重试机制
   - 📱 响应式设计
   - ⚡ 实时数据同步

## 🧪 测试

### 后端测试

```bash
cd backend
pytest
```

### 前端测试

```bash
cd frontend
npm test
```

## 🚀 部署

### 开发环境

使用启动脚本或手动启动即可。

### 生产环境

#### Docker部署

```bash
# 构建后端镜像
cd backend
docker build -t todo-backend .

# 构建前端镜像
cd ../frontend
docker build -t todo-frontend .

# 运行容器
docker run -p 8000:8000 todo-backend
docker run -p 3000:3000 todo-frontend
```

#### 传统部署

1. **后端部署**
   ```bash
   cd backend
   pip install -r requirements.txt
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

2. **前端部署**
   ```bash
   cd frontend
   npm run build
   # 将build目录部署到Web服务器
   ```

## 🔧 开发指南

### 环境要求

- **后端**: Python 3.8+
- **前端**: Node.js 16.0+
- **数据库**: SQLite（内置）

### 开发工具

- **代码编辑器**: VS Code（推荐）
- **API测试**: Postman 或 http://localhost:8000/docs
- **数据库管理**: SQLite Browser

### 代码规范

- **Python**: 遵循PEP 8规范
- **JavaScript**: 使用ESLint检查
- **CSS**: 使用BEM命名规范

### 添加新功能

1. 后端：在 `backend/app/` 中添加新的路由和模型
2. 前端：在 `frontend/src/components/` 中添加新组件
3. 测试：在对应的 `tests/` 目录中添加测试用例
4. 文档：更新README和API文档

## 🐛 常见问题

### Q: 后端服务启动失败？
A: 检查Python版本和依赖安装，确保端口8000未被占用。

### Q: 前端无法连接后端？
A: 确认后端服务已启动，检查API URL配置。

### Q: 数据库文件在哪里？
A: SQLite数据库文件位于 `backend/todos.db`。

### Q: 如何重置数据库？
A: 删除 `backend/todos.db` 文件，重启后端服务。

## 📈 性能优化

### 后端优化
- 数据库索引优化
- API响应缓存
- 异步处理

### 前端优化
- React.memo减少重渲染
- 虚拟滚动处理大量数据
- 代码分割和懒加载

## 🔒 安全考虑

- 输入数据验证
- SQL注入防护
- XSS攻击防护
- CORS配置

## 📝 更新日志

### v1.0.0 (2024-01-15)
- ✨ 初始版本发布
- ✅ 完整的任务管理功能
- 🔍 任务筛选和统计
- 🎨 现代化UI设计
- 📱 响应式布局
- 🧪 完整的测试覆盖
- 📚 详细的API文档

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

## 🎯 项目亮点

- 🏗️ **完整的全栈架构** - 前后端分离，API驱动
- 🎨 **现代化UI设计** - 简洁美观，用户体验优秀
- 📱 **响应式布局** - 完美适配各种设备
- 🛡️ **健壮的错误处理** - 完善的异常处理和用户提示
- 🧪 **全面的测试覆盖** - 单元测试和集成测试
- 📚 **详细的文档** - 完整的开发和使用文档
- ⚡ **高性能** - 优化的数据库查询和前端渲染
- 🔧 **易于扩展** - 模块化设计，便于功能扩展
