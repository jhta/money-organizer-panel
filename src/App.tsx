import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Store } from './store';
import { router } from './routing/router';
import { AuthProvider } from './services/auth/AuthProvider';

function App() {
  return (
    <Store>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Store>
  );
}

export default App;
