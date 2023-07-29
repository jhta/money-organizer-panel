import { FC } from 'react';
import { ExpensesReport } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';

interface LedgerReportProps {
  report: ExpensesReport;
  onClick: () => void;
  isSelected: boolean;
}

export const LedgerReport: FC<LedgerReportProps> = ({
  report,
  onClick,
  isSelected,
}) => {
  return (
    <li
      onClick={onClick}
      className={`report-list-item ${isSelected ? 'selected' : ''}`}
      key={report.id}
    >
      <p>{`Expended from ${formatDate(report.from)} to ${formatDate(
        report.to
      )}:`}</p>
      <p>
        <b>{formatAmountToEuro(report.total)}</b>
      </p>
    </li>
  );
};
