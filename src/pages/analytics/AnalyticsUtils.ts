// Define your banks here

import { Categories, Transaction } from '~/types';
import { MONTHS, MONTH_LABELS } from './AnalyticsConstants';

const getMonthName = (month: number) => {
  return MONTH_LABELS[month - 1];
};

const groupTransactionsByCategory = (transactions: Transaction[]) => {
  return transactions.reduce((data, transaction) => {
    const key = transaction.category || Categories.OTHER;
    if (!data[key]) {
      data[key] = 0;
    }
    data[key] = Number((data[key] + parseFloat(transaction.amount)).toFixed(2));
    return data;
  }, {} as Record<string, number>);
};

export const getTransactionsByMonth = (
  transactions: Transaction[],
  month: number
) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === month - 1;
  });
};

export const getTransactionsByYear = (
  transactions: Transaction[],
  year: number
) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getFullYear() === year;
  });
};

export const getMonthsData = (transactions: Transaction[]) => {
  return MONTHS.map(month => {
    const transactionsForMonth = getTransactionsByMonth(transactions, month);

    // group by Category
    const categoryData = groupTransactionsByCategory(transactionsForMonth);

    return {
      month: getMonthName(month),
      ...categoryData,
    };
  });
};
