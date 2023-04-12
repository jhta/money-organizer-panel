import { ExpensesReport } from '~/types';
import { AppState } from './reducer';

export const calculateTotal = (transactions: AppState['transactions']) =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

export const selectTransactions = (state: AppState) => state.transactions || [];

export const selectHasTransactions = (state: AppState) =>
  selectTransactions(state)?.length > 0;

export const selectPlainTransactionTotal = (state: AppState) =>
  calculateTotal(selectTransactions(state));

export const selectFirstTransactionDate = (state: AppState) =>
  state.transactions[0]?.date;

export const selectLastTransactionDate = (state: AppState) =>
  state.transactions[state.transactions.length - 1]?.date;

export const selectSelectedTransactions = (state: AppState) =>
  state.selectedTransactions || [];

export const selectAmountOfSelectedTransactions = (state: AppState) =>
  selectSelectedTransactions(state)?.length;

export const selectHasSelectedTransactions = (state: AppState) =>
  selectAmountOfSelectedTransactions(state) > 0;

export const selectSelectedTransactionTotal = (state: AppState) =>
  calculateTotal(selectSelectedTransactions(state));

export const selectHasAllTransactionSelectedCategory = (state: AppState) =>
  selectSelectedTransactions(state).every(transaction => transaction.category);

export const selectFirstSelectedTransactionDate = (state: AppState) =>
  state.selectedTransactions[0]?.date;

export const selectLastSelectedTransactionDate = (state: AppState) =>
  state.selectedTransactions[state.selectedTransactions.length - 1]?.date;

export const selectReport = (state: AppState): ExpensesReport => ({
  total: selectSelectedTransactionTotal(state),
  transactions: selectSelectedTransactions(state),
  from: selectFirstTransactionDate(state),
  to: selectLastTransactionDate(state),
});
