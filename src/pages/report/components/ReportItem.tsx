import { FC } from 'react';
import { Transaction } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';

interface ReportItemProps {
  transaction: Transaction;
}

export const ReportItem: FC<ReportItemProps> = ({ transaction }) => {
  return (
    <li className="report-transaction" key={transaction.date}>
      <p>{formatDate(transaction.date)}</p>
      <p>{transaction.description}</p>
      <p>{transaction.category}</p>
      <p>{transaction.bank}</p>
      <p>{formatAmountToEuro(transaction.amount)}</p>
    </li>
  );
};
