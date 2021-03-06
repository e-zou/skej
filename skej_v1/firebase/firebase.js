import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://skej-3eec6.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "skej-3eec6.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  appMeasurementId: process.env.APP_MEASUREMENTID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase; 


