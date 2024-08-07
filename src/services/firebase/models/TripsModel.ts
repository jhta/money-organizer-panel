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
  updateDoc,
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

  public async addTransactionsToTrip(
    tripId: string,
    transactionIds: string[],
    total: number
  ) {
    const docRef = doc(this.db, this.collection, tripId);

    await updateDoc(docRef, {
      total,
      transactionIds,
    });
  }

  public async getAllTrips() {
    const q = query(
      collection(this.db, this.collection),
      orderBy('from'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map(
      doc =>
        ({
          refId: doc.id,
          ...doc.data(),
        } as Trip)
    );

    return trips;
  }

  public async getTripById(id: string) {
    // const docRef = await getDoc(doc(this.db, this.collection, id));
    // const report = docRef.data() as Trip;
    // return report;
    const trips = await this.getAllTrips();
    return trips.find(trip => trip.id === id);
  }
}
