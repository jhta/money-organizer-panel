import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { StickyBar } from '~/components/StickyBar';
import AddCategoriesPage from '~/pages/add-categories/AddCategoriesPage';
import Main from '~/pages/main/MainPage';
import SubmitReport from '~/pages/submit-report/SubmitReportPage';
import { Routes } from './Routes';

function StickyBarWrapper() {
  return (
    <>
      <Outlet />
      <StickyBar />
    </>
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
    ],
  },
]);
