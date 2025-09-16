import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp } from 'lucide-react';

const Card = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ProjectName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  flex: 1;
`;

const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case '进行中': return 'rgba(0, 255, 255, 0.2)';
      case '即将完成': return 'rgba(0, 255, 128, 0.2)';
      case '已完成': return 'rgba(0, 255, 128, 0.2)';
      case '已暂停': return 'rgba(255, 193, 7, 0.2)';
      default: return 'rgba(128, 128, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '进行中': return '#00ffff';
      case '即将完成': return '#00ff80';
      case '已完成': return '#00ff80';
      case '已暂停': return '#ffc107';
      default: return '#888';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case '进行中': return 'rgba(0, 255, 255, 0.3)';
      case '即将完成': return 'rgba(0, 255, 128, 0.3)';
      case '已完成': return 'rgba(0, 255, 128, 0.3)';
      case '已暂停': return 'rgba(255, 193, 7, 0.3)';
      default: return 'rgba(128, 128, 128, 0.3)';
    }
  }};
`;

const Department = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
`;

const ProgressSection = styled.div`
  margin-bottom: 16px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressLabel = styled.span`
  font-size: 14px;
  color: #888;
`;

const ProgressValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #00ffff;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #00ffff, #0080ff);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #888;
`;

const TeamSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
`;

const TeamLabel = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TeamMembers = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MemberAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #000;
`;

function ProjectCard({ project }) {
  return (
    <Card
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Header>
        <ProjectName>{project.name}</ProjectName>
        <StatusBadge status={project.status}>{project.status}</StatusBadge>
      </Header>
      
      <Department>{project.department}</Department>
      
      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>进度</ProgressLabel>
          <ProgressValue>{project.progress}%</ProgressValue>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill progress={project.progress} />
        </ProgressBar>
      </ProgressSection>
      
      <InfoGrid>
        <InfoItem>
          <Calendar size={14} />
          开始: {project.startDate}
        </InfoItem>
        <InfoItem>
          <Calendar size={14} />
          结束: {project.endDate}
        </InfoItem>
      </InfoGrid>
      
      <TeamSection>
        <TeamLabel>
          <Users size={14} />
          团队成员
        </TeamLabel>
        <TeamMembers>
          {project.team.map((member, index) => (
            <MemberAvatar key={index}>
              {member.charAt(0)}
            </MemberAvatar>
          ))}
        </TeamMembers>
      </TeamSection>
    </Card>
  );
}

export default ProjectCard;

