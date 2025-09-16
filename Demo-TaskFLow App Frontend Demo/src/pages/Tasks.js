import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, User, Flag } from 'lucide-react';

const TasksContainer = styled.div`
  padding: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #00ffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px 12px 40px;
  color: #ffffff;
  font-size: 14px;
  width: 300px;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #888;
`;

const FilterButton = styled.button`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #00ffff;
    background: rgba(0, 255, 255, 0.05);
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #00ffff, #0080ff);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
  }
`;

const TasksContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TaskColumn = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskCount = styled.div`
  background: rgba(0, 255, 255, 0.2);
  color: #00ffff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const TaskItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(0, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const TaskTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  flex: 1;
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

const TaskMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #888;
`;

const AssigneeAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #000;
`;

// 模拟任务数据
const tasksData = {
  pending: [
    {
      id: 1,
      title: '设计用户界面原型',
      priority: 'high',
      assignee: '张三',
      dueDate: '2024-12-25',
      project: '电商平台重构'
    },
    {
      id: 2,
      title: '编写API文档',
      priority: 'medium',
      assignee: '李四',
      dueDate: '2024-12-28',
      project: '移动端APP开发'
    }
  ],
  inProgress: [
    {
      id: 3,
      title: '数据库架构设计',
      priority: 'high',
      assignee: '王五',
      dueDate: '2024-12-22',
      project: '电商平台重构'
    },
    {
      id: 4,
      title: '前端组件开发',
      priority: 'medium',
      assignee: '赵六',
      dueDate: '2024-12-30',
      project: '移动端APP开发'
    },
    {
      id: 5,
      title: '用户认证模块',
      priority: 'high',
      assignee: '钱七',
      dueDate: '2024-12-24',
      project: '数据分析系统'
    }
  ],
  completed: [
    {
      id: 6,
      title: '需求分析文档',
      priority: 'medium',
      assignee: '孙八',
      dueDate: '2024-12-20',
      project: '电商平台重构'
    },
    {
      id: 7,
      title: '技术选型调研',
      priority: 'low',
      assignee: '周九',
      dueDate: '2024-12-18',
      project: '移动端APP开发'
    }
  ]
};

function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '普通';
    }
  };

  return (
    <TasksContainer>
      <Header>
        <Title>任务管理</Title>
        <HeaderActions>
          <SearchBox>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="搜索任务..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          
          <FilterButton>
            <Filter size={16} />
            筛选
          </FilterButton>
          
          <CreateButton>
            <Plus size={16} />
            新建任务
          </CreateButton>
        </HeaderActions>
      </Header>

      <TasksContent>
        {Object.entries(tasksData).map(([status, tasks], columnIndex) => {
          const statusConfig = {
            pending: { title: '待开始', icon: Calendar, color: '#888' },
            inProgress: { title: '进行中', icon: User, color: '#00ffff' },
            completed: { title: '已完成', icon: Flag, color: '#00ff80' }
          };
          
          const config = statusConfig[status];
          const Icon = config.icon;
          
          return (
            <TaskColumn
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
            >
              <ColumnHeader>
                <ColumnTitle style={{ color: config.color }}>
                  <Icon size={18} />
                  {config.title}
                </ColumnTitle>
                <TaskCount>{tasks.length}</TaskCount>
              </ColumnHeader>
              
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (columnIndex * 0.1) + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TaskHeader>
                    <TaskTitle>{task.title}</TaskTitle>
                    <PriorityBadge priority={task.priority}>
                      {getPriorityLabel(task.priority)}
                    </PriorityBadge>
                  </TaskHeader>
                  
                  <TaskMeta>
                    <MetaItem>
                      <User size={12} />
                      负责人: {task.assignee}
                    </MetaItem>
                    <MetaItem>
                      <Calendar size={12} />
                      截止: {task.dueDate}
                    </MetaItem>
                    <MetaItem>
                      项目: {task.project}
                    </MetaItem>
                  </TaskMeta>
                </TaskItem>
              ))}
            </TaskColumn>
          );
        })}
      </TasksContent>
    </TasksContainer>
  );
}

export default Tasks;

