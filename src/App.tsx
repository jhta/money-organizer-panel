import { RouterProvider } from 'react-router-dom';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './App.css';
import { Store } from './store';
import { router } from './routing/router';
import { AuthProvider } from './services/auth/AuthProvider';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

function App() {
  return (
    <Store>
      <Provider template={AlertTemplate} {...options}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </Store>
  );
}

export default App;
