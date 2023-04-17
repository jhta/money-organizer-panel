import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/services/auth/AuthProvider';

interface RestrictedScreenProps {
  children: React.ReactNode;
}

export const RestrictedScreen: FC<RestrictedScreenProps> = ({ children }) => {
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
