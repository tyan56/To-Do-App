import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.color}, transparent);
  }
  
  &:hover {
    border-color: ${props => props.color}40;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.color}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const ChangeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.changeType === 'positive' ? '#00ff80' : '#ff4444'};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
`;

const Title = styled.div`
  font-size: 14px;
  color: #888;
  font-weight: 500;
`;

function StatsCard({ title, value, change, changeType, icon: Icon, color }) {
  return (
    <Card
      color={color}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <CardHeader>
        <IconWrapper color={color}>
          <Icon size={24} />
        </IconWrapper>
        <ChangeIndicator changeType={changeType}>
          {changeType === 'positive' ? '↗' : '↘'} {change}
        </ChangeIndicator>
      </CardHeader>
      
      <CardContent>
        <Value>{value}</Value>
        <Title>{title}</Title>
      </CardContent>
    </Card>
  );
}

export default StatsCard;

