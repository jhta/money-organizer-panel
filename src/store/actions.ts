import { Categories, Transaction } from '~/types';

export enum ActionTypes {
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  SET_SELECTED_TRANSACTIONS = 'SET_SELECTED_TRANSACTIONS',
  ADD_SELECTED_TRANSACTION = 'ADD_SELECTED_TRANSACTION',
  REMOVE_SELECTED_TRANSACTION = 'REMOVE_SELECTED_TRANSACTION',
  SET_CATEGORY_TO_TRANSACTION = 'SET_CATEGORY_TO_TRANSACTION',
}

type Action<Payload = undefined> = {
  type: string;
  payload: Payload;
};

interface SetTransactionsAction extends Action<Transaction[]> {
  type: ActionTypes.SET_TRANSACTIONS;
  payload: Transaction[];
}

interface SetSelectedTransactionsAction extends Action<Transaction[]> {
  type: ActionTypes.SET_SELECTED_TRANSACTIONS;
  payload: Transaction[];
}

interface AddSelectedTransactionAction extends Action<Transaction> {
  type: ActionTypes.ADD_SELECTED_TRANSACTION;
  payload: Transaction;
}

interface RemoveSelectedTransactionAction extends Action<string> {
  type: ActionTypes.REMOVE_SELECTED_TRANSACTION;
  payload: string;
}

interface SetCategoryToTransactionAction
  extends Action<{ id: string; category: Categories }> {
  type: ActionTypes.SET_CATEGORY_TO_TRANSACTION;
  payload: { id: string; category: Categories };
}

export type Actions =
  | SetTransactionsAction
  | SetSelectedTransactionsAction
  | AddSelectedTransactionAction
  | RemoveSelectedTransactionAction
  | SetCategoryToTransactionAction;

export const actions = {
  setTransactions: (transactions: Transaction[]): SetTransactionsAction => ({
    type: ActionTypes.SET_TRANSACTIONS,
    payload: transactions,
  }),
  setSelectedTransactions: (
    transactions: Transaction[]
  ): SetSelectedTransactionsAction => ({
    type: ActionTypes.SET_SELECTED_TRANSACTIONS,
    payload: transactions,
  }),
  addSelectedTransaction: (
    transaction: Transaction
  ): AddSelectedTransactionAction => ({
    type: ActionTypes.ADD_SELECTED_TRANSACTION,
    payload: transaction,
  }),
  removeSelectedTransaction: (id: string): RemoveSelectedTransactionAction => ({
    type: ActionTypes.REMOVE_SELECTED_TRANSACTION,
    payload: id,
  }),
  setCategoryToTransaction: (
    id: string,
    category: Categories
  ): SetCategoryToTransactionAction => ({
    type: ActionTypes.SET_CATEGORY_TO_TRANSACTION,
    payload: { id, category },
  }),
};
