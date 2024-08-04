import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
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

const useTripSummary = (trips: Trip[]) => {
  return useMemo(() => {
    const summary: Record<number, number> = {};
    trips.forEach(trip => {
      const year = new Date(trip.from).getFullYear();
      summary[year] = (summary[year] || 0) + trip.total;
    });
    return Object.entries(summary)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, total]) => ({ year: Number(year), total }));
  }, [trips]);
};

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

const TripSummary: FC<{ summary: { year: number; total: number }[] }> = ({
  summary,
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Travel Expenses Summary</h2>
    {summary.map(({ year, total }) => (
      <p key={year} className="text-base">
        {`during ${year} expened so far: ${formatAmountToEuro(total)}`}
      </p>
    ))}
  </div>
);

// Main component
const Trips: FC = () => {
  const navigate = useNavigateWithParams();
  const { trips, isLoading } = useTrips();
  const tripSummary = useTripSummary(trips || []);

  const handleTripClick = (id: string) => {
    navigate<RouteParams[Routes.Trip]>(Routes.Trip, { id });
  };
  const handleAddTripClick = () => {
    navigate(Routes.AddTrip);
  };

  return (
    <>
      <h1 className="mb-6">Trips</h1>
      <button onClick={handleAddTripClick} className="mb-6">
        Add New Trip
      </button>
      {!isLoading && <TripSummary summary={tripSummary} />}
      {isLoading ? (
        <p>Loading trips...</p>
      ) : (
        <TripList trips={trips} onTripClick={handleTripClick} />
      )}
    </>
  );
};

export default Trips;
