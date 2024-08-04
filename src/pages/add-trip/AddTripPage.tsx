import React, { FC, useState, useMemo } from 'react';
import { useAlert } from 'react-alert';
import { useQuery, useQueryClient } from 'react-query';
import { v4 } from 'uuid';
import firebaseService from '~/services/firebase/firebaseService';
import { Trip } from '~/types';
import { useNavigateWithParams } from '~/routing/utils';
import { RouteParams, Routes } from '~/routing/Routes';
import { formatAmountToEuro } from '~/utils';

// Custom hooks
const useTrips = () => {
  const { data: trips, isLoading } = useQuery('trips', () =>
    firebaseService.trips.getAllTrips()
  );
  const sortedTrips = useMemo(() => {
    return [...(trips || [])].sort(
      (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
    );
  }, [trips]);
  return { trips: sortedTrips, isLoading };
};

const useAddTrip = () => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  const [tripName, setTripName] = useState('');

  const addTrip = async () => {
    if (!tripName.trim()) {
      alert.error('Please enter a trip name');
      return;
    }

    const newTrip: Trip = {
      id: v4(),
      name: tripName,
      from: new Date().toISOString(),
      to: new Date().toISOString(),
      total: 0,
      transactionIds: [],
    };

    try {
      await firebaseService.trips.addTrip(newTrip);
      alert.success(`Trip to ${tripName} added`);
      setTripName('');
      queryClient.invalidateQueries('trips');
    } catch (error) {
      alert.error('Failed to add trip');
      console.error('Error adding trip:', error);
    }
  };

  return { tripName, setTripName, addTrip };
};

// Subcomponents
const AddTripForm: FC<{
  tripName: string;
  setTripName: (name: string) => void;
  addTrip: () => void;
}> = ({ tripName, setTripName, addTrip }) => (
  <div className="flex-row mb-4">
    <input
      value={tripName}
      onChange={e => setTripName(e.target.value)}
      placeholder="name"
      className="input-group text-base inline mr-2"
    />
    <button onClick={addTrip}>Add</button>
  </div>
);

const TripList: FC<{ trips: Trip[]; onTripClick: (id: string) => void }> = ({
  trips,
  onTripClick,
}) => (
  <ul>
    {trips.map(trip => (
      <li
        onClick={() => onTripClick(trip.id)}
        className="report-list-item"
        key={trip.id}
      >
        <p>{`Trip to ${trip.name}`}</p>
        <p>{`Total Expended: ${formatAmountToEuro(trip.total)}`}</p>
        <p>{`From: ${new Date(trip.from).toLocaleDateString()}`}</p>
      </li>
    ))}
  </ul>
);

// Main component
const AddTripPage: FC = () => {
  const navigate = useNavigateWithParams();
  const { trips, isLoading } = useTrips();
  const { tripName, setTripName, addTrip } = useAddTrip();

  const handleTripClick = (id: string) => {
    navigate<RouteParams[Routes.Trip]>(Routes.Trip, { id });
  };

  return (
    <>
      <h1 className="mb-6">Add Trips</h1>
      <AddTripForm
        tripName={tripName}
        setTripName={setTripName}
        addTrip={addTrip}
      />

      {isLoading ? (
        <p>Loading trips...</p>
      ) : (
        <TripList trips={trips} onTripClick={handleTripClick} />
      )}
    </>
  );
};

export default AddTripPage;
