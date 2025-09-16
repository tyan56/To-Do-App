import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const ProjectsContainer = styled.div`
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

const ViewToggle = styled.div`
  display: flex;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: ${props => props.active ? 'rgba(0, 255, 255, 0.2)' : 'transparent'};
  border: none;
  padding: 12px;
  color: ${props => props.active ? '#00ffff' : '#888'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: #00ffff;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #888;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #00ffff;
`;

// 模拟项目数据
const projectsData = [
  {
    id: 1,
    name: '电商平台重构',
    department: '技术部',
    progress: 75,
    status: '进行中',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    team: ['张三', '李四', '王五']
  },
  {
    id: 2,
    name: '移动端APP开发',
    department: '产品部',
    progress: 45,
    status: '进行中',
    startDate: '2024-02-01',
    endDate: '2024-04-15',
    team: ['赵六', '钱七', '孙八']
  },
  {
    id: 3,
    name: '数据分析系统',
    department: '技术部',
    progress: 90,
    status: '即将完成',
    startDate: '2023-12-01',
    endDate: '2024-02-28',
    team: ['周九', '吴十']
  },
  {
    id: 4,
    name: '客户管理系统',
    department: '运营部',
    progress: 30,
    status: '进行中',
    startDate: '2024-02-15',
    endDate: '2024-05-30',
    team: ['郑十一', '王十二', '李十三']
  },
  {
    id: 5,
    name: '内部培训平台',
    department: '人事部',
    progress: 100,
    status: '已完成',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    team: ['张十四', '刘十五']
  },
  {
    id: 6,
    name: '财务管理系统',
    department: '财务部',
    progress: 60,
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    team: ['陈十六', '杨十七', '黄十八']
  }
];

function Projects() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter(project =>
        project.name.toLowerCase().includes(term.toLowerCase()) ||
        project.department.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <ProjectsContainer>
      <Header>
        <Title>项目管理</Title>
        <HeaderActions>
          <SearchBox>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="搜索项目..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBox>
          
          <FilterButton>
            <Filter size={16} />
            筛选
          </FilterButton>
          
          <ViewToggle>
            <ToggleButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </ToggleButton>
            <ToggleButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </ToggleButton>
          </ViewToggle>
          
          <CreateButton>
            <Plus size={16} />
            新建项目
          </CreateButton>
        </HeaderActions>
      </Header>

      {filteredProjects.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <Plus size={32} />
          </EmptyIcon>
          <h3>暂无项目</h3>
          <p>创建您的第一个项目开始管理任务</p>
        </EmptyState>
      ) : (
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </ProjectsGrid>
      )}
    </ProjectsContainer>
  );
}

export default Projects;

