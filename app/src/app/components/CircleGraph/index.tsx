import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import StCircleChart from './StCircleChart';
import StScoreText from './StScoreText';

const pieStyles = {
  width: 100,
  height: 100,
  cx: 45,
  cy: 45,
  innerRadius: 40,
  outerRadius: 50,
  scoreTop: '24px',
  scoreLeft: '19px',
  scoreWidth: '62px',
  fontSize: '32px',
};

interface CircleGraphProps {
  startScore?: number;
  endScore: number;
  chartStyles?: {
    width: number;
    height: number;
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    scoreTop: string;
    scoreLeft: string;
    scoreWidth: string;
    fontSize: string;
  };
  message?: string;
  colorType: string;
}

const colorMapper = {
  primary: '#fca408',
  secondary: '#04b0f4',
};

const CircleGraph = ({
  startScore = 0,
  endScore,
  chartStyles = pieStyles,
  colorType,
}: CircleGraphProps) => {
  const dataCircle = [
    { value: startScore, color: colorMapper[colorType] },
    { value: endScore, color: colorMapper[colorType] },
    { value: 10 - endScore - startScore, color: '#d7e0e1' },
  ];
  return (
    <StCircleChart>
      <PieChart width={chartStyles.width} height={chartStyles.height}>
        <Pie
          data={dataCircle}
          cx={chartStyles.cx}
          cy={chartStyles.cy}
          innerRadius={chartStyles.innerRadius}
          outerRadius={chartStyles.outerRadius}
          dataKey="value"
          stroke="none"
          startAngle={90}
          endAngle={-270}
        >
          {dataCircle.map((data, index) => (
            <Cell key={`cell-${index}`} fill={data.color} />
          ))}
        </Pie>
      </PieChart>
      <StScoreText color={colorMapper[colorType]}>{endScore}/10</StScoreText>
    </StCircleChart>
  );
};

export default CircleGraph;
