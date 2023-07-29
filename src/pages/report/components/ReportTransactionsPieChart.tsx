import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { Categories, Transaction } from '~/types';

interface Props {
  transactions: Transaction[];
}

const TransactionPieChart: React.FC<Props> = ({ transactions }) => {
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

  return (
    <PieChart width={600} height={600}>
      <Pie
        dataKey="amount"
        isAnimationActive={false}
        nameKey="category"
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={180}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {chartData.map((entry, index) => (
          <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TransactionPieChart;
