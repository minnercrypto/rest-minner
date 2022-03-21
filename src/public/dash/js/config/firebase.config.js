var firebaseConfig = {
  apiKey: "AIzaSyD6ZSirsHNwWbjSjKqyWqzfPOZZZihy43U",
  authDomain: "minnercrypto-official.firebaseapp.com",
  projectId: "minnercrypto-official",
  storageBucket: "minnercrypto-official.appspot.com",
  messagingSenderId: "267365619729",
  appId: "1:267365619729:web:a19a28c54972de423b79b0",
  measurementId: "G-8847SS0V0T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();