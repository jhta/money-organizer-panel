import { FC } from 'react';
import { Transaction } from '~/types';
import { formatAmountToEuro, formatDate } from '../../utils';
import './styles.css';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <li className="transaction" key={transaction.id}>
          <p>{formatDate(transaction.date)}</p>
          <p>{transaction.description}</p>
          <p>{formatAmountToEuro(transaction.amount)}</p>
        </li>
      ))}
    </ul>
  );
};
