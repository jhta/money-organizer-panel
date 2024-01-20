import chicken from '~/assets/chicken.svg';
import { TransactionList } from '~/components/TransactionList';
import { Banks } from '~/types';
import { ClickableLogo } from '~/components/ClickableLogo/ClickableLogo';
import {
  useIsReportCompleted,
  useIsReportStarted,
  usePlainTransactions,
} from '~/store/useSelectors';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routing/Routes';
import { useQuery } from 'react-query';
import firebaseService from '~/services/firebase/firebaseService';

function Main() {
  const transactions = usePlainTransactions();
  const isReportStarted = useIsReportStarted();
  const isReportCompleted = useIsReportCompleted();
  const navigate = useNavigate();
  const { data } = useQuery('transactions', () =>
    firebaseService.getAllTransactionReports()
  );

  console.log({ data });

  return (
    <div className="App">
      <img src={chicken} alt="chicken" className="chicken chickenSvg" />
      <h1>PolloDiario Panel</h1>
      {isReportStarted && <h2>Continue with your report:</h2>}
      {isReportCompleted && <h2>Report completed!</h2>}
      <div className="card">
        <>
          <div className="clickable-list">
            <ClickableLogo bank={Banks.Revolut} />
            <ClickableLogo bank={Banks.AbnAmro} />
          </div>
        </>

        <div>
          <button onClick={() => navigate(Routes.Reports)}>
            Go to reports
          </button>
          <button onClick={() => navigate(Routes.CreateLedger)}>
            Go to create ledger
          </button>

          <button onClick={() => navigate(Routes.Ledger)}>Go to ledger</button>
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default Main;
