import { FC } from 'react';
import {
  useAmountOfSelectedTransactions,
  usePlainTransactions,
  useSelectedTransactionsTotal,
} from '~/store/useSelectors';
import { formatAmountToEuro } from '~/utils';

export const ContentForSubmitReport: FC = () => {
  const transactions = usePlainTransactions();
  const amountOfTransactions = transactions.length;
  const selectTransactionsTotal = useSelectedTransactionsTotal();
  const amountOfSelectedTransactions = useAmountOfSelectedTransactions();

  return (
    <p>
      <span>{`${amountOfSelectedTransactions}/${amountOfTransactions} selected -`}</span>
      <b>{`total: ${formatAmountToEuro(selectTransactionsTotal)}`}</b>
    </p>
  );
};
