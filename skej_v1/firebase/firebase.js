import * as firebase from 'firebase';
import 'firebase/firestore';

/* const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://skej-3eec6.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  appMeasurementId: process.env.APP_MEASUREMENTID,
}; */

const config = {
  apiKey: "AIzaSyDZTUzcdvdPWmCdxpLeik_RkPkm_N_rHUM",
  authDomain: "skej-3eec6.firebaseapp.com",
  databaseURL: "https://skej-3eec6.firebaseio.com",
  projectId: "skej-3eec6",
  storageBucket: "skej-3eec6.appspot.com",
  messagingSenderId: "938990251588",
  appId: "1:938990251588:web:fbbb6bfe336d15a8209611",
  measurementId: "G-TJBGXBKBLV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();

export default db;