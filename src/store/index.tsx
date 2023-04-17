import { createContext, FC, useContext, useReducer } from 'react';
import { Actions } from './actions';
import { reducer, AppState, initialState } from './reducer';

type AppReducerContext = {
  state: AppState;
  dispatch: React.Dispatch<Actions>;
};

const AppContext = createContext<AppReducerContext>({
  state: initialState,
  dispatch: () => null,
});

interface StoreProps {
  children: React.ReactNode;
}

export const Store: FC<StoreProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  window.state = state;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => useContext(AppContext);
