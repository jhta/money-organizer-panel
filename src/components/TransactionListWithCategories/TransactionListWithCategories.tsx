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
  tripOptions: { value: string; label: string }[];
}

interface TransactionListWithCategoriesItemProps {
  transaction: Transaction;
  tripOptions: { value: string; label: string }[];
}

export const TransactionListWithCategoriesItem: FC<
  TransactionListWithCategoriesItemProps
> = ({ transaction, tripOptions }) => {
  const [value, setValue] = useState<string | undefined>(transaction.category);
  const [loadedWithCategory, setLoadedWithCategory] = useState(false);
  const {
    setCategoryToTransaction,
    setTripToTransaction,
    removeSelectedTransaction,
  } = useActions();
  const selectedOption = options.find(option => option.value === value);

  const [trip, setTrip] = useState<string | undefined>(tripOptions[0].value);

  const selectedTrip = tripOptions.find(option => option.value === trip);

  useEffect(() => {
    if (transaction.category) {
      setLoadedWithCategory(true);
    }
  }, []);

  const onChangeTripSelected = (newValue: unknown) => {
    const { value } = newValue as { value: string; label: string };
    console.log('value', value);
    setTrip(value || '');
    setTripToTransaction(transaction.id, value || '');
  };

  const onChangeCategorySelected = (newValue: unknown) => {
    const { value } = newValue as { value: Categories; label: string };
    setValue(value || '');
    setCategoryToTransaction(transaction.id, value || Categories.OTHER);
  };

  const onPressRemoveTransaction = () => {
    if (window.confirm('Are you sure you want to remove this transaction?')) {
      removeSelectedTransaction(transaction.id);
    }
  };

  return (
    <li className={`transaction-wrapper p-2 ${!!value && 'selected'}`}>
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
      <InputSelect options={tripOptions} onChange={onChangeTripSelected} />

      <span
        className="ml-2 mr-2 text-white-500 hover:text-red-500 cursor-pointer font-bold text-xl transition-colors duration-300 ease-in-out"
        onClick={onPressRemoveTransaction}
        aria-label="Remove transaction"
      >
        ×
      </span>
      {/* <i className="ml-2 mr-2" onClick={onPressRemoveTransaction}>
        ︎❌
      </i> */}
    </li>
  );
};

export const TransactionListWithCategories: FC<
  TransactionListWithCategoriesProps
> = ({ transactions, tripOptions }) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <TransactionListWithCategoriesItem
          key={transaction.date}
          transaction={transaction}
          tripOptions={tripOptions}
        />
      ))}
    </ul>
  );
};
