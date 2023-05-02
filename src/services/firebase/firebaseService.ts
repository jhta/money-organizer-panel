// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  setDoc,
  collection,
  addDoc,
  query,
  limit,
  getDocs,
  getDoc,
  doc,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import ENV from '~/env';
import {
  ExpensesReport,
  LedgerReport,
  LedgerTransaction,
  LedgerTransactionCategories,
} from '~/types';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
  measurementId: ENV.MEASUREMENT_ID,
};

enum Collections {
  Reports = 'reports',
  LedgerTransactions = 'ledger_transactions',
  LedgerReport = 'ledger_report',
}

export class FirebaseService {
  db: Firestore;
  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async addReport(report: ExpensesReport) {
    const docRef = await addDoc(
      collection(this.db, Collections.Reports),
      report
    );
    console.log('document', docRef);
    console.log('Document written with ID: ', docRef.id);
  }

  async getReports() {
    const q = query(
      collection(this.db, Collections.Reports),
      orderBy('from'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    const reports = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ExpensesReport)
    );

    return reports;
  }

  async getReportById(id: string) {
    const docRef = await getDoc(doc(this.db, Collections.Reports, id));
    const report = docRef.data() as ExpensesReport;
    return report;
  }

  async addLedgerTransactions(ledgerTransactions: LedgerTransaction[]) {
    let batch = writeBatch(this.db);
    ledgerTransactions.forEach(ledgerTransaction => {
      const docRef = doc(
        collection(this.db as Firestore, Collections.LedgerTransactions)
      );
      batch.set(docRef, ledgerTransaction);

      if (
        ledgerTransaction.category ===
        LedgerTransactionCategories.SHARED_EXPENSES
      ) {
        const updateDocRef = doc(
          collection(
            this.db as Firestore,
            Collections.Reports,
            ledgerTransaction.id
          )
        );
        batch.update(updateDocRef, { inLedger: true });
      }
    });

    await batch.commit();
  }

  async getLedgerTransactions() {
    const q = query(
      collection(this.db, Collections.LedgerTransactions),
      orderBy('date')
    );

    const querySnapshot = await getDocs(q);

    const ledgerTransactions = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as LedgerTransaction)
    );

    return ledgerTransactions;
  }

  async createLedgerReport(ledgerReport: LedgerReport) {
    const docRef = await addDoc(
      collection(this.db, Collections.LedgerReport),
      ledgerReport
    );

    console.log('Document written with ID: ', docRef.id);
    console.log('report', docRef);
  }
}

let firebaseService = new FirebaseService();

export default firebaseService;
