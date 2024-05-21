const _env = import.meta.env;

const firebase: {
  apiKey: string;
  projectId: string;
  messagingSenderId: string;
  measurementId: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  storageBucket: string;
} = {
  apiKey: _env.VITE_FRB_API_KEY,
  projectId: _env.VITE_FRB_PROJECT_ID,
  messagingSenderId: _env.VITE_FRB_MESSAGING_SENDING_ID,
  appId: _env.VITE_FRB_APP_ID,
  measurementId: _env.VITE_FRB_MEASUREMENT_ID,
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};

if (
  !firebase.apiKey ||
  !firebase.projectId ||
  !firebase.messagingSenderId ||
  !firebase.measurementId ||
  !firebase.appId
) {
  throw new Error('Firebase ENV Keys are not defined in .env file');
}

firebase.authDomain = `${firebase.projectId}.firebaseapp.com`;
firebase.databaseURL = `https://${firebase.projectId}-default-rtdb.asia-southeast1.firebasedatabase.app`;
firebase.storageBucket = `${firebase.projectId}.appspot.com`;
firebase.appId = `1:${firebase.messagingSenderId}:web:${firebase.appId}`;

const ENVS = {
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'invoice-app-secret',
  firebase
};

export default ENVS;
