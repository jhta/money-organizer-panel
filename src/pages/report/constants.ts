import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig = {
  control: styles => ({
    ...styles,
    minWidth: 200,
    borderWidth: 1,
    height: '100%',
    backgroundColor: 'transparent',
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '1rem',
    margin: '0.5rem',
  }),
  option: styles => ({
    ...styles,
    backgroundColor: '#242424',
  }),
  container: styles => ({
    ...styles,
    backgroundColor: '#242424',
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white',
  }),
  input: styles => ({
    ...styles,
    border: 'transparent',
  }),
};

export enum SortingOptions {
  DATE_ASC = 'date-asc',
  DATE_DESC = 'date-desc',
  AMOUNT_ASC = 'amount-asc',
  AMOUNT_DESC = 'amount-desc',
}

export const SORTING_OPTIONS = [
  {
    value: SortingOptions.DATE_ASC,
    label: 'Date (Ascendent)',
  },
  {
    value: SortingOptions.DATE_DESC,
    label: 'Date (Descendent)',
  },
  {
    value: SortingOptions.AMOUNT_ASC,
    label: 'Amount (Ascendent)',
  },
  {
    value: SortingOptions.AMOUNT_DESC,
    label: 'Amount (Descendent)',
  },
];
