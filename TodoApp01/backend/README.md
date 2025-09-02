# 待办事项应用 - 后端API

一个基于FastAPI构建的现代化待办事项管理系统后端服务。

## 🚀 功能特性

- ✅ 完整的CRUD操作（创建、读取、更新、删除）
- 📝 待办事项管理（标题、描述、完成状态）
- 🔍 智能过滤（全部、未完成、已完成）
- 📦 批量操作（清除已完成、清除全部）
- 🛡️ 数据验证和错误处理
- 📚 自动生成API文档
- 🧪 完整的测试覆盖
- 🔄 CORS支持
- 📊 SQLite数据库

## 🏗️ 技术栈

- **框架**: FastAPI 0.104.1
- **数据库**: SQLite + SQLAlchemy 2.0.23
- **数据验证**: Pydantic 2.5.0
- **测试**: Pytest 7.4.3
- **Web服务器**: Uvicorn 0.24.0

## 📁 项目结构

```
backend/
├── app/                     # 应用核心代码
│   ├── __init__.py
│   ├── main.py             # FastAPI应用入口
│   ├── database.py         # 数据库配置
│   ├── models.py           # SQLAlchemy数据模型
│   ├── schemas.py          # Pydantic数据模式
│   ├── crud.py             # 数据库操作函数
│   └── api/                # API路由
│       ├── __init__.py
│       └── todos.py        # 待办事项API端点
├── test_main.py            # 测试文件
├── run.py                  # 启动脚本
├── requirements.txt        # Python依赖
├── todos.db               # SQLite数据库文件（运行时生成）
└── README.md              # 本文档
```

## 🛠️ 快速开始

### 环境要求

- Python 3.8+
- pip

### 安装步骤

1. **克隆项目并进入后端目录**
   ```bash
   cd TodoApp01/backend
   ```

2. **安装依赖**
   ```bash
   pip install -r requirements.txt
   ```

3. **启动开发服务器**
   ```bash
   python run.py
   ```
   或者使用uvicorn：
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **验证服务启动**
   - API服务: http://localhost:8000
   - 交互式API文档: http://localhost:8000/docs
   - ReDoc文档: http://localhost:8000/redoc

## 📊 数据库

### 表结构

```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键，自增 |
| title | VARCHAR(255) | 待办事项标题，必填 |
| description | TEXT | 待办事项描述，可选 |
| completed | BOOLEAN | 完成状态，默认false |
| created_at | DATETIME | 创建时间，自动生成 |
| updated_at | DATETIME | 更新时间，自动更新 |

## 🔌 API接口

### 基础信息

- **Base URL**: `http://localhost:8000`
- **Content-Type**: `application/json`

### 接口列表

#### 1. 健康检查
```http
GET /health
```

#### 2. 获取待办事项列表
```http
GET /api/todos?filter_type={all|active|completed}
```

#### 3. 创建待办事项
```http
POST /api/todos
Content-Type: application/json

{
    "title": "任务标题",
    "description": "任务描述（可选）"
}
```

#### 4. 获取单个待办事项
```http
GET /api/todos/{todo_id}
```

#### 5. 更新待办事项
```http
PUT /api/todos/{todo_id}
Content-Type: application/json

{
    "title": "新标题",
    "description": "新描述",
    "completed": true
}
```

#### 6. 切换完成状态
```http
PATCH /api/todos/{todo_id}/toggle
```

#### 7. 删除待办事项
```http
DELETE /api/todos/{todo_id}
```

#### 8. 批量删除已完成
```http
DELETE /api/todos/batch/completed
```

#### 9. 清除全部
```http
DELETE /api/todos/batch/all
```

### 响应格式

#### 成功响应
```json
{
    "success": true,
    "data": { /* 数据内容 */ },
    "total": 10  // 仅列表接口
}
```

#### 错误响应
```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "错误信息"
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

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
python -m pytest test_main.py -v

# 运行特定测试
python -m pytest test_main.py::test_create_todo -v

# 生成测试覆盖率报告
python -m pytest test_main.py --cov=app --cov-report=html
```

### 测试覆盖范围

- ✅ 健康检查端点
- ✅ CRUD操作完整流程
- ✅ 数据验证和错误处理
- ✅ 过滤功能
- ✅ 批量操作
- ✅ 边界条件测试

## 📝 使用示例

### Python客户端示例

```python
import requests

# 基础URL
BASE_URL = "http://localhost:8000/api"

# 创建待办事项
def create_todo(title, description=""):
    response = requests.post(f"{BASE_URL}/todos", json={
        "title": title,
        "description": description
    })
    return response.json()

# 获取所有待办事项
def get_todos(filter_type="all"):
    response = requests.get(f"{BASE_URL}/todos", params={"filter_type": filter_type})
    return response.json()

# 标记完成
def toggle_todo(todo_id):
    response = requests.patch(f"{BASE_URL}/todos/{todo_id}/toggle")
    return response.json()

# 使用示例
todo = create_todo("学习FastAPI", "完成FastAPI教程")
print(f"创建的待办事项: {todo}")

todos = get_todos()
print(f"所有待办事项: {todos}")
```

### cURL示例

```bash
# 创建待办事项
curl -X POST "http://localhost:8000/api/todos" \
     -H "Content-Type: application/json" \
     -d '{"title":"学习FastAPI","description":"完成教程"}'

# 获取待办事项列表
curl "http://localhost:8000/api/todos"

# 获取未完成的待办事项
curl "http://localhost:8000/api/todos?filter_type=active"

# 切换完成状态
curl -X PATCH "http://localhost:8000/api/todos/1/toggle"

# 删除待办事项
curl -X DELETE "http://localhost:8000/api/todos/1"
```

## 🔧 开发说明

### 添加新功能

1. **数据模型**: 在 `models.py` 中定义SQLAlchemy模型
2. **数据模式**: 在 `schemas.py` 中定义Pydantic模式
3. **业务逻辑**: 在 `crud.py` 中实现数据库操作
4. **API端点**: 在 `api/` 目录下创建或更新路由
5. **测试**: 在 `test_main.py` 中添加相应测试

### 代码规范

- 使用类型注解
- 添加文档字符串
- 遵循PEP 8代码风格
- 编写单元测试

## 🚀 生产部署

### 使用Gunicorn部署

```bash
# 安装Gunicorn
pip install gunicorn

# 启动服务
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker部署

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### 环境变量配置

```bash
# 数据库配置
DATABASE_URL=sqlite:///./todos.db

# API配置
API_HOST=0.0.0.0
API_PORT=8000

# CORS配置
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 🔍 API文档

启动服务后，可以通过以下地址访问自动生成的API文档：

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🐛 故障排除

### 常见问题

1. **端口占用错误**
   ```bash
   # 查找占用8000端口的进程
   netstat -ano | findstr :8000
   # 杀死进程
   taskkill /PID <PID> /F
   ```

2. **数据库连接错误**
   - 确保SQLite文件权限正确
   - 检查磁盘空间是否充足

3. **CORS错误**
   - 检查前端URL是否在允许的源列表中
   - 确认CORS中间件配置正确

### 日志调试

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**作者**: 开发团队  
**版本**: 1.0.0  
**最后更新**: 2024年