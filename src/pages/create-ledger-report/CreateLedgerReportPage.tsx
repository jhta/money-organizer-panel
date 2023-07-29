import { useState } from 'react';
import { useAlert } from 'react-alert';
import firebaseService from '~/services/firebase/firebaseService';
import {
  ExpensesReport,
  LedgerTransaction,
  LedgerTransactionCategories,
} from '~/types';
import { AddManualReportToLedger } from './components/AddManualReportToLedger';
import { LedgerReport } from './components/LedgerReport';
import { useFetchReports } from './hook/useFetchReports';
import './styles.css';
import {
  createExpenseAsLedgerTransaction,
  createSharedExpensesLedgerTransaction,
} from './utils';

interface Expense {
  description: string;
  amount: number;
  category: LedgerTransactionCategories;
  date: string;
}

export function CreateLedgerReportPage() {
  const reports = useFetchReports();
  const alert = useAlert();
  const [ledgerTransactions, setLedgerTransactions] = useState<
    LedgerTransaction[]
  >([]);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    console.log(expense);
    const expenseAsLedgerTransaction =
      createExpenseAsLedgerTransaction(expense);

    setLedgerTransactions([...ledgerTransactions, expenseAsLedgerTransaction]);
  };

  const createOnClickReport = (report: ExpensesReport) => () => {
    const reportAsLedgerTransaction =
      createSharedExpensesLedgerTransaction(report);

    setLedgerTransactions([...ledgerTransactions, reportAsLedgerTransaction]);
  };

  const onSubmitExpensesToLedger = () => {
    console.log(ledgerTransactions);
    firebaseService.addLedgerTransactions(ledgerTransactions);
    alert.success('Ledger transactions added to ledger');
  };

  const isReportSelected = (id: string) =>
    ledgerTransactions.some(tx => tx.transactionsReportId === id);

  return (
    <div className="create-ledger-container">
      <h1>Create ledger report</h1>

      <h2>Reports that are not still on ledger</h2>
      <ul className="report-list">
        {reports.map(report => (
          <LedgerReport
            report={report}
            onClick={createOnClickReport(report)}
            isSelected={isReportSelected(report.id || '')}
          />
        ))}
      </ul>
      <hr />

      <h2>Extra expenses to add manually</h2>
      <AddManualReportToLedger expenses={expenses} addExpense={addExpense} />
      <button onClick={onSubmitExpensesToLedger}>Submit to ledger</button>
    </div>
  );
}
