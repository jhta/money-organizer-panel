import { Firestore } from 'firebase/firestore';
import { Model } from './Model';

import { Collections } from '../Collections';

export class TransactionsModel extends Model {
  constructor(db: Firestore) {
    super(db, Collections.Transactions);
  }
}
