import { v4 } from 'uuid';
import {
  ExpensesReport,
  LedgerTransaction,
  LedgerTransactionCategories,
} from '~/types';

interface Expense {
  description: string;
  amount: number;
  category: LedgerTransactionCategories;
  date: string;
}

export const createSharedExpensesLedgerTransaction = (
  report: ExpensesReport
): LedgerTransaction => ({
  id: v4(),
  total: report.total,
  from: report.from,
  to: report.to,
  transactionsReportId: report.id,
  category: LedgerTransactionCategories.SHARED_EXPENSES,
});

export const createExpenseAsLedgerTransaction = (
  expense: Expense
): LedgerTransaction => ({
  id: v4(),
  total: expense.amount,
  from: new Date(expense.date).getTime(),
  to: new Date(expense.date).getTime(),
  category: expense.category,
  description: expense.description,
});
