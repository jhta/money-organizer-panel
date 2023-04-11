import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Store } from './store';
import { router } from './routing/router';

function App() {
  return (
    <Store>
      <RouterProvider router={router} />
    </Store>
  );
}

export default App;
