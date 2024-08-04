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

function Main() {
  const transactions = usePlainTransactions();
  const isReportStarted = useIsReportStarted();
  const isReportCompleted = useIsReportCompleted();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <img
        src={chicken}
        alt="chicken"
        className="chicken chickenSvg w-[100px] h-[300px] sm:w-[150px] sm:h-[150px] md:w-auto md:h-auto mx-auto mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">PolloDiario Panel</h1>
      {isReportStarted && (
        <h2 className="text-xl mb-4">Continue with your report:</h2>
      )}
      {isReportCompleted && <h2 className="text-xl mb-4">Report completed!</h2>}
      <div>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <ClickableLogo bank={Banks.Revolut} />
          <ClickableLogo bank={Banks.AbnAmro} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={() => navigate(Routes.Reports)} className="btn">
            Go to reports
          </button>
          <button onClick={() => navigate(Routes.Ledger)} className="btn">
            Go to ledger
          </button>
          <button onClick={() => navigate(Routes.Trips)} className="btn">
            Go to trips
          </button>
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default Main;
