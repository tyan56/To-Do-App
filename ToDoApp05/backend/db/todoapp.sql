-- 创建数据库
CREATE DATABASE IF NOT EXISTS todoapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE todoapp;

-- 待办事项表
CREATE TABLE IF NOT EXISTS todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    title VARCHAR(255) NOT NULL COMMENT '待办事项标题',
    description TEXT COMMENT '待办事项描述',
    completed BOOLEAN DEFAULT FALSE COMMENT '完成状态：0-未完成，1-已完成',
    priority INT DEFAULT 0 COMMENT '优先级：0-低，1-中，2-高',
    due_date DATETIME COMMENT '截止日期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 索引
    INDEX idx_completed (completed),
    INDEX idx_priority (priority),
    INDEX idx_due_date (due_date),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='待办事项表';

-- 插入示例数据
INSERT INTO todos (title, description, completed, priority, due_date) VALUES
('学习React', '完成React基础教程学习', false, 2, '2024-12-31 23:59:59'),
('完成项目文档', '编写项目技术文档和API文档', false, 1, '2024-12-25 18:00:00'),
('代码审查', '对团队代码进行审查', true, 1, '2024-12-20 17:00:00'),
('单元测试', '编写单元测试用例', false, 0, '2024-12-30 16:00:00'),
('部署应用', '将应用部署到生产环境', false, 2, '2024-12-28 20:00:00');
