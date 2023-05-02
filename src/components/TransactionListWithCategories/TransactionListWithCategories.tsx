import { FC, useEffect, useState } from 'react';
import { Transaction, Categories } from '~/types';
import { formatAmountToEuro } from '~/utils';
import './styles.css';
import { useActions } from '~/store/useActions';
import { InputSelect } from '../InputSelect/InputSelect';

const options = Object.entries(Categories).map(([key, value]) => ({
  value: value,
  label: value,
}));
interface TransactionListWithCategoriesProps {
  transactions: Transaction[];
}

interface TransactionListWithCategoriesItemProps {
  transaction: Transaction;
}

export const TransactionListWithCategoriesItem: FC<
  TransactionListWithCategoriesItemProps
> = ({ transaction }) => {
  const [value, setValue] = useState<string | undefined>(transaction.category);
  const [loadedWithCategory, setLoadedWithCategory] = useState(false);
  const { setCategoryToTransaction } = useActions();
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    if (transaction.category) {
      setLoadedWithCategory(true);
    }
  }, []);

  const onChangeCategorySelected = (newValue: unknown) => {
    const { value } = newValue as { value: Categories; label: string };
    setValue(value || '');
    setCategoryToTransaction(transaction.id, value || Categories.OTHER);
  };

  return (
    <li className={`transaction-wrapper ${!!value && 'selected'}`}>
      <div className="transaction-with-category">
        <p>{transaction.description}</p>
        <p>{formatAmountToEuro(transaction.amount)}</p>
      </div>
      {loadedWithCategory ? (
        <p className="category">{value}</p>
      ) : (
        <InputSelect
          options={options}
          onChange={onChangeCategorySelected}
          defaultInputValue={selectedOption?.label}
        />
      )}
    </li>
  );
};

export const TransactionListWithCategories: FC<
  TransactionListWithCategoriesProps
> = ({ transactions }) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <TransactionListWithCategoriesItem
          key={transaction.date}
          transaction={transaction}
        />
      ))}
    </ul>
  );
};
