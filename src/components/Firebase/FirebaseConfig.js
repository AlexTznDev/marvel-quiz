import { initializeApp } from 'firebase/app';
import {getFirestore , doc } from 'firebase/firestore' ;
import { getAuth } from 'firebase/auth';

const Config = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementID:  process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

};



// //inscription
// signUpuser = (email, password) => {
//   return this.auth.createUserWithEmailAndPassword(email, password)

// }

// //connexion
// loginUser = (email, password) => {
//   return this.auth.signInWithEmailAndPassword(email, password)
// }

// //deconnexion
// signOutUser = () => {
//   return this.auth.signOut()
// }

const app = initializeApp(Config)
export const auth = getAuth(app)
export const firestore = getFirestore()
export const user = (uid) =>  doc(firestore, `users/${uid}`)

