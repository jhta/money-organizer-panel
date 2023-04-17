import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routing/Routes';
import { useAuth } from '~/services/auth/AuthProvider';
import './styles.css';

export const LoginPage = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  const onClick = async () => {
    const { error, token, user } = await login();

    console.log({ token, user });

    if (error) {
      console.log({ error });
      return;
    }

    navigate(Routes.Main);
  };

  return (
    <div>
      <h1>Login Page</h1>
      {isAuth ? (
        <div onClick={onClick} className="login-google">
          <label>Logout</label>
        </div>
      ) : (
        <div onClick={onClick} className="login-google">
          <label>Login with Google</label>
        </div>
      )}
    </div>
  );
};
