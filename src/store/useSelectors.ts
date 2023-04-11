import { useStore } from '.';
import { AppState } from './reducer';
import {
  selectFirstTransactionDate,
  selectHasTransactions,
  selectLastTransactionDate,
  selectPlainTransactionTotal,
  selectTransactions,
  selectAmountOfSelectedTransactions,
  selectSelectedTransactionTotal,
  selectSelectedTransactions,
  selectHasAllTransactionSelectedCategory,
} from './selectors';

type Selector<S> = (state: S) => any;

export function useSelect<SelectorType extends Selector<AppState>>(
  selector: SelectorType
): ReturnType<SelectorType> {
  const { state } = useStore();

  return selector(state);
}

export function useHasTransactions() {
  return useSelect(selectHasTransactions);
}

export function usePlainTransactionsTotal() {
  return useSelect(selectPlainTransactionTotal);
}

export function useFirstTransactionDate() {
  return useSelect(selectFirstTransactionDate);
}

export function useLastTransactionDate() {
  return useSelect(selectLastTransactionDate);
}

export function usePlainTransactions() {
  return useSelect(selectTransactions);
}

export function useSelectedTransactions() {
  return useSelect(selectSelectedTransactions);
}

export function useAmountOfSelectedTransactions() {
  return useSelect(selectAmountOfSelectedTransactions);
}

export function useSelectedTransactionsTotal() {
  return useSelect(selectSelectedTransactionTotal);
}

export function useHasAllSelectedTransactionsCategory() {
  return useSelect(selectHasAllTransactionSelectedCategory);
}
