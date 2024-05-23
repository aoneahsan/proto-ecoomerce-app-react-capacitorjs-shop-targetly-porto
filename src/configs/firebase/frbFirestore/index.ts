import { _firebaseApp } from '@/configs/firebase';
import ENVS from '@/utils/envKeys';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export const _firebaseFirestore = getFirestore(_firebaseApp);

if (ENVS.isDevelopment) {
  connectFirestoreEmulator(_firebaseFirestore, 'localhost', 9503);
}
