# Todo Application Backend

一个基于Spring Boot的现代化待办事项管理应用后端API。

## 🚀 功能特性

- ✅ 完整的CRUD操作（创建、读取、更新、删除待办事项）
- ✅ 待办事项状态管理（完成/未完成）
- ✅ 批量操作（删除已完成项目、清空所有项目）
- ✅ 搜索和过滤功能
- ✅ 分页查询支持
- ✅ 优先级管理
- ✅ 截止日期设置
- ✅ RESTful API设计
- ✅ 完整的单元测试和集成测试
- ✅ Swagger API文档
- ✅ 跨域支持
- ✅ 统一异常处理
- ✅ 数据验证

## 🛠 技术栈

- **框架**: Spring Boot 3.2.0
- **语言**: Java 17+
- **构建工具**: Maven 3.6+
- **数据库**: MySQL 8.0+ / H2 (开发/测试)
- **ORM**: Spring Data JPA
- **API文档**: Swagger/OpenAPI 3
- **测试**: JUnit 5 + Mockito
- **验证**: Bean Validation

## 📋 环境要求

- JDK 17 或更高版本
- Maven 3.6 或更高版本
- MySQL 8.0 或更高版本（生产环境）
- Git

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd ToDoApp05/backend
```

### 2. 配置数据库

#### 开发环境（H2内存数据库）
开发环境默认使用H2内存数据库，无需额外配置。

#### 生产环境（MySQL）
1. 创建MySQL数据库：
```sql
CREATE DATABASE todoapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 执行初始化SQL脚本：
```bash
mysql -u root -p todoapp < db/todoapp.sql
```

3. 修改数据库连接配置（`application.yml`）：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todoapp?useSSL=false&serverTimezone=UTC
    username: your_username
    password: your_password
```

### 3. 编译和运行

#### 方式一：使用启动脚本（推荐）
```bash
# Windows
start-app.bat

# Linux/Mac
./start-app.sh
```

#### 方式二：使用Maven命令
```bash
# 编译项目
mvn clean compile

# 运行测试
mvn test

# 启动应用（开发环境）
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 启动应用（生产环境）
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

#### 方式三：打包后运行
```bash
# 打包
mvn clean package

# 运行JAR文件
java -jar target/todo-backend-1.0.0.jar
```

### 4. 验证安装

应用启动后，访问以下地址验证：

- **应用健康检查**: http://localhost:8000/api/v1/health
- **Swagger API文档**: http://localhost:8000/swagger-ui.html
- **API文档JSON**: http://localhost:8000/api-docs

## 📚 API文档

### 基础信息
- **基础URL**: `http://localhost:8000`
- **API前缀**: `/api/v1`
- **数据格式**: JSON
- **字符编码**: UTF-8

### 主要接口

#### 1. 获取待办事项列表
```http
GET /api/v1/todos?completed=false&page=0&size=10
```

#### 2. 创建待办事项
```http
POST /api/v1/todos
Content-Type: application/json

{
  "title": "新的待办事项",
  "description": "描述信息",
  "priority": 1,
  "dueDate": "2024-12-31T23:59:59"
}
```

#### 3. 更新待办事项
```http
PUT /api/v1/todos/{id}
Content-Type: application/json

{
  "title": "更新的标题",
  "description": "更新的描述",
  "completed": true,
  "priority": 2,
  "dueDate": "2024-12-31T23:59:59"
}
```

#### 4. 切换完成状态
```http
PATCH /api/v1/todos/{id}/toggle
```

#### 5. 删除待办事项
```http
DELETE /api/v1/todos/{id}
```

#### 6. 删除已完成项目
```http
DELETE /api/v1/todos/completed
```

#### 7. 清空所有待办事项
```http
DELETE /api/v1/todos/all
```

#### 8. 搜索待办事项
```http
GET /api/v1/todos/search?title=关键词
```

#### 9. 按优先级查询
```http
GET /api/v1/todos/priority/{priority}
```

#### 10. 统计待办事项
```http
GET /api/v1/todos/count?completed=false
```

### 统一响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "total": 0,
  "timestamp": "2024-01-01T10:00:00"
}
```

## 🧪 测试

### 运行所有测试
```bash
mvn test
```

### 运行特定测试类
```bash
mvn test -Dtest=TodoServiceTest
```

### 运行集成测试
```bash
mvn test -Dtest=TodoApplicationIntegrationTest
```

### 生成测试报告
```bash
mvn surefire-report:report
```

## 📁 项目结构

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/todoapp/
│   │   │   ├── TodoApplication.java          # 主应用类
│   │   │   ├── controller/                   # 控制器层
│   │   │   │   ├── TodoController.java       # 待办事项控制器
│   │   │   │   └── HealthController.java     # 健康检查控制器
│   │   │   ├── service/                      # 服务层
│   │   │   │   └── TodoService.java          # 待办事项服务
│   │   │   ├── repository/                   # 数据访问层
│   │   │   │   └── TodoRepository.java       # 待办事项仓库
│   │   │   ├── entity/                       # 实体类
│   │   │   │   └── Todo.java                 # 待办事项实体
│   │   │   ├── dto/                          # 数据传输对象
│   │   │   │   ├── ApiResponse.java          # 统一响应格式
│   │   │   │   ├── TodoRequest.java          # 创建请求DTO
│   │   │   │   └── TodoUpdateRequest.java    # 更新请求DTO
│   │   │   └── exception/                    # 异常处理
│   │   │       └── GlobalExceptionHandler.java # 全局异常处理器
│   │   └── resources/                        # 配置文件
│   │       ├── application.yml               # 主配置文件
│   │       ├── application-dev.yml           # 开发环境配置
│   │       └── application-test.yml          # 测试环境配置
│   └── test/                                 # 测试代码
│       └── java/com/todoapp/
│           ├── TodoApplicationIntegrationTest.java # 集成测试
│           ├── controller/
│           │   └── TodoControllerTest.java   # 控制器测试
│           └── service/
│               └── TodoServiceTest.java      # 服务层测试
├── db/                                       # 数据库脚本
│   └── todoapp.sql                          # 数据库初始化脚本
├── pom.xml                                   # Maven配置
├── start-app.bat                            # Windows启动脚本
└── README.md                                # 项目文档
```

## 🔧 配置说明

### 开发环境配置 (`application-dev.yml`)
- 使用H2内存数据库
- 启用H2控制台
- 显示SQL日志
- 自动创建表结构

### 测试环境配置 (`application-test.yml`)
- 使用H2内存数据库
- 禁用SQL日志
- 自动创建表结构

### 生产环境配置 (`application.yml`)
- 使用MySQL数据库
- 禁用SQL日志
- 更新表结构

## 🚀 部署

### Docker部署
```bash
# 构建Docker镜像
docker build -t todo-backend .

# 运行容器
docker run -p 8000:8000 todo-backend
```

### 传统部署
```bash
# 打包
mvn clean package -Dmaven.test.skip=true

# 运行
java -jar target/todo-backend-1.0.0.jar --spring.profiles.active=prod
```

## 🔍 监控和日志

### 健康检查
- 端点: `/api/v1/health`
- 返回应用状态、版本等信息

### 日志配置
- 应用日志级别: DEBUG (开发) / INFO (生产)
- SQL日志: 开发环境启用，生产环境禁用
- 日志输出: 控制台 + 文件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目维护者: Todo App Team
- 邮箱: support@todoapp.com
- 项目链接: [https://github.com/your-username/todo-app](https://github.com/your-username/todo-app)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**版本**: 1.0.0  
**最后更新**: 2024-01-01  
**维护者**: Todo App Team
