import { RouteParams, Routes } from '~/routing/Routes';
import { useNavigateWithParams } from '~/routing/utils';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import firebaseService from '~/services/firebase/firebaseService';
import { ReportItem } from '../report/components/ReportItem';
import { formatAmountToEuro, formatDate } from '~/utils';
import TransactionPieChart from '../report/components/ReportTransactionsPieChart';

export const TripPage = () => {
  // const navigate = useNavigateWithParams();
  //   navigate<RouteParams[Routes.Trip]>(Routes.Trip, { id: '123' });

  const { id } = useParams<RouteParams[Routes.Report]>();
  const { data: transactions = [] } = useQuery('transactions', () =>
    id ? firebaseService.reports.getAllTransactionsByTripId(id) : []
  );
  const { data: trip } = useQuery(['trip', id], () =>
    firebaseService.trips.getTripById(id || '')
  );

  const total = transactions?.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

  const from = transactions[0]?.date;
  const to = transactions[transactions.length - 1]?.date;

  console.log({ transactions });

  return (
    <div>
      <h1>{`Trip to ${trip?.name}`}</h1>
      <h2 className="text-2xl mt-4 mb-8">
        {`Total Expended: ${formatAmountToEuro(
          total || 0
        )} \n from ${formatDate(from)} to ${formatDate(to)}`}
      </h2>
      <div className="flex justify-center mb-8">
        <TransactionPieChart transactions={transactions || []} />
      </div>
      {transactions?.map(transaction => (
        <ReportItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
