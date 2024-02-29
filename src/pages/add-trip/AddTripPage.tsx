import { FC, useState } from 'react';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import firebaseService from '~/services/firebase/firebaseService';
import { Trip } from '~/types';
import { useNavigateWithParams } from '~/routing/utils';
import { RouteParams, Routes } from '~/routing/Routes';

const AddTripPage: FC = () => {
  const alert = useAlert();
  const { data: trips } = useQuery('trips', () =>
    firebaseService.trips.getAllTrips()
  );

  const navigate = useNavigateWithParams();

  const [tripName, setTripName] = useState('');

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: v4(),
      name: tripName,
      from: new Date().toISOString(),
      to: new Date().toISOString(),
      total: 0,
      transactionIds: [],
    };
    firebaseService.trips.addTrip(newTrip);
    alert.success(`trip to ${tripName} added`);
  };

  return (
    <>
      <h1 className="mb-6">Add Trips</h1>
      <div className="flex-row">
        <input
          value={tripName}
          onChange={e => setTripName(e.target.value)}
          placeholder="name"
          className="input-group text-base inline mr-2"
        />
        <button onClick={handleAddTrip}>Add</button>
      </div>

      <ul>
        {(trips || []).map((trip, index) => (
          <li
            onClick={() => {
              navigate<RouteParams[Routes.Trip]>(Routes.Trip, { id: trip.id });
            }}
            className="report-list-item"
            key={index}
          >
            <p>{`Trip to ${trip.name}`}</p>
            <p>{`Total Expended: ${trip.total}`}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddTripPage;
