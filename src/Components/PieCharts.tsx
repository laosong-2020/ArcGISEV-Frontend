// src/components/PieCharts.tsx

import React from 'react';

import { Cell,Pie, PieChart, ResponsiveContainer, Sector, SectorProps } from 'recharts';

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

type PieChartDataItem = {
  name: string;
  value: number;
}

type PieChartProps = {
  systemMemData: PieChartDataItem[];
  systemDiskData: PieChartDataItem[];
}

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: PieChartDataItem;
};

const COLORS = ['#dacaff', '#834efe'];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={fill}
      >
        {payload?.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="#EEE">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fill="#BBB">
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function pieChartSection({ systemMemData, systemDiskData }: PieChartProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <span className="w-full text-md font-bold text-start mb-2">System Memory</span>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeShape={renderActiveShape}
              data={systemMemData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={56}
              fill="#8884d8"
              dataKey="value"
            >
              {systemMemData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <span className="w-full text-md font-bold text-start mb-2">System Disk</span>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeShape={renderActiveShape}
              data={systemDiskData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={56}
              fill="#834efe"
              dataKey="value"
            >
              {systemDiskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
}
