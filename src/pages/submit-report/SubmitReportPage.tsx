import { SelectableList } from '~/components/SelectableList';
import { usePlainTransactions } from '~/store/useSelectors';

export default function SubmitReport() {
  const transactions = usePlainTransactions();

  return (
    <div className="App">
      <h1 className="mb-8">Submit report</h1>
      <SelectableList transactions={transactions} />
    </div>
  );
}
