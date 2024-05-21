import { initializeApp } from 'firebase/app';
import ENVS from '@/utils/envKeys';

const firebaseConfig = {
  apiKey: ENVS.firebase.apiKey,
  authDomain: ENVS.firebase.authDomain,
  projectId: ENVS.firebase.projectId,
  storageBucket: ENVS.firebase.storageBucket,
  messagingSenderId: ENVS.firebase.messagingSenderId,
  appId: ENVS.firebase.appId,
  measurementId: ENVS.firebase.measurementId
};

// Initialize Firebase
export const _firebaseApp = initializeApp(firebaseConfig);
