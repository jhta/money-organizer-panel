import { FC, useState } from 'react';
import { Transaction } from '~/types';
import { useActions } from '~/store/useActions';
import { formatAmountToEuro, formatDate } from '~/utils';
import './styles.css';

interface SelectableListProps {
  transactions: Transaction[];
}

interface SelectableListItemProps {
  transaction: Transaction;
}

export const SelectableListItem: FC<SelectableListItemProps> = ({
  transaction,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const { addSelectedTransaction, removeSelectedTransaction } = useActions();
  const onClick = () => {
    setIsSelected(!isSelected);

    if (isSelected) {
      removeSelectedTransaction(transaction.id);
      return;
    }

    addSelectedTransaction(transaction);
  };

  return (
    <li
      onClick={onClick}
      className={`selectable-transaction p-4 ${isSelected ? 'selected' : ''}`}
      key={transaction.date}
    >
      <p>{formatDate(transaction.date)}</p>
      <p>{transaction.description}</p>
      <p>{formatAmountToEuro(transaction.amount)}</p>
    </li>
  );
};

export const SelectableList: FC<SelectableListProps> = ({ transactions }) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <SelectableListItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
};
