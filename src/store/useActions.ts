import { Categories, Transaction } from '~/types';
import { useStore } from '.';
import { actions } from './actions';

export function useActions() {
  const { dispatch } = useStore();

  return {
    setTransactions: (transactions: Transaction[]) =>
      dispatch(actions.setTransactions(transactions)),
    setSelectedTransactions: (transactions: Transaction[]) =>
      dispatch(actions.setSelectedTransactions(transactions)),
    addSelectedTransaction: (transaction: Transaction) =>
      dispatch(actions.addSelectedTransaction(transaction)),
    removeSelectedTransaction: (id: string) =>
      dispatch(actions.removeSelectedTransaction(id)),
    setCategoryToTransaction: (id: string, category: Categories) =>
      dispatch(actions.setCategoryToTransaction(id, category)),
  };
}
