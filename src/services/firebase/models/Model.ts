import { Firestore } from 'firebase/firestore';
import { Collections } from '../Collections';

export class Model {
  db: Firestore;
  collection: Collections;

  constructor(db: Firestore, collection: Collections) {
    this.db = db;
    this.collection = collection;
  }
}
