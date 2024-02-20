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
import { Trip } from '~/types';

import { Model } from './Model';

export class TripsModel extends Model {
  constructor(db: Firestore) {
    super(db, Collections.Trips);
  }

  public async addTrip(trip: Trip) {
    const docRef = await addDoc(collection(this.db, this.collection), trip);
    console.log('document', docRef);
    console.log('Document written with ID: ', docRef.id);
  }

  public async getTrips() {
    const q = query(
      collection(this.db, this.collection),
      orderBy('from'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Trip)
    );

    return trips;
  }

  public async getTripById(id: string) {
    const docRef = await getDoc(doc(this.db, this.collection, id));
    const report = docRef.data() as Trip;
    return report;
  }
}
