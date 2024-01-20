import React from 'react';
import { useQuery } from 'react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import firebaseService from '~/services/firebase/firebaseService';
import { Categories, Transaction } from '~/types';

export const AnalyticsPage = () => {
  const { data } = useQuery('transactions', () =>
    firebaseService.getAllTransactionReports()
  );

  return (
    <div>
      <h1>Analytics</h1>
      {data && <BarChartComponent data={data} />}
    </div>
  );
};

interface BarChartProps {
  data: Transaction[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AF19FF',
  '#FF1919',
  '#dbff00',
];

const SOFT_COLORS = [
  '#b3d1ff',
  '#b3ffe6',
  '#ffe6b3',
  '#ffb3b3',
  '#e6b3ff',
  '#ffb3ff',
  '#ffffb3',
  '#b3ffff',
  '#b3b3ff',
  '#ffb3e6',
];

// Define your banks here

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  // Prepare the data for the bar chart
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // const monthData = months
  //   .map(month => {
  //     const transactionsForMonth = data.filter(transaction => {
  //       const transactionDate = new Date(transaction.date);
  //       return transactionDate.getMonth() === month - 1;
  //     });

  //     // Calculate the total amount for the month
  //     const totalAmount = Number(
  //       transactionsForMonth
  //         .reduce((acc, transaction) => {
  //           return acc + parseFloat(transaction.amount);
  //         }, 0)
  //         .toFixed(2)
  //     );

  //     return { month: getMonthName(month), totalAmount };
  //   })
  //   .filter(month => month.totalAmount > 0);
  const monthData = months
    .map(month => {
      const transactionsForMonth = data.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === month - 1;
      });

      // group by Category
      const categoryData = transactionsForMonth.reduce((data, transaction) => {
        const key = transaction.category || Categories.OTHER;
        if (!data[key]) {
          data[key] = 0;
        }
        data[key] = Number(
          (data[key] + parseFloat(transaction.amount)).toFixed(2)
        );
        return data;
      }, {} as Record<string, number>);

      return {
        month: getMonthName(month),
        ...categoryData,
      };
    })
    .filter(month => Object.keys(month).length > 1);

  const categories = Object.values(Categories);

  return (
    <div>
      <h2>Monthly Transaction Chart</h2>
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
            fill={SOFT_COLORS[index % SOFT_COLORS.length]}
          />
        ))}
        {/* <Bar dataKey="totalAmount" fill="#427b57" /> */}
      </BarChart>
    </div>
  );
};

const getMonthName = (month: number) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1];
};

export default BarChartComponent;
