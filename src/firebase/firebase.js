import firebase from "firebase/app";

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvMDYMI5lbnx6GFiw-_gyRDzWriUdPZzE",
  authDomain: "todos-1a807.firebaseapp.com",
  databaseURL: "https://todos-1a807.firebaseio.com",
  projectId: "todos-1a807",
  storageBucket: "todos-1a807.appspot.com",
  messagingSenderId: "44399547596",
  appId: "1:44399547596:web:ce0e227e96b2ca94965e69",
  measurementId: "G-5LLGPX4M5Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
// firestore.settings({ timestampsInSnapshots : true });

export default firestore;
