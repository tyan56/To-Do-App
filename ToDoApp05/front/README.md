# Todo应用前端

一个基于React的现代化待办事项管理应用前端，提供直观的用户界面和流畅的用户体验。

## 🚀 功能特性

- ✅ 添加待办事项（支持标题、描述、优先级、截止日期）
- ✅ 标记完成/取消完成
- ✅ 删除单个待办事项
- ✅ 查询过滤（全部/未完成/已完成）
- ✅ 批量删除已完成项目
- ✅ 清空所有待办事项
- ✅ 现代化UI设计，响应式布局
- ✅ 实时数据统计
- ✅ 加载状态和错误处理
- ✅ 逾期提醒功能
- ✅ 优先级标识

## 🛠 技术栈

- **框架**: React 18.2.0
- **构建工具**: Vite 4.5.0
- **HTTP客户端**: Axios 1.6.0
- **样式**: CSS3 + 现代设计
- **开发语言**: JavaScript (ES6+)

## 📋 环境要求

- **Node.js**: 16.0 或更高版本
- **npm**: 8.0 或更高版本

## 🚀 快速开始

### 1. 安装依赖

```bash
cd ToDoApp05/front
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中。

### 4. 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
front/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── Header.jsx     # 页面头部
│   │   ├── TodoForm.jsx   # 添加待办事项表单
│   │   ├── TodoFilter.jsx # 过滤条件
│   │   ├── TodoList.jsx   # 待办事项列表
│   │   ├── TodoItem.jsx   # 单个待办事项
│   │   └── TodoActions.jsx # 底部操作按钮
│   ├── services/          # API服务
│   │   └── api.js         # API接口封装
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
└── README.md              # 项目文档
```

## 🎨 设计特点

### 1. 现代化UI设计
- 渐变背景和卡片式布局
- 圆角设计和阴影效果
- 统一的颜色方案和字体

### 2. 响应式布局
- 支持桌面端和移动端
- 最大宽度800px，居中显示
- 移动端优化的交互体验

### 3. 交互反馈
- 悬停效果和过渡动画
- 加载状态指示器
- 错误提示和确认对话框

### 4. 用户体验
- 直观的操作界面
- 实时数据更新
- 清晰的状态指示

## 🔧 配置说明

### 开发环境配置

项目使用Vite作为构建工具，主要配置在 `vite.config.js` 中：

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

### API代理配置

前端通过代理将API请求转发到后端服务器（默认端口8000），避免跨域问题。

## 📱 功能说明

### 1. 添加待办事项
- 输入标题（必填）
- 添加描述（可选）
- 设置优先级（低/中/高）
- 设置截止日期（可选）

### 2. 管理待办事项
- 点击圆形按钮切换完成状态
- 点击编辑按钮（开发中）
- 点击删除按钮删除项目

### 3. 过滤和统计
- 查看全部/未完成/已完成项目
- 实时显示项目数量统计
- 支持批量操作

### 4. 批量操作
- 清除已完成项目
- 清除所有项目（需确认）

## 🎯 组件说明

### Header组件
- 应用标题和图标
- 动画效果和渐变背景

### TodoForm组件
- 添加新待办事项的表单
- 支持多种输入字段
- 表单验证和提交处理

### TodoFilter组件
- 过滤条件选择
- 实时显示项目数量
- 标签式切换界面

### TodoList组件
- 待办事项列表容器
- 加载状态和空状态处理
- 列表项渲染

### TodoItem组件
- 单个待办事项显示
- 完成状态切换
- 编辑和删除操作
- 优先级和逾期标识

### TodoActions组件
- 底部操作按钮
- 项目统计信息
- 批量操作功能

## 🔌 API集成

前端通过 `services/api.js` 与后端API进行通信：

- 统一的请求/响应处理
- 错误处理和重试机制
- 请求拦截和响应拦截
- 超时设置和重试逻辑

## 🚀 部署说明

### 1. 构建生产版本

```bash
npm run build
```

### 2. 部署到Web服务器

将 `dist` 目录中的文件部署到Web服务器（如Nginx、Apache等）。

### 3. 配置反向代理

确保Web服务器正确配置API代理，将 `/api` 路径的请求转发到后端服务器。

### Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🐛 故障排除

### 1. 依赖安装失败
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules并重新安装
rm -rf node_modules package-lock.json
npm install
```

### 2. 开发服务器启动失败
- 检查端口3000是否被占用
- 确认Node.js版本是否符合要求
- 检查防火墙设置

### 3. API请求失败
- 确认后端服务器是否启动
- 检查代理配置是否正确
- 查看浏览器控制台错误信息

### 4. 样式显示异常
- 清除浏览器缓存
- 检查CSS文件是否正确加载
- 确认浏览器兼容性

## 📝 开发指南

### 添加新功能
1. 在 `src/components` 中创建新组件
2. 在 `src/services/api.js` 中添加API接口
3. 在 `App.jsx` 中集成新功能
4. 添加相应的样式文件

### 修改样式
- 全局样式在 `src/index.css`
- 组件样式在对应的 `.css` 文件中
- 使用CSS变量保持样式一致性

### 调试技巧
- 使用浏览器开发者工具
- 查看控制台日志和错误信息
- 使用React Developer Tools插件

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证。

---

**版本**: 1.0.0  
**最后更新**: 2024-01-01  
**维护人员**: 开发团队
