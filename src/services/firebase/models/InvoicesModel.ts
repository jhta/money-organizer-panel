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

import { Model } from './Model';
import { Invoice } from '~/types';

export class InvoicesModel extends Model {
  constructor(db: Firestore) {
    super(db, Collections.Invoices);
  }

  public async addInvoice(invoice: Invoice) {
    const docRef = await addDoc(collection(this.db, this.collection), {
      ...invoice,
    });
    console.log('document', docRef);
    console.log('Document written with ID: ', docRef.id);
  }

  public async getInvoices() {
    const q = query(
      collection(this.db, this.collection),
      orderBy('from'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    const invoices = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as unknown as Invoice)
    );

    return invoices;
  }

  public async getInvoiceById(id: string): Promise<Invoice> {
    const docRef = await getDoc(doc(this.db, this.collection, id));
    const report = docRef.data() as Invoice;
    return report;
  }
}
