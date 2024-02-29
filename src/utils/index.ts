import { format } from 'date-fns';
import {
  extractRevolutReportFromCSV,
  formatRevolutTransactionsToGeneralTransactions,
} from '~/services/revolut';
import {
  extractDataFromTxt,
  formatAbnAmroTransactionsToGeneralTransactions,
} from '~/services/abm-amro/AbnAmroService';
import { Banks, ExpensesReport, Transaction } from '~/types';

export function formatDate(date: string | number) {
  if (!date) return '';
  try {
    const formatted = format(new Date(date), 'MMM, dd yyyy');
    return formatted;
  } catch (e) {
    console.log(e);
    return '';
  }
}

export function formatAmountToEuro(amount: string | number) {
  return `${Math.round(Number(amount) * 100) / 100}€`;
}

export const convertDateToTimestamp = (date: string) =>
  new Date(date).getTime();

export function extractTransactionsFromFile(
  file: File,
  bank: Banks,
  cb: (transactions: Transaction[]) => void
) {
  if (bank === Banks.Revolut) {
    extractRevolutReportFromCSV(file, revolutTransactions => {
      const transactions =
        formatRevolutTransactionsToGeneralTransactions(revolutTransactions);
      cb(transactions);
    });

    return;
  }
  extractDataFromTxt(file, report => {
    console.log();
    const transactions = formatAbnAmroTransactionsToGeneralTransactions(report);

    cb(transactions);
  });
}

export const calculateTotal = (transactions: Transaction[]): number =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

const sortReportsByDate = (a: Transaction, b: Transaction) => a.date - b.date;

export const mixReports = (
  report: ExpensesReport,
  newReport: ExpensesReport
): ExpensesReport => {
  const transactions = [...report.transactions, ...newReport.transactions].sort(
    sortReportsByDate
  );
  return {
    total: report.total + newReport.total,
    from: transactions[0].date,
    to: transactions[transactions.length - 1].date,
    transactions,
  };
};

export * from './getKnowCategory';
