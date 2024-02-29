import { Banks, Categories, Transaction } from '~/types';

export enum ActionTypes {
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  SET_SELECTED_TRANSACTIONS = 'SET_SELECTED_TRANSACTIONS',
  ADD_SELECTED_TRANSACTION = 'ADD_SELECTED_TRANSACTION',
  REMOVE_SELECTED_TRANSACTION = 'REMOVE_SELECTED_TRANSACTION',
  SET_CATEGORY_TO_TRANSACTION = 'SET_CATEGORY_TO_TRANSACTION',
  SET_TRIP_TO_TRANSACTION = 'SET_TRIP_TO_TRANSACTION',
  UPDATE_REPORT = 'UPDATE_REPORT',
  START_REPORT = 'START_REPORT',
  COMPLETE_REPORT = 'COMPLETE_REPORT',
}

type Action<Payload = undefined> = {
  type: string;
  payload: Payload;
};

interface SetTransactionsAction extends Action<Transaction[]> {
  type: ActionTypes.SET_TRANSACTIONS;
}

interface SetSelectedTransactionsAction extends Action<Transaction[]> {
  type: ActionTypes.SET_SELECTED_TRANSACTIONS;
}

interface AddSelectedTransactionAction extends Action<Transaction> {
  type: ActionTypes.ADD_SELECTED_TRANSACTION;
}

interface RemoveSelectedTransactionAction extends Action<string> {
  type: ActionTypes.REMOVE_SELECTED_TRANSACTION;
}

interface SetCategoryToTransactionAction
  extends Action<{ id: string; category: Categories }> {
  type: ActionTypes.SET_CATEGORY_TO_TRANSACTION;
}

interface UpdateReportActionPayload {
  from: number;
  to: number;
  transactions: Transaction[];
  total: number;
  state: {
    started: boolean;
    completed: boolean;
    banks: Banks[];
  };
}

interface UpdateReportAction extends Action<UpdateReportActionPayload> {
  type: ActionTypes.UPDATE_REPORT;
}

interface StartReport extends Action {
  type: ActionTypes.START_REPORT;
}

interface CompleteReport extends Action {
  type: ActionTypes.COMPLETE_REPORT;
}

interface SetTripToTransactionAction
  extends Action<{ id: string; tripId: string | undefined }> {
  type: ActionTypes.SET_TRIP_TO_TRANSACTION;
}

export type Actions =
  | SetTransactionsAction
  | SetSelectedTransactionsAction
  | AddSelectedTransactionAction
  | RemoveSelectedTransactionAction
  | SetCategoryToTransactionAction
  | UpdateReportAction
  | StartReport
  | CompleteReport
  | SetTripToTransactionAction;

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
  setTripToTransaction: (
    id: string,
    tripId: string
  ): SetTripToTransactionAction => ({
    type: ActionTypes.SET_TRIP_TO_TRANSACTION,
    payload: { id, tripId },
  }),
  updateReport: (report: UpdateReportActionPayload): UpdateReportAction => ({
    type: ActionTypes.UPDATE_REPORT,
    payload: report,
  }),
  startReport: (): StartReport => ({
    type: ActionTypes.START_REPORT,
    payload: undefined,
  }),
  completeReport: (): CompleteReport => ({
    type: ActionTypes.COMPLETE_REPORT,
    payload: undefined,
  }),
};
