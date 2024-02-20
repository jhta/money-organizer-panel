import { useQuery } from 'react-query';
import firebaseService from '~/services/firebase/firebaseService';
import { MonthlyExpensesBarChart } from './components/MonthExpensesBarChart';

export const AnalyticsPage = () => {
  const { data } = useQuery('transactions', () =>
    firebaseService.getAllTransactionReports()
  );

  return (
    <div>
      <h1>Analytics</h1>
      {data && <MonthlyExpensesBarChart data={data} />}
    </div>
  );
};
