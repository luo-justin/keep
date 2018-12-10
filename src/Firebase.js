import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyA9IXgTxn0JtyODKNNp5tiXl8QnmTwyiAU",
  authDomain: "keep-93740.firebaseapp.com",
  databaseURL: "https://keep-93740.firebaseio.com",
  projectId: "keep-93740",
  storageBucket: "keep-93740.appspot.com",
  messagingSenderId: "422445849747"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;