// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  setDoc,
  collection,
  addDoc,
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

export class FirebaseService {
  db?: Firestore;

  init() {
    const app = initializeApp(firebaseConfig);
    console.log('app', app);
    const db = getFirestore(app);
    console.log(db, 'db');
    this.db = db;
  }

  async addReport(report: ExpensesReport) {
    if (!this.db) {
      throw new Error('Firebase not initialized');
    }
    // await addReport(this.db, report);
    const docRef = await addDoc(collection(this.db, 'reports'), report);
    console.log('document');
    console.log('Document written with ID: ', docRef.id);
  }
}

let firebaseService = new FirebaseService();

export default firebaseService;
