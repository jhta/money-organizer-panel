import { Collections } from '../Collections';
import {
  Firestore,
  collection,
  addDoc,
  query,
  limit,
  getDocs,
  getDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import { ExpensesReport } from '~/types';

import { Model } from './Model';

export class ReportsModel extends Model {
  constructor(db: Firestore) {
    super(db, Collections.Reports);
  }

  public async addReport(report: ExpensesReport) {
    const docRef = await addDoc(collection(this.db, this.collection), {
      ...report,
      inLedger: false,
    });
    console.log('document', docRef);
    console.log('Document written with ID: ', docRef.id);
  }

  public async getReports() {
    const q = query(
      collection(this.db, this.collection),
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

  public async getReportById(id: string) {
    const docRef = await getDoc(doc(this.db, Collections.Reports, id));
    const report = docRef.data() as ExpensesReport;
    return report;
  }
}