import { parse } from 'papaparse';
import camelcase from 'lodash.camelcase';
import { format } from 'date-fns';
import {
  extractRevolutReportFromCSV,
  formatRevolutTransactionsToGeneralTransactions,
} from '~/services/revolut';
import {
  extractDataFromTxt,
  formatAbnAmroTransactionsToGeneralTransactions,
} from '~/services/abm-amro/AbnAmroService';
import { Banks, Categories, ExpensesReport, Transaction } from './types';
import { TotalReport } from './store/reducer';

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

interface CSVFormatterSpecialCases {
  [key: string]: (value: string) => string;
}

function formatCsvResult<ExpectedData extends Object>(
  csvData: Array<Record<string, string>>,
  specialCases: CSVFormatterSpecialCases = {}
): ExpectedData[] {
  return csvData.map(item => {
    const entries = Object.entries(item);

    if (!entries.length) return {} as ExpectedData;

    return entries.reduce((acc, [key, value]) => {
      const formattedKey = camelcase(key);

      if (specialCases[formattedKey]) {
        return {
          ...acc,
          [formattedKey]: specialCases[formattedKey](value),
        };
      }

      return {
        ...acc,
        [formattedKey]: value,
      };
    }, {} as ExpectedData);
  });
}

export function extractDataFromCSV<Data extends Object>(
  csv: File,
  specialCases: CSVFormatterSpecialCases = {},
  cb: (data: Data[]) => void
): void {
  parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    complete: results => {
      if (!results?.data?.length) return cb([] as Data[]);

      const formattedCsvData = formatCsvResult<Data>(
        results.data,
        specialCases
      );
      cb(formattedCsvData);
    },
  });
}

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

const KNOWN_CATEGORIES_MAP = {
  'albert heijn': Categories.GROCERIES,
  jumbo: Categories.GROCERIES,
  dirk: Categories.GROCERIES,
  lidl: Categories.GROCERIES,
  action: Categories.GROCERIES,
  spar: Categories.GROCERIES,
  booking: Categories.TRAVEL,
  airbnb: Categories.TRAVEL,
  uber: Categories.TRANSPORT,
  ns: Categories.TRANSPORT,
  waternet: Categories.HOUSEHOLD,
  'budget energie': Categories.HOUSEHOLD,
  transavia: Categories.TRAVEL,
  klm: Categories.TRAVEL,
  easyjet: Categories.TRAVEL,
  cafe: Categories.RESTAURANTS_AND_COFFEE,
  coffee: Categories.RESTAURANTS_AND_COFFEE,
  restaurant: Categories.RESTAURANTS_AND_COFFEE,
};

const knownCategories = Object.keys(
  KNOWN_CATEGORIES_MAP
) as (keyof typeof KNOWN_CATEGORIES_MAP)[];

export const getKnownCategory = (description = '') => {
  const lowerCaseDescription = description.toLowerCase();

  const categoryKey = knownCategories.find(category =>
    lowerCaseDescription.includes(category)
  );

  if (!categoryKey) return undefined;

  return KNOWN_CATEGORIES_MAP[categoryKey];
};

export const calculateTotal = (transactions: Transaction[]): number =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

export const mixReports = (
  report: ExpensesReport,
  newReport: ExpensesReport
): ExpensesReport => {
  const transactions = [...report.transactions, ...newReport.transactions];
  return {
    total: report.total + newReport.total,
    from: transactions[0].date,
    to: transactions[transactions.length - 1].date,
    transactions: [...report.transactions, ...newReport.transactions],
  };
};
