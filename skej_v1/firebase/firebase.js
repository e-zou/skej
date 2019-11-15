import * as firebase from 'firebase';

const config = {
apiKey: process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_AUTH_DOMAIN,
databaseURL: "https://skej-3eec6.firebaseio.com",
projectId: process.env.REACT_APP_PROJECT_ID,
storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_ID,
appMeasurementId: process.env.APP_MEASUREMENTID,
};

firebase.initializeApp(config);

export default firebase;