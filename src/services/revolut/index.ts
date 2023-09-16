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

const filterTransactions = (
  transactions: RevolutTransaction[]
): RevolutTransaction[] =>
  transactions
    .filter(
      item =>
        ACCEPTABLE_TRANSACTION_TYPES.includes(item.type) &&
        item.amount !== '0.00'
    )
    .map(item => ({
      ...item,
      id: `${item.startedDate.replaceAll(' ', '-')}-${item.type}-${
        item.amount
      }`,
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
      const filteredTransactions = filterTransactions(data);
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
