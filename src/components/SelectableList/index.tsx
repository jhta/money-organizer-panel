import { FC, useState } from 'react';
import { Transaction } from '~/types';
import { useActions } from '~/store/useActions';
import { formatAmountToEuro, formatDate } from '~/utils';
import './styles.css';

interface SelectableListItemProps {
  transaction: Transaction;
  isSelected: boolean;
  onToggle: () => void;
}

export const SelectableListItem: FC<SelectableListItemProps> = ({
  transaction,
  isSelected,
  onToggle,
}) => {
  return (
    <li
      onClick={onToggle}
      className={`selectable-transaction p-4 ${isSelected ? 'selected' : ''}`}
    >
      <p>{formatDate(transaction.date)}</p>
      <p>{transaction.description}</p>
      <p>{formatAmountToEuro(transaction.amount)}</p>
    </li>
  );
};

interface SelectableListProps {
  transactions: Transaction[];
}

export const SelectableList: FC<SelectableListProps> = ({ transactions }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const {
    addSelectedTransaction,
    removeSelectedTransaction,
    setSelectedTransactions,
  } = useActions();

  const toggleAll = () => {
    if (selectedIds.size === transactions.length) {
      setSelectedIds(new Set());
      setSelectedTransactions([]);
    } else {
      const allIds = new Set(transactions.map(t => t.id));
      setSelectedIds(allIds);
      setSelectedTransactions(transactions);
    }
  };

  const toggleTransaction = (transaction: Transaction) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(transaction.id)) {
      newSelectedIds.delete(transaction.id);
      removeSelectedTransaction(transaction.id);
    } else {
      newSelectedIds.add(transaction.id);
      addSelectedTransaction(transaction);
    }
    setSelectedIds(newSelectedIds);
  };

  return (
    <div>
      <div className="select-all-option" onClick={toggleAll}>
        <span className="check-prefix">
          {selectedIds.size === transactions.length ? '◉' : '○'}
        </span>
        {selectedIds.size === transactions.length
          ? 'Deselect All'
          : 'Select All'}
      </div>
      <ul className="transactionList">
        {transactions.map(transaction => (
          <SelectableListItem
            key={transaction.id}
            transaction={transaction}
            isSelected={selectedIds.has(transaction.id)}
            onToggle={() => toggleTransaction(transaction)}
          />
        ))}
      </ul>
    </div>
  );
};
