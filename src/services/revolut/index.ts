import { extractDataFromCSV } from '~/utils';
import { Banks, ExpensesReport, Transaction } from '~/types';
import {
  RevolutTransaction,
  RevolutTransactionTypes,
} from '~/services/revolut/types';

const filterTransactions = (
  transactions: RevolutTransaction[]
): RevolutTransaction[] =>
  transactions
    .filter(
      item =>
        item.type === RevolutTransactionTypes.CARD_PAYMENT &&
        item.amount !== '0.00'
    )
    .map(item => ({
      ...item,
      id: `${item.startedDate.replaceAll(' ', '-')}-${item.type}-${
        item.amount
      }`,
    }));

const getTotal = (transactions: RevolutTransaction[]): number =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

const REVOLUT_TRANSACTIONS_SPECIAL_CASES = {
  amount: (value: string) => value.replace('-', ''),
};

export const getExpensesReport = (
  transactions: RevolutTransaction[]
): ExpensesReport => {
  const filteredTransactions = filterTransactions(transactions);
  return {
    total: getTotal(filteredTransactions),
    transactions: filteredTransactions,
    from: filteredTransactions[0].startedDate,
    to: filteredTransactions[filteredTransactions.length - 1].startedDate,
  };
};

export const extractRevolutReportFromCSV = (
  file: File,
  cb: (data: ExpensesReport) => void
): void => {
  extractDataFromCSV<RevolutTransaction>(
    file,
    REVOLUT_TRANSACTIONS_SPECIAL_CASES,
    data => {
      const newExpensesReport = getExpensesReport(data);
      cb(newExpensesReport);
      localStorage.setItem('report', JSON.stringify(newExpensesReport));
    }
  );
};

export const formatRevolutTransactionsToGeneralTransactions = (
  revolutTransactions: RevolutTransaction[]
): Transaction[] => {
  return revolutTransactions.map(transaction => ({
    id: transaction.id,
    amount: transaction.amount,
    description: transaction.description,
    category: transaction.category,
    fullDescription: transaction.description,
    date: transaction.startedDate,
    bank: Banks.Revolut,
  }));
};
