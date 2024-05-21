import { _firebaseApp } from '@/configs/firebase';
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  signInWithCredential,
  AuthCredential
} from 'firebase/auth';

export const _firebaseAuth = initializeAuth(_firebaseApp);

export const _createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => await createUserWithEmailAndPassword(_firebaseAuth, email, password);

// signInWithCredential(_firebaseAuth, 'aoneahsan@gmail.com', 'Asd123!@#');
