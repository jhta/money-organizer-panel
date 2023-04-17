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
import { Banks, Transaction } from './types';

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
