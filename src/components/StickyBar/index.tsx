import { useLocation, useNavigate } from 'react-router-dom';
import { ContentForSubmitReport } from './components/ContentForSubmitReport';
import { ContentForMain } from './components/ContentForMain';
import {
  useCurrentBank,
  useHasAllSelectedTransactionsCategory,
  useHasTransactions,
  useReport,
  useReportBanks,
} from '~/store/useSelectors';
import { Routes } from '~/routing/Routes';
import './styles.css';
import firebaseService from '~/services/firebase/firebaseService';
import { useActions } from '~/store/useActions';
import { Banks } from '~/types';

const areArrayEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

const BUTTON_TEXT_BY_ROUTE: Record<string, string> = {
  [Routes.Main]: 'Create report',
  [Routes.SubmitReport]: 'Select categories',
  [Routes.AddCategories]: 'Submit report',
};

const FULL_BANKS = [Banks.AbnAmro, Banks.Revolut];

function useButtonByRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const report = useReport();
  const { updateReport } = useActions();
  const reportBanks = useReportBanks();
  const currentBank = useCurrentBank() as Banks;

  const text = BUTTON_TEXT_BY_ROUTE[pathname] || '';

  const onClick = () => {
    switch (pathname) {
      case Routes.Main:
        navigate(Routes.SubmitReport);
        break;
      case Routes.SubmitReport:
        navigate(Routes.AddCategories);
        break;
      case Routes.AddCategories:
        const banks = [...reportBanks, currentBank];

        const isCompleted = areArrayEqual(banks.sort(), FULL_BANKS.sort());
        console.log('banks', banks);
        console.log({ isCompleted });

        updateReport({
          ...report,
          state: {
            completed: isCompleted,
            started: !isCompleted,
            banks,
          },
        });

        console.log('isCompleted', isCompleted);
        alert('Report submitted');
        navigate(Routes.Main);
        break;

      default:
        break;
    }
  };

  return {
    text,
    onClick,
  };
}

export const StickyBar = () => {
  const hasTransactions = useHasTransactions();
  const { pathname } = useLocation();
  const { text, onClick } = useButtonByRoute();
  const hasAllSelectedTransactionsCategory =
    useHasAllSelectedTransactionsCategory();

  if (!hasTransactions) return null;

  const disabled =
    pathname === Routes.AddCategories && !hasAllSelectedTransactionsCategory;

  return (
    <div className="sticky-bar">
      <div className="text">
        {pathname === Routes.Main && <ContentForMain key="main" />}
        {pathname === Routes.SubmitReport && <ContentForSubmitReport />}
        {pathname === Routes.AddCategories && <ContentForSubmitReport />}
      </div>
      <div>
        <button disabled={disabled} onClick={onClick} className="button">
          {text}
        </button>
      </div>
    </div>
  );
};
