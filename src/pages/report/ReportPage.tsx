import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RouteParams, Routes } from '~/routing/Routes';
import firebaseService from '~/services/firebase/firebaseService';
import { Transaction } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';
import { ReportItem } from './components/ReportItem';
import TransactionPieChart from './components/ReportTransactionsPieChart';
import Select from 'react-select';
import './styles.css';
import { selectStyles, SortingOptions, SORTING_OPTIONS } from './constants';

function sortTransactions(transactions: Transaction[], option: SortingOptions) {
  switch (option) {
    case SortingOptions.DATE_ASC:
      return transactions.sort((a, b) => a.date - b.date);
    case SortingOptions.DATE_DESC:
      return transactions.sort((a, b) => b.date - a.date);
    case SortingOptions.AMOUNT_ASC:
      return transactions.sort((a, b) => Number(a.amount) - Number(b.amount));
    case SortingOptions.AMOUNT_DESC:
      return transactions.sort((a, b) => Number(b.amount) - Number(a.amount));
  }
}

export function ReportPage() {
  const { id } = useParams<RouteParams[Routes.Report]>();

  const { data: report, isLoading } = useQuery(['reports', id], () =>
    firebaseService.getReportById(id || '')
  );

  const [sortingOption, setSortingOption] = useState(SortingOptions.DATE_ASC);

  const sortedTransactions = sortTransactions(
    report?.transactions || [],
    sortingOption
  );

  if (isLoading) {
    return (
      <div>
        <h1>Is Loading</h1>
      </div>
    );
  }

  if (!report) {
    return (
      <div>
        <h1>Not report provided</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{`Total expended: ${formatAmountToEuro(report?.total)}`}</h1>
      <div className="chart-wrapper">
        <TransactionPieChart transactions={report.transactions} />
      </div>
      <h3>{`From ${formatDate(report.from)} to ${formatDate(report.to)}`}</h3>
      <div className="sorting-bar">
        <label>Sort by:</label>
        <Select
          placeholder="..."
          defaultValue={SORTING_OPTIONS[0]}
          options={SORTING_OPTIONS}
          onChange={value =>
            setSortingOption((value as { value: SortingOptions })?.value)
          }
          styles={selectStyles}
        />
      </div>
      <ul>
        {!!sortedTransactions &&
          sortedTransactions.map(transaction => (
            <ReportItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
}
