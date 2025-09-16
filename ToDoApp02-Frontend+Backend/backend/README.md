# Todo App Backend

一个基于 FastAPI 的现代化待办事项管理应用后端服务。

## 🚀 功能特性

- ✅ 完整的 CRUD 操作（创建、读取、更新、删除）
- 🔍 任务状态筛选（全部、已完成、未完成）
- 📄 分页支持
- 🗑️ 批量删除功能（清除已完成、清空全部）
- 📊 统计信息（总数、已完成数、未完成数）
- 🛡️ 数据验证和错误处理
- 📚 自动生成的 API 文档
- 🧪 完整的测试覆盖

## 🛠️ 技术栈

- **框架**: FastAPI 0.104.1
- **数据库**: SQLite + SQLAlchemy 2.0
- **数据验证**: Pydantic 2.5
- **测试**: pytest + httpx
- **服务器**: Uvicorn

## 📁 项目结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 应用入口
│   ├── database.py          # 数据库配置
│   ├── schemas.py           # Pydantic 数据模型
│   ├── models/              # SQLAlchemy 数据模型
│   │   ├── __init__.py
│   │   └── todo.py
│   └── routers/             # API 路由
│       ├── __init__.py
│       └── todos.py
├── tests/                   # 测试文件
│   ├── __init__.py
│   └── test_todos.py
├── requirements.txt         # Python 依赖
├── .env.example            # 环境变量示例
└── README.md               # 项目文档
```

## 🚀 快速开始

### 1. 环境要求

- Python 3.8+
- pip 或 poetry

### 2. 安装依赖

```bash
# 克隆项目
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 3. 环境配置

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑环境变量（可选）
# DATABASE_URL=sqlite:///./todos.db
# DEBUG=True
# CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 4. 启动服务

```bash
# 开发模式启动
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 或者直接运行
python app/main.py
```

### 5. 访问服务

- **API 服务**: http://localhost:8000
- **交互式文档**: http://localhost:8000/docs
- **ReDoc 文档**: http://localhost:8000/redoc
- **健康检查**: http://localhost:8000/health

## 📚 API 文档

### 基础信息

- **Base URL**: `http://localhost:8000/api/v1`
- **Content-Type**: `application/json`

### 接口列表

#### 1. 获取待办事项列表
```http
GET /api/v1/todos/
```

**查询参数:**
- `status` (可选): `all` | `completed` | `pending` (默认: `all`)
- `page` (可选): 页码 (默认: 1)
- `limit` (可选): 每页数量 (默认: 50, 最大: 100)

**响应示例:**
```json
{
  "todos": [
    {
      "id": 1,
      "title": "学习React",
      "description": "完成React基础教程",
      "completed": false,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "completed_count": 0,
  "pending_count": 1
}
```

#### 2. 创建待办事项
```http
POST /api/v1/todos/
```

**请求体:**
```json
{
  "title": "新任务",
  "description": "任务描述（可选）"
}
```

#### 3. 获取单个待办事项
```http
GET /api/v1/todos/{todo_id}
```

#### 4. 更新待办事项
```http
PUT /api/v1/todos/{todo_id}
```

**请求体:**
```json
{
  "title": "更新后的标题",
  "description": "更新后的描述",
  "completed": true
}
```

#### 5. 删除待办事项
```http
DELETE /api/v1/todos/{todo_id}
```

#### 6. 批量删除已完成事项
```http
DELETE /api/v1/todos/completed
```

#### 7. 清空所有事项
```http
DELETE /api/v1/todos/all
```

### 错误响应格式

```json
{
  "detail": "错误描述",
  "error_code": "ERROR_CODE",
  "timestamp": "2024-01-15T11:00:00Z"
}
```

**常见错误码:**
- `TODO_NOT_FOUND`: 待办事项不存在
- `VALIDATION_ERROR`: 请求参数验证失败
- `INTERNAL_ERROR`: 服务器内部错误

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
pytest

# 运行测试并显示覆盖率
pytest --cov=app

# 运行特定测试文件
pytest tests/test_todos.py

# 运行特定测试函数
pytest tests/test_todos.py::test_create_todo

# 详细输出
pytest -v
```

### 测试覆盖

项目包含以下测试场景：

- ✅ 创建待办事项
- ✅ 获取待办事项列表（空列表、有数据、筛选）
- ✅ 根据ID获取单个待办事项
- ✅ 更新待办事项
- ✅ 删除待办事项
- ✅ 批量删除已完成事项
- ✅ 清空所有事项
- ✅ 分页功能
- ✅ 错误处理（404、500等）

## 🗄️ 数据库

### 表结构

```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 数据库操作

```bash
# 数据库文件位置
./todos.db

# 查看数据库内容（使用 sqlite3）
sqlite3 todos.db
.tables
SELECT * FROM todos;
.quit
```

## 🚀 部署

### Docker 部署

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# 构建镜像
docker build -t todo-app-backend .

# 运行容器
docker run -p 8000:8000 todo-app-backend
```

### 生产环境配置

```bash
# 使用 Gunicorn 部署
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 🔧 开发

### 代码规范

- 遵循 PEP 8 规范
- 使用 Black 进行代码格式化
- 使用 isort 进行导入排序

```bash
# 安装开发工具
pip install black isort flake8

# 格式化代码
black app/ tests/

# 排序导入
isort app/ tests/

# 代码检查
flake8 app/ tests/
```

### 添加新功能

1. 在 `app/models/` 中添加数据模型
2. 在 `app/schemas.py` 中添加 Pydantic 模型
3. 在 `app/routers/` 中添加路由
4. 在 `tests/` 中添加测试用例
5. 更新文档

## 📝 更新日志

### v1.0.0 (2024-01-15)
- ✨ 初始版本发布
- ✅ 完整的 CRUD 功能
- 🔍 任务筛选和分页
- 🗑️ 批量删除功能
- 📚 完整的 API 文档
- 🧪 全面的测试覆盖

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

