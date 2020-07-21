import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCrfzWUqD6vUJEq_0gFM0bhvCpVx1XCekE",
  authDomain: "instagram-clone-dcb0e.firebaseapp.com",
  databaseURL: "https://instagram-clone-dcb0e.firebaseio.com",
  projectId: "instagram-clone-dcb0e",
  storageBucket: "instagram-clone-dcb0e.appspot.com",
  messagingSenderId: "808493346631",
  appId: "1:808493346631:web:348e21d7862bbf5e216662",
  measurementId: "G-CX7N2MR9DP"
});

const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };