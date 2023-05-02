import { Categories } from '~/types';

export enum RevolutTransactionTypes {
  'CARD_PAYMENT' = 'CARD_PAYMENT',
  'CARD_REFUND' = 'CARD_REFUND',
  'TOPUP' = 'TOPUP',
  'TRANSFER' = 'TRANSFER',
  'EXCHANGE' = 'EXCHANGE',
  'FEE' = 'FEE',
  'ATM' = 'ATM',
}

export interface RevolutTransaction {
  id: string;
  amount: string;
  balance: string;
  currency: string;
  description: string;
  fee: string;
  product: string;
  state: string;
  type: RevolutTransactionTypes;
  startedDate: string;
  category?: Categories;
}
