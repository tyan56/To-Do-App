import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, Target, AlertTriangle } from 'lucide-react';
import Chart from '../components/Chart';

const AnalyticsContainer = styled.div`
  padding: 0;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #00ffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  text-align: center;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.color}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: ${props => props.color};
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #888;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled(motion.section)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(20px);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TeamPerformance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
`;

const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #000;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
`;

const MemberStats = styled.div`
  font-size: 12px;
  color: #888;
`;

const PerformanceBar = styled.div`
  width: 100px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const PerformanceFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background: linear-gradient(90deg, #00ffff, #0080ff);
  border-radius: 3px;
`;

const AlertsSection = styled(ChartSection)`
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
  width: 32px;
  height: 32px;
  background: rgba(255, 193, 7, 0.2);
  border-radius: 6px;
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
  margin-bottom: 2px;
`;

const AlertDescription = styled.div`
  font-size: 12px;
  color: #888;
`;

// 模拟数据
const analyticsStats = [
  {
    label: '项目完成率',
    value: '87%',
    icon: Target,
    color: '#00ffff'
  },
  {
    label: '平均完成时间',
    value: '12天',
    icon: Clock,
    color: '#0080ff'
  },
  {
    label: '团队效率',
    value: '92%',
    icon: TrendingUp,
    color: '#00ff80'
  },
  {
    label: '风险项目',
    value: '3个',
    icon: AlertTriangle,
    color: '#ffc107'
  }
];

const teamPerformance = [
  { name: '张三', tasks: 15, completed: 12, efficiency: 80 },
  { name: '李四', tasks: 12, completed: 11, efficiency: 92 },
  { name: '王五', tasks: 18, completed: 16, efficiency: 89 },
  { name: '赵六', tasks: 10, completed: 9, efficiency: 90 },
  { name: '钱七', tasks: 14, completed: 13, efficiency: 93 }
];

const alerts = [
  {
    title: '项目延期风险',
    description: '电商平台重构项目可能延期3天',
    time: '2小时前'
  },
  {
    title: '资源冲突',
    description: '张三同时参与3个项目，工作负载过高',
    time: '4小时前'
  },
  {
    title: '里程碑提醒',
    description: '移动端APP开发第一阶段即将到期',
    time: '6小时前'
  }
];

function Analytics() {
  return (
    <AnalyticsContainer>
      <Header>
        <Title>数据分析</Title>
        <Subtitle>项目绩效和团队效率分析</Subtitle>
      </Header>

      <StatsGrid>
        {analyticsStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatIcon color={stat.color}>
                <Icon size={24} />
              </StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          );
        })}
      </StatsGrid>

      <ChartsGrid>
        <ChartSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>
            <BarChart3 size={18} />
            项目进度趋势
          </SectionTitle>
          <Chart />
        </ChartSection>

        <div>
          <ChartSection
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle>
              <Users size={18} />
              团队绩效
            </SectionTitle>
            <TeamPerformance>
              {teamPerformance.map((member, index) => (
                <TeamMember key={member.name}>
                  <MemberAvatar>
                    {member.name.charAt(0)}
                  </MemberAvatar>
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberStats>
                      {member.completed}/{member.tasks} 任务完成
                    </MemberStats>
                  </MemberInfo>
                  <PerformanceBar>
                    <PerformanceFill percentage={member.efficiency} />
                  </PerformanceBar>
                </TeamMember>
              ))}
            </TeamPerformance>
          </ChartSection>

          <AlertsSection
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle>
              <AlertTriangle size={18} />
              风险预警
            </SectionTitle>
            {alerts.map((alert, index) => (
              <AlertItem key={index}>
                <AlertIcon>
                  <AlertTriangle size={16} />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </AlertContent>
              </AlertItem>
            ))}
          </AlertsSection>
        </div>
      </ChartsGrid>
    </AnalyticsContainer>
  );
}

export default Analytics;

