import { parse } from 'papaparse';
import camelcase from 'lodash.camelcase';
import { format } from 'date-fns';
import { loadingMessageCSS } from 'react-select/dist/declarations/src/components/Menu';

export function formatDate(date: string) {
  return format(new Date(date), 'MMM, dd yyyy');
}

export function formatAmountToEuro(amount: string | number) {
  return `${Math.round(Number(amount) * 100) / 100}€`;
}

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
      console.log('extracted data', results.data);
      if (!results?.data?.length) return cb([] as Data[]);

      const formattedCsvData = formatCsvResult<Data>(
        results.data,
        specialCases
      );
      cb(formattedCsvData);
    },
  });
}

interface AbnAmroTransaction {
  id: string;
  currency: string;
  initialDate: string;
  balancePrevious: string;
  balanceAfter: string;
  endDate: string;
  amount: string;
  description: string;
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
            id,
            currency,
            initialDate,
            balancePrevious,
            balanceAfter,
            endDate,
            amount,
            description,
          };
        })
        .filter(item => item.id);
      cb(data);
    },
    false
  );
}
