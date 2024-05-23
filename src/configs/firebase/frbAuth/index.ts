import { _firebaseApp } from '@/configs/firebase';
import ENVS from '@/utils/envKeys';
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  signInWithCredential,
  AuthCredential,
  connectAuthEmulator
} from 'firebase/auth';

export const _firebaseAuth = initializeAuth(_firebaseApp);

if (ENVS.isDevelopment) {
  connectAuthEmulator(_firebaseAuth, 'http://localhost:9501');
}

// _firebaseAuth = {
//   protocol: 'http',
//   host: 'localhost:9099'
// };

export const _createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => await createUserWithEmailAndPassword(_firebaseAuth, email, password);

// signInWithCredential(_firebaseAuth, 'aoneahsan@gmail.com', 'Asd123!@#');
