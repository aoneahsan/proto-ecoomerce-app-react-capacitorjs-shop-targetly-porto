import { _firebaseApp } from '@/configs/firebase';
import { getRemoteConfig } from 'firebase/remote-config';

export const _firebaseRemoteConfig = getRemoteConfig(_firebaseApp);
