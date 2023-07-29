import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams, Routes } from '~/routing/Routes';
import firebaseService from '~/services/firebase/firebaseService';
import { ExpensesReport, Transaction } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';
import TransactionPieChart from './components/ReportTransactionsPieChart';
import './styles.css';

interface ReportItemProps {
  transaction: Transaction;
}

export const ReportItem: FC<ReportItemProps> = ({ transaction }) => {
  return (
    <li className="report-transaction" key={transaction.date}>
      <p>{formatDate(transaction.date)}</p>
      <p>{transaction.description}</p>
      <p>{transaction.category}</p>
      <p>{transaction.bank}</p>
      <p>{formatAmountToEuro(transaction.amount)}</p>
    </li>
  );
};

export function ReportPage() {
  const { id } = useParams<RouteParams[Routes.Report]>();
  const [report, setReport] = useState<ExpensesReport | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        throw new Error('No id provided');
      }

      const report = await firebaseService.getReportById(id);

      const formattedReport = {
        ...report,
        transactions: report.transactions.sort((a, b) => a.date - b.date),
      };
      setReport(formattedReport);
    };

    fetchReport().catch(console.error);
  }, []);

  console.log(report?.transactions);

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
      <ul>
        {report.transactions.map(transaction => (
          <ReportItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}
