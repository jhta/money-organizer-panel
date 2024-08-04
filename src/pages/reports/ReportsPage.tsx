import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteParams, Routes } from '~/routing/Routes';
import { useNavigateWithParams } from '~/routing/utils';
import firebaseService from '~/services/firebase/firebaseService';
import { ExpensesReport } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';
import './styles.css';

export function ReportsPage() {
  const [reports, setReports] = useState<ExpensesReport[]>([]);
  const navigate = useNavigateWithParams();

  useEffect(() => {
    const fetchReports = async () => {
      const reports = (await firebaseService.getReports()).reverse();
      setReports(reports);
    };

    fetchReports().catch(console.error);
  }, []);

  const createOnClickReport = (id: string) => () => {
    navigate<RouteParams[Routes.Report]>(Routes.Report, { id });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Reports Page</h1>

      <ul className="report-list">
        {reports.map(report => (
          <li
            onClick={createOnClickReport(report.id || '')}
            className="report-list-item"
            key={report.id}
          >
            <p>{`from ${formatDate(report.from)} to ${formatDate(
              report.to
            )}:`}</p>
            <h2>{formatAmountToEuro(report.total)}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
