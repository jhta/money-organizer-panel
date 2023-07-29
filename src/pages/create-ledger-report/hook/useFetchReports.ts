import { useEffect, useState } from 'react';
import firebaseService from '~/services/firebase/firebaseService';
import { ExpensesReport } from '~/types';

export const useFetchReports = () => {
  const [reports, setReports] = useState<ExpensesReport[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await firebaseService.getReports();
      const filteredReports = reports.filter(report => !report.inLedger);
      setReports(filteredReports);
    };

    fetchReports().catch(console.error);
  }, []);

  return reports;
};
