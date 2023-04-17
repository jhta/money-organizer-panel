import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import authService, { AuthResponse } from './authService';

interface AuthContext {
  isAuth: boolean;
  login: () => Promise<AuthResponse>;
  logout: () => void;
}

const authInitialState: AuthContext = {
  isAuth: false,
  login: () => ({} as Promise<AuthResponse>),
  logout: () => {},
};

const AuthContext = createContext<AuthContext>(authInitialState);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    setAuth(!!session);
  }, []);

  const value = {
    isAuth,
    login: async () => {
      if (isAuth) {
        console.log('Already logged in');
        return { error: 'Already logged in' };
      }

      const result = await authService.login();

      if (result.token) {
        console.log('setting auth', result.token);
        setAuth(true);
      }

      await wait(500);
      console.log({ result });
      return result;
    },
    logout: () => {
      setAuth(false);
      localStorage.removeItem('session');
      localStorage.removeItem('user');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
