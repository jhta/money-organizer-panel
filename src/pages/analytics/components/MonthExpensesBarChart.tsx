import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Categories, Transaction } from '~/types';
import { YearSelect } from './YearSelect';
import { getMonthsData, getTransactionsByYear } from '../AnalyticsUtils';
import { BAR_CATEGORY_COLORS } from '../AnalyticsConstants';

interface BarChartProps {
  data: Transaction[];
}

export const MonthlyExpensesBarChart: React.FC<BarChartProps> = ({ data }) => {
  // Prepare the data for the bar chart

  const categories = Object.values(Categories);
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = getTransactionsByYear(data, selectedYear);

  const monthData = getMonthsData(yearData);

  return (
    <div>
      <h2>{`Monthly Transaction Chart - ${selectedYear}`}</h2>
      <YearSelect
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <BarChart
        width={800}
        height={600}
        data={monthData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip contentStyle={{ backgroundColor: '#242424' }} />
        <Legend />
        {categories.map((category, index) => (
          <Bar
            onClick={() => console.log('clicked', category)}
            key={index}
            stackId={'a'}
            dataKey={category}
            fill={BAR_CATEGORY_COLORS[index % BAR_CATEGORY_COLORS.length]}
          />
        ))}
        {/* <Bar dataKey="totalAmount" fill="#427b57" /> */}
      </BarChart>
    </div>
  );
};
