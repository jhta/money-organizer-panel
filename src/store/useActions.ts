import { Categories, Transaction } from '~/types';
import { useStore } from '.';
import { actions } from './actions';
import { TotalReport } from './reducer';

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
    startReport: () => dispatch(actions.startReport()),
    completeReport: () => dispatch(actions.completeReport()),
    updateReport: (report: TotalReport) =>
      dispatch(actions.updateReport(report)),
    setTripToTransaction: (id: string, tripId: string) =>
      dispatch(actions.setTripToTransaction(id, tripId)),
  };
}
