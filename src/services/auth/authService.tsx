import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import firebaseService from '../firebase/firebaseService';

export interface AuthResponse {
  token?: string;
  user?: User;
  error?: string;
}

class AuthService {
  provider: GoogleAuthProvider;
  auth: Auth;

  constructor() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth(firebaseService.app);
  }

  async login(): Promise<AuthResponse> {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) {
        console.log('credential', credential);
        const token = credential.accessToken;
        const user = result.user;

        sessionStorage.setItem('session', token || '');
        sessionStorage.setItem('user', JSON.stringify(user));

        return { token, user };
      }

      return {
        error: 'No credential',
      };
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(
        error as FirebaseError
      );

      console.log({ credential });
      console.log(error);

      return { error: (error as FirebaseError)?.message || '' };
    }
  }
}

const authService = new AuthService();

export default authService;
