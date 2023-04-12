import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Store } from './store';
import { router } from './routing/router';
import { useEffect } from 'react';
import firebaseService from './services/firebase/firebaseService';

function App() {
  useEffect(() => {
    firebaseService.init();
  }, []);

  return (
    <Store>
      <RouterProvider router={router} />
    </Store>
  );
}

export default App;
