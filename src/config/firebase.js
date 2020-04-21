import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const gAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export const { firestore } = firebase;

const db = firebase.firestore();
export default db;
