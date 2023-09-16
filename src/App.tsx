import { RouterProvider } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './App.css';
import { Store } from './store';
import { router } from './routing/router';
import { AuthProvider } from './services/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

const queryClient = new QueryClient();

function App() {
  return (
    <Store>
      <QueryClientProvider client={queryClient}>
        <AlertProvider template={AlertTemplate} {...options}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </Store>
  );
}

export default App;
