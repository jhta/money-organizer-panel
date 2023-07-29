import { Collections } from '../Collections';
import { Model } from './Model';
import {
  Firestore,
  collection,
  query,
  getDocs,
  doc,
  orderBy,
  writeBatch,
  limit,
  getDoc,
} from 'firebase/firestore';
import { LedgerTransaction, LedgerTransactionCategories } from '~/types';

export class LedgerTransactionsModel extends Model {
  constructor(db: Firestore) {
    super(db, Collections.LedgerTransactions);
  }

  async addLedgerTransactions(ledgerTransactions: LedgerTransaction[]) {
    let batch = writeBatch(this.db);
    ledgerTransactions.forEach(ledgerTransaction => {
      const docRef = doc(collection(this.db, this.collection));
      batch.set(docRef, ledgerTransaction);

      //         if (
      //           ledgerTransaction.category ===
      //             LedgerTransactionCategories.SHARED_EXPENSES &&
      //           ledgerTransaction.transactionsReportId
      //         ) {

      //           const updateDocRef = doc(
      //             collection(
      //               this.db,
      //               Collections.Reports,
      //               ledgerTransaction.transactionsReportId
      //             )
      //           );

      // batch.update(updateDocRef, { inLedger: true });
      // }
    });

    await batch.commit();
  }

  async getLedgerTransactions() {
    const q = query(collection(this.db, this.collection), limit(10));

    const querySnapshot = await getDocs(q);

    console.log({ querySnapshot: querySnapshot.docs });

    const ledgerTransactions = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as LedgerTransaction)
    );

    console.log('ledgerTransactions ---', ledgerTransactions);

    return ledgerTransactions.sort((a, b) => a.from - b.from);
  }
}
