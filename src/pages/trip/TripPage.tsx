import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { RouteParams, Routes } from '~/routing/Routes';
import firebaseService from '~/services/firebase/firebaseService';
import { ReportItem } from '../report/components/ReportItem';
import { formatAmountToEuro, formatDate } from '~/utils';
import TransactionPieChart from '../report/components/ReportTransactionsPieChart';
import { Transaction } from '~/types';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

const useTripData = (id: string | undefined) => {
  const { data: transactions = [], isSuccess: isTransactionsSuccess } =
    useQuery(
      ['transactions', id],
      () => (id ? firebaseService.reports.getAllTransactionsByTripId(id) : []),
      { enabled: !!id }
    );

  const { data: trip, isSuccess: isTripSuccess } = useQuery(
    ['trip', id],
    () => firebaseService.trips.getTripById(id || ''),
    { enabled: !!id }
  );

  return { transactions, trip, isTransactionsSuccess, isTripSuccess };
};

const TripHeader = ({
  name,
  total,
  from,
  to,
}: {
  name: string;
  total: number;
  from: number;
  to: number;
}) => (
  <>
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{`Trip to ${name}`}</h1>
    <h2 className="text-xl md:text-2xl mt-4 mb-8">
      {`Total Expended: ${formatAmountToEuro(total)}`}
      <br />
      {`From ${formatDate(from)} to ${formatDate(to)}`}
    </h2>
  </>
);

const calculateTotal = (transactions: Transaction[]) =>
  transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

export const TripPage = () => {
  const { id } = useParams<RouteParams[Routes.Report]>();
  const windowWidth = useWindowWidth();
  const { transactions, trip, isTransactionsSuccess, isTripSuccess } =
    useTripData(id);

  const total = calculateTotal(transactions);
  const from = transactions[0]?.date;
  const to = transactions[transactions.length - 1]?.date;

  useEffect(() => {
    if (isTransactionsSuccess && isTripSuccess && trip?.refId) {
      const transactionIds = transactions.map(transaction => transaction.id);
      if (total !== trip.total) {
        firebaseService.trips.addTransactionsToTrip(
          trip.refId,
          transactionIds,
          total
        );
      }
    }
  }, [isTransactionsSuccess, isTripSuccess, transactions, trip, total]);

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <TripHeader name={trip.name} total={total} from={from} to={to} />
      <div className="flex justify-center mb-8">
        <TransactionPieChart
          transactions={transactions}
          windowWidth={windowWidth}
        />
      </div>
      <div className="space-y-4">
        {transactions.map(transaction => (
          <ReportItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
