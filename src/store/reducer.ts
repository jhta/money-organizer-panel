import { ActionTypes, Actions } from './actions';
import { Transaction, Banks } from '~/types';

export interface TotalReport {
  total: number;
  from: number;
  to: number;
  transactions: Transaction[];
  state: {
    started: boolean;
    completed: boolean;
    banks: Banks[];
  };
}
export interface AppState {
  transactions: Transaction[];
  selectedTransactions: Transaction[];
  selectedTransactionsTotal: number;
  report: TotalReport;
  currentBank?: Banks;
}

export const initialState: AppState = {
  transactions: [],
  selectedTransactions: [],
  selectedTransactionsTotal: 0,
  report: {
    total: 0,
    from: 0,
    to: 0,
    transactions: [],
    state: {
      started: false,
      completed: false,
      banks: [],
    },
  },
};

const calculateTotal = (transactions: Transaction[]): number =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

export const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.SET_TRANSACTIONS:
      const transactionsBank = action.payload[0].bank;
      return {
        ...state,
        transactions: action.payload,
        currentBank: transactionsBank,
      };
    case ActionTypes.SET_SELECTED_TRANSACTIONS:
      return {
        ...state,
        selectedTransactions: action.payload,
        selectedTransactionsTotal: calculateTotal(action.payload),
      };
    case ActionTypes.ADD_SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransactions: [...state.selectedTransactions, action.payload],
        selectedTransactionsTotal:
          state.selectedTransactionsTotal + Number(action.payload.amount),
      };
    case ActionTypes.REMOVE_SELECTED_TRANSACTION:
      const newSelectedTransactions = state.selectedTransactions.filter(
        transaction => transaction.id !== action.payload
      );

      return {
        ...state,
        selectedTransactions: newSelectedTransactions,
        selectedTransactionsTotal: calculateTotal(newSelectedTransactions),
      };

    case ActionTypes.SET_CATEGORY_TO_TRANSACTION:
      const selectedTransactionsWithNewCategory =
        state.selectedTransactions.map(transaction =>
          transaction.id === action.payload.id
            ? { ...transaction, category: action.payload.category }
            : transaction
        );

      return {
        ...state,
        selectedTransactions: selectedTransactionsWithNewCategory,
      };

    case ActionTypes.START_REPORT:
      return {
        ...state,
        report: {
          ...state.report,
          state: {
            ...state.report.state,
            started: true,
          },
        },
      };

    case ActionTypes.COMPLETE_REPORT:
      return {
        ...state,
        report: {
          ...state.report,
          state: {
            ...state.report.state,
            completed: true,
          },
        },
      };

    case ActionTypes.UPDATE_REPORT:
      return {
        ...state,
        ...initialState,
        report: {
          ...action.payload,
          ...state.report,
          state: action.payload.state,
          transactions: [
            ...state.report.transactions,
            ...action.payload.transactions,
          ],
          total: state.report.total + action.payload.total,
          from:
            new Date(action.payload.from) < new Date(state.report.from)
              ? state.report.from
              : action.payload.from,
          to:
            new Date(action.payload.to) > new Date(state.report.to)
              ? state.report.to
              : action.payload.to,
        },
      };

    default:
      return state;
  }
};
