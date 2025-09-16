import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 模拟图表数据
const chartData = [
  { name: '1月', 完成率: 65, 计划: 70 },
  { name: '2月', 完成率: 72, 计划: 75 },
  { name: '3月', 完成率: 68, 计划: 80 },
  { name: '4月', 完成率: 85, 计划: 85 },
  { name: '5月', 完成率: 78, 计划: 90 },
  { name: '6月', 完成率: 92, 计划: 95 },
  { name: '7月', 完成率: 88, 计划: 100 },
  { name: '8月', 完成率: 95, 计划: 100 },
  { name: '9月', 完成率: 87, 计划: 100 },
  { name: '10月', 完成率: 90, 计划: 100 },
  { name: '11月', 完成率: 93, 计划: 100 },
  { name: '12月', 完成率: 87, 计划: 100 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(20, 20, 20, 0.95)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '8px',
        padding: '12px',
        color: '#ffffff'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{`${label}`}</p>
        <p style={{ margin: '0 0 4px 0', color: '#00ffff' }}>
          {`实际完成率: ${payload[0].value}%`}
        </p>
        <p style={{ margin: '0', color: '#888' }}>
          {`计划完成率: ${payload[1].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

function Chart() {
  return (
    <ChartContainer>
      <ChartTitle>
        项目完成率趋势
      </ChartTitle>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00ffff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0080ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0080ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="完成率"
            stroke="#00ffff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorActual)"
            dot={{ fill: '#00ffff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00ffff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="计划"
            stroke="#0080ff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPlan)"
            dot={{ fill: '#0080ff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#0080ff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default Chart;

