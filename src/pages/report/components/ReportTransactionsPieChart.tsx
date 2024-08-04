import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Categories, Transaction } from '~/types';

interface Props {
  transactions: Transaction[];
  windowWidth: number;
}

const TransactionPieChart: React.FC<Props> = ({
  transactions,
  windowWidth,
}) => {
  const categoryData = transactions.reduce((data, transaction) => {
    const key = transaction.category || Categories.OTHER;
    if (!data[key]) {
      data[key] = 0;
    }
    data[key] += parseFloat(transaction.amount);
    return data;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount: Number(amount.toFixed(2)),
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#AF19FF',
    '#FF1919',
    '#dbff00',
  ];

  const chartSize = windowWidth < 768 ? 300 : 600;

  return (
    <ResponsiveContainer width="100%" height={chartSize + 100}>
      <PieChart>
        <Pie
          dataKey="amount"
          isAnimationActive={false}
          nameKey="category"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={chartSize / 3}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionPieChart;
