import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Users,
  Calendar,
  Target
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import Chart from '../components/Chart';

const DashboardContainer = styled.div`
  padding: 0;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #00ffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.section)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(20px);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const AlertSection = styled(Section)`
  border-color: rgba(255, 193, 7, 0.3);
  background: rgba(255, 193, 7, 0.05);
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 193, 7, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const AlertIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 193, 7, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc107;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
`;

const AlertDescription = styled.div`
  font-size: 14px;
  color: #888;
`;

// 模拟数据
const statsData = [
  {
    title: '活跃项目',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: Target,
    color: '#00ffff'
  },
  {
    title: '进行中任务',
    value: '48',
    change: '+5',
    changeType: 'positive',
    icon: Clock,
    color: '#0080ff'
  },
  {
    title: '团队成员',
    value: '24',
    change: '+1',
    changeType: 'positive',
    icon: Users,
    color: '#00ff80'
  },
  {
    title: '完成率',
    value: '87%',
    change: '+3%',
    changeType: 'positive',
    icon: TrendingUp,
    color: '#ff8000'
  }
];

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
  }
];

const alertsData = [
  {
    id: 1,
    title: '项目延期预警',
    description: '电商平台重构项目可能延期3天',
    time: '2小时前'
  },
  {
    id: 2,
    title: '资源冲突',
    description: '张三同时参与3个项目，工作负载过高',
    time: '4小时前'
  },
  {
    id: 3,
    title: '里程碑提醒',
    description: '移动端APP开发第一阶段即将到期',
    time: '6小时前'
  }
];

function Dashboard() {
  return (
    <DashboardContainer>
      <Header>
        <Title>项目仪表板</Title>
        <Subtitle>实时监控项目进度和团队状态</Subtitle>
      </Header>

      <StatsGrid>
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </StatsGrid>

      <ContentGrid>
        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>
            <Target size={20} />
            项目概览
          </SectionTitle>
          <ProjectsGrid>
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </ProjectsGrid>
        </Section>

        <div>
          <Section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle>
              <Calendar size={20} />
              今日任务
            </SectionTitle>
            <TaskList />
          </Section>

          <AlertSection
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SectionTitle>
              <AlertTriangle size={20} />
              系统预警
            </SectionTitle>
            {alertsData.map((alert) => (
              <AlertItem key={alert.id}>
                <AlertIcon>
                  <AlertTriangle size={18} />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </AlertContent>
              </AlertItem>
            ))}
          </AlertSection>
        </div>
      </ContentGrid>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <SectionTitle>
          <TrendingUp size={20} />
          项目进度趋势
        </SectionTitle>
        <Chart />
      </Section>
    </DashboardContainer>
  );
}

export default Dashboard;

