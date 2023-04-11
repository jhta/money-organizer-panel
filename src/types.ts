import { RevolutTransaction } from './services/revolut/types';

export interface Transaction {
  id: string;
  category?: Categories;
  amount: string;
  date: string;
  description: string;
  fullDescription?: string;
  bank: Banks;
}

export interface ExpensesReport {
  total: number;
  transactions: RevolutTransaction[];
  from: string;
  to: string;
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
