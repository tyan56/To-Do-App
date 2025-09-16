import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TaskItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(0, 255, 255, 0.2);
  }
`;

const TaskIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#00ff80';
      case 'in-progress': return '#00ffff';
      case 'pending': return '#888';
      case 'overdue': return '#ff4444';
      default: return '#888';
    }
  }};
`;

const TaskContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TaskTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.6 : 1};
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #888;
`;

const PriorityBadge = styled.div`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: ${props => {
    switch (props.priority) {
      case 'high': return 'rgba(255, 68, 68, 0.2)';
      case 'medium': return 'rgba(255, 193, 7, 0.2)';
      case 'low': return 'rgba(0, 255, 128, 0.2)';
      default: return 'rgba(128, 128, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffc107';
      case 'low': return '#00ff80';
      default: return '#888';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #888;
  font-size: 14px;
`;

// 模拟任务数据
const tasksData = [
  {
    id: 1,
    title: '完成用户界面设计',
    status: 'completed',
    priority: 'high',
    assignee: '张三',
    dueDate: '2024-12-20'
  },
  {
    id: 2,
    title: '数据库架构设计',
    status: 'in-progress',
    priority: 'high',
    assignee: '李四',
    dueDate: '2024-12-22'
  },
  {
    id: 3,
    title: 'API接口开发',
    status: 'pending',
    priority: 'medium',
    assignee: '王五',
    dueDate: '2024-12-25'
  },
  {
    id: 4,
    title: '单元测试编写',
    status: 'overdue',
    priority: 'medium',
    assignee: '赵六',
    dueDate: '2024-12-18'
  }
];

function TaskList() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'in-progress':
        return <Clock size={16} />;
      case 'overdue':
        return <AlertCircle size={16} />;
      default:
        return <Circle size={16} />;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '普通';
    }
  };

  if (tasksData.length === 0) {
    return (
      <EmptyState>
        暂无任务
      </EmptyState>
    );
  }

  return (
    <TaskListContainer>
      {tasksData.map((task, index) => (
        <TaskItem
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <TaskIcon status={task.status}>
            {getStatusIcon(task.status)}
          </TaskIcon>
          
          <TaskContent>
            <TaskTitle completed={task.status === 'completed'}>
              {task.title}
            </TaskTitle>
            <TaskMeta>
              <span>负责人: {task.assignee}</span>
              <span>截止: {task.dueDate}</span>
              <PriorityBadge priority={task.priority}>
                {getPriorityLabel(task.priority)}
              </PriorityBadge>
            </TaskMeta>
          </TaskContent>
        </TaskItem>
      ))}
    </TaskListContainer>
  );
}

export default TaskList;

