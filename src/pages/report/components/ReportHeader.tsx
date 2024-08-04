import React from 'react';
import { formatAmountToEuro, formatDate } from '~/utils';

export function ReportHeader({
  total,
  from,
  to,
}: {
  total: number;
  from: number;
  to: number;
}) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        {`Total expended: ${formatAmountToEuro(total)}`}
      </h1>
      <h3 className="text-lg md:text-xl mb-4">
        {`From ${formatDate(from)} to ${formatDate(to)}`}
      </h3>
    </>
  );
}
