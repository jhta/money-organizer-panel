import { useLocation, useNavigate } from 'react-router-dom';
import { ContentForSubmitReport } from './components/ContentForSubmitReport';
import { ContentForMain } from './components/ContentForMain';
import {
  useHasAllSelectedTransactionsCategory,
  useHasTransactions,
} from '~/store/useSelectors';
import { Routes } from '~/routing/Routes';
import './styles.css';
import { useState } from 'react';

const BUTTON_TEXT_BY_ROUTE: Record<string, string> = {
  [Routes.Main]: 'Create report',
  [Routes.SubmitReport]: 'Select categories',
  [Routes.AddCategories]: 'Submit report',
};

function useButtonByRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

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
        alert('Report submitted');
        break;

      default:
        break;
    }
  };

  const disabled = false;

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

  console.log('disabled', disabled);
  console.log('equal', pathname === Routes.AddCategories);
  console.log({ pathname, hasAllSelectedTransactionsCategory });

  return (
    <div className="sticky-bar">
      <div className="text">
        {pathname === Routes.Main && <ContentForMain key="main" />}
        {pathname === Routes.SubmitReport && <ContentForSubmitReport />}
      </div>
      <div>
        <button disabled={disabled} onClick={onClick} className="button">
          {text}
        </button>
      </div>
    </div>
  );
};
