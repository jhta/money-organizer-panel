import { Banks, Categories, Transaction } from '~/types';
import { v4 } from 'uuid';

interface AbnAmroTransaction {
  id: string;
  currency: string;
  initialDate: string;
  balancePrevious: string;
  balanceAfter: string;
  endDate: string;
  amount: string;
  description: string;
  fullDescription: string;
}

const APPLE_PAY_DESCRIPTIONS = [
  'eCom, Apple Pay',
  'eCom, Betaalpas',
  'GEA, Betaalpas',
  'BEA, Apple Pay',
];

function formatApplePayDescription(description = ''): string {
  if (APPLE_PAY_DESCRIPTIONS.every(desc => !description.includes(desc))) {
    return description;
  }

  let val = `${description}`;

  APPLE_PAY_DESCRIPTIONS.forEach(desc => {
    val = val.replace(desc, '');
  });

  val = val.replace(/\s\s+/g, ' ');
  const [result] = val.split(',');

  return result;
}

function formatDescription(description = ''): string {
  const [_, name] = description.split('/NAME/');

  if (!name) {
    return formatApplePayDescription(description);
  }

  const nameWithoutTabs = name.replace(/\s\s+/g, ' ');
  const [value] = nameWithoutTabs.split('/');

  return value.trim();
}

function formatDate(date = '') {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}-${month}-${day}`;
}

export function extractDataFromTxt(
  txt: File,
  cb: (data: AbnAmroTransaction[]) => void
): void {
  const reader = new FileReader();

  reader.readAsText(txt);
  reader.addEventListener(
    'load',
    () => {
      // this will then display a text file
      const lines = (reader.result as string).split(/\r?\n/);

      const data = lines
        .map(line => {
          const [
            id,
            currency,
            initialDate,
            balancePrevious,
            balanceAfter,
            endDate,
            amount,
            description,
          ] = line.split('\t');

          return {
            id: id ? `${id}-${initialDate}-${amount}-${v4()}` : undefined,
            currency,
            initialDate: formatDate(initialDate),
            balancePrevious,
            balanceAfter,
            endDate: formatDate(endDate),
            amount: amount ? amount.replace(',', '.') : undefined,
            description: formatDescription(description),
            fullDescription: description,
          };
        })
        .filter(item => item.id);
      cb(data);
    },
    false
  );
}

export function formatAbnAmroTransactionsToGeneralTransactions(
  transactions: AbnAmroTransaction[]
): Transaction[] {
  return transactions.map(transaction => ({
    id: transaction.id,
    amount: transaction.amount,
    description: transaction.description,
    fullDescription: transaction.fullDescription,
    date: transaction.initialDate,
    bank: Banks.AbnAmro,
  }));
}
