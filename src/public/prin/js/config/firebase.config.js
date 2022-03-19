var firebaseConfig = {
  apiKey: "AIzaSyA7TglVggnyZ5a_rVEMPiuqnK3JesTGjic",
  authDomain: "currency-market-miner.firebaseapp.com",
  projectId: "currency-market-miner",
  storageBucket: "currency-market-miner.appspot.com",
  messagingSenderId: "170574948592",
  appId: "1:170574948592:web:69e368c2c82646d3313a35",
  measurementId: "G-T6EVM8BCWE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
