import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RouteParams, Routes } from '~/routing/Routes';
import firebaseService from '~/services/firebase/firebaseService';
import { Categories, Transaction } from '~/types';
import TransactionPieChart from './components/ReportTransactionsPieChart';
import { SortingOptions } from './constants';
import './styles.css';
import { NoReportScreen } from './components/NoReportScreen';
import { ReportHeader } from './components/ReportHeader';
import { FilterBar } from './components/FilterBar';
import { TransactionList } from './components/TransactionList';
import { LoadingScreen } from './components/LoadingScreen';

function sortTransactions(transactions: Transaction[], option: SortingOptions) {
  const sortingFunctions = {
    [SortingOptions.DATE_ASC]: (a: Transaction, b: Transaction) =>
      a.date - b.date,
    [SortingOptions.DATE_DESC]: (a: Transaction, b: Transaction) =>
      b.date - a.date,
    [SortingOptions.AMOUNT_ASC]: (a: Transaction, b: Transaction) =>
      Number(a.amount) - Number(b.amount),
    [SortingOptions.AMOUNT_DESC]: (a: Transaction, b: Transaction) =>
      Number(b.amount) - Number(a.amount),
  };

  return [...transactions].sort(sortingFunctions[option]);
}

export function ReportPage() {
  const { id } = useParams<RouteParams[Routes.Report]>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sortingOption, setSortingOption] = useState(SortingOptions.DATE_ASC);
  const [categoryFilter, setCategoryFilter] = useState<Categories | null>(null);

  const { data: report, isLoading } = useQuery(['reports', id], () =>
    firebaseService.getReportById(id || '')
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!report) {
    return <NoReportScreen />;
  }

  const filteredTransactions = report.transactions.filter(
    transaction => !categoryFilter || transaction.category === categoryFilter
  );
  const sortedTransactions = sortTransactions(
    filteredTransactions,
    sortingOption
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ReportHeader total={report.total} from={report.from} to={report.to} />
      <TransactionPieChart
        transactions={report.transactions}
        windowWidth={windowWidth}
      />
      <FilterBar
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <TransactionList transactions={sortedTransactions} />
    </div>
  );
}
