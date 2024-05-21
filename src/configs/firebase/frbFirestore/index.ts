import { _firebaseApp } from '@/configs/firebase';
import { getFirestore } from 'firebase/firestore';

export const _firebaseFirestore = getFirestore(_firebaseApp);
