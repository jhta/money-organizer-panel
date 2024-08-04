import { Transaction } from '~/types';
import { ReportItem } from './ReportItem';

export function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <ul className="space-y-4">
      {transactions.map(transaction => (
        <ReportItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
