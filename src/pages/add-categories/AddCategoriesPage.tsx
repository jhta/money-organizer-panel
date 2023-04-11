import { TransactionListWithCategories } from '~/components/TransactionListWithCategories/TransactionListWithCategories';
import { useSelectedTransactions } from '~/store/useSelectors';

export default function AddCategories() {
  const selectedTransactions = useSelectedTransactions();
  console.log('selectedTransactions', selectedTransactions);
  return (
    <div>
      <h1>Add categories</h1>
      <TransactionListWithCategories transactions={selectedTransactions} />
    </div>
  );
}
