export interface Transaction {
  id: string;
  category?: Categories;
  amount: string;
  date: number;
  description: string;
  fullDescription?: string;
  bank: Banks;
  tripId?: string;
}

export interface ExpensesReport {
  id?: string;
  total: number;
  transactions: Transaction[];
  from: number;
  to: number;
  inLedger?: boolean;
}

export enum Categories {
  GROCERIES = 'Groceries',
  RESTAURANTS_AND_COFFEE = 'Restaurants and coffee',
  TRANSPORT = 'Transport',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  TRAVEL = 'Travel',
  HOUSEHOLD = 'Household',
  OTHER = 'Other',
  SHOPPING = 'Shopping',
}

export enum Banks {
  Revolut = 'revolut',
  AbnAmro = 'abn-amro',
}

export enum LedgerTransactionCategories {
  MORTAGE = 'Mortage',
  MORTAGE_REPAIMENT = 'Mortage repayment',
  SHARED_EXPENSES = 'Shared expenses',
  CAROLINA_REPAYMENT = 'Carolina repayment',
  OTHER = 'Other',
}

export interface LedgerTransaction {
  id: string;
  category: LedgerTransactionCategories;
  transactionsReportId?: string;
  from: number;
  to: number;
  total: number;
  description?: string;
}

export interface LedgerReport {
  id: string;
  date: number;
  total: number;
  ledgerTransactionIds: string[];
}

export interface Invoice {
  ledgerTransactionIds: string[];
  from: string;
  to: string;
  total: number;
  payment: {
    paid: boolean;
    percentages: {
      carolina: number;
      jeison: number;
    };
    income: {
      carolina: number;
      jeison: number;
    };
  };
}

export interface Trip {
  id: string;
  name: string;
  from: string;
  to: string;
  total: number;
  transactionIds: string[];
  refId?: string;
}
