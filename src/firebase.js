import firebase from 'firebase';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBekbm7iHKk8JKdmigi0sARkBibXs7VCLg',
  authDomain: 'sliceline-2092e.firebaseapp.com',
  databaseURL: 'https://sliceline-2092e.firebaseio.com',
  projectId: 'sliceline-2092e',
  storageBucket: 'sliceline-2092e.appspot.com',
  messagingSenderId: '259442267591',
  appId: '1:259442267591:web:fcb8a6a05cb4a4e324b5e2'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const gAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export const { firestore } = firebase;

const db = firebase.firestore();
export default db;
