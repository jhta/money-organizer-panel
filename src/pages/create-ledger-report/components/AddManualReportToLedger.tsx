import { FC, useState } from 'react';
import { InputSelect } from '~/components/InputSelect/InputSelect';
import { LedgerTransactionCategories } from '~/types';
import { formatAmountToEuro } from '~/utils';

interface Expense {
  description: string;
  amount: number;
  category: LedgerTransactionCategories;
  date: string;
}

const options = Object.entries(LedgerTransactionCategories).map(
  ([key, value]) => ({
    value: value,
    label: value,
  })
);

interface AddManualReportToLedgerProps {
  expenses: Expense[];
  addExpense: (expenses: Expense) => void;
}

export const AddManualReportToLedger: FC<AddManualReportToLedgerProps> = ({
  expenses,
  addExpense,
}) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2023-01-01');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(LedgerTransactionCategories.OTHER);

  const handleAddExpense = () => {
    const newExpense: Expense = { description, amount, category, date };
    addExpense(newExpense);
    setDescription('');
    setAmount(0);
    setCategory('');
    setDate('2023-01-01');
  };

  return (
    <>
      <div className="input-group">
        <input
          type="number"
          placeholder="1000"
          value={amount}
          onChange={e => {
            if (isNaN(parseInt(e.target.value))) return;
            setAmount(parseInt(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="repayment...."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <InputSelect
          options={options}
          onChange={value => setCategory(value.value)}
        />
      </div>

      <button onClick={handleAddExpense}>Add expense</button>

      <ul>
        {expenses.map((expense, index) => (
          <li className="report-list-item" key={index}>
            <p>{expense.description}</p>
            <p>{expense.category}</p>
            <p>
              <b>{formatAmountToEuro(expense.amount)}</b>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
