import { ActionTypes, Actions } from './actions';
import { Transaction } from '~/types';

export interface AppState {
  transactions: Transaction[];
  selectedTransactions: Transaction[];
  selectedTransactionsTotal: number;
}

export const initialState: AppState = {
  transactions: [],
  selectedTransactions: [],
  selectedTransactionsTotal: 0,
};

const calculateTotal = (transactions: Transaction[]): number =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

export const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
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
    default:
      return state;
  }
};
