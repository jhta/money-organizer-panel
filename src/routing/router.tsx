import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { StickyBar } from '~/components/StickyBar';
import AddCategoriesPage from '~/pages/add-categories/AddCategoriesPage';
import { LoginPage } from '~/pages/login/LoginPage';
import Main from '~/pages/main/MainPage';
import SubmitReport from '~/pages/submit-report/SubmitReportPage';
import { ReportsPage } from '~/pages/reports/ReportsPage';
import { RestrictedScreen } from './RestrictedPage';
import { Routes, ParamsByRoute } from './Routes';
import { ReportPage } from '~/pages/report/ReportPage';
import { CreateLedgerReportPage } from '~/pages/create-ledger-report/CreateLedgerReportPage';
import { LedgerPage } from '~/pages/ledger/LedgerPage';
import { AnalyticsPage } from '~/pages/analytics/AnalyticsPage';
import AddTripPage from '~/pages/add-trip/AddTripPage';
import { TripPage } from '~/pages/trip/TripPage';
import TripsPage from '~/pages/trips/TripsPage';

const routeWithParams = (route: Routes) => {
  const params = ParamsByRoute[route] as string[] | undefined;

  if (!params) {
    return route;
  }

  return params.reduce((acc: string, param: string) => {
    return `${acc}/:${param}`;
  }, route);
};

console.log(routeWithParams(Routes.Report));

function StickyBarWrapper() {
  return (
    <RestrictedScreen>
      <Outlet />
      <StickyBar />
    </RestrictedScreen>
  );
}

export const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <StickyBarWrapper />,
    children: [
      {
        path: Routes.Main,
        element: <Main />,
      },
      {
        path: Routes.SubmitReport,
        element: <SubmitReport />,
      },
      {
        path: Routes.AddCategories,
        element: <AddCategoriesPage />,
      },
      {
        path: Routes.Reports,
        element: <ReportsPage />,
      },
      {
        path: routeWithParams(Routes.Report),
        element: <ReportPage />,
      },
      {
        path: Routes.CreateLedger,
        element: <CreateLedgerReportPage />,
      },
      {
        path: Routes.Ledger,
        element: <LedgerPage />,
      },
      {
        path: Routes.Analytics,
        element: <AnalyticsPage />,
      },
      {
        path: Routes.AddTrip,
        element: <AddTripPage />,
      },
      {
        path: routeWithParams(Routes.Trip),
        element: <TripPage />,
      },
      {
        path: Routes.Trips,
        element: <TripsPage />,
      },
    ],
  },
  {
    path: Routes.Login,
    element: <LoginPage />,
  },
]);
