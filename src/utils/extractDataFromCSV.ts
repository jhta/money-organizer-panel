import { parse } from 'papaparse';
import camelcase from 'lodash.camelcase';

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
