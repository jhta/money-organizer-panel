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
} from 'firebase/firestore';
import ENV from '~/env';
import { ExpensesReport } from '~/types';
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
}

export class FirebaseService {
  db?: Firestore;
  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async addReport(report: ExpensesReport) {
    if (!this.db) {
      throw new Error('Firebase not initialized');
    }
    // await addReport(this.db, report);
    const docRef = await addDoc(
      collection(this.db, Collections.Reports),
      report
    );
    console.log('document', docRef);
    console.log('Document written with ID: ', docRef.id);
  }

  async getReports() {
    if (!this.db) {
      throw new Error('Firebase not initialized');
    }

    const q = query(collection(this.db, Collections.Reports), limit(10));

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
    if (!this.db) {
      throw new Error('Firebase not initialized');
    }

    const docRef = await getDoc(doc(this.db, Collections.Reports, id));
    const report = docRef.data() as ExpensesReport;
    return report;
  }
}

let firebaseService = new FirebaseService();

export default firebaseService;
