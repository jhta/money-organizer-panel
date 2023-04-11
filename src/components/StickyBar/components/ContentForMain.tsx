import { FC } from 'react';
import {
  useFirstTransactionDate,
  useLastTransactionDate,
  usePlainTransactionsTotal,
} from '~/store/useSelectors';
import { formatAmountToEuro, formatDate } from '~/utils';

export const ContentForMain: FC = () => {
  const plainTransactionTotal = usePlainTransactionsTotal();
  const firstTransactionDate = useFirstTransactionDate();
  const lastTransactionDate = useLastTransactionDate();

  return (
    <p>
      Total expended from
      <i className="date">{formatDate(firstTransactionDate)}</i> to
      <i className="date">{formatDate(lastTransactionDate)}</i>:
      <b>{formatAmountToEuro(plainTransactionTotal)}</b>
    </p>
  );
};
