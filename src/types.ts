export interface Transaction {
  id: string;
  category?: Categories;
  amount: string;
  date: number;
  description: string;
  fullDescription?: string;
  bank: Banks;
}

export interface ExpensesReport {
  id?: string;
  total: number;
  transactions: Transaction[];
  from: number;
  to: number;
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
}

export enum Banks {
  Revolut = 'revolut',
  AbnAmro = 'abn-amro',
}
