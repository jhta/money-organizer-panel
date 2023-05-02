import { useEffect, useState } from 'react';
import Select, { SelectInstance, StylesConfig } from 'react-select';
import { InputSelect } from '~/components/InputSelect/InputSelect';
import { RouteParams, Routes } from '~/routing/Routes';
import { useNavigateWithParams } from '~/routing/utils';
import firebaseService from '~/services/firebase/firebaseService';
import { ExpensesReport, LedgerTransactionCategories } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';
import './styles.css';

const options = Object.entries(LedgerTransactionCategories).map(
  ([key, value]) => ({
    value: value,
    label: value,
  })
);

export function CreateLedgerReportPage() {
  const [reports, setReports] = useState<ExpensesReport[]>([]);
  // const navigate = useNavigateWithParams();

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await firebaseService.getReports();
      setReports(reports);
    };

    fetchReports().catch(console.error);
  }, []);

  return (
    <div className="create-ledger-container">
      <h1>Create ledger report</h1>

      <h2>Reports that are not still on ledger</h2>
      <ul className="report-list">
        {reports.map(report => (
          <li className="report-list-item" key={report.id}>
            <p>{`from ${formatDate(report.from)} to ${formatDate(
              report.to
            )}:`}</p>
            <p>
              <b>{formatAmountToEuro(report.total)}</b>
            </p>
          </li>
        ))}
      </ul>
      <hr />

      <h2>Extra expenses to add manually</h2>
      <div className="input-group">
        <input type="number" placeholder="1000" />
        <input type="text" placeholder="repayment...." />
        <InputSelect options={options} />
      </div>

      <button>Continue</button>
    </div>
  );
}
