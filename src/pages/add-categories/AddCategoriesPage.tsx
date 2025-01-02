import { TransactionListWithCategories } from '~/components/TransactionListWithCategories/TransactionListWithCategories';
import { useSelectedTransactions } from '~/store/useSelectors';
import { useQuery } from 'react-query';
import firebaseService from '~/services/firebase/firebaseService';
import { Loader } from '~/components/Loader/Loader';

const NONE_TRIP_OPTION = { value: '', label: 'None' };

export default function AddCategories() {
  const selectedTransactions = useSelectedTransactions();
  const {
    data: trips,
    isSuccess,
    isLoading,
  } = useQuery('trips', () => firebaseService.trips.getAllTrips());

  const tripOptions = [
    NONE_TRIP_OPTION,
    ...(trips || [])
      .map(trip => ({
        value: trip.id,
        label: trip.name,
      }))
      .reverse(),
  ];

  return (
    <div>
      <h1>Add categories</h1>

      {isSuccess && (
        <TransactionListWithCategories
          transactions={selectedTransactions}
          tripOptions={tripOptions}
        />
      )}
      {isLoading && (
        <div className="mt-16 mb-8 flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
