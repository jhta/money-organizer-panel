import { FC, useState } from 'react';
import { Transaction, Categories } from '~/types';
import { formatAmountToEuro } from '~/utils';
import Select, { StylesConfig } from 'react-select';
import './styles.css';
import { useActions } from '~/store/useActions';

const options = Object.entries(Categories).map(([key, value]) => ({
  value: key,
  label: value,
}));

const selectStyles: StylesConfig = {
  control: styles => ({
    ...styles,
    width: 200,
    borderColor: 'transparent',
    borderWidth: 1,
    borderLeftColor: '#696868',
    height: '100%',
    backgroundColor: 'transparent',
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '1rem',
    margin: '0.5rem',
  }),
  option: styles => ({
    ...styles,
    backgroundColor: '#242424',
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white',
  }),
  input: styles => ({
    ...styles,
    border: 'transparent',
  }),
};

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
  const { setCategoryToTransaction } = useActions();

  const onChangeCategorySelected = (newValue: unknown) => {
    const { value } = newValue as { value: Categories; label: string };
    setValue(value || '');
    setCategoryToTransaction(transaction.id, value || Categories.OTHER);
  };

  return (
    <li
      className={`transaction-wrapper ${!!value && 'selected'}`}
      key={transaction.date}
    >
      <div className="transaction-with-category">
        <p>{transaction.description}</p>
        <p>{formatAmountToEuro(transaction.amount)}</p>
      </div>
      <Select
        options={options}
        onChange={onChangeCategorySelected}
        styles={selectStyles}
        defaultInputValue={value}
      />
    </li>
  );
};

export const TransactionListWithCategories: FC<
  TransactionListWithCategoriesProps
> = ({ transactions }) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <TransactionListWithCategoriesItem transaction={transaction} />
      ))}
    </ul>
  );
};
