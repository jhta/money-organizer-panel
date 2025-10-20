import { convertDateToTimestamp, getKnownCategory } from '~/utils';
import { extractDataFromCSV } from '~/utils/extractDataFromCSV';
import { Banks, Transaction } from '~/types';
import {
  RevolutTransaction,
  RevolutTransactionTypes,
} from '~/services/revolut/types';

const ACCEPTABLE_TRANSACTION_TYPES = [
  RevolutTransactionTypes.CARD_PAYMENT,
  RevolutTransactionTypes.ATM,
];

const formatRevolutTransactionType = (
  type: string
): RevolutTransactionTypes => {
  return type.toUpperCase().replace(' ', '_') as RevolutTransactionTypes;
};

const generateRevolutTransactionId = (
  transaction: RevolutTransaction
): string => {
  return `${transaction.startedDate.replaceAll(
    ' ',
    '-'
  )}-${formatRevolutTransactionType(transaction.type)}-${transaction.amount}`;
};

const filterTransactions = (
  transactions: RevolutTransaction[]
): RevolutTransaction[] =>
  transactions
    .filter(
      item =>
        ACCEPTABLE_TRANSACTION_TYPES.includes(
          formatRevolutTransactionType(item.type)
        ) && item.amount !== '0.00'
    )
    .filter(item => item.state === 'COMPLETED')
    .map(item => ({
      ...item,
      id: generateRevolutTransactionId(item),
      type: formatRevolutTransactionType(item.type),
    }));

const REVOLUT_TRANSACTIONS_SPECIAL_CASES = {
  amount: (value: string) => value.replace('-', ''),
};

export const extractRevolutReportFromCSV = (
  file: File,
  cb: (data: RevolutTransaction[]) => void
): void => {
  extractDataFromCSV<RevolutTransaction>(
    file,
    REVOLUT_TRANSACTIONS_SPECIAL_CASES,
    data => {
      console.log({ data });
      const filteredTransactions = filterTransactions(data);
      console.log('filteredTransactions', filteredTransactions);
      cb(filteredTransactions);
      localStorage.setItem('report', JSON.stringify(filterTransactions));
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
    category: getKnownCategory(transaction.description),
    fullDescription: transaction.description,
    date: convertDateToTimestamp(transaction.startedDate),
    bank: Banks.Revolut,
  }));
};
