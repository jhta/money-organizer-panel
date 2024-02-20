import React from 'react';
import { SUPPORTED_YEARS } from '../AnalyticsConstants';

interface YearSelectProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const YearSelect: React.FC<YearSelectProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <>
      <label>
        Year:
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {SUPPORTED_YEARS.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};
