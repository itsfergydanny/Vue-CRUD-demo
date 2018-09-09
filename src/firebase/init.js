import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyClMwK6Ficj3QXrzxqiOkpNbBP0P0P82W4',
  authDomain: 'udemy-ninja-smoothies-18e3c.firebaseapp.com',
  databaseURL: 'https://udemy-ninja-smoothies-18e3c.firebaseio.com',
  projectId: 'udemy-ninja-smoothies-18e3c',
  storageBucket: 'udemy-ninja-smoothies-18e3c.appspot.com',
  messagingSenderId: '76192521154'
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore database
export default firebaseApp.firestore();
